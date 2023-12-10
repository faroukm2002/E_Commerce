import express  from "express"
    import  * as order  from "./order.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const orderRouter =express.Router()


orderRouter.post('/checkout/:id',protectRoutes ,allowedto('user'),order.createCheckOutSession)

orderRouter.route('/').
get(protectRoutes ,allowedto('user'),order.getSpecificOrder)

orderRouter.get('/all',order.getAllOrders)

orderRouter.route('/:id').
post(protectRoutes ,allowedto('user'),order.createCashOrder)





orderRouter.post('/webhook', express.raw({type: 'application/json'}), order.WebHook )







export default orderRouter


