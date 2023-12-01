import express  from "express"
    import  * as review  from "./review.controller.js"
import { allowedto, protectRoutes } from "../auth/auth.controller.js"
const reviewRouter =express.Router()



reviewRouter.route('/').
post(protectRoutes ,allowedto('user'),review.addReview).
get(review.getAllReview)


reviewRouter.route('/:id').
get(review.getReviewByID).

put(protectRoutes ,allowedto('user'),review.updateReview).
delete( protectRoutes ,allowedto('admin','user'),review.deleteReview)

export default reviewRouter


