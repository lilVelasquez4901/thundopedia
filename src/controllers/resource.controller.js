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
    const tanks = await Tank.find({})
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
async function findMaker(req,res,next){
    try{
        const maker = req.params.make
        const vehicles = await resService.pickByMake(maker)
        res.status(200).json(vehicles)        
    }catch(error){
        next(error)
    }
};

module.exports = {healthCheck, getAll, getOne, createVehicle, replaceBlueprint, modifyVehicle, destroyAsset, findMaker}