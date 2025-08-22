// src/utils/tokenService.js
import jwt from "jsonwebtoken";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "super_secret_access";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "super_secret_refresh";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "30m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
