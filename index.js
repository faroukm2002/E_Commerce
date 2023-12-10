import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
import { createOnlineOrder } from "./src/modules/order/order.controller.js";

const app = express();
import cors from 'cors'

const port = 3000;
app.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder), 
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(express.static('uploads'))
app.use(cors());

import dotenv from "dotenv";

dotenv.config();




dbConnection();
bootstrap(app);

app.listen( process.env.PORT ||port, () => console.log(`Example app listening on port ${port}!`));
