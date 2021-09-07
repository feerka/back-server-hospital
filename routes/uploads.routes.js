//api/uploads/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');

const { fileUploads, retornaImagen } = require('../controllers/uploads.controllers');

const { validatJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.use(expressfileUpload());

router.put('/:tipo/:id', [
    validatJWT,
], fileUploads);

router.get('/:tipo/:foto', [
    validatJWT,
], retornaImagen);




module.exports = router;