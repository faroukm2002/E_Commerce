
import { Schema,Types,model } from "mongoose"
const couponSchema=new Schema({
    code:{
        type:String,
        required:true,
        trim:true,
        uninque:true
    },
 
expires:{
    type:String,
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