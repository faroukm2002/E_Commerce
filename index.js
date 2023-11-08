import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static('uploads'))
import dotenv from "dotenv";

dotenv.config();




dbConnection();
bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
