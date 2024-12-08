import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
// import { createOnlineOrder } from "./src/modules/order/order.controller.js";
import dotenv from "dotenv";
import cors from 'cors'
import { createOnlineOrder } from "./src/modules/order/order.controller.js";

dotenv.config();
const app = express();
const port = 3000;
app.post('/webhook', express.raw({type: 'application/json'}),createOnlineOrder), 
app.use(express.json());




app.use(cors());
if(process.env.MODE =="devlopment"){
    app.use(morgan("dev"));

}

// 
app.use(express.static('uploads'))
app.use(cors());






dbConnection();
bootstrap(app);

app.listen( process.env.PORT ||port, () => console.log(`Example app listening on port ${port}!`));
