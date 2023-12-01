import express  from "express"
    import  * as brand  from "./brand.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const brandRouter =express.Router()



brandRouter.route('/').
post(protectRoutes ,allowedto('admin'),brand.addbrand).
get(brand.getAllbrand)


brandRouter.route('/:id').
get(brand.getbrandByID).

put(protectRoutes ,allowedto('admin'),brand.updatebrand).
delete( protectRoutes ,allowedto('admin'),brand.deletebrand)

export default brandRouter


