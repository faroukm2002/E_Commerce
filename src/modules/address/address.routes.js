import express  from "express"
    import  * as address  from "./address.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const addressRouter =express.Router()



addressRouter.route('/').
patch(protectRoutes ,allowedto('user'),address.addAddress).
delete(protectRoutes ,allowedto('user'),address.removeAddress).
get(protectRoutes ,allowedto('user'),address.getAllAddress)





export default addressRouter


