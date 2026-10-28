'use strict'
const asyncHandler = require('../utils/asyncHandler')
const {sendSuccess, sendCreated} = require('../utils/apiResponse')
const ApiError = require('../utils/ApiError')
const {signToken} = require('../utils/jwt')
const User = require('../models/user.model')

const register = asyncHandler(async(req,res)=>{
    const {name, email, password} = req.body ?? {}
    const user = await User.create({name, email, password})
    sendCreated(res, {user, token: signToken(user)})
})

const login = asyncHandler(async(req,res)=>{
    const {email, password} = req.body ?? {}

    if(!email || !password)
        throw ApiError.badRequest('email and password are both required')
    const user = await User.findOne({email: String(email).toLowerCase().trim()}).select(`+password`)
    if(!user || !(await user.comparePassword(password))){
        throw ApiError.unauthenticated('Invalid email or password')
    }
    sendSuccess(res, {user, token:signToken(user)})
})

const me = asyncHandler(async(req,res)=>{
    sendSuccess(res, req.user)
})

module.exports = {register, login, me}