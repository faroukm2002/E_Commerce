import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
import cors from "cors";
import { createOnlineOrder } from "./src/modules/order/order.controller.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

// Set up the Stripe webhook route with raw body parsing
app.post(
  "/webhook",
  express.json({
    verify: (req, res, buf) => {
      if (req.originalUrl === "/webhook") {
        req.rawBody = buf.toString();
      }
    },
  }),
  createOnlineOrder
);

// Middleware for JSON body parsing for other routes
app.use(express.json());

// CORS Middleware
app.use(cors());

// Logger for development
if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}

// Static file serving for uploaded files
app.use(express.static("uploads"));

// Database connection and other app configurations
dbConnection();

// Bootstraping your app routes
bootstrap(app);

// Start the server
app.listen(process.env.PORT || port, () =>
  console.log(`Server listening on port ${port}!`)
);
