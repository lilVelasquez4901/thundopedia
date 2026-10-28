'use strict'
//Database containing the schema, the 'model' (Tank) and exporting it to use with other files
const mongoose = require('mongoose')
const {PAGINATION, SORTABLE_FIELDS, API_PREFIX, RANKS, MAKES, NATIONS, CREW_COUNT} = require('../config/constants')

const tankSchema = new mongoose.Schema({
    //separating fields for readability
    name:{
        type:String,
        required:[true, 'Tank must be named'],
        trim:true,
        maxLength:[60, 'Name may not exceed 60 characters']
    },
    custom:{
        type:Boolean,
        default:true, 
        required:true
    },
    crew_number:{
        type:Number,
        required:true,
        enum:{values: CREW_COUNT, message:'{VALUE} is not a valid crew number.'},
        default:4
    },
    nation:{
        type:String,
        required:true,
        enum:{values: NATIONS, message:'{VALUE} is not a valid nation.'}
    },
    rank:{
        type:String,
        default:'I',
        enum:{values: RANKS, message:'{VALUE} is not a valid rank.'}
    },
    make:{
        type:String,
         enum: {values: MAKES, message:'{VALUE} is not a valid make.'}
        },
    isCar:{
        type:Boolean,
        default:false
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:null,
        index:true
    },
    },{
        timestamps:true,
        toJSON:{
            virtuals:true,
            versionKey:false,
            transform(doc,ret){
                ret.id = ret._id
                delete ret.id
                return ret
            }
        },
        toObject:{virtuals:true},
        strict:true
    }
);
tankSchema.index({nation:1, make:1})
tankSchema.index({createdAt: -1})

module.exports = mongoose.model('Tank', tankSchema)