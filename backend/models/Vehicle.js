import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    // Basic Vehicle Information
    make: {
      type: String,
      required: [true, "Vehicle make is required"],
      trim: true,
      maxlength: [50, "Make cannot exceed 50 characters"],
    },
    model: {
      type: String,
      required: [true, "Vehicle model is required"],
      trim: true,
      maxlength: [50, "Model cannot exceed 50 characters"],
    },
    year: {
      type: Number,
      required: [true, "Vehicle year is required"],
      min: [1900, "Year must be after 1900"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"],
    },
    variant: {
      type: String,
      trim: true,
      maxlength: [100, "Variant cannot exceed 100 characters"],
    },

    // Pricing Information
    price: {
      type: Number,
      required: [true, "Vehicle price is required"],
      min: [0, "Price cannot be negative"],
    },
    currency: {
      type: String,
      default: "USD",
      enum: ["USD", "EUR", "GBP", "SAR", "AED"],
    },

    // Technical Specifications
    specifications: {
      engine: {
        type: String,
        trim: true,
      },
      transmission: {
        type: String,
        enum: ["Manual", "Automatic", "CVT", "Semi-Automatic"],
      },
      fuelType: {
        type: String,
        enum: ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"],
      },
      mileage: {
        type: Number,
        min: [0, "Mileage cannot be negative"],
      },
      color: {
        type: String,
        trim: true,
      },
      bodyType: {
        type: String,
        enum: [
          "Sedan",
          "SUV",
          "Hatchback",
          "Coupe",
          "Convertible",
          "Truck",
          "Van",
        ],
      },
    },

    // Availability and Status
    availability: {
      type: String,
      enum: ["available", "reserved", "sold", "out_of_stock"],
      default: "available",
    },
    stockQuantity: {
      type: Number,
      default: 1,
      min: [0, "Stock quantity cannot be negative"],
    },

    // Service Provider Information
    serviceProvider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: [true, "Service provider is required"],
    },

    // Images and Media
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
          default: "Vehicle image",
        },
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Additional Information
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    features: [String], // Array of feature strings
    condition: {
      type: String,
      enum: ["new", "used", "certified_pre_owned"],
      default: "new",
    },

    // Verification and Compliance
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
    },

    // Shariah Compliance
    shariahCompliance: {
      isCompliant: {
        type: Boolean,
        default: true,
      },
      complianceNotes: String,
      lastChecked: Date,
    },

    // Metadata
    tags: [String], // For search and filtering
    isActive: {
      type: Boolean,
      default: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    inquiries: {
      type: Number,
      default: 0,
    },

    // Timestamps
    lastUpdated: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better performance
vehicleSchema.index({ make: 1, model: 1 });
vehicleSchema.index({ price: 1 });
vehicleSchema.index({ year: 1 });
vehicleSchema.index({ availability: 1 });
vehicleSchema.index({ serviceProvider: 1 });
vehicleSchema.index({ "specifications.bodyType": 1 });
vehicleSchema.index({ "specifications.fuelType": 1 });
vehicleSchema.index({ tags: 1 });
vehicleSchema.index({ isActive: 1 });

// Virtual for full vehicle name
vehicleSchema.virtual("fullName").get(function () {
  return `${this.year} ${this.make} ${this.model}`;
});

// Virtual for price with currency
vehicleSchema.virtual("formattedPrice").get(function () {
  return `${this.currency} ${this.price.toLocaleString()}`;
});

// Pre-save middleware
vehicleSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

// Static method to find available vehicles
vehicleSchema.statics.findAvailable = function () {
  return this.find({
    availability: "available",
    isActive: true,
    stockQuantity: { $gt: 0 },
  });
};

// Static method to search vehicles
vehicleSchema.statics.searchVehicles = function (searchParams) {
  const query = { isActive: true };

  if (searchParams.make) {
    query.make = new RegExp(searchParams.make, "i");
  }

  if (searchParams.model) {
    query.model = new RegExp(searchParams.model, "i");
  }

  if (searchParams.minPrice || searchParams.maxPrice) {
    query.price = {};
    if (searchParams.minPrice) query.price.$gte = searchParams.minPrice;
    if (searchParams.maxPrice) query.price.$lte = searchParams.maxPrice;
  }

  if (searchParams.year) {
    query.year = searchParams.year;
  }

  if (searchParams.bodyType) {
    query["specifications.bodyType"] = searchParams.bodyType;
  }

  if (searchParams.fuelType) {
    query["specifications.fuelType"] = searchParams.fuelType;
  }

  return this.find(query);
};

// Instance method to increment views
vehicleSchema.methods.incrementViews = function () {
  this.views += 1;
  return this.save();
};

// Instance method to increment inquiries
vehicleSchema.methods.incrementInquiries = function () {
  this.inquiries += 1;
  return this.save();
};

export default mongoose.model("Vehicle", vehicleSchema);
