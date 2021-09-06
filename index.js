require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();


//Configruar cors
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

//Rutas 
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/login', require('./routes/auth.routes'))






//mean_user
//1LYDe2DoSvgYXWEv
app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});