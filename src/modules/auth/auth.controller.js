import { userModel } from "../../../database/models/user.model.js";
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
    process.env.TOKEN_SIGNATURE
  );

  // Created
  res.status(201).json({ message: "success", token });
});


// 1- check we have token or not 
// 2- verfy token
// 3 if user of this token exist or not 
// 4- check if this token is the last one or not (change password )

const protectRoutes=catchError(async(req,res,next)=>{
  let { token } = req.headers;
  if (!token) return next(new AppError("please provide token", 401))
  
  let decoded = await jwt.verify(token, process.env.TOKEN_SIGNATURE);
console.log(decoded)

let user = await userModel.findById(decoded.id)
if (!user) return next(new AppError("invalid user", 404));

if (user.changePasswordAt) {
    let changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
      console.log(changePasswordTime,"==========",decoded.iat)

    if (changePasswordTime > decoded.iat) return next(new AppError("  token invalid", 401));

}


req.user = user;
next()
})


const allowedto = (...roles) => {
  // ['admin','user'] b4of mokod wla laa
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You are not authorized to access this route. Your role is " + req.user.role, 401));
    }

    // User has the required role, continue to the next middleware or route handler
    next();
  });
};
export {
   signUp,
    signIn,
   protectRoutes,
   allowedto
   };
 