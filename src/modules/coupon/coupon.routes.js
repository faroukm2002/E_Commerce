import express  from "express"
    import  * as coupon  from "./coupon.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const couponRouter =express.Router()



couponRouter.route('/').
post(protectRoutes ,allowedto('user'),coupon.addCoupon).
get(coupon.getAllCoupon)


couponRouter.route('/:id').
get(coupon.getCouponByID).

put(protectRoutes ,allowedto('user'),coupon.updateCoupon).
delete( protectRoutes ,allowedto('admin','user'),coupon.deleteCoupon)

export default couponRouter


