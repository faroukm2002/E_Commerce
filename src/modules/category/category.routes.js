import express  from "express"
    import  * as category  from "./category.controller.js"
import subCategoryRouter from "../subcategory/subcategory.routes.js"
import { validate } from "../../middleware/validate.js"
import { addCategoryValidation, deleteCategoryValidation, getAllCategoryValidation, getCategoryValidation, updateCategoryValidation } from "./category.validation.js"
import { uploadSingleFile } from "../../multer/multer.js"
import { allowedto, roles } from "../../middleware/authorization.js"
const categoryRouter =express.Router()

// categoryRouter.post('/', category.addCategory)
// categoryRouter.get('/', category.gatAllCategory)
// categoryRouter.put('/:id', category.updateCategory)
// categoryRouter.delete('/:id', category.deleteCategory)


// merge subcategories route
categoryRouter.use('/:categoryId/subcategories', subCategoryRouter);

// Protected Routes
categoryRouter
  .route("/")
  .post(
    uploadSingleFile("image", "category"),
    validate(addCategoryValidation),
    allowedto([roles.Admin]),  
    category.addCategory
  )
  .get(
    validate(getAllCategoryValidation),
    category.getAllCategory 
  );

categoryRouter
  .route("/:id")
  .get(validate(getCategoryValidation), category.getcategoryByID)
  .put(
    validate(updateCategoryValidation),
    allowedto([roles.Admin]),
    category.updateCategory
  )
  .delete(
    validate(deleteCategoryValidation),
    allowedto([roles.Admin]),
    category.deleteCategory
  );

export default categoryRouter;


   