import express  from "express"
    import  * as product  from "./product.controller.js"
const productRouter =express.Router()




productRouter.route('/').
post(product.addproduct).
get(product.getAllproduct)


productRouter.route('/:id').
get(product.getproductByID).

put(product.updateproduct).
delete(product.deleteproduct)

export default productRouter


