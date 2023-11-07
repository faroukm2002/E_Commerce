import express  from "express"
    import  * as subcategory  from "./subcategory.controller.js"
const subCategoryRouter =express.Router({mergeParams:true})




subCategoryRouter.route('/').
post(subcategory.addsubCategory).
get(subcategory.getAllsubCategory)


subCategoryRouter.route('/:id').
get(subcategory.getsubcategoryByID).

put(subcategory.updatesubCategory).
delete(subcategory.deletesubCategory)

export default subCategoryRouter


