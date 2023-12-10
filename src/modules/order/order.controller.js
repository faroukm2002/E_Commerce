import { cartModel } from "../../../database/models/cart.model.js";
import { orderModel } from "../../../database/models/order.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { catchError } from "../../utils/catchError.js";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51Nwr4pCoU9tsVsX0WoMZTryoJw6clsSX9dhD9y4DRPbYhujA3mHFsW8P8OUf6tt0sEi9NxEcOzKDAXGpq3L3jMi800NGi60cgN");
const createCashOrder = catchError(async (req, res, next) => {
  // 1- get cart (cartId)

  let cart = await cartModel.findById(req.params.id);

  // 2- calc  totalPrice
  let totaOrderPrice = cart.totalPriceAfterDiscount
    ? cart.totalPriceAfterDiscount
    : cart.totalPrice;
  // 3-createOrder
  let order = new orderModel({
    user: req.user._id,
    cartItems: cart.cartItems,
    totaOrderPrice,
    shippingAddress: req.body.shippingAddress,
  });

  await order.save();
  // 4-increment sold $ quantity

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
    return res.status(201).json({ message: "Done", order });
  } else {
    return next(new AppError("error in cart id", 404));
  }
});








const getSpecificOrder = catchError(async (req, res, next) => {
  let order = await orderModel
    .findOne({ user: req.user._id })
    .populate("cartItems.product");
  res.status(201).json({ message: "Done", order });
});











const getAllOrders = catchError(async (req, res, next) => {
  let order = await orderModel.find({}).populate("cartItems.product");
  res.status(201).json({ message: "Done", order });
});








const createCheckOutSession = catchError(async (req, res, next) => {
  // 1- get cart (cartId)

  let cart = await cartModel.findById(req.params.id);

  // 2- calc  totalPrice
  let totaOrderPrice = cart.totalPriceAfterDiscount
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
              unit_amount: totaOrderPrice * 100,  
             
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
//   const sig = request.headers['stripe-signature'].toString();

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, "whsec_RiFdJMSOw3ULGpyPOucbMzn1ulVDUXv3");
//   } catch (err) {
//     return  response.status(400).send(`Webhook Error: ${err.message}`);
//   }


//   // Handle the event

//   if(event.type === 'checkout.session.completed'){
//     const checkoutSessionCompleted = event.data.object;
//     console.log("create order here.......")
//   }
//   else{
//     console.log(`Unhandled event type ${event.type}`);

//   }


// });







const WebHook=catchError(async(req, res) => {

  const sig = request.headers['stripe-signature'].toString();

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.ENDPOINTSECRET);
  } catch (err) {
    return response.status(400).send(`Webhook Error: ${err.message}`);
  }
if(event.type=="checkout.session.completed") {
  const checkoutSessionCompleted = event.data.object;
  console.log("create order here.......")
}
else{
  // Handle the event
  console.log(`Unhandled event type ${event.type}`);
}
});







  
export {
  createCashOrder,
  getSpecificOrder,
  getAllOrders,
  createCheckOutSession,
  // createOnlineOrder
  WebHook
};
