import express  from "express"
    import  * as address  from "./address.controller.js"
import { allowedto } from "../../middleware/authorization.js"
const addressRouter =express.Router()



addressRouter.route('/').
patch(allowedto('user'),address.addAddress).
delete(allowedto('user'),address.removeAddress).
get(allowedto('user'),address.getAllAddress)





export default addressRouter


