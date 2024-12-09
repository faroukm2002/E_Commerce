import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
import cors from 'cors';
import { createOnlineOrder } from "./src/modules/order/order.controller.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

// Middleware for JSON body parsing with special handling for Stripe webhooks
app.use(express.json({
  verify: (req, res, buf) => {
    if (req.originalUrl === '/webhook') {
      req.rawBody = buf.toString();
    }
  }
}));

// Set up the Stripe webhook route
app.post('/webhook',
  express.raw({ type: 'application/json' }), // Raw body required for Stripe webhook validation
  createOnlineOrder
);

// CORS Middleware
app.use(cors());

// Logger for development
if (process.env.MODE === "development") {
    app.use(morgan("dev"));
}

// Static file serving for uploaded files
app.use(express.static('uploads'));

// Database connection and other app configurations
dbConnection();

// Initialize application routes
bootstrap(app);

// Start the server
app.listen(process.env.PORT || port, () => console.log(`Server listening on port ${port}!`));
