
import { Schema,Types,model } from "mongoose"
const couponSchema=new Schema({
    code:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
 
expires:{
    type:String,
    required:true,

},
discount: {
    type: Number,
    min: 0,
    required: [true, 'coupon discount required'],

},


},
{ timestamps: true } 
) 


export const couponModel=model('coupon',couponSchema)