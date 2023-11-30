import { userModel } from "../../../database/models/User.model.js";
import { catchError } from "../../utils/catchError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Correct import

const signUp = catchError(async (req, res, next) => {
  let isUser = await userModel.findOne({ email: req.body.email });
  if (isUser) next(new AppError("Account already exists", 409));
  const user = new userModel(req.body);
  await user.save();

  // Created
  res.status(201).json({ message: "success", user });
});

const signIn = catchError(async (req, res, next) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password))
    return next(new AppError("Account already exists", 409));

  let token = jwt.sign(
    { name: user.name, email: user.email, id: user._id, role: user.role },
    "farouk"
  );

  // Created
  res.status(201).json({ message: "success", token });
});

export { signUp, signIn };
