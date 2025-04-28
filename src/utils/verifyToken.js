import jwt from "jsonwebtoken";
import { AppError } from "./AppError.js";

const verifyToken = (token, secretKey) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token has expired", 401);
    } else if (error.name === "JsonWebTokenError") {
      throw new AppError("Invalid token", 401);
    } else {
      throw new AppError("Token verification failed", 401);
    }
  }
};

export default verifyToken;
