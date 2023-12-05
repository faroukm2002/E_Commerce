import express  from "express"
    import  * as wishlist  from "./wishlist.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const wishlistRouter =express.Router()



wishlistRouter.route('/').
patch(protectRoutes ,allowedto('user'),wishlist.addToWishList).
delete(protectRoutes ,allowedto('user'),wishlist.removeWishList).
get(protectRoutes ,allowedto('user'),wishlist.getAllWishList)





export default wishlistRouter


