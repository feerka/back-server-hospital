const { response } = require("express");
const { populate } = require("../models/hospital.model");
const Hospital = require('../models/hospital.model');



const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre email');


    res.json({
        ok: true,
        hospitales
    });
};


const crearHospital = async(req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({ usuario: uid, ...req.body });
    try {

        const hospitalbd = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalbd
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const actualizarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarHospitales'
    });
}
const borrarHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarHospitales'
    });
}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital

}