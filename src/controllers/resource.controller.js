'use strict'
const Tank = require('../models/resource.model.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ApiError = require('../utils/ApiError.js');
const {sendSuccess, sendCreated, sendNoContent} = require('../utils/apiResponse.js')
const {parsePagination, parseSort, buildMeta, buildTankFilter} = require('../utils/queryFeatures');
const resService = require('../services/resource.service.js');
const WRITABLE_FIELDS = ['name', 'make', 'nation', 'crew_count', 'rank']

function pickWritableFields(body={}){
    const payload = {}
    for (const field of WRITABLE_FIELDS){
        if(body[field] !== undefined) payload[field] = body[field]
    }
    return payload
}

// //GET for all current tank records
const getAll = asyncHandler(async(req,res)=>{
    const filter = buildTankFilter(req.query)
    const sort = parseSort(req.query.sort)
    const {page, limit, skip} = parsePagination(req.query)
    const [tank, total] = await Promise.all([
        Tank.find(filter).sort(sort).skip(skip).limit(limit),
        Tank.countDocuments(filter)
    ])
   sendSuccess(res,tank, 200, {meta: buildMeta({page, limit, total})})
})
// //GET for specific tank record
const getOne = asyncHandler(async(req,res)=>{
    const tank = await Tank.findById(req.params.id)
    if(!tank) throw ApiError.notFound('Tank not Found')
    sendSuccess(res, tank)
})

// //POSTing a new, valid tank record
const createVehicle = asyncHandler(async(req,res)=>{
    const tank = await Tank.create({
        ...pickWritableFields(req.body),
        ownerId: req.user._id
    })
    sendCreated(res, tank)
})

// //PUTting and PATCH a new tank record in place of an uploaded one
const replaceBlueprint = asyncHandler(async(req,res)=>{
    const tank = await Tank.findByIdAndUpdate(req.params.id, req.body, {
        new:true, runValidators:true
    })
    if(!tank) throw ApiError.notFound('Tank not Found')
    sendSuccess(res, tank)
})

// //DELETEing an uploaded tank recorded
const destroyAsset = asyncHandler(async(req,res)=>{
    const ttank = await Tank.findByIdAndDelete(req.params.id)
    if(!tank) throw ApiError.notFound('Tank not Found')
    sendNoContent(res);
})

//Functions below shall be the service functions, combine these with the resService functions in routes.
async function findMaker(req,res,next){
    try{
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const maker = req.params.make
        const vehicles = await resService.pickByMake(maker, page, pageSize)
        res.status(200).json(vehicles)        
    }catch(error){
        next(error)
    }
};
async function findRank(req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const ranker = req.params.rank
        const vehicles = await resService.pickByRank(ranker, page, pageSize)
        res.status(200).json(vehicles)
    } catch (error) {
        next(error)
    }
}
async function findCrew(req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const crew = req.params.crew_number
        const vehicles = await resService.pickByCrew(crew, page, pageSize)
        res.status(200).json(vehicles)
    } catch (error) {
        next(error)
    }
}
async function findCustom (req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const bool = req.params.custom
        const vehicles = await resService.filterByCustom(bool, page, pageSize)
        res.status(200).json(vehicles)
    } catch (error) {
        next(error)
    }
}
async function findNation(req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const country = req.params.nation
        const vehicles = await resService.pickByNation(country, page, pageSize)
        res.status(200).json(vehicles)}
       catch (error) {
        next(error)
    }} 
async function findCars (req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const bool = req.params.isCar
        const cars = await resService.filterByCars(bool, page, pageSize)
        res.status(200).json(cars)
    } catch (error) {
        next(error)
    }
}
async function findCreator (req,res,next){
    try {
        const page = Number(req.query.page) || 1;
        const pageSize = Number(req.query.pageSize) || 25;
        const thePerson = req.params.creator
        const vehicles = await resService.filterByCreator(thePerson, page, pageSize)
        res.status(200).json(vehicles)
    } catch (error) {
        next(error)
    }
}
module.exports = {getAll, getOne, createVehicle, replaceBlueprint, destroyAsset, findMaker, findRank, findCrew, findCustom, findCars, findCreator, findNation}