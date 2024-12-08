import express  from "express"
    import  * as cart  from "./cart.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const cartRouter =express.Router()



cartRouter.route('/').
post(protectRoutes ,allowedto('user'),cart.addProductToCart).
get(protectRoutes ,allowedto('user'),cart.getLoggedUserCart)

cartRouter.put("/:apllycoupon",protectRoutes,allowedto('user'),cart.applyCoupon)


cartRouter.route('/:id').

delete( protectRoutes ,allowedto('user'),cart.removeProductFromCart)
.put(protectRoutes, allowedto('user'), cart.updateQuantity)

// get(cart.getcartByID).

export default cartRouter


