const express = require('express');
const mongoose = require('mongoose');

const tankSchema = new mongoose.Schema({
    name:{type:String,required:true},
    custom:{type:Boolean,default:true, required:true},
    crew_number:{type:Number,required:true},
    nation:{type:String,required:true},
    rank:{type:String,default:'I'},
    make:{type:String,default:'Unknown'},
    isCar:{type:Boolean,default:false},
    id:{type:Number,required:true}
},{timestamps:true});
const app = express();
const Tank = mongoose.model("Tank",tankSchema)
app.use(express.json());

// let tank = [
//     {id: 1,
//     nickname: 'M22 Locust',
//     custom:false,
//     crew_number:3,
//     nation:'USA',
//     Rank:'I',
//     make:'Light Tank',
//     isCar:false
//     }
// ]

let nextId = 2;
//Health Checker
app.get('/health', (req,res)=>{
    res.status(200).json({status:'ok'})
});
//GET for all current tank records
app.get('/tanks', async (req,res)=>{
    const tanks = await Tank.find({})
    res.status(200).json(tanks)
})
//GET for specific tank record
app.get('/tanks/:id', async(req,res)=>{
    try {
        const vehicle = await Tank.findOne({id: Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:"Tank not found."})
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({error:'Tank not found.'})
    }
})
//POSTing a new, valid tank record
app.post('/tanks', async(req,res)=>{
    try {
        const vehicle = await Tank.create({id:Number(nextId++),...req.body})
        res.status(201).json(vehicle)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//PUTting a new tank record in place of an uploaded one
app.put('/tanks/:id', async(req,res)=>{
    try {
        const vehicle = await Tank.findOneAndReplace({id:Number(req.params.id,Object.entries(req.body))})
        if(!vehicle) return res.status(404).json({error:"Tank not found"})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//PATCHing an already uploaded tank record with new information
app.patch('/tanks/:id', async(req,res)=>{
    try {
        const vehicle = await Tank.findOneAndUpdate({id:Number(req.params.id)}, req.body);
        if (!vehicle) return res.status(404).json({error:'Tank not found'})
        res.status(200).json(vehicle)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
//DELETEing an uploaded tank recorded
app.delete('/tanks/:id', async(req,res)=>{
    try {
        const vehicle = await Tank.findOneAndDelete({id:Number(req.params.id)});
        if(!vehicle) return res.status(404).json({error:'Tank not found.'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

module.exports = app