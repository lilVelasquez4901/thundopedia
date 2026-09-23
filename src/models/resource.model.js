const mongoose = require('mongoose')

const tankSchema = new mongoose.Schema({
    name:{type:String,required:true},
    custom:{type:Boolean,default:true, required:true},
    crew_number:{type:Number,required:true},
    nation:{type:String,required:true},
    rank:{type:String,default:'I'},
    make:{type:String,default:'Unknown'},
    isCar:{type:Boolean,default:false},
    id:{type:Number,required:true},
    creator:{type:String, required:true}
},{timestamps:true});
const Tank = mongoose.model("Tank",tankSchema)
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

module.exports = Tank