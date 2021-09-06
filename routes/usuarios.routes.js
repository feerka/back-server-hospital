//Ruta: /api/usuarios
const { Router } = require('express');
const { body } = require('express-validator');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuario.controllers');
const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/', validatJWT, getUsuarios);

router.post('/', [
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);


router.put('/:id', [
    validatJWT,
    body('nombre', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('role', 'El role es obligatorio').not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id', validatJWT, borrarUsuario);

module.exports = router;