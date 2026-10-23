const asyncHandler = require('../utils/asyncHandler')
const {sendSuccess, sendCreated} = require('../utils/apiResponse')
const ApiError = require('../utils/ApiError')
const {signToken} = require('../utils/jwt')
const User = require('../models/user.model')

const register = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body ?? {}
    const tanker = await User.create({name, email, password})
    sendCreated(res, {user, token: signToken(tanker)})
})

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body ?? {}

    if(!email || !password)
        throw ApiError.badRequest('email and password are both required')
    const tanker = await User.findOne({email: String(email).toLowerCase().trim()}).select(`+password`)
    if(!tanker || !(await tanker.comparePassword(password))){
        throw ApiError.unauthorized('Invalid email or password')
    }
    sendSuccess(res, {user, token:signToken(tanker)})
})

const me = asyncHandler(async(req,res)=>{
    sendSuccess(res, req.user)
})

module.exports = {register, login, me}