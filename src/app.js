const express = require('express');
const routes = require('./routes');
const healthRoutes = require('./routes/health.routes');
const reqLogger = require('./middleware/requestLogger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const {API_PREFIX} = require('./config/constants')

//Mounting the routers
const app = express();

app.use(reqLogger);
app.use(express.json({limit:"10kb"}));
app.use(express.urlencoded({extended:true, limit:'10kb'}))

app.use('/health', healthRoutes) // works with `${API_PREFIX}health` but not '/health'?
app.use(API_PREFIX, routes);

app.use(notFound)
app.use(errorHandler)

module.exports = app