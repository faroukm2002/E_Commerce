
import mongoose, { Schema,Types,model } from "mongoose"
const orderSchema=new Schema({
    user:{type:mongoose.Types.ObjectId,ref:'user'},
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId,ref:'product'},
            quantity:Number,
            price:Number,
        }
    ],
    totaOrderPrice:Number,
    shippingAddress:{
        stree:String,
        city:String,
        phone:String
    }   ,
    paymentMethod:{
        type:String,
       enum:['card','cash'],
       default:'cash'
    },
    isPaid:{
        type:Boolean,
        default:false
    },
    paidAt:Date,

   isDelivered:{
        type:Boolean,
        default:false
    },
    deliveredAt:Date,
},
{ timestamps: true } 
)


export const orderModel=model('order',orderSchema)