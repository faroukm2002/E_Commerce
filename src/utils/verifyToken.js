import jwt from "jsonwebtoken"; // Correct import
import { AppError } from "./AppError.js";

const verifyToken = (token,secretKey) => {
    return jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
             new AppError('Invalid token', 401);
        } else {
            return decoded;
        }
    });
};


export default verifyToken;