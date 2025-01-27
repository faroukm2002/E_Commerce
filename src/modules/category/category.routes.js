import express  from "express"
    import  * as category  from "./category.controller.js"
import subCategoryRouter from "../subcategory/subcategory.routes.js"
import { validate } from "../../middleware/validate.js"
import { addCategoryValidation, deleteCategoryValidation, getCategoryValidation, updateCategoryValidation } from "./category.validation.js"
import { uploadSingleFile } from "../../multer/multer.js"
const categoryRouter =express.Router()

// categoryRouter.post('/', category.addCategory)
// categoryRouter.get('/', category.gatAllCategory)
// categoryRouter.put('/:id', category.updateCategory)
// categoryRouter.delete('/:id', category.deleteCategory)


// merge 
categoryRouter.use('/:categoryId/subcategories',subCategoryRouter)

categoryRouter.route('/').
post(uploadSingleFile('image','category'),validate(addCategoryValidation) ,category.addCategory).
get(category.getAllCategory)


categoryRouter.route('/:id').
get(validate(getCategoryValidation), category.getcategoryByID).

put(validate(updateCategoryValidation),category.updateCategory).
delete(validate(deleteCategoryValidation),category.deleteCategory)

export default categoryRouter


   