import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { userModel } from "../../../database/models/user.model.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const createCashOrder = catchError(async (req, res, next) => {
  // 1- get cart (cartId)

  let cart = await cartModel.findById(req.params.id);

  // 2- calc  totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  // 3-createOrder
  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totalOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();

  // 4-increment sold $ quantity 
  // using bulkWrite

  if (order) {
    let options = cart.cartItems.map((item) => ({
      updateOne: {
        filter: { _id: item.product },
        update: {
          $inc: {
            quantity: -item.quantity,
            sold: item.quantity,
          },
        }, 
      },
    }));
    await productModel.bulkWrite(options);

    // 5- clear user cart
    await cartModel.findByIdAndDelete(req.params.id);
    return res.status(201).json({ message: "Order created successfully. Your cart has been cleared", order });
  } else {
    return next(new AppError("error in cart id ", 404));
  }
});


 




// user 
const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.status(201).json({ message: "Done", order });
});










// admin 
const getAllOrders = catchError(async (req, res, next) => {
  let order = await orderModel.find({}).populate("cartItems.product");
  res.status(201).json({ message: "Done", order });
});







// return from bank 
const createCheckOutSession = catchError(async (req, res, next) => {
  // 1- get cart (cartId)

  let cart = await cartModel.findById(req.params.id);

  // 2- calc  totalPrice
  let totalOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;


    let session = await stripe.checkout.sessions.create({
      line_items: [
          {
            price_data:{
              currency: "egp",
              product_data: {
                name:req.user.name,
              },
              unit_amount: totalOrderPrice * 100,  
             
            },
            quantity: 1,
          }
        ],
        mode: "payment",
      success_url:process.env.SUCCESS_URL ,
      cancel_url: process.env.CANCEL_URL,
      customer_email: req.user.email,
           
      // cartId
      client_reference_id: req.params.id,
      metadata: req.body.shippingAddress
    });



  
    res.status(201).json({ message: "Done", session });
});











// const createOnlineOrder = catchError( (req, res, next) => {
//   const sig = req.headers['stripe-signature'].toString();

//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, "whsec_d0ysUkueXWxKw0kMBDUawTNPb9D0P24V");
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }
  


//   // Handle the event

//   if (event.type === 'checkout.session.completed') {
//     orderOnline(event.data.object);
//     console.log("Create order here...");
//   } else {
//     console.log(`Unhandled event type ${event.type}`);
//   }
  


// });














const WebHook=catchError((req, res) => {

  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body.toString(), sig, "whsec_RazXixzZVRYcK5SUpUShyxShdbon5IoI");
    console.log("Signing Secret:", process.env.SIGNING_SECRETE);

  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    orderOnline(event.data.object, res); // Call your order creation logic
    console.log("Order created successfully!");
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).send('Webhook received');
});







  
export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSession,
  // createOnlineOrder,
  WebHook
};



 async function orderOnline (e,res){
   // 1- get cart (cartId)

   let cart = await cartModel.findById(e.client_reference_id);
if (!cart) return next(new AppError('Cart not found',404))
 let user =await userModel.findOne({email: e.customer_email})

  let order = new orderModel({
     user:user._id,
     cartItems: cart.cartItems,
     totalOrderPrice:e.amount_total /100,
     shippingAddress: e.metadata.shippingAddress,
     paymentMethod:"card",
     isPaid:true,
     paidAt:Date.now()

   });
 
   await order.save();
 
   // 4-increment sold $ quantity 
   // using bulkWrite
 
   if (order) {
     let options = cart.cartItems.map((item) => ({
       updateOne: {
         filter: { _id: item.product },
         update: {
           $inc: {
             quantity: -item.quantity,
             sold: item.quantity,
           },
         }, 
       },
     }));
     await productModel.bulkWrite(options);
 
     // 5- clear user cart
     await cartModel.findOneAndDelete({user: user._id});
     return res.status(201).json({ message: "Order created successfully. Your cart has been cleared", order });
   } else {
     return next(new AppError("error in cart id ", 404));
   }
}





















