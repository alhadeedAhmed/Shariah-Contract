import mongoose from "mongoose";

const serviceProviderSchema = new mongoose.Schema(
  {
    // Basic Business Information
    businessName: {
      type: String,
      required: [true, "Business name is required"],
      trim: true,
      maxlength: [200, "Business name cannot exceed 200 characters"],
    },
    businessType: {
      type: String,
      required: [true, "Business type is required"],
      enum: ["car_dealer", "motorcycle_dealer", "truck_dealer", "other"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // Contact Information
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
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
    },
    website: {
      type: String,
      trim: true,
      match: [/^https?:\/\/.+/, "Please enter a valid website URL"],
    },

    // Address Information
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
        maxlength: [200, "Street address cannot exceed 200 characters"],
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
        maxlength: [100, "City cannot exceed 100 characters"],
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
        maxlength: [100, "State cannot exceed 100 characters"],
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
        maxlength: [100, "Country cannot exceed 100 characters"],
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
        maxlength: [20, "Postal code cannot exceed 20 characters"],
      },
    },

    // Business Registration and Compliance
    registration: {
      businessLicense: {
        type: String,
        required: [true, "Business license is required"],
        trim: true,
      },
      taxId: {
        type: String,
        required: [true, "Tax ID is required"],
        trim: true,
      },
      registrationNumber: {
        type: String,
        required: [true, "Registration number is required"],
        trim: true,
      },
      registrationDate: {
        type: Date,
        required: [true, "Registration date is required"],
      },
    },

    // Business Hours
    businessHours: {
      monday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: true },
      },
      tuesday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: true },
      },
      wednesday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: true },
      },
      thursday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: true },
      },
      friday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: true },
      },
      saturday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: false },
      },
      sunday: {
        open: String,
        close: String,
        isOpen: { type: Boolean, default: false },
      },
    },

    // Service Capabilities
    services: [
      {
        type: {
          type: String,
          enum: ["sales", "service", "parts", "financing", "insurance"],
        },
        description: String,
        isAvailable: { type: Boolean, default: true },
      },
    ],

    // Financial Information
    financialInfo: {
      bankAccount: {
        accountNumber: String,
        bankName: String,
        routingNumber: String,
      },
      paymentMethods: [String], // ["cash", "check", "bank_transfer", "credit_card"]
    },

    // Platform Integration
    platformSettings: {
      autoRespond: {
        type: Boolean,
        default: true,
      },
      responseTime: {
        type: Number,
        default: 24, // hours
      },
      notificationPreferences: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
        push: { type: Boolean, default: true },
      },
    },

    // Verification and Status
    verificationStatus: {
      isVerified: {
        type: Boolean,
        default: false,
      },
      verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
      },
      verifiedAt: Date,
      verificationNotes: String,
      documents: [
        {
          type: {
            type: String,
            enum: ["license", "tax_certificate", "insurance", "other"],
          },
          url: String,
          uploadedAt: Date,
        },
      ],
    },

    // Shariah Compliance
    shariahCompliance: {
      isCompliant: {
        type: Boolean,
        default: true,
      },
      complianceOfficer: {
        name: String,
        email: String,
        phone: String,
      },
      lastAudit: Date,
      complianceNotes: String,
    },

    // Performance Metrics
    metrics: {
      totalVehicles: {
        type: Number,
        default: 0,
      },
      totalSales: {
        type: Number,
        default: 0,
      },
      averageResponseTime: {
        type: Number,
        default: 0, // in hours
      },
      customerRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      totalReviews: {
        type: Number,
        default: 0,
      },
    },

    // Account Status
    accountStatus: {
      type: String,
      enum: ["pending", "active", "suspended", "banned"],
      default: "pending",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // Timestamps
    lastLogin: Date,
    lastActivity: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
serviceProviderSchema.index({ businessName: 1 });
serviceProviderSchema.index({ email: 1 });
serviceProviderSchema.index({ "address.city": 1 });
serviceProviderSchema.index({ "address.country": 1 });
serviceProviderSchema.index({ businessType: 1 });
serviceProviderSchema.index({ accountStatus: 1 });
serviceProviderSchema.index({ isActive: 1 });

// Virtual for full address
serviceProviderSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.postalCode}, ${this.address.country}`;
});

// Pre-save middleware
serviceProviderSchema.pre("save", function (next) {
  this.lastActivity = new Date();
  next();
});

// Static method to find active providers
serviceProviderSchema.statics.findActive = function () {
  return this.find({
    accountStatus: "active",
    isActive: true,
  });
};

// Static method to find by location
serviceProviderSchema.statics.findByLocation = function (city, country) {
  const query = { isActive: true, accountStatus: "active" };

  if (city) {
    query["address.city"] = new RegExp(city, "i");
  }

  if (country) {
    query["address.country"] = new RegExp(country, "i");
  }

  return this.find(query);
};

// Instance method to update metrics
serviceProviderSchema.methods.updateMetrics = function (field, value) {
  if (this.metrics[field] !== undefined) {
    this.metrics[field] = value;
    return this.save();
  }
  throw new Error(`Invalid metric field: ${field}`);
};

// Instance method to increment sales
serviceProviderSchema.methods.incrementSales = function () {
  this.metrics.totalSales += 1;
  return this.save();
};

export default mongoose.model("ServiceProvider", serviceProviderSchema);
