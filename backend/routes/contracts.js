import express from "express";
import {
  createMurabahahContract,
  runAIAnalysis,
  generateContract,
  submitContractForReview,
  getCustomerContracts,
  getContractById,
  getCustomerApplications,
  getApplicationById,
  acceptContractTerms,
  initiateContractNegotiation,
  getContractApprovalStatus,
  approveContractByScholar,
  approveContractByCapitalProvider,
} from "../controllers/contractController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Contract routes
router.post("/murabahah", createMurabahahContract);
router.post("/murabahah/:contractId/ai-analysis", runAIAnalysis);
router.post("/murabahah/:contractId/generate", generateContract);
router.post("/murabahah/:contractId/submit", submitContractForReview);
router.get("/murabahah", getCustomerContracts);
router.get("/murabahah/:id", getContractById);

// Phase 4: Approval Process routes
router.get("/murabahah/:contractId/approval-status", getContractApprovalStatus);
router.post("/murabahah/:contractId/accept-terms", acceptContractTerms);
router.post("/murabahah/:contractId/negotiate", initiateContractNegotiation);

// Approval workflow endpoints (for scholars and capital providers)
router.post("/murabahah/:contractId/scholar-approve", approveContractByScholar);
router.post(
  "/murabahah/:contractId/capital-provider-approve",
  approveContractByCapitalProvider
);

// Application routes
router.get("/applications", getCustomerApplications);
router.get("/applications/:id", getApplicationById);

export default router;
