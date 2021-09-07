require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./db/config');


//Crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//Directorio publico
app.use(express.static('public'));

//Configruar cors
app.use(cors());


//Lectura y parseo del body
app.use(express.json());

//Rutas 
app.use('/api/usuarios', require('./routes/usuarios.routes'))
app.use('/api/hospitales', require('./routes/hospitales.routes'))
app.use('/api/medicos', require('./routes/medicos.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/todo', require('./routes/busquedas.routes'))
app.use('/api/upload', require('./routes/uploads.routes'))







//mean_user
//1LYDe2DoSvgYXWEv
app.listen(4000, () => {
    console.log('Servidor corriendo en el puerto 4000');
});