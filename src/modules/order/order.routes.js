import express from "express";
import * as order from "./order.controller.js";
import { allowedto, roles } from "../../middleware/authorization.js"; // Import the auth middleware

const orderRouter = express.Router();

// Webhook route to handle Stripe events
orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  order.createOnlineOrder // No auth needed here because it's for Stripe events
);

// Checkout and Order routes
orderRouter.post(
  "/checkout/:id",
  allowedto([roles.Admin]), 
  order.createCheckOutSession
);

// Get specific order
orderRouter.route("/").get(
  allowedto([roles.Admin,roles.User]), 
  order.getSpecificOrder
);

// Get all orders - only admin
orderRouter.get("/all", allowedto([roles.Admin]), order.getAllOrders);

// Cash order route - can be accessed by users
orderRouter.route("/:id").post(
  allowedto([roles.Admin]), 
  order.createCashOrder
);

export default orderRouter;
