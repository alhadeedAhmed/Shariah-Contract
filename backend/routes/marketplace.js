import express from "express";
import {
  getVehicles,
  getVehicleById,
  getServiceProviders,
  requestQuote,
  getCustomerQuotes,
  getQuoteById,
  acceptQuote,
  rejectQuote,
  addQuoteMessage,
  searchVehicles,
  respondToQuote,
  getServiceProviderQuotes,
  getAllQuotes,
  adminRespondToQuote,
} from "../controllers/marketplaceController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/vehicles", getVehicles);
router.get("/vehicles/search", searchVehicles);
router.get("/vehicles/:id", getVehicleById);
router.get("/service-providers", getServiceProviders);

// Protected routes (authentication required)
router.use(authenticate);

// Quote routes
router.post("/vehicles/:vehicleId/quotes", requestQuote);
router.get("/quotes", getCustomerQuotes);
router.get("/quotes/:id", getQuoteById);
router.post("/quotes/:id/accept", acceptQuote);
router.post("/quotes/:id/reject", rejectQuote);
router.post("/quotes/:id/messages", addQuoteMessage);

// Service provider routes
router.get("/service-provider/quotes", getServiceProviderQuotes);
router.post("/quotes/:quoteId/respond", respondToQuote);

// Admin routes
router.get("/admin/quotes", getAllQuotes);
router.post("/admin/quotes/:quoteId/respond", adminRespondToQuote);

export default router;
