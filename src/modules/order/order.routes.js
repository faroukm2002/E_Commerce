import express  from "express"
    import  * as order  from "./order.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const orderRouter =express.Router()

// createCheckOutSession
orderRouter.post('/checkout/:id',protectRoutes ,allowedto('user'),order.createCheckOutSession)

// user
orderRouter.route('/').
get(protectRoutes ,allowedto('user'),order.getSpecificOrder)

// admin 
orderRouter.get('/all',order.getAllOrders)

// createCashOrder
orderRouter.route('/:id').
post(protectRoutes ,allowedto('user'),order.createCashOrder)


orderRouter.post('/webhook', express.raw({ type: 'application/json' }), order.createOnlineOrder);









export default orderRouter


