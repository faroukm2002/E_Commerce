import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { userModel } from "../../../database/models/user.model.js";
import { AppError } from "../../utils/AppError.js";
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





// Webhook route to handle Stripe events
const createOnlineOrder = catchError(async (req, res, next) => {
  const sig = req.headers['stripe-signature'].toString();  // Get the signature from the header
  let event;

  try {
    // Verify the webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get cart and user details
    const cart = await cartModel.findById(session.client_reference_id);
    if (!cart) return next(new AppError('Cart not found', 404));

    const user = await userModel.findOne({ email: session.customer_email });
    if (!user) return next(new AppError('User not found', 404));

    // Create an order
    const order = new orderModel({
      user: user._id,
      cartItems: cart.cartItems,
      totalOrderPrice: session.amount_total / 100,
      shippingAddress: session.metadata.shippingAddress,
      paymentMethod: "card",
      isPaid: true,
      paidAt: Date.now(),
    });

    await order.save();

    // Adjust stock and sales
    const options = cart.cartItems.map((item) => ({
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

    // Clear the user's cart
    await cartModel.findByIdAndDelete(cart._id);

    console.log("Order created successfully:", order);
    return res.status(201).json({ message: "Order created successfully", order });
  }

  // For other event types, log the event
  console.log(`Unhandled event type: ${event.type}`);
  res.status(200).send();
});










 

  
export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSession,
  createOnlineOrder
};





 


















