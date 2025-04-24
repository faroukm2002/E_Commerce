import express  from "express"
    import  * as wishlist  from "./wishlist.controller.js"
import { allowedto, roles } from "../../middleware/authorization.js"
const wishlistRouter =express.Router()



wishlistRouter.route('/').
patch(allowedto([roles.Admin]),wishlist.addToWishList).
delete(allowedto([roles.Admin]),wishlist.removeWishList).
get(allowedto([roles.Admin]),wishlist.getAllWishList)

export default wishlistRouter


