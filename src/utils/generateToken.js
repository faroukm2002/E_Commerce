import jwt from "jsonwebtoken";

const generateTokens = (payload) => {
  // Don't include sensitive info in tokens
  const tokenPayload = {
    ...payload,
    iat: Math.floor(Date.now() / 1000),
  };

  // Access token - short lived
  const accessToken = jwt.sign(tokenPayload, process.env.TOKEN_SIGNATURE, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "30m",
  });

  // Refresh token - longer lived
  const refreshToken = jwt.sign(
    tokenPayload,
    process.env.REFRESH_TOKEN_SIGNATURE,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" }
  );

  return { accessToken, refreshToken };
};

export default generateTokens;
