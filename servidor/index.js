
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");

// ruuting modulos
const productoRounting = require('./routes/api/producto')


//Creamos un app object global
var app = express();


// Conectamos a BBDD
conectarDB();


// Configuramos el puerto
const port = process.env.PORT || 4000


//Para poder recivir peticiones externas
app.use(cors());


app.use(express.json());

//Lanzamos rutas modulos

app.use('/api/producto', productoRounting);


app.listen( port, '0.0.0.0', () => { 
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
})