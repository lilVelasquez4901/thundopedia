const jwt = require('jsonwebtoken')
const {jwtSecret, jwtExpiresIn} = require('../config/env')
//Validates and signs the token
function signToken(user){
    const payload = {sub: String(user_.id), role: user.role}
    return jwt.sign(payload, jwtSecret, {expiresIn: jwtExpiresIn})
}
//Verifies and passes the token
function verifyToken(user){
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        throw ApiError.unauthorized('Invalid Token')
    }
}
module.exports = {signToken, verifyToken}