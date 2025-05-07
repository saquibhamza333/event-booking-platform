import jwt from "jsonwebtoken"

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },  
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};
