//'/api/hospitales'

const { Router } = require('express');
const { body } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');
const {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
} = require('../controllers/hospitales.controllers');


const router = Router();

router.get('/', validatJWT, getHospitales);

router.post('/', [
    validatJWT,
    body('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
], crearHospital);


router.put('/:id', [], actualizarHospital);

router.delete('/:id', borrarHospital);

module.exports = router;