'use strict'
const {isConnected} = require('../config/database')
const {sendSuccess} = require('../utils/apiResponse')

function health(req,res){
    sendSuccess(res,{
        status:'ok',
        database: isConnected() ? 'connected' : 'disconnected',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
}
module.exports = {health}