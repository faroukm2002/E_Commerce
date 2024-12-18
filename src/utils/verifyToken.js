import jwt from "jsonwebtoken";
import { AppError } from "./AppError.js";

const verifyToken = (token, secretKey) => {
    let decoded;
    try {
        decoded = jwt.verify(token, secretKey); 
    } catch (err) {
        throw new AppError("Invalid or expired token", 401)
    }
    return decoded;
};

export default verifyToken;
