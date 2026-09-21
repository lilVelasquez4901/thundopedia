const express = require('express')
const mongoose = require('mongoose')

const tankSchema = new mongoose.schema({
    name:{type:String,required=true},
    custom:{type:Boolean,default:true, required=true},
    crew_number:{type:Number,required=true},
    nation:{type:String,required=true},
    rank:{type:String,default:'I'},
    make:{type:String,default:'Unknown'},
    isCar:{type:Boolean,default:false}
})
const app = express();
app.use(express.json())