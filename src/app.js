const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler.js')
const healthRoutes = require('./routes/health.routes.js')
const notFound = require('./middleware/notFound.js')
const reqLogger = require('./middleware/requestLogger.js')
const {API_PREFIX} = require('./config/constants.js')

//Mounting the routers
const routes = require('./routes/')
const app = express();

app.use(reqLogger);
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended:true, limit:'10kb'}))
app.use('/health', healthRoutes)
app.use(API_PREFIX, routes);
app.use(notFound)
app.use(errorHandler)

module.exports = app