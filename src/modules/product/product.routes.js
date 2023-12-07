import express  from "express"
    import  * as product  from "./product.controller.js"
import { uploadMixFiles } from "../../multer/multer.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const productRouter =express.Router()



productRouter.route('/').

post( protectRoutes ,allowedto('admin','user'), uploadMixFiles([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ],'product') ,product.addproduct).
get(product.getAllproduct)


productRouter.route('/:id').
get(product.getproductByID).

put(protectRoutes ,allowedto('admin','user'),product.updateproduct).
delete(protectRoutes ,allowedto('admin'),product.deleteproduct)

export default productRouter


