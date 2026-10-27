'use strict'
const {isTest} = require('../config/env')

module.exports = function requestLogger(req,res,next){
    if(isTest) return next()
    const start = process.hrtime.bigint()
    res.on('finish',()=>{
        const ms = Number(process.hrtime.bigint() - start) / 1e6;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms.toFixed(1)} ms`)
    })
    next()
}