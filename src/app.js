const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const toHere = require('./routes/resource.routes.js')
app.use('/', toHere)

module.exports = app