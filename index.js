require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();



app.use(cors());


//Rutas 
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: true

    })
});



//mean_user
//1LYDe2DoSvgYXWEv
app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});