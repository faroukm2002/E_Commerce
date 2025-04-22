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
import { allowedto } from "../../middleware/authorization.js";

const brandRouter = express.Router();

brandRouter
  .route("/")
  .post(
    uploadSingleFile("brand", "logo"),
    allowedto("admin"),
    validate(addBrandValidation),
    brand.addbrand
  )
  .get(
    validate(getAllBrandsValidation), // Added validation for GET all brands
    brand.getAllbrand
  );

brandRouter
  .route("/:id")
  .get(validate(getBrandValidation), brand.getbrandByID)
  .put(
    uploadSingleFile("brand", "logo"), // Added file upload for PUT requests
    allowedto("admin"),
    validate(updateBrandValidation),
    brand.updatebrand
  )
  .delete(
    allowedto("admin"),
    validate(deleteBrandValidation),
    brand.deletebrand
  );

export default brandRouter;
