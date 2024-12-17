import jwt from "jsonwebtoken";

const generateTokens = (data) => {
  const accessToken = jwt.sign(data, process.env.TOKEN_SIGNATURE, { expiresIn: '45m' });
  const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SIGNATURE, { expiresIn: '7d' });
  
  return { accessToken, refreshToken };
};

export default generateTokens;
