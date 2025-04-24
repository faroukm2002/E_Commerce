import express from "express";
import * as brand from "./brand.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addBrandValidation,
  deleteBrandValidation,
  getBrandValidation,
  updateBrandValidation,
  getAllBrandsValidation,
} from "./brand.validation.js";
import { uploadSingleFile } from "../../multer/multer.js";
import { allowedto, roles } from "../../middleware/authorization.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    uploadSingleFile("brand", "logo"),
    validate(addBrandValidation),
    allowedto(["admin"]), 
    brand.addbrand
  )
  .get(
    validate(getAllBrandsValidation),
    brand.getAllbrand 
  );

brandRouter
  .route("/:id")
  .get(validate(getBrandValidation), brand.getbrandByID)
  .put(
    uploadSingleFile("brand", "logo"),
    validate(updateBrandValidation),
    allowedto([roles.Admin]), 
    brand.updatebrand
  )
  .delete(
    validate(deleteBrandValidation),
    allowedto([roles.Admin]),
    brand.deletebrand
  );

export default brandRouter;
