import express  from "express"
    import  * as brand  from "./brand.controller.js"
const brandRouter =express.Router()



brandRouter.route('/').
post(brand.addbrand).
get(brand.getAllbrand)


brandRouter.route('/:id').
get(brand.getbrandByID).

put(brand.updatebrand).
delete(brand.deletebrand)

export default brandRouter


