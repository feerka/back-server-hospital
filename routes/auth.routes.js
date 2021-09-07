//Ruta: /api/login
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleeSignIn } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');



const router = Router();



router.post('/', [
    check('email').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [

    check('token', 'el token de google es  obligatorio').not().isEmpty(),
    validarCampos
], googleeSignIn);



module.exports = router;