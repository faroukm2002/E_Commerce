import express from "express";
import * as review from "./review.controller.js";
import { allowedto, roles } from "../../middleware/authorization.js";
const reviewRouter = express.Router();

reviewRouter
  .route("/")
  .post(allowedto([roles.Admin]), review.addReview)
  .get(review.getAllReview);
reviewRouter
  .route("/:id")
  .get(review.getReviewByID)
  .put(allowedto([roles.Admin, roles.User]),
    review.updateReview)
  .delete(allowedto([roles.Admin, roles.User]),
    review.deleteReview);

export default reviewRouter;
