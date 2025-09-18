import MurabahahContract from "../models/MurabahahContract.js";
import Application from "../models/Application.js";
import Vehicle from "../models/Vehicle.js";
import Individual from "../models/Individual.js";
import CapitalProvider from "../models/CapitalProvider.js";

// Create Murabahah contract
export const createMurabahahContract = async (req, res) => {
  try {
    const {
      vehicleId,
      downPayment,
      repaymentPeriod,
      purpose,
      notes,
      // Additional contract terms
      installmentFrequency = "monthly",
      ownershipTransfer = "upon_completion",
      earlyPayment = { allowed: true, discount: 5 },
      latePayment = { penalty: 0, gracePeriod: 7 },
      specialConditions = [],
      // AI Analysis preferences
      kycScore = 0,
      creditScore = 0,
      riskTolerance = "medium",
      // Document requirements
      requireInsurance = true,
      requireMaintenance = true,
      // Payment preferences
      preferredPaymentMethod = "bank_transfer",
      paymentReminderDays = 7,
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

    // Get customer details
    const customer = await Individual.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // For individual user flow, we don't need a capital provider
    // The service provider handles the financing directly

    // Calculate financial terms
    const purchasePrice = vehicle.price;

    // Validate down payment
    if (downPayment > purchasePrice) {
      return res.status(400).json({
        success: false,
        message: `Down payment (${downPayment} ${vehicle.currency}) cannot exceed vehicle price (${purchasePrice} ${vehicle.currency})`,
      });
    }

    const financingAmount = purchasePrice - downPayment;
    const profitMargin = financingAmount * 0.1; // 10% profit margin
    const totalAmount = financingAmount + profitMargin;
    const installmentAmount = totalAmount / repaymentPeriod;

    // Calculate payment dates
    const firstPaymentDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    const lastPaymentDate = new Date(firstPaymentDate);
    lastPaymentDate.setMonth(lastPaymentDate.getMonth() + repaymentPeriod - 1);

    // Create contract
    const contract = new MurabahahContract({
      title: `Murabahah Contract - ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      customer: customerId,
      serviceProvider: vehicle.serviceProvider,
      // No capital provider needed for individual user flow
      vehicle: vehicleId,
      vehicleDetails: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        variant: vehicle.variant,
        color: vehicle.specifications.color,
        vin: vehicle.specifications.vin || "",
        engineNumber: vehicle.specifications.engineNumber || "",
      },
      financialTerms: {
        purchasePrice,
        downPayment,
        financingAmount,
        profitMargin,
        totalAmount,
        currency: vehicle.currency,
      },
      paymentSchedule: {
        installmentAmount,
        numberOfInstallments: repaymentPeriod,
        installmentFrequency,
        firstPaymentDate,
        lastPaymentDate,
      },
      terms: {
        ownershipTransfer,
        earlyPayment,
        latePayment,
        defaultConditions: [
          requireInsurance ? "Customer must maintain insurance coverage" : null,
          "Vehicle must be used for lawful purposes only",
          "Customer must notify of any changes in financial status",
          requireMaintenance
            ? "Customer must maintain vehicle in good condition"
            : null,
        ].filter(Boolean),
        specialConditions: [...specialConditions, ...(notes ? [notes] : [])],
      },
      // AI Analysis will be added later when user clicks "Run AI Analysis"
      status: "draft",
      aiAnalysis: null,
    });

    await contract.save();

    // Create application
    const application = new Application({
      applicant: customerId,
      applicantType: "Individual",
      serviceProvider: vehicle.serviceProvider,
      type: "murabahah",
      title: `Murabahah Contract - ${vehicle.make} ${vehicle.model} ${vehicle.year}`,
      details: {
        description:
          purpose ||
          `Purchase of ${vehicle.make} ${vehicle.model} ${vehicle.year}`,
        amount: totalAmount,
        currency: vehicle.currency,
        purpose: purpose || "Vehicle purchase",
        timeline: `${repaymentPeriod} months`,
      },
      vehicle: vehicleId,
      vehicleDetails: {
        make: vehicle.make,
        model: vehicle.model,
        year: vehicle.year,
        price: purchasePrice,
        downPayment,
        financingAmount,
        repaymentPeriod,
      },
      status: "draft",
    });

    await application.save();

    // Populate contract with related data
    await contract.populate([
      { path: "customer", select: "fullName email phone" },
      { path: "serviceProvider", select: "businessName address phone email" },
      { path: "vehicle", select: "make model year price images" },
    ]);

    res.status(201).json({
      success: true,
      message: "Murabahah contract created successfully",
      data: { contract, application },
    });
  } catch (error) {
    console.error("Create Murabahah contract error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Murabahah contract",
      error: error.message,
    });
  }
};

// Run AI analysis on contract
export const runAIAnalysis = async (req, res) => {
  try {
    const { contractId } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    // Get customer details for analysis
    const customer = await Individual.findById(customerId);

    // Simulate AI analysis (in real implementation, this would call AI service)
    const aiAnalysis = {
      kycScore: Math.floor(Math.random() * 40) + 60, // 60-100
      creditScore: Math.floor(Math.random() * 200) + 650, // 650-850
      riskAssessment: {
        level:
          Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low",
        score: Math.floor(Math.random() * 50) + 30, // 30-80
        factors: [
          "Income stability",
          "Credit history",
          "Debt-to-income ratio",
          "Employment verification",
        ],
      },
      shariahCompliance: {
        isCompliant: true,
        complianceScore: Math.floor(Math.random() * 20) + 80, // 80-100
        complianceNotes: [
          "No interest (riba) involved",
          "Asset ownership transfer is clear",
          "Profit margin is transparent",
          "Contract terms are fair and just",
        ],
      },
      analysisDate: new Date(),
    };

    // Update contract with AI analysis
    contract.aiAnalysis = aiAnalysis;
    contract.status = "pending_approval";
    await contract.save();

    res.json({
      success: true,
      message: "AI analysis completed successfully",
      data: { aiAnalysis },
    });
  } catch (error) {
    console.error("Run AI analysis error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to run AI analysis",
      error: error.message,
    });
  }
};

// Generate contract document
export const generateContract = async (req, res) => {
  try {
    const { contractId } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    }).populate([
      { path: "customer", select: "fullName email phone address" },
      { path: "serviceProvider", select: "businessName address phone email" },
      { path: "vehicle", select: "make model year vin specifications" },
    ]);

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    // Generate contract document (in real implementation, this would generate PDF)
    const contractDocument = {
      contractNumber: contract.contractNumber,
      title: contract.title,
      parties: {
        customer: {
          name: contract.customer.fullName,
          email: contract.customer.email,
          phone: contract.customer.phone,
          address: contract.customer.address,
        },
        serviceProvider: {
          name: contract.serviceProvider.businessName,
          email: contract.serviceProvider.email,
          phone: contract.serviceProvider.phone,
          address: contract.serviceProvider.address,
        },
      },
      vehicle: {
        make: contract.vehicle.make,
        model: contract.vehicle.model,
        year: contract.vehicle.year,
        vin: contract.vehicleDetails.vin,
        color: contract.vehicleDetails.color,
      },
      financialTerms: contract.financialTerms,
      paymentSchedule: contract.paymentSchedule,
      terms: contract.terms,
      shariahCompliance: {
        principles: [
          "No interest (riba) involved",
          "Asset ownership transfer is clear",
          "Profit margin is transparent and agreed upon",
          "Contract is based on cost-plus sale (Murabahah)",
          "All terms are fair and just",
        ],
        complianceNotes: contract.aiAnalysis.shariahCompliance.complianceNotes,
      },
      generatedAt: new Date(),
    };

    // Update contract status
    contract.status = "pending_approval";
    await contract.save();

    res.json({
      success: true,
      message: "Contract generated successfully",
      data: { contractDocument },
    });
  } catch (error) {
    console.error("Generate contract error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate contract",
      error: error.message,
    });
  }
};

// Submit contract for review
export const submitContractForReview = async (req, res) => {
  try {
    const { contractId } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    if (contract.status !== "pending_approval") {
      return res.status(400).json({
        success: false,
        message: "Contract is not ready for review",
      });
    }

    // Update contract status to scholar review
    contract.status = "scholar_review";
    contract.reviews.scholar.status = "in_progress";
    contract.reviews.scholar.reviewDate = new Date();
    await contract.save();

    // Update application status
    const application = await Application.findOne({
      applicant: customerId,
      type: "murabahah",
      status: "draft",
    });

    if (application) {
      await application.submitApplication();
      // Add notification for scholar review
      await application.addNotification(
        "review_assigned",
        "Contract sent for Shariah review",
        "Your contract has been submitted to our Shariah scholars for compliance review.",
        "high"
      );
    }

    res.json({
      success: true,
      message: "Contract submitted for review successfully",
      data: { contract },
    });
  } catch (error) {
    console.error("Submit contract for review error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit contract for review",
      error: error.message,
    });
  }
};

// Accept contract terms (Phase 4.3)
export const acceptContractTerms = async (req, res) => {
  try {
    const { contractId } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    if (contract.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Contract is not approved yet",
      });
    }

    // Update contract status to accepted
    contract.status = "accepted";
    contract.acceptedAt = new Date();
    await contract.save();

    // Add notification
    const application = await Application.findOne({
      applicant: customerId,
      type: "murabahah",
    });

    if (application) {
      await application.addNotification(
        "approval",
        "Contract terms accepted",
        "You have successfully accepted the final terms and conditions.",
        "high"
      );
    }

    res.json({
      success: true,
      message: "Contract terms accepted successfully",
      data: { contract },
    });
  } catch (error) {
    console.error("Accept contract terms error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to accept contract terms",
      error: error.message,
    });
  }
};

// Initiate contract negotiation (Phase 4.3)
export const initiateContractNegotiation = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { negotiationReason, proposedChanges } = req.body;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    if (contract.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: "Contract is not approved yet",
      });
    }

    // Update contract status to negotiation
    contract.status = "negotiation";
    contract.negotiation = {
      initiated: true,
      initiatedAt: new Date(),
      reason: negotiationReason,
      proposedChanges: proposedChanges || [],
      status: "pending",
    };
    await contract.save();

    // Add notification
    const application = await Application.findOne({
      applicant: customerId,
      type: "murabahah",
    });

    if (application) {
      await application.addNotification(
        "status_update",
        "Contract negotiation initiated",
        "Your request to negotiate contract terms has been submitted for review.",
        "medium"
      );
    }

    res.json({
      success: true,
      message: "Contract negotiation initiated successfully",
      data: { contract },
    });
  } catch (error) {
    console.error("Initiate contract negotiation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to initiate contract negotiation",
      error: error.message,
    });
  }
};

// Get contract approval status
export const getContractApprovalStatus = async (req, res) => {
  try {
    const { contractId } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      customer: customerId,
    })
      .populate("reviews.scholar.reviewer", "fullName email")
      .populate("reviews.financial.reviewer", "institutionName email");

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    // Get application notifications
    const application = await Application.findOne({
      applicant: customerId,
      type: "murabahah",
    });

    res.json({
      success: true,
      data: {
        contract,
        notifications: application?.notifications || [],
      },
    });
  } catch (error) {
    console.error("Get contract approval status error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get contract approval status",
      error: error.message,
    });
  }
};

// Scholar approves contract (Phase 4.1 → 4.2)
export const approveContractByScholar = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { scholarId, comments } = req.body;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      status: "scholar_review",
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found or not in scholar review status",
      });
    }

    // Approve by scholar
    await contract.approveByScholar(scholarId, comments);

    // Update application status
    const application = await Application.findOne({
      applicant: contract.customer,
      type: "murabahah",
    });

    if (application) {
      await application.assignToCapitalProvider("default-capital-provider");
      await application.addNotification(
        "approval",
        "Scholar approval received (POF)",
        "Congratulations! Your contract has been approved by our Shariah scholars. Proof of Faith certificate issued.",
        "high"
      );
      await application.addNotification(
        "review_assigned",
        "Application sent for financial assessment",
        "Your application is now being reviewed by our capital providers for financial approval.",
        "high"
      );
    }

    res.json({
      success: true,
      message: "Contract approved by scholar successfully",
      data: { contract },
    });
  } catch (error) {
    console.error("Approve contract by scholar error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve contract by scholar",
      error: error.message,
    });
  }
};

// Capital provider approves contract (Phase 4.2 → 4.3)
export const approveContractByCapitalProvider = async (req, res) => {
  try {
    const { contractId } = req.params;
    const { capitalProviderId, comments } = req.body;

    const contract = await MurabahahContract.findOne({
      _id: contractId,
      status: "financial_review",
    });

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found or not in financial review status",
      });
    }

    // Approve by capital provider
    await contract.approveByCapitalProvider(capitalProviderId, comments);

    // Update application status
    const application = await Application.findOne({
      applicant: contract.customer,
      type: "murabahah",
    });

    if (application) {
      await application.addNotification(
        "approval",
        "Financial approval received",
        "Great news! Your application has been approved by our capital providers.",
        "high"
      );
      await application.addNotification(
        "approval",
        "Offer Letter received",
        "Your official offer letter is ready for review. Please review the terms and conditions.",
        "urgent"
      );
    }

    res.json({
      success: true,
      message: "Contract approved by capital provider successfully",
      data: { contract },
    });
  } catch (error) {
    console.error("Approve contract by capital provider error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to approve contract by capital provider",
      error: error.message,
    });
  }
};

// Get customer contracts
export const getCustomerContracts = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { page = 1, limit = 10, status } = req.query;

    // Build query
    const query = { customer: customerId };
    if (status) query.status = status;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const contracts = await MurabahahContract.find(query)
      .populate("serviceProvider", "businessName address.city address.country")
      .populate("vehicle", "make model year price images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await MurabahahContract.countDocuments(query);

    res.json({
      success: true,
      data: {
        contracts,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalContracts: total,
          hasNext: skip + contracts.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get customer contracts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contracts",
      error: error.message,
    });
  }
};

// Get single contract by ID
export const getContractById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user._id;

    const contract = await MurabahahContract.findOne({
      _id: id,
      customer: customerId,
    })
      .populate("customer", "fullName email phone address")
      .populate("serviceProvider", "businessName address phone email website")
      .populate("vehicle", "make model year price images specifications")
      .populate("reviews.scholar.reviewer", "fullName email")
      .populate("reviews.financial.reviewer", "institutionName email");

    if (!contract) {
      return res.status(404).json({
        success: false,
        message: "Contract not found",
      });
    }

    res.json({
      success: true,
      data: { contract },
    });
  } catch (error) {
    console.error("Get contract by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch contract",
      error: error.message,
    });
  }
};

// Get customer applications
export const getCustomerApplications = async (req, res) => {
  try {
    const customerId = req.user._id;
    const { page = 1, limit = 10, status, type } = req.query;

    // Build query
    const query = { applicant: customerId, applicantType: "Individual" };
    if (status) query.status = status;
    if (type) query.type = type;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const applications = await Application.find(query)
      .populate("serviceProvider", "businessName address.city address.country")
      .populate("vehicle", "make model year price images")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Application.countDocuments(query);

    res.json({
      success: true,
      data: {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / parseInt(limit)),
          totalApplications: total,
          hasNext: skip + applications.length < total,
          hasPrev: parseInt(page) > 1,
        },
      },
    });
  } catch (error) {
    console.error("Get customer applications error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
      error: error.message,
    });
  }
};

// Get single application by ID
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerId = req.user._id;

    const application = await Application.findOne({
      _id: id,
      applicant: customerId,
    })
      .populate("applicant", "fullName email phone address")
      .populate("serviceProvider", "businessName address phone email website")
      .populate("vehicle", "make model year price images specifications")
      .populate("reviews.scholar.reviewer", "fullName email")
      .populate("reviews.financial.reviewer", "institutionName email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.json({
      success: true,
      data: { application },
    });
  } catch (error) {
    console.error("Get application by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application",
      error: error.message,
    });
  }
};
