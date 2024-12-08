import express  from "express"
    import  * as brand  from "./brand.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
import { validate } from "../../middleware/validate.js"
import { addBrandValidation, deleteBrandValidation, getBrandValidation, updateBrandValidation } from "./brand.validation.js"
import { uploadSingleFile } from "../../multer/multer.js"
const brandRouter =express.Router()



brandRouter.route('/').
post(uploadSingleFile('brand','logo'), protectRoutes ,allowedto('admin'),validate(addBrandValidation ),brand.addbrand).
get(brand.getAllbrand)


brandRouter.route('/:id').
get( validate(getBrandValidation),brand.getbrandByID).

put(protectRoutes ,allowedto('admin'), validate(updateBrandValidation),brand.updatebrand).
delete( protectRoutes ,allowedto('admin'), validate(deleteBrandValidation),brand.deletebrand)

export default brandRouter


