const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const {verifyToken} = require('../utils/jwt');
const {AUTH} = require('../config/constants');
const User = require('../models/user.model');

const requireAuth = asyncHandler(async(req,res,next)=>{
    const header = req.get('authorization')

    if(!header.startsWith(AUTH.BEARER_PREFIX)){
        throw ApiError.unauthorized('Missing or malformed authorization header')
    }

    const token = header.slice(AUTH.BEARER_PREFIX.length).trim()
    if(!token) throw ApiError.unauthorized('Missing or malformed authorization header')
    const payload = verifyToken(token)

    const tanker = await User.findById(payload.sub)
    if(!tanker) throw ApiError.unauthorized('This account no longers exist')
    req.tanker = tanker
    next()
})
module.exports = {requireAuth}