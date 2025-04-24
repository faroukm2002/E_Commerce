import express from "express";
import * as subcategory from "./subcategory.controller.js";
import { validate } from "../../middleware/validate.js";
import {
  addSubCategoryValidation,
  deleteSubCategoryValidation,
  getAllSubCategoriesValidation,
  getSubCategoryValidation,
  updateSubCategoryValidation,
} from "./subcategory.validation.js";
import { allowedto, roles } from "../../middleware/authorization.js";

const subCategoryRouter = express.Router({ mergeParams: true });

subCategoryRouter
  .route("/")
  .post(
    validate(addSubCategoryValidation),
    allowedto(["admin"]), 
    subcategory.addsubCategory
  )
  .get(
    validate(getAllSubCategoriesValidation),
    subcategory.getAllsubCategory 
  );

subCategoryRouter
  .route("/:id")
  .get(
    validate(getSubCategoryValidation),
    subcategory.getsubcategoryByID 
  )
  .put(
    validate(updateSubCategoryValidation),
 allowedto([roles.Admin]), 
    subcategory.updatesubCategory
  )
  .delete(
    validate(deleteSubCategoryValidation),
    allowedto([roles.Admin]), 
    subcategory.deletesubCategory
  );

export default subCategoryRouter;
