import express from "express";
import {
  individualSignup,
  individualSignin,
  capitalProviderSignup,
  capitalProviderSignin,
  refreshToken,
  signout,
  getProfile,
  verifyEmail,
} from "../controllers/authController.js";
import {
  validateIndividualSignup,
  validateIndividualSignin,
  validateCapitalProviderSignup,
  validateCapitalProviderSignin,
  validateEmailVerification,
  validate,
} from "../utils/validation.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Individual User Routes
router.post(
  "/individual/signup",
  validateIndividualSignup,
  validate,
  individualSignup
);
router.post(
  "/individual/signin",
  validateIndividualSignin,
  validate,
  individualSignin
);

// Capital Provider Routes
router.post(
  "/capital-provider/signup",
  validateCapitalProviderSignup,
  validate,
  capitalProviderSignup
);
router.post(
  "/capital-provider/signin",
  validateCapitalProviderSignin,
  validate,
  capitalProviderSignin
);

// Common Routes
router.post("/refresh-token", refreshToken);
router.post("/signout", authenticate, signout);
router.get("/profile", authenticate, getProfile);
router.post("/verify-email", validateEmailVerification, validate, verifyEmail);

export default router;
