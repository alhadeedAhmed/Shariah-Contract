import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const capitalProviderSchema = new mongoose.Schema(
  {
    // Institution Information
    institutionName: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true,
      maxlength: [200, "Institution name cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    role: {
      type: String,
      enum: ["capitalProvider"],
      default: "capitalProvider",
      required: true,
    },

    // Regulatory Information
    regulatoryLicense: {
      licenseNumber: {
        type: String,
        required: [true, "Regulatory license number is required"],
        trim: true,
        unique: true,
      },
      issuingAuthority: {
        type: String,
        required: [true, "Issuing authority is required"],
        trim: true,
      },
      issueDate: Date,
      expiryDate: Date,
      status: {
        type: String,
        enum: ["active", "expired", "suspended", "revoked"],
        default: "active",
      },
    },

    // Compliance Information
    complianceOfficer: {
      name: {
        type: String,
        required: [true, "Compliance officer name is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Compliance officer email is required"],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },

    // Compliance Documents
    complianceDocuments: {
      licenseDocument: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        uploadedAt: Date,
      },
      complianceCertificate: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        uploadedAt: Date,
      },
      auditReports: [
        {
          filename: String,
          originalName: String,
          mimetype: String,
          size: Number,
          uploadedAt: Date,
          year: Number,
        },
      ],
    },

    // Risk Profile Configuration
    riskProfile: {
      riskTolerance: {
        type: String,
        enum: ["low", "medium", "high", "very-high"],
        required: [true, "Risk tolerance is required"],
      },
      lendingCriteria: [
        {
          type: String,
          enum: [
            "SMEs",
            "Startups",
            "Large Corporations",
            "Government Entities",
            "Individuals",
          ],
        },
      ],
      productOfferings: [
        {
          type: String,
          enum: [
            "Murabahah",
            "Musharakah",
            "Ijara",
            "Salam",
            "Istisna",
            "Takaful",
          ],
        },
      ],
      pricingModels: [
        {
          type: String,
          enum: ["Fixed Rate", "Variable Rate", "Profit Sharing", "Cost Plus"],
        },
      ],
      maximumLoanAmount: {
        type: Number,
        required: [true, "Maximum loan amount is required"],
        min: [0, "Maximum loan amount cannot be negative"],
      },
      minimumLoanAmount: {
        type: Number,
        required: [true, "Minimum loan amount is required"],
        min: [0, "Minimum loan amount cannot be negative"],
      },
    },

    // Contact Information
    contactInfo: {
      phone: {
        type: String,
        trim: true,
        match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
      },
      website: {
        type: String,
        trim: true,
      },
    },

    // Verification Status
    verificationStatus: {
      emailVerified: {
        type: Boolean,
        default: false,
      },
      documentsVerified: {
        type: Boolean,
        default: false,
      },
      complianceVerified: {
        type: Boolean,
        default: false,
      },
      regulatoryApproved: {
        type: Boolean,
        default: false,
      },
      shariahPassportIssued: {
        type: Boolean,
        default: false,
      },
    },

    // Digital Passport Information
    digitalPassport: {
      passportId: {
        type: String,
        unique: true,
        sparse: true,
      },
      issuedAt: Date,
      expiresAt: Date,
      status: {
        type: String,
        enum: ["active", "suspended", "revoked"],
        default: "active",
      },
    },

    // MPA Agreement
    mpaAgreement: {
      accepted: {
        type: Boolean,
        default: false,
      },
      acceptedAt: Date,
      version: String,
      ipAddress: String,
    },

    // Account Status
    accountStatus: {
      type: String,
      enum: ["pending", "under_review", "active", "suspended", "banned"],
      default: "pending",
    },

    // Portfolio Information
    portfolio: {
      totalCapital: {
        type: Number,
        default: 0,
      },
      availableCapital: {
        type: Number,
        default: 0,
      },
      activeContracts: {
        type: Number,
        default: 0,
      },
      completedContracts: {
        type: Number,
        default: 0,
      },
      defaultRate: {
        type: Number,
        default: 0,
      },
    },

    // Timestamps
    lastLogin: Date,
    lastActivity: Date,

    // Security
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,

    // Audit Trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
capitalProviderSchema.index({ email: 1 });
capitalProviderSchema.index({ "regulatoryLicense.licenseNumber": 1 });
capitalProviderSchema.index({ "digitalPassport.passportId": 1 });
capitalProviderSchema.index({ accountStatus: 1 });
capitalProviderSchema.index({ "riskProfile.riskTolerance": 1 });
capitalProviderSchema.index({ createdAt: -1 });

// Virtual for display name
capitalProviderSchema.virtual("displayName").get(function () {
  return this.institutionName;
});

// Pre-save middleware to hash password
capitalProviderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
capitalProviderSchema.methods.comparePassword = async function (
  candidatePassword
) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate digital passport ID
capitalProviderSchema.methods.generatePassportId = function () {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `CP-${timestamp}-${random}`.toUpperCase();
};

// Instance method to check if account is active
capitalProviderSchema.methods.isActive = function () {
  return (
    this.accountStatus === "active" &&
    this.verificationStatus.shariahPassportIssued &&
    this.digitalPassport.status === "active"
  );
};

// Instance method to check if license is valid
capitalProviderSchema.methods.isLicenseValid = function () {
  if (!this.regulatoryLicense.expiryDate) return false;
  return (
    new Date() < this.regulatoryLicense.expiryDate &&
    this.regulatoryLicense.status === "active"
  );
};

// Static method to find by email
capitalProviderSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active providers
capitalProviderSchema.statics.findActive = function () {
  return this.find({
    accountStatus: "active",
    "verificationStatus.shariahPassportIssued": true,
  });
};

// Static method to find by risk tolerance
capitalProviderSchema.statics.findByRiskTolerance = function (tolerance) {
  return this.find({
    "riskProfile.riskTolerance": tolerance,
    accountStatus: "active",
  });
};

export default mongoose.model("CapitalProvider", capitalProviderSchema);
