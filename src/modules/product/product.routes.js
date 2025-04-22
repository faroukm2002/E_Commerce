import express from "express";
import * as product from "./product.controller.js";
import { uploadMixFiles } from "../../multer/multer.js";
import { allowedto } from "../../middleware/authorization.js";
import { validate } from "../../middleware/validate.js";
import {
  addProductValidation,
  getAllProductsValidation,
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
} from "./product.validation.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    allowedto("user"),
    uploadMixFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "product"
    ),
    validate(addProductValidation),
    product.addproduct
  )
  .get(validate(getAllProductsValidation), product.getAllproduct);

productRouter
  .route("/:id")
  .get(validate(getProductValidation), product.getproductByID)
  .put(
    allowedto("admin", "user"),
    uploadMixFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "product"
    ),
    validate(updateProductValidation),
    product.updateproduct
  )
  .delete(
    allowedto("admin"),
    validate(deleteProductValidation),
    product.deleteproduct
  );

export default productRouter;
