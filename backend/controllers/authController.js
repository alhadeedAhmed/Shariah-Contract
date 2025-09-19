import crypto from "crypto";
import { config } from "../config/env.js";
import { generateTokenPair, verifyToken } from "../utils/jwt.js";
import Individual from "../models/Individual.js";
import CapitalProvider from "../models/CapitalProvider.js";

// Individual User Authentication
export const individualSignup = async (req, res) => {
  try {
    const {
      fullName,
      email,
      password,
      employment,
      income,
      documents,
      biometricData,
      mpaAgreement,
    } = req.body;

    // Check if user already exists
    const existingUser = await Individual.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create new individual user with all frontend data
    const user = new Individual({
      fullName,
      email,
      password,
      role: "individual",
      employment,
      income,
      documents: documents || {
        idDocument: {
          filename: "",
          originalName: "",
          mimetype: "",
          size: 0,
          uploadedAt: null,
          base64Data: "",
          publicUrl: "",
        },
        salaryCertificate: {
          filename: "",
          originalName: "",
          mimetype: "",
          size: 0,
          uploadedAt: null,
          base64Data: "",
          publicUrl: "",
        },
        bankStatements: [],
      },
      biometricData: biometricData || {
        fingerprintHash: "",
        faceIdHash: "",
        verified: false,
        verifiedAt: null,
      },
      mpaAgreement: mpaAgreement || {
        accepted: false,
        acceptedAt: null,
        version: "1.0",
        ipAddress: "",
      },
      // Set initial verification status
      verificationStatus: {
        emailVerified: true, // Set to true for testing
        documentsVerified: true, // Set to true for testing
        kycCompleted: true, // Set to true for testing
        shariahPassportIssued: true, // Set to true for testing
      },
      // Generate digital passport
      digitalPassport: {
        passportId: `IND-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`.toUpperCase(),
        issuedAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        status: "active",
      },
      // Set account status to active for testing
      accountStatus: "active",
      emailVerificationToken: crypto.randomBytes(32).toString("hex"),
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await user.save();

    // Generate tokens
    const tokens = generateTokenPair(user);

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, user.emailVerificationToken);

    res.status(201).json({
      success: true,
      message:
        "Individual user created successfully. Please check your email for verification.",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          employment: user.employment,
          income: user.income,
          documents: user.documents,
          biometricData: user.biometricData,
          mpaAgreement: user.mpaAgreement,
          digitalPassport: user.digitalPassport,
          accountStatus: user.accountStatus,
          verificationStatus: user.verificationStatus,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error("Individual signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const individualSignin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const user = await Individual.findByEmail(email).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user has the correct role
    if (user.role !== "individual") {
      return res.status(400).json({
        success: false,
        message:
          "Please select the correct role. This account is registered as a " +
          user.role +
          ".",
      });
    }

    // Validate role parameter
    if (role && role !== "individual") {
      return res.status(400).json({
        success: false,
        message:
          "Please select 'Individual' role to sign in with these credentials.",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (user.accountStatus === "banned") {
      return res.status(401).json({
        success: false,
        message: "Account has been banned",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    user.lastActivity = new Date();
    await user.save();

    // Generate tokens
    const tokens = generateTokenPair(user);

    res.json({
      success: true,
      message: "Sign in successful",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          employment: user.employment,
          income: user.income,
          documents: user.documents,
          biometricData: user.biometricData,
          mpaAgreement: user.mpaAgreement,
          digitalPassport: user.digitalPassport,
          accountStatus: user.accountStatus,
          verificationStatus: user.verificationStatus,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error("Individual signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Capital Provider Authentication
export const capitalProviderSignup = async (req, res) => {
  try {
    const {
      institutionName,
      email,
      password,
      regulatoryLicense,
      complianceOfficer,
      complianceDocuments,
      riskProfile,
      complianceVerified,
    } = req.body;

    // Check if user already exists
    const existingUser = await CapitalProvider.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Capital provider with this email already exists",
      });
    }

    // Create new capital provider
    const user = new CapitalProvider({
      institutionName,
      email,
      password,
      role: "capitalProvider",
      regulatoryLicense: regulatoryLicense || {
        licenseNumber: "",
        issuingAuthority: "",
        issueDate: null,
        expiryDate: null,
        status: "active",
      },
      complianceOfficer,
      complianceDocuments: complianceDocuments || {
        licenseDocument: {
          filename: "",
          originalName: "",
          mimetype: "",
          size: 0,
          uploadedAt: null,
          base64Data: "",
          publicUrl: "",
        },
        complianceCertificate: {
          filename: "",
          originalName: "",
          mimetype: "",
          size: 0,
          uploadedAt: null,
          base64Data: "",
          publicUrl: "",
        },
        auditReports: [],
      },
      riskProfile,
      complianceVerified: complianceVerified || false,
      // Set initial verification status
      verificationStatus: {
        emailVerified: false,
        documentsVerified: false,
        complianceVerified: complianceVerified || false,
        regulatoryApproved: false,
        shariahPassportIssued: false,
      },
      // Generate digital passport
      digitalPassport: {
        passportId: `CP-${Date.now()}-${Math.random()
          .toString(36)
          .substr(2, 5)}`.toUpperCase(),
        issuedAt: new Date(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        status: "active",
      },
      emailVerificationToken: crypto.randomBytes(32).toString("hex"),
      emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    });

    await user.save();

    // Generate tokens
    const tokens = generateTokenPair(user);

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, user.emailVerificationToken);

    res.status(201).json({
      success: true,
      message:
        "Capital provider created successfully. Please check your email for verification.",
      data: {
        user: {
          id: user._id,
          institutionName: user.institutionName,
          email: user.email,
          role: user.role,
          regulatoryLicense: user.regulatoryLicense,
          complianceOfficer: user.complianceOfficer,
          complianceDocuments: user.complianceDocuments,
          riskProfile: user.riskProfile,
          complianceVerified: user.complianceVerified,
          digitalPassport: user.digitalPassport,
          accountStatus: user.accountStatus,
          verificationStatus: user.verificationStatus,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error("Capital provider signup error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

export const capitalProviderSignin = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find user by email
    const user = await CapitalProvider.findByEmail(email).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user has the correct role
    if (user.role !== "capitalProvider") {
      return res.status(400).json({
        success: false,
        message:
          "Please select the correct role. This account is registered as a " +
          user.role +
          ".",
      });
    }

    // Validate role parameter
    if (role && role !== "capitalProvider") {
      return res.status(400).json({
        success: false,
        message:
          "Please select 'Capital Provider' role to sign in with these credentials.",
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if account is active
    if (user.accountStatus === "banned") {
      return res.status(401).json({
        success: false,
        message: "Account has been banned",
      });
    }

    // Update last login
    user.lastLogin = new Date();
    user.lastActivity = new Date();
    await user.save();

    // Generate tokens
    const tokens = generateTokenPair(user);

    res.json({
      success: true,
      message: "Sign in successful",
      data: {
        user: {
          id: user._id,
          institutionName: user.institutionName,
          email: user.email,
          role: user.role,
          regulatoryLicense: user.regulatoryLicense,
          complianceOfficer: user.complianceOfficer,
          complianceDocuments: user.complianceDocuments,
          riskProfile: user.riskProfile,
          complianceVerified: user.complianceVerified,
          digitalPassport: user.digitalPassport,
          accountStatus: user.accountStatus,
          verificationStatus: user.verificationStatus,
        },
        tokens,
      },
    });
  } catch (error) {
    console.error("Capital provider signin error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Common Authentication Functions
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    let user;
    if (decoded.role === "individual") {
      user = await Individual.findById(decoded.id);
    } else if (decoded.role === "capitalprovider") {
      user = await CapitalProvider.findById(decoded.id);
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (!user || !user.isActive()) {
      return res.status(401).json({
        success: false,
        message: "User not found or inactive",
      });
    }

    // Generate new tokens
    const tokens = generateTokenPair(user);

    res.json({
      success: true,
      message: "Token refreshed successfully",
      data: { tokens },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
};

export const signout = async (req, res) => {
  try {
    // In a more sophisticated implementation, you might want to blacklist the token
    // For now, we'll just return a success message
    res.json({
      success: true,
      message: "Sign out successful",
    });
  } catch (error) {
    console.error("Signout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          fullName: user.fullName || user.institutionName,
          email: user.email,
          role: user.role,
          // Include all user data based on role
          ...(user.role === "individual"
            ? {
                employment: user.employment,
                income: user.income,
                documents: user.documents,
                biometricData: user.biometricData,
                mpaAgreement: user.mpaAgreement,
              }
            : {
                institutionName: user.institutionName,
                regulatoryLicense: user.regulatoryLicense,
                complianceOfficer: user.complianceOfficer,
                complianceDocuments: user.complianceDocuments,
                riskProfile: user.riskProfile,
                complianceVerified: user.complianceVerified,
              }),
          digitalPassport: user.digitalPassport,
          accountStatus: user.accountStatus,
          verificationStatus: user.verificationStatus,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
        },
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Find user by verification token
    const individual = await Individual.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    const capitalProvider = await CapitalProvider.findOne({
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() },
    });

    const user = individual || capitalProvider;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification token",
      });
    }

    // Update verification status
    user.verificationStatus.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
