import Vehicle from "../models/Vehicle.js";
import ServiceProvider from "../models/ServiceProvider.js";
import Quote from "../models/Quote.js";
import Individual from "../models/Individual.js";

// Get all vehicles with filtering and pagination
export const getVehicles = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      make,
      model,
      minPrice,
      maxPrice,
      year,
      bodyType,
      fuelType,
      availability = "available",
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build search query
    const searchQuery = { isActive: true };

    if (make) searchQuery.make = new RegExp(make, "i");
    if (model) searchQuery.model = new RegExp(model, "i");
    if (year) searchQuery.year = parseInt(year);
    if (bodyType) searchQuery["specifications.bodyType"] = bodyType;
    if (fuelType) searchQuery["specifications.fuelType"] = fuelType;
    if (availability) searchQuery.availability = availability;

    if (minPrice || maxPrice) {
      searchQuery.price = {};
      if (minPrice) searchQuery.price.$gte = parseInt(minPrice);
      if (maxPrice) searchQuery.price.$lte = parseInt(maxPrice);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Execute query
    const vehicles = await Vehicle.find(searchQuery)
      .populate("serviceProvider", "businessName address.city address.country")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Vehicle.countDocuments(searchQuery);

    res.json({
      success: true,
      data: {
        vehicles,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalVehicles: total,
          hasNext: skip + vehicles.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicles",
      error: error.message,
    });
  }
};

// Get single vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await Vehicle.findById(id)
      .populate(
        "serviceProvider",
        "businessName address phone email website businessHours"
      )
      .populate("verificationStatus.verifiedBy", "fullName email");

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Increment view count
    await vehicle.incrementViews();

    res.json({
      success: true,
      data: { vehicle },
    });
  } catch (error) {
    console.error("Get vehicle by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vehicle",
      error: error.message,
    });
  }
};

// Get service providers
export const getServiceProviders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      city,
      country,
      businessType,
      sortBy = "metrics.customerRating",
      sortOrder = "desc",
    } = req.query;

    // Build search query
    const searchQuery = { isActive: true, accountStatus: "active" };

    if (city) searchQuery["address.city"] = new RegExp(city, "i");
    if (country) searchQuery["address.country"] = new RegExp(country, "i");
    if (businessType) searchQuery.businessType = businessType;

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const serviceProviders = await ServiceProvider.find(searchQuery)
      .select("-financialInfo -platformSettings")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ServiceProvider.countDocuments(searchQuery);

    res.json({
      success: true,
      data: {
        serviceProviders,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalProviders: total,
          hasNext: skip + serviceProviders.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get service providers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service providers",
      error: error.message,
    });
  }
};

// Request quote for a vehicle
export const requestQuote = async (req, res) => {
  try {
    const { vehicleId } = req.params;
    const {
      title,
      description,
      message,
      preferredContactMethod,
      pricing,
      vehicleDetails,
      terms,
      expiresAt,
    } = req.body;
    const customerId = req.user._id;

    // Verify vehicle exists
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // Check if vehicle is available
    if (vehicle.availability !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available for quotation",
      });
    }

    // Create quote with data from frontend
    const quote = new Quote({
      customer: customerId,
      serviceProvider: vehicle.serviceProvider,
      vehicle: vehicleId,
      title:
        title || `Quote for ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      description: description || message,
      vehicleDetails: vehicleDetails || {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        variant: vehicle.variant,
        color: vehicle.specifications.color,
        mileage: vehicle.specifications.mileage,
      },
      pricing: pricing || {
        basePrice: vehicle.price,
        totalPrice: vehicle.price,
        currency: vehicle.currency,
      },
      terms: terms || {
        validityPeriod: 30,
        deliveryTime: 7,
      },
      expiresAt: expiresAt || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: "draft",
    });

    // Add initial message if provided
    if (message) {
      quote.messages.push({
        sender: "customer",
        message,
        timestamp: new Date(),
      });
    }

    await quote.save();

    // Increment vehicle inquiries
    await vehicle.incrementInquiries();

    // Populate the quote with related data
    await quote.populate([
      { path: "customer", select: "fullName email" },
      { path: "serviceProvider", select: "businessName email phone" },
      { path: "vehicle", select: "make model year price images" },
    ]);

    res.status(201).json({
      success: true,
      message: "Quote request submitted successfully",
      data: { quote },
    });
  } catch (error) {
    console.error("Request quote error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to request quote",
      error: error.message,
    });
  }
};

// Get quotes for a customer
export const getCustomerQuotes = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    // Build query
    const query = { customer: customerId };
    if (status) query.status = status;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const quotes = await Quote.find(query)
      .populate("serviceProvider", "businessName address.city address.country")
      .populate("vehicle", "make model year price images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Quote.countDocuments(query);

    res.json({
      success: true,
      data: {
        quotes,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalQuotes: total,
          hasNext: skip + quotes.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get customer quotes error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quotes",
      error: error.message,
    });
  }
};

// Get single quote by ID
export const getQuoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user._id;

    const quote = await Quote.findOne({ _id: id, customer: customerId })
      .populate("customer", "fullName email phone")
      .populate("serviceProvider", "businessName address phone email website")
      .populate("vehicle", "make model year price images specifications");

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    res.json({
      success: true,
      data: { quote },
    });
  } catch (error) {
    console.error("Get quote by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch quote",
      error: error.message,
    });
  }
};

// Accept a quote
export const acceptQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const customerId = req.user._id;

    const quote = await Quote.findOne({ _id: id, customer: customerId });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    if (quote.status !== "sent" && quote.status !== "viewed") {
      return res.status(400).json({
        success: false,
        message: "Quote cannot be accepted in current status",
      });
    }

    // Accept the quote
    await quote.acceptQuote(notes);

    res.json({
      success: true,
      message: "Quote accepted successfully",
      data: { quote },
    });
  } catch (error) {
    console.error("Accept quote error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept quote",
      error: error.message,
    });
  }
};

// Reject a quote
export const rejectQuote = async (req, res) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    const customerId = req.user._id;

    const quote = await Quote.findOne({ _id: id, customer: customerId });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    if (quote.status !== "sent" && quote.status !== "viewed") {
      return res.status(400).json({
        success: false,
        message: "Quote cannot be rejected in current status",
      });
    }

    // Reject the quote
    await quote.rejectQuote(notes);

    res.json({
      success: true,
      message: "Quote rejected successfully",
      data: { quote },
    });
  } catch (error) {
    console.error("Reject quote error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to reject quote",
      error: error.message,
    });
  }
};

// Add message to quote
export const addQuoteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message, attachments = [] } = req.body;
    const customerId = req.user._id;

    const quote = await Quote.findOne({ _id: id, customer: customerId });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    // Add message
    await quote.addMessage("customer", message, attachments);

    res.json({
      success: true,
      message: "Message added successfully",
      data: { quote },
    });
  } catch (error) {
    console.error("Add quote message error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add message",
      error: error.message,
    });
  }
};

// Search vehicles
export const searchVehicles = async (req, res) => {
  try {
    const {
      q,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build search query
    const searchQuery = { isActive: true };

    if (q) {
      searchQuery.$or = [
        { make: new RegExp(q, "i") },
        { model: new RegExp(q, "i") },
        { description: new RegExp(q, "i") },
        { tags: { $in: [new RegExp(q, "i")] } },
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const vehicles = await Vehicle.find(searchQuery)
      .populate("serviceProvider", "businessName address.city address.country")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Vehicle.countDocuments(searchQuery);

    res.json({
      success: true,
      data: {
        vehicles,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalVehicles: total,
          hasNext: skip + vehicles.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Search vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search vehicles",
      error: error.message,
    });
  }
};

// Respond to quote request
export const respondToQuote = async (req, res) => {
  try {
    const { quoteId } = req.params;
    const {
      response,
      pricing,
      terms,
      validityPeriod = 30,
      specialConditions = [],
    } = req.body;
    const serviceProviderId = req.user._id;

    // Find the quote
    const quote = await Quote.findById(quoteId).populate("customer vehicle");
    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quote not found",
      });
    }

    // Verify the service provider owns this quote
    if (quote.serviceProvider.toString() !== serviceProviderId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to respond to this quote",
      });
    }

    // Update quote with response
    quote.status = "responded";
    quote.serviceProviderResponse = {
      response,
      pricing: pricing || quote.pricing,
      terms: terms || quote.terms,
      validityPeriod,
      specialConditions,
      respondedAt: new Date(),
    };

    // Update expiration date
    quote.expiresAt = new Date(
      Date.now() + validityPeriod * 24 * 60 * 60 * 1000
    );

    // Add response message
    quote.messages.push({
      sender: "serviceProvider",
      message: response,
      timestamp: new Date(),
    });

    await quote.save();

    res.json({
      success: true,
      message: "Quote response submitted successfully",
      data: { quote },
    });
  } catch (error) {
    console.error("Error responding to quote:", error);
    res.status(500).json({
      success: false,
      message: "Failed to respond to quote",
      error: error.message,
    });
  }
};

// Get quotes for service provider
export const getServiceProviderQuotes = async (req, res) => {
  try {
    const serviceProviderId = req.user._id;
    const { status = "all", page = 1, limit = 10 } = req.query;

    const query = { serviceProvider: serviceProviderId };
    if (status !== "all") {
      query.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const quotes = await Quote.find(query)
      .populate("customer vehicle")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Quote.countDocuments(query);

    res.json({
      success: true,
      data: {
        quotes,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalQuotes: total,
          hasNext: skip + quotes.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Error getting service provider quotes:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get quotes",
      error: error.message,
    });
  }
};
