const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler.js')
const notFound = require('./middleware/notFound.js')

//Mounting the routers
const toHere = require('./routes/resource.routes.js')
const app = express();
app.use(express.json());

function createApp(){
    app.use(express.json({limit:"10kb"}));
    app.use('/api/v1', toHere)

    // app.get("/boom",()=>{throw new Error('Yes Rico. Kaboom.')})
    app.use(notFound)
    app.use(errorHandler)

    return app
};

app.use('/', toHere)

module.exports = createApp