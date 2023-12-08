import express  from "express"
    import  * as order  from "./order.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const orderRouter =express.Router()



orderRouter.route('/').
// post(protectRoutes ,allowedto('user'),order.createCashOrder)
get(protectRoutes ,allowedto('user'),order.getSpecificOrder)

orderRouter.get('/all',order.getAllOrders)

orderRouter.route('/:id').
post(protectRoutes ,allowedto('user'),order.createCashOrder)

// delete( protectRoutes ,allowedto('admin','user'),order.removeProductFromPrice).
// put( protectRoutes ,allowedto('user'),order.updateQuantity)

// get(order.getorderByID).

export default orderRouter


