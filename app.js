'use strict'

//Configuracion del servidor express

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//Cargar archivos de rutas 
var project_routes = require('./routes/project');

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//CORS

//Rutas
app.use('/api',project_routes);


//Exportacion del modulo
module.exports = app;