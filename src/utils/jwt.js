'use strict'
const jwt = require('jsonwebtoken')
const {jwtSecret, jwtExpiresIn} = require('../config/env')
const ApiError = require('../utils/ApiError')
//Validates and signs the token
function signToken(user){
    const payload = {sub: String(user._id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiresIn})
}
//Verifies and passes the token
function verifyToken(token){
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        throw ApiError.unauthenticated('Invalid Token')
    }
}
module.exports = {signToken, verifyToken}