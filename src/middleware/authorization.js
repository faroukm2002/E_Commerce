import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../utils/catchError.js";
import verifyToken from "../utils/verifyToken.js";


export const roles = {
    Admin: "admin",
    User: "user"

}
const allowedto = (roles = []) => {
  return catchError(async (req, res, next) => {
    // 1. Check for Authorization header
    const { authorization } = req.headers;

    if (!authorization) {
      return next(new AppError("Authorization header is missing", 401));
    }

    // 2. Check Bearer token format
    if (!authorization.startsWith(`${process.env.BEARER_KEY} `)) {
      return next(new AppError("Invalid authorization format", 401));
    }

    // 3. Extract token
    const token = authorization.split(" ")[1];
    if (!token) {
      return next(new AppError("Token is missing", 401));
    }

    // 4. Verify token
    const decoded = verifyToken(token, process.env.TOKEN_SIGNATURE);
    if (!decoded?.id) {
      return next(new AppError("Invalid token payload", 401));
    }

    // 5. Check if user exists
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // 6. Check if token was issued before password change
    if (user.changePasswordAt) {
      const passwordChangedAt = Math.floor(
        user.changePasswordAt.getTime() / 1000
      );
      if (passwordChangedAt > decoded.iat) {
        return next(new AppError("Token invalidated by password change", 401));
      }
    }

    // 7. Check authorization
    if (!roles.includes(user.role)) {
      return next(
        new AppError("You are not authorized to access this route", 403)
      );
    }

    // 8. Attach user to request
    req.user = user;
    next();
  });
};

export { allowedto };

// import { userModel } from "../../database/models/user.model.js";
// import { AppError } from "../utils/AppError.js";
// import { catchError } from "../utils/catchError.js";
// import verifyToken from "../utils/verifyToken.js";

// // 1- check we have token or not
// // 2- verfy token
// // 3 if user of this token exist or not
// // 4- check if this token is the last one or not (change password )

// export const roles = {
//     Admin: "admin",
//     User: "user"

// }
// const allowedto = (roles=[]) => {
//     return catchError(async (req, res, next) => {
//         const { authorization } = req.headers;
//         // 1- Check if authorization header is present and starts with Bearer key
//         if (!authorization?.startsWith(process.env.BEARER_KEY)) {
//             return next(new AppError("Invalid Bearer Key", 400));
//         }

//         // 1- check we have token or not
//         const token = authorization.split(process.env.BEARER_KEY)[1]?.trim()
//         if (!token) {
//             return next(new AppError("Token is missing", 400));
//         }

//         // 2- verfy token
//          let decoded = verifyToken(token,process.env.TOKEN_SIGNATURE);
//             if (!decoded.id)
//             return next(new AppError("invalid token Payload", 401))

//         // 3 if user of this token exist or not
//         const user = await userModel.findById(decoded.id);
//         if (!user) {
//             return next(new AppError("User not found", 404));
//         }

//             // 4- check if this token is the last one or not (change password )
//             // and forgetPasswrd
//              if (user.changePasswordAt) {
//             const changePasswordTime = parseInt(user.changePasswordAt.getTime() / 1000);
//             if (changePasswordTime > decoded.iat) {
//                 return next(new AppError("Token is invalid due to password change", 401));
//             }
//         }

//         // 6- Check if the user has the required role
//         if (!roles.includes(user.role)) {
//             return next(new AppError("You are not authorized to access this route.", 403));
//         }

//         // Attach the user to the request and proceed
//         req.user = user;
//         next();
//     });
// };

// export { allowedto };
