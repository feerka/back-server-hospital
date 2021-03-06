const { response } = require("express");
const bcrypt = require('bcryptjs')

const Usuario = require('../models/usuario.model');
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {
        //Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });

        }

        //Verificar password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(404).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        //Generar token
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const googleeSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            // SI no existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe el usuario
            usuario = usuarioDB;
            usuario.google = true;
            //usuario.password = '@@@';
        }
        //Guardar en DB
        await usuario.save();


        //Generar token
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'token no correcto'

        });
    }

}

module.exports = {
    login,
    googleeSignIn
}