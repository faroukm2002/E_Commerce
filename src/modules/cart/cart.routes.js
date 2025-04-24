import express  from "express"
    import  * as cart  from "./cart.controller.js"
import { allowedto, roles } from "../../middleware/authorization.js"
const cartRouter =express.Router()



cartRouter.route('/').
post(allowedto([roles.User]),cart.addProductToCart).
get(allowedto([roles.User]),cart.getLoggedUserCart)

cartRouter.put("/:apllycoupon",allowedto([roles.User]),cart.applyCoupon)


cartRouter.route('/:id').

delete( allowedto([roles.User]),cart.removeProductFromCart)
.patch( allowedto([roles.User]), cart.updateQuantity)

// get(cart.getcartByID).

export default cartRouter


