const Tank = require('../models/resource.model.js');
const resService = require('../services/resource.service.js')
let nextId = 2; //Important nextId stays here, as these are functions that use it, rather than in resource.routes.js where they are called, but it will mess up on id creations as it resets back to 2 after server resets, should fix that
//Health Checker
async function healthCheck(req,res){
    res.status(200).json({ok:true, uptime:Math.round(process.uptime())})
};
// //GET for all current tank records
async function getAll(req,res,next){
    try{
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pageSize) || 25;
    const tanks = await resService.getAllVehicles(page, pageSize)
    res.status(200).json(tanks)
    } catch (error){
        next(error)
    }
    
};
// //GET for specific tank record
async function getOne (req,res,next){
    try {
        const vehicle = await Tank.findOne({id: Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:"Tank not found."})
        res.status(200).json(vehicle);
    } catch (error) {
        next(error)
    }
};
// //POSTing a new, valid tank record
async function createVehicle (req,res,next){
    try {
        const vehicle = await Tank.create({id:Number(nextId++),...req.body})
        res.status(201).json(vehicle)
    } catch (error) {
        next(error)
    }
};
// //PUTting a new tank record in place of an uploaded one
async function replaceBlueprint (req,res,next){
    try {
        const vehicle = await Tank.findOneAndReplace({id:Number(req.params.id)}, req.body, {new:true})
        if(!vehicle) return res.status(404).json({error:"Tank not found"})
        res.status(200).json(vehicle);
    } catch (error) {
        next(error)
    }
};
// //PATCHing an already uploaded tank record with new information
async function modifyVehicle (req,res,next){
    try {
        const vehicle = await Tank.findOneAndUpdate({id:Number(req.params.id)}, req.body,{new:true});
        if (!vehicle) return res.status(404).json({error:'Tank not found'})
        res.status(200).json(vehicle)
    } catch (error) {
        next(error)
    }
};
// //DELETEing an uploaded tank recorded
async function destroyAsset (req,res,next){
    try {
        const vehicle = await Tank.findOneAndDelete({id:Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:'Tank not found.'})
        res.status(204).send()
    } catch (error) {
        next(error)
    }
};

//Functions below shall be the service functions, combine these with the resService functions in routes.
//---------------------------- NOTE: When searching in localhost string, space make (Light Tank, Medium Tank, etc), make a SPACE via %20 not an ACTUAL space
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
module.exports = {healthCheck, getAll, getOne, createVehicle, replaceBlueprint, modifyVehicle, destroyAsset, findMaker, findRank, findCrew, findCustom, findCars, findCreator, findNation}