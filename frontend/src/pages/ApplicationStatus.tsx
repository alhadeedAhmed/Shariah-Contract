import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import apiService from "@/services/api";

// Phase 4.1: Scholar Review Waiting
const scholarReviewSteps: WorkflowStep[] = [
  {
    id: "submitted",
    title: "Contract sent for Shariah review",
    status: "completed",
  },
  {
    id: "analysis",
    title: "Scholar compliance analysis",
    status: "in_progress",
  },
  { id: "peer", title: "Peer consultation", status: "pending" },
  { id: "pof", title: "Issue Proof of Faith (POF)", status: "pending" },
];

// Phase 4.2: Financial Review Waiting
const financialReviewSteps: WorkflowStep[] = [
  {
    id: "queued",
    title: "Application sent for financial assessment",
    status: "completed",
  },
  {
    id: "risk",
    title: "Capital provider risk assessment",
    status: "in_progress",
  },
  { id: "scoring", title: "Credit scoring & evaluation", status: "pending" },
  { id: "offer", title: "Offer Letter issuance", status: "pending" },
];

// Phase 4.3: Review Results
const reviewResultsSteps: WorkflowStep[] = [
  {
    id: "scholar_approved",
    title: "Scholar approval received (POF)",
    status: "completed",
  },
  {
    id: "financial_approved",
    title: "Financial approval received",
    status: "completed",
  },
  { id: "offer_received", title: "Offer Letter received", status: "completed" },
  {
    id: "terms_review",
    title: "Review final terms and conditions",
    status: "in_progress",
  },
  {
    id: "accept_negotiate",
    title: "Accept or negotiate terms",
    status: "pending",
  },
];

interface NotificationItem {
  id: string;
  type: "scholar" | "financial" | "system" | "offer";
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  priority: "low" | "medium" | "high" | "urgent";
}

interface ContractData {
  _id: string;
  status: string;
  contractNumber: string;
  reviews: {
    scholar: {
      status: string;
      reviewer?: string;
      reviewDate?: string;
      comments?: string;
      proofOfFaith: {
        issued: boolean;
        issuedAt?: string;
        certificateUrl?: string;
      };
    };
    financial: {
      status: string;
      reviewer?: string;
      reviewDate?: string;
      comments?: string;
      offerLetter: {
        issued: boolean;
        issuedAt?: string;
        documentUrl?: string;
      };
    };
  };
  financialTerms: {
    purchasePrice: number;
    downPayment: number;
    financingAmount: number;
    profitMargin: number;
    totalAmount: number;
    currency: string;
  };
  paymentSchedule: {
    installmentAmount: number;
    numberOfInstallments: number;
    installmentFrequency: string;
    firstPaymentDate: string;
    lastPaymentDate: string;
    currency: string;
  };
}

const ApplicationStatus = () => {
  const { id } = useParams();
  const { updateApplication } = useAppStore();
  const { toast } = useToast();
  const [contract, setContract] = useState<ContractData | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState<
    "scholar" | "financial" | "results"
  >("scholar");

  // Load contract data
  useEffect(() => {
    if (id) {
      loadContractData();
    }
  }, [id]);

  const loadContractData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getContractApprovalStatus(id!);
      if (response.success) {
        setContract(response.data.contract);
        updateCurrentPhase(response.data.contract);
        generateNotifications(response.data.contract);
      }
    } catch (error) {
      console.error("Error loading contract:", error);
      toast({
        title: "Error",
        description: "Failed to load contract data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCurrentPhase = (contractData: ContractData) => {
    // Debug: Log the contract data to see what we're working with
    console.log("Contract status:", contractData.status);
    console.log("Reviews object:", contractData.reviews);
    console.log("Scholar status:", contractData.reviews?.scholar?.status);
    console.log("Financial status:", contractData.reviews?.financial?.status);

    if (
      contractData.reviews?.scholar?.status === "approved" &&
      contractData.reviews?.financial?.status === "approved"
    ) {
      setCurrentPhase("results");
    } else if (
      contractData.reviews?.scholar?.status === "approved" ||
      contractData.status === "financial_review"
    ) {
      setCurrentPhase("financial");
    } else {
      setCurrentPhase("scholar");
    }
  };

  const generateNotifications = (contractData: ContractData) => {
    const newNotifications: NotificationItem[] = [];

    // Scholar review notifications
    if (contractData.status === "scholar_review") {
      newNotifications.push({
        id: "scholar-1",
        type: "scholar",
        title: "Contract sent for Shariah review",
        message:
          "Your contract has been submitted to our Shariah scholars for compliance review.",
        timestamp: "Just now",
        isRead: false,
        priority: "high",
      });
    }

    if (contractData.reviews.scholar.status === "approved") {
      newNotifications.push({
        id: "scholar-2",
        type: "scholar",
        title: "Scholar approval received (POF)",
        message:
          "Congratulations! Your contract has been approved by our Shariah scholars. Proof of Faith certificate issued.",
        timestamp: "2 hours ago",
        isRead: false,
        priority: "high",
      });
    }

    // Financial review notifications
    if (
      contractData.reviews.scholar.status === "approved" &&
      contractData.status === "financial_review"
    ) {
      newNotifications.push({
        id: "financial-1",
        type: "financial",
        title: "Application sent for financial assessment",
        message:
          "Your application is now being reviewed by our capital providers for financial approval.",
        timestamp: "1 hour ago",
        isRead: false,
        priority: "high",
      });
    }

    if (contractData.reviews.financial.status === "approved") {
      newNotifications.push({
        id: "financial-2",
        type: "financial",
        title: "Financial approval received",
        message:
          "Great news! Your application has been approved by our capital providers.",
        timestamp: "30 minutes ago",
        isRead: false,
        priority: "high",
      });
    }

    // Offer letter notifications
    if (contractData.reviews.financial.offerLetter.issued) {
      newNotifications.push({
        id: "offer-1",
        type: "offer",
        title: "Offer Letter received",
        message:
          "Your official offer letter is ready for review. Please review the terms and conditions.",
        timestamp: "15 minutes ago",
        isRead: false,
        priority: "urgent",
      });
    }

    setNotifications(newNotifications);
  };

  const getCurrentSteps = () => {
    switch (currentPhase) {
      case "scholar":
        return scholarReviewSteps;
      case "financial":
        return financialReviewSteps;
      case "results":
        return reviewResultsSteps;
      default:
        return scholarReviewSteps;
    }
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case "scholar":
        return "Phase 4.1: Scholar Review Waiting";
      case "financial":
        return "Phase 4.2: Financial Review Waiting";
      case "results":
        return "Phase 4.3: Review Results";
      default:
        return "Approval Process";
    }
  };

  const handleAcceptTerms = async () => {
    try {
      const response = await apiService.acceptContractTerms(id!);
      if (response.success) {
        toast({
          title: "Terms Accepted",
          description: "You have accepted the final terms and conditions.",
          variant: "default",
        });
        // Reload contract data to update status
        loadContractData();
      }
    } catch (error) {
      console.error("Error accepting terms:", error);
      toast({
        title: "Error",
        description: "Failed to accept terms. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleNegotiateTerms = async () => {
    try {
      const negotiationData = {
        negotiationReason: "Customer requested modification of terms",
        proposedChanges: ["Review payment schedule", "Adjust profit margin"],
      };

      const response = await apiService.initiateContractNegotiation(
        id!,
        negotiationData
      );
      if (response.success) {
        toast({
          title: "Negotiation Initiated",
          description: "Your request to negotiate terms has been submitted.",
          variant: "default",
        });
        // Reload contract data to update status
        loadContractData();
      }
    } catch (error) {
      console.error("Error initiating negotiation:", error);
      toast({
        title: "Error",
        description: "Failed to initiate negotiation. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
        <DashboardHeader />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Phase Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold text-adalah-primary mb-2">
            {getPhaseTitle()}
          </h1>
          <p className="text-adalah-primary/70">
            Track your contract approval progress in real-time
          </p>
        </motion.div>

        {/* Current Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <Badge
            variant="outline"
            className="px-4 py-2 text-lg border-adalah-golden text-adalah-golden"
          >
            Contract #{contract?.contractNumber || id}
          </Badge>
        </motion.div>

        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <WorkflowTracker title="Approval Process" steps={getCurrentSteps()} />

          {/* Notifications */}
          <Card className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
            <h2 className="text-lg font-bold text-adalah-primary mb-4 font-inter-tight">
              Real-time Updates
            </h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.type === "scholar"
                      ? "border-adalah-golden/20 bg-adalah-golden/5"
                      : notification.type === "financial"
                      ? "border-blue-500/20 bg-blue-500/5"
                      : notification.type === "offer"
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-adalah-primary">
                        {notification.title}
                      </p>
                      <p className="text-sm text-adalah-primary/70 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-adalah-primary/50 mt-2">
                        {notification.timestamp}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        notification.priority === "urgent"
                          ? "border-red-500 text-red-500"
                          : notification.priority === "high"
                          ? "border-orange-500 text-orange-500"
                          : "border-gray-400 text-gray-500"
                      }`}
                    >
                      {notification.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Phase 4.2: Financial Assessment Review */}
        {currentPhase === "financial" && contract && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
              <h2 className="text-2xl font-bold text-adalah-primary mb-6">
                Financial Assessment Review
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Risk Assessment */}
                <div>
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Risk Assessment & Scoring
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-blue-800">
                          Credit Score
                        </span>
                        <span className="text-2xl font-bold text-blue-600">
                          750
                        </span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-800">
                          Risk Level
                        </span>
                        <span className="text-lg font-bold text-green-600">
                          LOW
                        </span>
                      </div>
                      <p className="text-sm text-green-700">
                        Based on income stability and payment history
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-orange-800">
                          Debt-to-Income Ratio
                        </span>
                        <span className="text-lg font-bold text-orange-600">
                          28%
                        </span>
                      </div>
                      <p className="text-sm text-orange-700">
                        Within acceptable range for Islamic financing
                      </p>
                    </div>
                  </div>
                </div>

                {/* Capital Provider Analysis */}
                <div>
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Capital Provider Analysis
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="font-medium text-purple-800">
                          Institution
                        </span>
                      </div>
                      <p className="text-sm text-purple-700">
                        Al-Rajhi Bank - Islamic Finance Division
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="font-medium text-indigo-800">
                          Financing Capacity
                        </span>
                      </div>
                      <p className="text-sm text-indigo-700">
                        Available: {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.financingAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg border border-teal-200">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                        <span className="font-medium text-teal-800">
                          Approval Status
                        </span>
                      </div>
                      <p className="text-sm text-teal-700">
                        Under Review - Expected completion in 2-3 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preliminary Credit Decision */}
              <div className="mt-8 p-6 bg-gradient-to-r from-adalah-golden/10 to-adalah-primary/10 rounded-lg border border-adalah-golden/20">
                <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                  Preliminary Credit Decision
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-adalah-golden mb-2">
                      ✓
                    </div>
                    <p className="text-sm font-medium text-adalah-primary">
                      Income Verification
                    </p>
                    <p className="text-xs text-adalah-primary/70">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-adalah-golden mb-2">
                      ✓
                    </div>
                    <p className="text-sm font-medium text-adalah-primary">
                      Asset Assessment
                    </p>
                    <p className="text-xs text-adalah-primary/70">Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-400 mb-2">
                      ⏳
                    </div>
                    <p className="text-sm font-medium text-adalah-primary">
                      Final Approval
                    </p>
                    <p className="text-xs text-adalah-primary/70">Pending</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Phase 4.3: Review Results - Terms and Conditions */}
        {currentPhase === "results" && contract && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
              <h2 className="text-2xl font-bold text-adalah-primary mb-6">
                Final Terms and Conditions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Financial Terms */}
                <div>
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Financial Terms
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Purchase Price:
                      </span>
                      <span className="font-medium">
                        {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.purchasePrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Down Payment:
                      </span>
                      <span className="font-medium">
                        {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.downPayment.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Financing Amount:
                      </span>
                      <span className="font-medium">
                        {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.financingAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Profit Margin:
                      </span>
                      <span className="font-medium">
                        {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.profitMargin.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-adalah-primary font-semibold">
                        Total Amount:
                      </span>
                      <span className="font-bold text-adalah-golden">
                        {contract.financialTerms.currency}{" "}
                        {contract.financialTerms.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Schedule */}
                <div>
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Payment Schedule
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Installment Amount:
                      </span>
                      <span className="font-medium">
                        {contract.paymentSchedule.currency}{" "}
                        {contract.paymentSchedule.installmentAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Number of Installments:
                      </span>
                      <span className="font-medium">
                        {contract.paymentSchedule.numberOfInstallments}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">Frequency:</span>
                      <span className="font-medium capitalize">
                        {contract.paymentSchedule.installmentFrequency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        First Payment:
                      </span>
                      <span className="font-medium">
                        {new Date(
                          contract.paymentSchedule.firstPaymentDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-adalah-primary/70">
                        Last Payment:
                      </span>
                      <span className="font-medium">
                        {new Date(
                          contract.paymentSchedule.lastPaymentDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={handleAcceptTerms}
                  className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold shadow-md hover:shadow-lg px-8"
                >
                  Accept Terms
                </Button>
                <Button
                  onClick={handleNegotiateTerms}
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5 px-8"
                >
                  Negotiate Terms
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <DocumentCenter
            title="Contract Documents"
            documents={[
              {
                id: "pof",
                name: "Proof of Faith (POF)",
                version: contract?.reviews.scholar.proofOfFaith.issued
                  ? "1.0"
                  : "Pending",
                status: contract?.reviews.scholar.proofOfFaith.issued
                  ? "approved"
                  : "draft",
                updatedAt: contract?.reviews.scholar.proofOfFaith.issuedAt
                  ? new Date(
                      contract.reviews.scholar.proofOfFaith.issuedAt
                    ).toLocaleString()
                  : "Pending",
              },
              {
                id: "offer",
                name: "Offer Letter",
                version: contract?.reviews.financial.offerLetter.issued
                  ? "1.0"
                  : "Pending",
                status: contract?.reviews.financial.offerLetter.issued
                  ? "approved"
                  : "draft",
                updatedAt: contract?.reviews.financial.offerLetter.issuedAt
                  ? new Date(
                      contract.reviews.financial.offerLetter.issuedAt
                    ).toLocaleString()
                  : "Pending",
              },
              {
                id: "contract",
                name: "Murabahah Contract",
                version: "1.0",
                status: "approved",
                updatedAt: "Just now",
              },
            ]}
          />
        </motion.div>

        {/* Navigation Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {currentPhase === "results" && (
            <>
              <Link to={`/delivery/${id ?? "unknown"}`}>
                <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg">
                  Proceed to Delivery
                </Button>
              </Link>
              <Link to={`/payments`}>
                <Button
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  View Payment Schedule
                </Button>
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
