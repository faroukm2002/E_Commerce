import express  from "express"
    import  * as product  from "./product.controller.js"
import { uploadMixFiles } from "../../multer/multer.js"
const productRouter =express.Router()



productRouter.route('/').

post(uploadMixFiles([
    { name: 'imgCover', maxCount: 1 },
    { name: 'images', maxCount: 20 }
  ],'product') ,product.addproduct).
get(product.getAllproduct)


productRouter.route('/:id').
get(product.getproductByID).

put(product.updateproduct).
delete(product.deleteproduct)

export default productRouter


