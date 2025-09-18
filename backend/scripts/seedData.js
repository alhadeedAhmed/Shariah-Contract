import mongoose from "mongoose";
import { config } from "../config/env.js";
import Vehicle from "../models/Vehicle.js";
import ServiceProvider from "../models/ServiceProvider.js";

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Sample service providers
const sampleServiceProviders = [
  {
    businessName: "Al-Rashid Motors",
    businessType: "car_dealer",
    description:
      "Premium car dealership specializing in luxury and family vehicles",
    email: "info@alrashidmotors.com",
    phone: "+966501234567",
    website: "https://alrashidmotors.com",
    address: {
      street: "King Fahd Road, Al Olaya",
      city: "Riyadh",
      state: "Riyadh Province",
      country: "Saudi Arabia",
      postalCode: "11564",
    },
    registration: {
      businessLicense: "BL-2023-001234",
      taxId: "300123456789003",
      registrationNumber: "CR-2023-001234",
      registrationDate: new Date("2023-01-15"),
    },
    businessHours: {
      monday: { open: "09:00", close: "18:00", isOpen: true },
      tuesday: { open: "09:00", close: "18:00", isOpen: true },
      wednesday: { open: "09:00", close: "18:00", isOpen: true },
      thursday: { open: "09:00", close: "18:00", isOpen: true },
      friday: { open: "14:00", close: "18:00", isOpen: true },
      saturday: { open: "09:00", close: "18:00", isOpen: true },
      sunday: { open: "09:00", close: "18:00", isOpen: true },
    },
    services: [
      {
        type: "sales",
        description: "New and used car sales",
        isAvailable: true,
      },
      {
        type: "service",
        description: "Vehicle maintenance and repair",
        isAvailable: true,
      },
      {
        type: "financing",
        description: "Islamic financing options",
        isAvailable: true,
      },
    ],
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
      documents: [
        {
          type: "license",
          url: "https://example.com/license.pdf",
          uploadedAt: new Date(),
        },
      ],
    },
    shariahCompliance: {
      isCompliant: true,
      complianceOfficer: {
        name: "Ahmad Al-Rashid",
        email: "compliance@alrashidmotors.com",
        phone: "+966501234568",
      },
      lastAudit: new Date(),
    },
    accountStatus: "active",
    isActive: true,
  },
  {
    businessName: "Green Valley Auto",
    businessType: "car_dealer",
    description: "Eco-friendly and electric vehicle specialist",
    email: "contact@greenvalleyauto.com",
    phone: "+966502345678",
    website: "https://greenvalleyauto.com",
    address: {
      street: "Prince Mohammed bin Salman Road",
      city: "Jeddah",
      state: "Makkah Province",
      country: "Saudi Arabia",
      postalCode: "21432",
    },
    registration: {
      businessLicense: "BL-2023-001235",
      taxId: "300123456789004",
      registrationNumber: "CR-2023-001235",
      registrationDate: new Date("2023-02-20"),
    },
    businessHours: {
      monday: { open: "08:00", close: "20:00", isOpen: true },
      tuesday: { open: "08:00", close: "20:00", isOpen: true },
      wednesday: { open: "08:00", close: "20:00", isOpen: true },
      thursday: { open: "08:00", close: "20:00", isOpen: true },
      friday: { open: "14:00", close: "20:00", isOpen: true },
      saturday: { open: "08:00", close: "20:00", isOpen: true },
      sunday: { open: "08:00", close: "20:00", isOpen: true },
    },
    services: [
      {
        type: "sales",
        description: "Electric and hybrid vehicles",
        isAvailable: true,
      },
      {
        type: "service",
        description: "EV maintenance and charging",
        isAvailable: true,
      },
      {
        type: "parts",
        description: "Electric vehicle parts",
        isAvailable: true,
      },
    ],
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
      documents: [
        {
          type: "license",
          url: "https://example.com/license2.pdf",
          uploadedAt: new Date(),
        },
      ],
    },
    shariahCompliance: {
      isCompliant: true,
      complianceOfficer: {
        name: "Fatima Al-Zahra",
        email: "compliance@greenvalleyauto.com",
        phone: "+966502345679",
      },
      lastAudit: new Date(),
    },
    accountStatus: "active",
    isActive: true,
  },
];

// Sample vehicles
const sampleVehicles = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2023,
    variant: "LE",
    price: 85000,
    currency: "SAR",
    specifications: {
      engine: "2.5L 4-Cylinder",
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 0,
      color: "White Pearl",
      bodyType: "Sedan",
    },
    availability: "available",
    stockQuantity: 3,
    description: "Reliable and fuel-efficient sedan perfect for families",
    features: [
      "Bluetooth Connectivity",
      "Backup Camera",
      "Lane Departure Warning",
      "Adaptive Cruise Control",
      "Apple CarPlay",
      "Android Auto",
    ],
    condition: "new",
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
    },
    shariahCompliance: {
      isCompliant: true,
      lastChecked: new Date(),
    },
    tags: ["family", "reliable", "fuel-efficient"],
    isActive: true,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2023,
    variant: "Sport",
    price: 75000,
    currency: "SAR",
    specifications: {
      engine: "1.5L Turbo 4-Cylinder",
      transmission: "CVT",
      fuelType: "Petrol",
      mileage: 0,
      color: "Rallye Red",
      bodyType: "Sedan",
    },
    availability: "available",
    stockQuantity: 2,
    description: "Sporty and efficient sedan with modern technology",
    features: [
      "Honda Sensing Suite",
      "Wireless Phone Charging",
      "HondaLink",
      "Remote Engine Start",
      "Heated Front Seats",
      "Sunroof",
    ],
    condition: "new",
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
    },
    shariahCompliance: {
      isCompliant: true,
      lastChecked: new Date(),
    },
    tags: ["sporty", "technology", "efficient"],
    isActive: true,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2023,
    variant: "Standard Range",
    price: 180000,
    currency: "SAR",
    specifications: {
      engine: "Electric Motor",
      transmission: "Automatic",
      fuelType: "Electric",
      mileage: 0,
      color: "Midnight Silver Metallic",
      bodyType: "Sedan",
    },
    availability: "available",
    stockQuantity: 1,
    description: "Fully electric sedan with advanced autopilot features",
    features: [
      "Autopilot",
      "Supercharging",
      "Over-the-Air Updates",
      "Premium Audio",
      "Glass Roof",
      "Mobile App Control",
    ],
    condition: "new",
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
    },
    shariahCompliance: {
      isCompliant: true,
      lastChecked: new Date(),
    },
    tags: ["electric", "luxury", "technology", "autopilot"],
    isActive: true,
  },
  {
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    variant: "SEL",
    price: 95000,
    currency: "SAR",
    specifications: {
      engine: "2.5L 4-Cylinder",
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 0,
      color: "Amazon Gray",
      bodyType: "SUV",
    },
    availability: "available",
    stockQuantity: 4,
    description: "Spacious SUV perfect for families and adventures",
    features: [
      "All-Wheel Drive",
      "Panoramic Sunroof",
      "Heated Seats",
      "Wireless Charging",
      "Blind Spot Monitoring",
      "Rear Cross Traffic Alert",
    ],
    condition: "new",
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
    },
    shariahCompliance: {
      isCompliant: true,
      lastChecked: new Date(),
    },
    tags: ["suv", "family", "adventure", "spacious"],
    isActive: true,
  },
  {
    make: "BMW",
    model: "X5",
    year: 2023,
    variant: "xDrive40i",
    price: 280000,
    currency: "SAR",
    specifications: {
      engine: "3.0L Turbo 6-Cylinder",
      transmission: "Automatic",
      fuelType: "Petrol",
      mileage: 0,
      color: "Mineral White Metallic",
      bodyType: "SUV",
    },
    availability: "available",
    stockQuantity: 1,
    description: "Luxury SUV with premium features and performance",
    features: [
      "xDrive All-Wheel Drive",
      "Panoramic Sunroof",
      "Premium Leather Seats",
      "Harman Kardon Audio",
      "Gesture Control",
      "Wireless Apple CarPlay",
    ],
    condition: "new",
    verificationStatus: {
      isVerified: true,
      verifiedAt: new Date(),
    },
    shariahCompliance: {
      isCompliant: true,
      lastChecked: new Date(),
    },
    tags: ["luxury", "suv", "premium", "performance"],
    isActive: true,
  },
];

// Seed function
const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Vehicle.deleteMany({});
    await ServiceProvider.deleteMany({});
    console.log("Cleared existing data");

    // Create service providers
    const serviceProviders = await ServiceProvider.insertMany(
      sampleServiceProviders
    );
    console.log(`Created ${serviceProviders.length} service providers`);

    // Create vehicles with service provider references
    const vehiclesWithProviders = sampleVehicles.map((vehicle, index) => ({
      ...vehicle,
      serviceProvider: serviceProviders[index % serviceProviders.length]._id,
    }));

    const vehicles = await Vehicle.insertMany(vehiclesWithProviders);
    console.log(`Created ${vehicles.length} vehicles`);

    console.log("Database seeded successfully!");
    console.log("\nSample data created:");
    console.log("- Service Providers:", serviceProviders.length);
    console.log("- Vehicles:", vehicles.length);

    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

// Run seeding
seedData();
