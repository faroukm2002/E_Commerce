
import { Schema,Types,model } from "mongoose"
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



export const userModel=model('user',userSchema)