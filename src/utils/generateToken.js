import jwt from "jsonwebtoken"; 

 
const generateToken = (data) => {
   return jwt.sign(data, process.env.TOKEN_SIGNATURE, { expiresIn: '6d' });
};



export default generateToken