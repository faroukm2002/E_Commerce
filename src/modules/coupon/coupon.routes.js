import express from "express";
import * as coupon from "./coupon.controller.js";
import { allowedto, roles } from "../../middleware/authorization.js"; // 👈 تأكد من استيراد الميدل وير الخاص بالصلاحيات
const couponRouter = express.Router();

couponRouter
  .route("/")
  .post(
    allowedto([roles.Admin]), 
    coupon.addCoupon
  )
  .get(coupon.getAllCoupon); 
couponRouter
  .route("/:id")
  .get(coupon.getCouponByID) 
  .put(
    allowedto([roles.Admin]), 
    coupon.updateCoupon
  )
  .delete(
    allowedto([roles.Admin]), 
    coupon.deleteCoupon
  );

export default couponRouter;
