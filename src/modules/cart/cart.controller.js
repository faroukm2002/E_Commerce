import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { cartModel } from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";



function calcTotalPrice(cart){
  let totalPrice =0
  cart.cartItems.forEach(element => {
    totalPrice += element.price * element.quantity
  });
cart.totalPrice=totalPrice

}

const addProductToCart= catchError(async(req,res,next)=>{
  let product = await productModel.findById(req.body.product).select('price')
  if(!product){
    return next(new AppError("product not found",404))
  }
  req.body.price = product.price
  // user have cart or not
 let isCartExist =await cartModel.findOne({user:req.user._id})
 if(!isCartExist){
  let cart=new cartModel({
    user:req.user._id,
    cartItems:[req.body]
    
  })
  calcTotalPrice(cart)

  await cart.save()

  return res.status(201).json({message:"success",cart})

 } 
//  cart have cartitem or not
 let item =isCartExist.cartItems.find(elm=>elm.product == req.body.product)
 if (item) {
  item.quantity += req.body.quantity || 1;
} else {
  isCartExist.cartItems.push(req.body);
}

calcTotalPrice(isCartExist)

if (isCartExist.discount) isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100;



 await isCartExist.save()
 res.status(201).json({message:"add to cart",cart:isCartExist})

})



const removeProductFromPrice = catchError(async (req, res, next) => {

  let results = await cartModel.findOneAndUpdate(
    {user: req.user._id},

    {
      $pull: { cartItems: {_id: req.params.id}},
    },
    { new: true }
  );
  !results && next(new AppError("item not found", 404));
  calcTotalPrice(results);
  if (results.discount) results.totalPriceAfterDiscount = results.totalPrice - (results.totalPrice * results.discount) / 100;

  results && res.json({ message: "Done", cart: results });
});





const updateQuantity= catchError(async(req,res,next)=>{
  let product = await productModel.findById(req.params.id)
  if(!product)    return next(new AppError("product not found",404))

 let isCartExist =await cartModel.findOne({user:req.user._id})
 let item =isCartExist.cartItems.find(elm=>elm.product == req.params.id)
 if (item) {
  item.quantity = req.body.quantity;
}

calcTotalPrice(isCartExist)
if (isCartExist.discount) isCartExist.totalPriceAfterDiscount = isCartExist.totalPrice - (isCartExist.totalPrice * isCartExist.discount) / 100;


 await isCartExist.save()
 res.status(201).json({message:"Done",cart:isCartExist})

})

const getCart = catchError(async (req, res, next) => {
  let cart = await cartModel.findOne({ user: req.user._id }).populate('cartItems.product')
  
  res.json({message:"Done",cart})
})




const applyCoupon = catchError(async (req, res, next) => {
  let code = await couponModel.findOne({ code: req.body.code,expires:{$gt:Date.now()} });
 console.log(code)
  let cart = await cartModel.findOne({ user: req.user._id });
  cart.totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * code.discount) / 100;
  cart.discount = code.discount;
  await cart.save();
  res.status(201).json({ message: 'Done ', cart });
});
  





export { 
  addProductToCart,  
  removeProductFromPrice,
  applyCoupon,
  getCart,
  updateQuantity
 }
