//Database containing the schema, the 'model' (Tank) and exporting it to use with other files
const mongoose = require('mongoose')

const tankSchema = new mongoose.Schema({
    name:{type:String,required:true},
    custom:{type:Boolean,default:true, required:true},
    crew_number:{type:Number,required:true, enum:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]},
    nation:{type:String,required:true, enum:['Italy', 'France', 'Germany', 'China', 'Japan', 'Sweden', 'Israel', 'UK', 'USSR', 'USA']},
    rank:{type:String,default:'I', enum:['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']},
    make:{type:String, enum: ['Light Tank', 'Medium Tank', 'Heavy Tank', 'Tank Destroyer', 'SPAA']},
    isCar:{type:Boolean,default:false},
    id:{type:Number,required:true},
    creator:{type:String, required:true}
},{timestamps:true},{strict:true});
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