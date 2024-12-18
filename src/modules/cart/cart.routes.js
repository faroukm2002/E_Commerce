import express  from "express"
    import  * as cart  from "./cart.controller.js"
import { allowedto } from "../../middleware/authorization.js"
const cartRouter =express.Router()



cartRouter.route('/').
post(allowedto('user'),cart.addProductToCart).
get(allowedto('user'),cart.getLoggedUserCart)

cartRouter.put("/:apllycoupon",allowedto('user'),cart.applyCoupon)


cartRouter.route('/:id').

delete( allowedto('user'),cart.removeProductFromCart)
.patch( allowedto('user'), cart.updateQuantity)

// get(cart.getcartByID).

export default cartRouter


