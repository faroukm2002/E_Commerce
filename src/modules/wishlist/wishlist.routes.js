import express  from "express"
    import  * as wishlist  from "./wishlist.controller.js"
import { allowedto } from "../../middleware/authorization.js"
const wishlistRouter =express.Router()



wishlistRouter.route('/').
patch(allowedto('user'),wishlist.addToWishList).
delete(allowedto('user'),wishlist.removeWishList).
get(allowedto('user'),wishlist.getAllWishList)





export default wishlistRouter


