import express from "express";
import * as order from "./order.controller.js";
import { allowedto } from "../../middleware/authorization.js";

const orderRouter = express.Router();

// Webhook route to handle Stripe events
// orderRouter.post('/webhook', express.raw({ type: 'application/json' }), order.createOnlineOrder);  // Raw body parsing for Stripe webhook

// Checkout and Order routes
orderRouter.post('/checkout/:id',  allowedto('user'), order.createCheckOutSession);

// User order route
orderRouter.route('/').get( allowedto('user'), order.getSpecificOrder);

// Admin route for all orders
orderRouter.get('/all', order.getAllOrders);

// Cash order route
orderRouter.route('/:id').post( allowedto('user'), order.createCashOrder);

export default orderRouter;
