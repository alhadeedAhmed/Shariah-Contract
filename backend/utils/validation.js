import { body, validationResult } from "express-validator";

// Validation middleware
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

// Individual user validation rules
export const validateIndividualSignup = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Full name must be between 2 and 100 characters"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  body("employment")
    .trim()
    .notEmpty()
    .withMessage("Employment information is required")
    .isLength({ max: 200 })
    .withMessage("Employment information cannot exceed 200 characters"),

  body("income")
    .isNumeric()
    .withMessage("Income must be a number")
    .isFloat({ min: 0 })
    .withMessage("Income cannot be negative"),

  body("phone")
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid phone number"),

  body("address.street")
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage("Street address cannot exceed 200 characters"),

  body("address.city")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("City cannot exceed 100 characters"),

  body("address.country")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Country cannot exceed 100 characters"),
];

export const validateIndividualSignin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// Capital Provider validation rules
export const validateCapitalProviderSignup = [
  body("institutionName")
    .trim()
    .notEmpty()
    .withMessage("Institution name is required")
    .isLength({ min: 2, max: 200 })
    .withMessage("Institution name must be between 2 and 200 characters"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  body("regulatoryLicense.licenseNumber")
    .trim()
    .notEmpty()
    .withMessage("Regulatory license number is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("License number must be between 3 and 50 characters"),

  body("regulatoryLicense.issuingAuthority")
    .trim()
    .notEmpty()
    .withMessage("Issuing authority is required")
    .isLength({ max: 200 })
    .withMessage("Issuing authority cannot exceed 200 characters"),

  body("complianceOfficer.name")
    .trim()
    .notEmpty()
    .withMessage("Compliance officer name is required")
    .isLength({ max: 100 })
    .withMessage("Compliance officer name cannot exceed 100 characters"),

  body("complianceOfficer.email")
    .isEmail()
    .withMessage("Please provide a valid compliance officer email")
    .normalizeEmail(),

  body("riskProfile.riskTolerance")
    .isIn(["low", "medium", "high", "very-high"])
    .withMessage("Risk tolerance must be one of: low, medium, high, very-high"),

  body("riskProfile.maximumLoanAmount")
    .isNumeric()
    .withMessage("Maximum loan amount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Maximum loan amount cannot be negative"),

  body("riskProfile.minimumLoanAmount")
    .isNumeric()
    .withMessage("Minimum loan amount must be a number")
    .isFloat({ min: 0 })
    .withMessage("Minimum loan amount cannot be negative"),
];

export const validateCapitalProviderSignin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),
];

// Password reset validation
export const validatePasswordReset = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
];

export const validatePasswordUpdate = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
    .withMessage(
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.newPassword) {
      throw new Error("Password confirmation does not match new password");
    }
    return true;
  }),
];

// Email verification validation
export const validateEmailVerification = [
  body("token")
    .notEmpty()
    .withMessage("Verification token is required")
    .isLength({ min: 32 })
    .withMessage("Invalid verification token format"),
];
