import express  from "express"
    import  * as review  from "./review.controller.js"
import { allowedto } from "../../middleware/authorization.js"
const reviewRouter =express.Router()



reviewRouter.route('/').
post(allowedto('user'),review.addReview).
get(review.getAllReview)


reviewRouter.route('/:id').
get(review.getReviewByID).

put(allowedto('user'),review.updateReview).
delete( allowedto('admin','user'),review.deleteReview)

export default reviewRouter


