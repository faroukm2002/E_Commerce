import { Schema,Types,model } from "mongoose"
import bcrypt from 'bcrypt';

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },

    password:{
        type:String,
        required:true,
    },
        role:{
            type:String,
            enum:['admin','user'],
            default:'user'
        },
        isActive:{
            type:Boolean,
            default:true,
        },
            verified:{
            type:Boolean,
            default:false,
        },
        blocked:{
            type:Boolean,
            default:false,
        }
},
{ timestamps: true } 
)
// hash password bt4 adduser signUP **************
userSchema.pre('save',function(){
    // console.log(this)
    this.password=bcrypt.hashSync(this.password,8)
})

// hash changepassword ************** 
userSchema.pre('findOneAndUpdate',function(){
// console.log(this)
    if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,8)
})


export const userModel=model('user',userSchema)