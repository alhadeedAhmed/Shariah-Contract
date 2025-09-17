import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import Individual from "../models/Individual.js";
import CapitalProvider from "../models/CapitalProvider.js";

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find user based on role
    let user;
    if (decoded.role === "individual") {
      user = await Individual.findById(decoded.id).select("-password");
    } else if (decoded.role === "capitalprovider") {
      user = await CapitalProvider.findById(decoded.id).select("-password");
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid user role.",
      });
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check if user is active
    if (!user.isActive()) {
      return res.status(401).json({
        success: false,
        message: "Account is not active.",
      });
    }

    // Add user to request object
    req.user = user;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired.",
      });
    } else {
      console.error("Auth middleware error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  }
};

// Middleware to check specific roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. User not authenticated.",
      });
    }

    const userRole = req.userRole;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};

// Middleware to check if user owns the resource
export const checkOwnership = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Access denied. User not authenticated.",
    });
  }

  // Check if the user is accessing their own resource
  const resourceUserId = req.params.userId || req.params.id;
  if (resourceUserId && resourceUserId !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: "Access denied. You can only access your own resources.",
    });
  }

  next();
};

// Optional authentication middleware (doesn't fail if no token)
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next();
    }

    const token = authHeader.substring(7);

    if (!token) {
      return next();
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    let user;
    if (decoded.role === "individual") {
      user = await Individual.findById(decoded.id).select("-password");
    } else if (decoded.role === "capitalprovider") {
      user = await CapitalProvider.findById(decoded.id).select("-password");
    }

    if (user && user.isActive()) {
      req.user = user;
      req.userRole = decoded.role;
    }

    next();
  } catch (error) {
    // If token is invalid, just continue without user
    next();
  }
};
