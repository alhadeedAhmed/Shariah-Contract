import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const individualSchema = new mongoose.Schema(
  {
    // Basic Information
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [100, "Full name cannot exceed 100 characters"],
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
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["individual"],
      default: "individual",
      required: true,
    },

    // Employment Information
    employment: {
      type: String,
      required: [true, "Employment information is required"],
      trim: true,
    },
    income: {
      type: Number,
      required: [true, "Income information is required"],
      min: [0, "Income cannot be negative"],
    },

    // Contact Information
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

    // Document Information
    documents: {
      idDocument: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        uploadedAt: Date,
      },
      salaryCertificate: {
        filename: String,
        originalName: String,
        mimetype: String,
        size: Number,
        uploadedAt: Date,
      },
      bankStatements: [
        {
          filename: String,
          originalName: String,
          mimetype: String,
          size: Number,
          uploadedAt: Date,
        },
      ],
    },

    // Biometric Information (encrypted)
    biometricData: {
      fingerprintHash: String,
      faceIdHash: String,
      verified: {
        type: Boolean,
        default: false,
      },
      verifiedAt: Date,
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
      kycCompleted: {
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
      enum: ["pending", "active", "suspended", "banned"],
      default: "pending",
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
individualSchema.index({ email: 1 });
individualSchema.index({ "digitalPassport.passportId": 1 });
individualSchema.index({ accountStatus: 1 });
individualSchema.index({ createdAt: -1 });

// Virtual for full name
individualSchema.virtual("displayName").get(function () {
  return this.fullName;
});

// Pre-save middleware to hash password
individualSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
individualSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Instance method to generate digital passport ID
individualSchema.methods.generatePassportId = function () {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `IND-${timestamp}-${random}`.toUpperCase();
};

// Instance method to check if account is active
individualSchema.methods.isActive = function () {
  return (
    this.accountStatus === "active" &&
    this.verificationStatus.shariahPassportIssued &&
    this.digitalPassport.status === "active"
  );
};

// Static method to find by email
individualSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find active users
individualSchema.statics.findActive = function () {
  return this.find({
    accountStatus: "active",
    "verificationStatus.shariahPassportIssued": true,
  });
};

export default mongoose.model("Individual", individualSchema);
