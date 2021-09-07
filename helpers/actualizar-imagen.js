const fs = require('fs');
const Hospital = require('../models/hospital.model');

const Medico = require('../models/medico.model');
const Usuario = require('../models/usuario.model');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        //borrar la imagen anterior
        fs.unlinkSync(path);
    }
}

const actualizarImagen = async(tipo, id, nombreArhivo) => {
    console.log('Vamos bien!');

    let pathViejo = '';
    switch (tipo) {

        case 'hospitales':
            const hospital = await Hospital.findById(id);

            if (!hospital) {
                console.log('No es un hospital por id');
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            borrarImagen(pathViejo);

            hospital.img = nombreArhivo;
            await hospital.save();
            return true;
            break;


        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);

            medico.img = nombreArhivo;
            await medico.save();
            return true;
            break;


        case 'usuarios':
            const usuario = await Usuario.findById(id);
            console.log('pasoooo');
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArhivo;
            await usuario.save();
            return true;
            break;

        default:
            break;
    }
}


module.exports = {
    actualizarImagen
}