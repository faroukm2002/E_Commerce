
import mongoose, { Schema,Types,model } from "mongoose"
const cartSchema=new Schema({
    user:{type:mongoose.Types.ObjectId,ref:'user'},
    cartItems:[
        {
            product:{type:mongoose.Types.ObjectId,ref:'product'},
            quantity:{
                type:Number,
                default:1
            },
            price:Number,
            totalPriceDiscount:Number,
        }
    ],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    discount:Number

},
{ timestamps: true } 
)


export const cartModel=model('cart',cartSchema)