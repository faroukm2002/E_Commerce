import express from "express";
import * as order from "./order.controller.js";
import { allowedto, protectRoutes } from "../auth/auth.controller.js";

const orderRouter = express.Router();

// Webhook route to handle Stripe events
// orderRouter.post('/webhook', express.raw({ type: 'application/json' }), order.createOnlineOrder);  // Raw body parsing for Stripe webhook

// Checkout and Order routes
orderRouter.post('/checkout/:id', protectRoutes, allowedto('user'), order.createCheckOutSession);

// User order route
orderRouter.route('/').get(protectRoutes, allowedto('user'), order.getSpecificOrder);

// Admin route for all orders
orderRouter.get('/all', order.getAllOrders);

// Cash order route
orderRouter.route('/:id').post(protectRoutes, allowedto('user'), order.createCashOrder);

export default orderRouter;
