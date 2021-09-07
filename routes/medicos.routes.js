//'/api/medicos'

const { Router } = require('express');
const { body } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
} = require('../controllers/medicos.controllers');


const router = Router();

router.get('/', validatJWT, getMedicos);

router.post('/', [
    validatJWT,
    body('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    body('hospital', 'El hospital id debe ser valido').isMongoId(),
    validarCampos
], crearMedico);


router.put('/:id', [], actualizarMedico);

router.delete('/:id', borrarMedico);

module.exports = router;