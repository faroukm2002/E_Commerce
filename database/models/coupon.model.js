
import { Schema,Types,model } from "mongoose"
const couponSchema=new Schema({
    code:{
        type:String,
        required:true,
        trim:true,
    },
 
expires:{
    type:Date,
    required:true,

},
discount:{
    type:Number,
    requiredL:true,
    min:0
}


},
{ timestamps: true } 
) 


export const couponModel=model('coupon',couponSchema)