import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const generateToken = (payload) => {
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, config.JWT_REFRESH_SECRET);
};

export const generateTokenPair = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.constructor.modelName.toLowerCase(),
    isActive: user.isActive ? user.isActive() : false,
  };

  return {
    accessToken: generateToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};
