import express from "express";
import * as product from "./product.controller.js";
import { uploadMixFiles } from "../../multer/multer.js";
import { validate } from "../../middleware/validate.js";
import {
  addProductValidation,
  getAllProductsValidation,
  getProductValidation,
  updateProductValidation,
  deleteProductValidation,
} from "./product.validation.js";
import { allowedto, roles } from "../../middleware/authorization.js";

const productRouter = express.Router();

productRouter
  .route("/")
  .post(
    uploadMixFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "product"
    ),
    validate(addProductValidation),
    allowedto([roles.Admin]),
    product.addproduct
  )
  .get(
    validate(getAllProductsValidation),
    product.getAllproduct 
  );

productRouter
  .route("/:id")
  .get(validate(getProductValidation), product.getproductByID)
  .put(
    uploadMixFiles(
      [
        { name: "imgCover", maxCount: 1 },
        { name: "images", maxCount: 20 },
      ],
      "product"
    ),
    validate(updateProductValidation),
    allowedto([roles.Admin]),
    product.updateproduct
  )
  .delete(
    validate(deleteProductValidation),
    allowedto([roles.Admin]),
    product.deleteproduct
  );

export default productRouter;
