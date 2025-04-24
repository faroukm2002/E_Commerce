import express from "express";
import * as user from "./user.controller.js";
import { allowedto, roles } from "../../middleware/authorization.js";
import { validate } from "../../middleware/validate.js";
import {
  addUserValidation,
  getAllUsersValidation,
  getUserValidation,
  updateUserValidation,
  deleteUserValidation,
  changeUserPasswordValidation,
} from "./user.validation.js";

const userRouter = express.Router();

userRouter
  .route("/")
  .post(
    validate(addUserValidation),
    allowedto([roles.Admin]), 
    user.addUser
  )
  .get(
    validate(getAllUsersValidation),
    allowedto([roles.Admin]), 
    user.getAllUser
  );

userRouter
  .route("/:id")
  .get(validate(getUserValidation), allowedto([roles.Admin]), user.getUserByID)
  .put(
    validate(updateUserValidation),
    allowedto([roles.Admin]),
    user.updateUser
  )
  .delete(
    validate(deleteUserValidation),
    allowedto([roles.Admin]),
    user.deleteUser
  )
  .patch(
    allowedto([roles.Admin,roles.User]),
    validate(changeUserPasswordValidation),
    user.changeUserPassword
  );

export default userRouter;
