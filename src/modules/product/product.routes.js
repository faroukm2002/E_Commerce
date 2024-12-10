import express  from "express"
    import  * as product  from "./product.controller.js"
import { uploadMixFiles } from "../../multer/multer.js"
import { allowedto } from "../../middleware/authorization.js"
const productRouter =express.Router()



productRouter.route('/').

post( allowedto('admin','user'), uploadMixFiles([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ],'product') ,product.addproduct).
get(product.getAllproduct)


productRouter.route('/:id').
get(product.getproductByID).

put(allowedto('admin','user'),product.updateproduct).
delete(allowedto('admin'),product.deleteproduct)

export default productRouter


 