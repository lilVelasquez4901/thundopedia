'use strict'
const { isProduction } = require('../config/env')

module.exports = function errorHandler(err, req, res, next){
    let statusCode = err.statusCode || 500
    let message = err.message || 'Internal Server Error'
    let details = err.details || null

    if(err.name === 'CastError'){
        statusCode = 400
        message = `Invalid ${err.path}: ${err.value}`
    }

    if(err.name == 'ValidationError'){
        statusCode = 400
        message: "Validation failed"
        details:Object.values(err.errors).map((error)=>({
            field:err.path,
            message:error.message
        }))
    }

    if(err.code == 11000){
        statusCode = 409
        message = `Duplicate value for: ${Object.keys(err.keyValue || {}.join(', '))}`
    }

    if(err.type ==='entity.parse.failed'){
        statusCode = 400
        message = 'Malformed JSON in request body'
    }

    if(err.type === 'entity.too.large'){
        statusCode = 413
        message = 'Request body too large'
    }

    if(statusCode >= 500) console.error('[error]', {message: err.message, stack: err.stack})

    res.status(statusCode).json({
        success: false,
        error:{
            message,
            ...(details && {details}),
            ...(!isProduction && statusCode >= 500 && {stack: err.stack})
        }
    })
}