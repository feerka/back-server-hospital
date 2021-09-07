const { response } = require("express");
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen')
const fileUploads = (req, res = response) => {
    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipo
    const tipoValido = ['hospitales', 'medicos', 'usuarios'];
    if (!tipoValido.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un medico, hospital o usuario valido'
        });
    }
    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Procesar una imagen
    const file = req.files.imagen;

    const nombreCortado = file.name.split('.'); /// wolvering.1.3.jpg

    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extension permitida'
        });
    }

    //Generar el nombre del archivo
    const nombreArhivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArhivo}`;

    const fs = require('fs');
    // Mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        //ActualizarImagen
        actualizarImagen(tipo, id, nombreArhivo);

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArhivo
        });
    });

}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.png`);
        res.sendFile(pathImg);
    }
}
module.exports = {
    fileUploads,
    retornaImagen
}