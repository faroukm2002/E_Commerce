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
        changePasswordAt:Date,
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
        },
        wishList:{
            type:Schema.ObjectId,
            ref:"product",
        },
        addresses:{
            city:String,
            Steet:String,
            phone:String,
        },
},
{ timestamps: true } 
)
// hash password bt4 adduser signUP **************
userSchema.pre('save',function(){
    // console.log(this)
    this.password=bcrypt.hashSync(this.password,process.env.SALT_ROUND)
})

// hash changepassword ************** 
userSchema.pre('findOneAndUpdate',function(){
// console.log(this)
    if(this._update.password)this._update.password=bcrypt.hashSync(this._update.password,process.env.SALT_ROUND)
})


export const userModel=model('user',userSchema)