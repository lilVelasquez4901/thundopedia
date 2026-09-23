const Tank = require('../models/resource.model.js');
let nextId = 2;
//Health Checker
async function healthCheck(req,res){
    res.status(200).json({status:'ok'})
};
// //GET for all current tank records
async function getAll(req,res){
    const tanks = await Tank.find({})
    res.status(200).json(tanks)
};
// //GET for specific tank record
async function getOne (req,res){
    try {
        const vehicle = await Tank.findOne({id: Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:"Tank not found."})
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({error:'Tank not found.'})
    }
};
// //POSTing a new, valid tank record
async function createVehicle (req,res){
    try {
        const vehicle = await Tank.create({id:Number(nextId++),...req.body})
        res.status(201).json(vehicle)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
// //PUTting a new tank record in place of an uploaded one
async function replaceBlueprint (req,res){
    try {
        const vehicle = await Tank.findOneAndReplace({id:Number(req.params.id)},{new:true})
        if(!vehicle) return res.status(404).json({error:"Tank not found"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
// //PATCHing an already uploaded tank record with new information
async function modifyVehicle (req,res){
    try {
        const vehicle = await Tank.findOneAndUpdate({id:Number(req.params.id)}, req.body,{new:true});
        if (!vehicle) return res.status(404).json({error:'Tank not found'})
        res.status(200).json(vehicle)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
// //DELETEing an uploaded tank recorded
async function destroyAsset (req,res){
    try {
        const vehicle = await Tank.findOneAndDelete({id:Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:'Tank not found.'})
        res.status(204).send()
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
module.exports = {healthCheck, getAll, getOne, createVehicle, replaceBlueprint, modifyVehicle, destroyAsset}