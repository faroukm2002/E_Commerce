import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { bootstrap } from "./src/bootstrap.js";
import morgan from "morgan";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
const app = express();

const port = 3000;

app.use(express.json());
app.use(morgan("dev"));

import dotenv from "dotenv";
import { AppError } from "./src/utils/AppError.js";

dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + " - " + file.originalname);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Images only", 401), false);
  }
}

const upload = multer({ storage, fileFilter });

app.use(upload.single("img"));

dbConnection();
bootstrap(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
