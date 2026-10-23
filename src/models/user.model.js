const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {ROLE_VALUES, ROLES, AUTH} = require('../config/constants')

const tankerSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'A name is required'],
            trim:true,
            maxLength:[30, 'name must not exceed 30 characters']
        },
        email:{
            type:String,
            required:[true, 'An email is required'],
            unique:true,
            lowercase:true,
            trim:true,
            match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'must provide a valid email']
        },
        password:{
            type:String,
            required:[true, 'A password is required'],
            minlength:[8, 'Your password must be more than 8 characters'],
            select:false
        },
        role:{
            type:String,
            enum:{values:ROLE_VALUES, message:`{value} is not a valid role`},
            default:ROLES.USER
        }
    }, {
        timeStamps:true,
        toJSON:{
            virtuals:true,
            versionKey:false,
            transform(doc, ret){
                ret.id = ret._id
                delete ret.id
                return ret
            },
            toObject:{virtuals:true}
        }
    }
);

tankerSchema.pre('save', async function hashPassword(){
    if(!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, AUTH.SALT_ROUNDS)
});

tankerSchema.methods.comparePassword = function comparePassword(rivalPassword){
    return bcrypt.compare(rivalPassword, this.password)
};

module.exports = mongoose.model('User', tankerSchema)