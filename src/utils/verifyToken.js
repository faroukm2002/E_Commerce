import jwt from "jsonwebtoken"; // Correct import
import { AppError } from "./AppError.js";

const verifyToken = (token) => {
    return jwt.verify(token, process.env.TOKEN_SIGNATURE, (err, decoded) => {
        if (err) {
             new AppError('Invalid token', 401);
        } else {
            return decoded;
        }
    });
};


export default verifyToken;