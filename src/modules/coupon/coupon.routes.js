import express  from "express"
    import  * as coupon  from "./coupon.controller.js"
import { allowedto } from "../../middleware/authorization.js"
const couponRouter =express.Router()



couponRouter.route('/').
post(allowedto('user'),coupon.addCoupon).
get(coupon.getAllCoupon)


couponRouter.route('/:id').
get(coupon.getCouponByID).

put(allowedto('user'),coupon.updateCoupon).
delete( allowedto('admin','user'),coupon.deleteCoupon)

export default couponRouter


