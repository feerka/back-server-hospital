//api/todo/:busquedas


const { Router } = require('express');
const { body } = require('express-validator');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas.controllers');

const { validarCampos } = require('../middlewares/validar-campos');
const { validatJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/:busqueda', [
    validatJWT,
], getTodo);


router.get('/coleccion/:tabla/:busqueda', [
    validatJWT,
], getDocumentosColeccion);

module.exports = router;