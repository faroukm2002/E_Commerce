import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../utils/catchError.js";





const createCashOrder= catchError(async(req,res,next)=>{
// 1- get cart (cartId)

let cart=await cartModel.findById(req.params.id);

// 2- calc  totalPrice
let totaOrderPrice=cart.totalPriceAfterDiscount?
cart.totalPriceAfterDiscount : cart.totalPrice;
// 3-createOrder 
let order=new  orderModel({
  user: req.user._id,
  cartItems:cart.cartItems,
  totaOrderPrice,
  shippingAddress:req.body.shippingAddress,
})

await order.save();
// 4-increment sold $ quantity

if(order){
let options=cart.cartItems.map(item=>({
  updateOne: {
    filter: {_id: item.product}, 
    update: {$inc: {
      quantity: -item.quantity,
      sold: item.quantity,
    }}
  },
  
}))
await productModel.bulkWrite(options)

// 5- clear user cart
await cartModel.findByIdAndDelete(req.params.id)
return res.status(201).json({message:"Done",order})

}
else {
  return next(new AppError('error in cart id',404))
}


})









export { 
  createCashOrder,  

 }
