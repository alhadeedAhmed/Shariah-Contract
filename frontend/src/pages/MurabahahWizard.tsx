import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import SecureChat from "@/components/shared/SecureChat";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { motion } from "framer-motion";
import apiService from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  year: number;
  variant?: string;
  price: number;
  currency: string;
  specifications: {
    engine?: string;
    transmission?: string;
    fuelType?: string;
    mileage?: number;
    color?: string;
    bodyType?: string;
  };
  serviceProvider: {
    _id: string;
    businessName: string;
  };
}

interface Contract {
  _id: string;
  contractNumber: string;
  title: string;
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
  aiAnalysis?: {
    kycScore: number;
    creditScore: number;
    riskAssessment: {
      level: string;
      score: number;
      factors: string[];
    };
    shariahCompliance: {
      isCompliant: boolean;
      complianceScore: number;
      complianceNotes: string[];
    };
  };
  status: string;
}

const MurabahahWizard = () => {
  const [steps, setSteps] = useState<WorkflowStep[]>([
    {
      id: "details",
      title: "Enter transaction details",
      status: "in_progress",
    },
    { id: "analysis", title: "AI analysis & profiling", status: "pending" },
    { id: "contract", title: "Generate & review contract", status: "pending" },
    { id: "sign", title: "Sign & submit for review", status: "pending" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [contractGenerationLoading, setContractGenerationLoading] =
    useState(false);
  const [contract, setContract] = useState<Contract | null>(null);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isEditMode, setIsEditMode] = useState(true);
  const [formData, setFormData] = useState({
    vehicleId: "",
    downPayment: "",
    repaymentPeriod: "12",
    purpose: "",
    notes: "",
    // Additional contract fields
    installmentFrequency: "monthly",
    ownershipTransfer: "upon_completion",
    earlyPaymentAllowed: true,
    earlyPaymentDiscount: 5,
    latePaymentPenalty: 0,
    gracePeriod: 7,
    specialConditions: "",
    // AI Analysis preferences
    kycScore: 0,
    creditScore: 0,
    riskTolerance: "medium",
    // Document preferences
    requireInsurance: true,
    requireMaintenance: true,
    // Payment preferences
    preferredPaymentMethod: "satpay",
    paymentReminderDays: 7,
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();

  // Load vehicle data on component mount
  useEffect(() => {
    const vehicleId = searchParams.get("vehicle");
    if (vehicleId) {
      loadVehicle(vehicleId);
      setFormData((prev) => ({ ...prev, vehicleId }));
    }
  }, [searchParams]);

  // Load vehicle details
  const loadVehicle = async (vehicleId: string) => {
    try {
      const response = await apiService.getVehicleById(vehicleId);
      if (response.success) {
        setVehicle(response.data.vehicle);
      }
    } catch (error) {
      console.error("Error loading vehicle:", error);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Run AI Analysis
  const runAIAnalysis = async () => {
    if (!contract) return;

    try {
      setAiAnalysisLoading(true);
      const response = await apiService.runAIAnalysis(contract._id);

      if (response.success) {
        // Update contract with AI analysis from backend
        setContract((prev) =>
          prev
            ? {
                ...prev,
                aiAnalysis: response.data.aiAnalysis,
              }
            : null
        );

        setSteps((prev) =>
          prev.map((step, index) =>
            index === 1 ? { ...step, status: "completed" } : step
          )
        );
        setCurrentStep(2);

        // Show success toast
        toast({
          title: "AI Analysis Completed!",
          description:
            "Your contract has been analyzed. Now you can generate the contract.",
          variant: "default",
        });
      } else {
        toast({
          title: "AI Analysis Failed",
          description: "Failed to run AI analysis. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error running AI analysis:", error);
      toast({
        title: "AI Analysis Failed",
        description: "Failed to run AI analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setAiAnalysisLoading(false);
    }
  };

  // Generate Contract
  const generateContract = async () => {
    if (!contract) return;

    try {
      setContractGenerationLoading(true);

      // Call backend instead of simulating
      const response = await apiService.generateContract(contract._id);

      if (response.success) {
        // update contract so preview shows only after generation
        setContract((prev) =>
          prev ? { ...prev, status: "pending_approval" } : null
        );

        setSteps((prev) =>
          prev.map((step, index) =>
            index === 2 ? { ...step, status: "completed" } : step
          )
        );
        setCurrentStep(3);

        toast({
          title: "Contract Generated!",
          description:
            "Your contract has been generated. Review and sign to complete.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error generating contract:", error);
      toast({
        title: "Contract Generation Failed",
        description: "Failed to generate contract. Please try again.",
        variant: "destructive",
      });
    } finally {
      setContractGenerationLoading(false);
    }
  };

  // Create Murabahah contract
  const createContract = async () => {
    if (
      !formData.vehicleId ||
      !formData.downPayment ||
      !formData.repaymentPeriod
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate down payment
    if (vehicle && parseInt(formData.downPayment) > vehicle.price) {
      alert(
        `Down payment (${formData.downPayment} ${vehicle.currency}) cannot exceed vehicle price (${vehicle.price} ${vehicle.currency})`
      );
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.createMurabahahContract({
        vehicleId: formData.vehicleId,
        downPayment: parseInt(formData.downPayment),
        repaymentPeriod: parseInt(formData.repaymentPeriod),
        purpose: formData.purpose,
        notes: formData.notes,
        // Additional contract terms
        installmentFrequency: formData.installmentFrequency,
        ownershipTransfer: formData.ownershipTransfer,
        earlyPayment: {
          allowed: formData.earlyPaymentAllowed,
          discount: formData.earlyPaymentDiscount,
        },
        latePayment: {
          penalty: formData.latePaymentPenalty,
          gracePeriod: formData.gracePeriod,
        },
        specialConditions: formData.specialConditions
          ? [formData.specialConditions]
          : [],
        // AI Analysis preferences
        kycScore: formData.kycScore,
        creditScore: formData.creditScore,
        riskTolerance: formData.riskTolerance,
        // Document requirements
        requireInsurance: formData.requireInsurance,
        requireMaintenance: formData.requireMaintenance,
        // Payment preferences
        preferredPaymentMethod: formData.preferredPaymentMethod,
        paymentReminderDays: formData.paymentReminderDays,
      });

      if (response.success) {
        console.log("Contract created:", response.data.contract);
        console.log("Has AI Analysis:", !!response.data.contract.aiAnalysis);
        setContract(response.data.contract);
        setIsEditMode(false); // Disable fields after contract creation
        setSteps((prev) =>
          prev.map((step, index) =>
            index === 0 ? { ...step, status: "completed" } : step
          )
        );
        setCurrentStep(1);

        // Show success toast
        toast({
          title: "Contract Created Successfully!",
          description:
            "Your contract has been created. Now proceed with AI analysis.",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error creating contract:", error);
      alert("Failed to create contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit contract for review
  const submitContract = async () => {
    if (!contract) {
      alert("No contract found. Please create a contract first.");
      return;
    }

    // Check if contract has all required fields
    if (!contract.aiAnalysis) {
      alert(
        "Contract is not ready for review. Please complete AI analysis first."
      );
      return;
    }

    if (contract.status === "draft") {
      alert(
        "Contract is still in draft status. Please complete all steps first."
      );
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.submitContractForReview(contract._id);
      if (response.success) {
        setSteps((prev) =>
          prev.map((step) => ({ ...step, status: "completed" }))
        );
        navigate(`/applications/${contract._id}`);
      }
    } catch (error) {
      console.error("Error submitting contract:", error);
      alert("Failed to submit contract. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Wizard Steps */}
          <div className="lg:col-span-2 space-y-10">
            {/* Step 1: Transaction Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                    <span className="text-adalah-primary text-sm font-bold">
                      1
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                    Transaction Details
                  </h1>
                </div>

                {/* Vehicle Information Display */}
                {vehicle && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-adalah-primary mb-2">
                      Selected Vehicle
                    </h3>
                    <p className="text-adalah-primary">
                      {vehicle.year} {vehicle.make} {vehicle.model}
                      {vehicle.variant && ` ${vehicle.variant}`}
                    </p>
                    <p className="text-adalah-golden">
                      Price: {vehicle.currency} {vehicle.price.toLocaleString()}
                    </p>
                    <p className="text-sm text-adalah-primary/70">
                      Dealer: {vehicle.serviceProvider.businessName}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Down Payment ({vehicle?.currency || "USD"})
                    </label>
                    <Input
                      type="number"
                      placeholder="3000"
                      value={formData.downPayment}
                      onChange={(e) =>
                        handleInputChange("downPayment", e.target.value)
                      }
                      disabled={!isEditMode}
                      className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Repayment Period
                    </label>
                    <Select
                      value={formData.repaymentPeriod}
                      onValueChange={(value) =>
                        handleInputChange("repaymentPeriod", value)
                      }
                      disabled={!isEditMode}
                    >
                      <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                        <SelectValue placeholder="12 months" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                        <SelectItem value="48">48 months</SelectItem>
                        <SelectItem value="60">60 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Purpose
                    </label>
                    <Input
                      placeholder="e.g., Personal vehicle for family use"
                      value={formData.purpose}
                      onChange={(e) =>
                        handleInputChange("purpose", e.target.value)
                      }
                      disabled={!isEditMode}
                      className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Additional Notes
                    </label>
                    <Textarea
                      placeholder="Any specific requirements or notes..."
                      value={formData.notes}
                      onChange={(e) =>
                        handleInputChange("notes", e.target.value)
                      }
                      disabled={!isEditMode}
                      className="border-adalah-primary/20 min-h-[100px] focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                </div>

                {/* Additional Contract Terms */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Contract Terms & Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Installment Frequency
                      </label>
                      <Select
                        value={formData.installmentFrequency}
                        onValueChange={(value) =>
                          handleInputChange("installmentFrequency", value)
                        }
                        disabled={!isEditMode}
                      >
                        <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                          <SelectValue placeholder="Monthly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="semi_annually">
                            Semi-Annually
                          </SelectItem>
                          <SelectItem value="annually">Annually</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Ownership Transfer
                      </label>
                      <Select
                        value={formData.ownershipTransfer}
                        onValueChange={(value) =>
                          handleInputChange("ownershipTransfer", value)
                        }
                        disabled={!isEditMode}
                      >
                        <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                          <SelectValue placeholder="Upon Completion" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="upon_completion">
                            Upon Completion
                          </SelectItem>
                          <SelectItem value="gradual">Gradual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Early Payment Discount (%)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="5"
                        value={formData.earlyPaymentDiscount}
                        onChange={(e) =>
                          handleInputChange(
                            "earlyPaymentDiscount",
                            e.target.value
                          )
                        }
                        disabled={!isEditMode}
                        className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Grace Period (Days)
                      </label>
                      <Input
                        type="number"
                        min="0"
                        placeholder="7"
                        value={formData.gracePeriod}
                        onChange={(e) =>
                          handleInputChange("gracePeriod", e.target.value)
                        }
                        disabled={!isEditMode}
                        className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Special Conditions
                      </label>
                      <Textarea
                        placeholder="Any special terms or conditions..."
                        value={formData.specialConditions}
                        onChange={(e) =>
                          handleInputChange("specialConditions", e.target.value)
                        }
                        disabled={!isEditMode}
                        className="border-adalah-primary/20 min-h-[80px] focus:border-adalah-golden focus:ring-adalah-golden/30"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Analysis Preferences */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    AI Analysis Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Risk Tolerance
                      </label>
                      <Select
                        value={formData.riskTolerance}
                        onValueChange={(value) =>
                          handleInputChange("riskTolerance", value)
                        }
                        disabled={!isEditMode}
                      >
                        <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                          <SelectValue placeholder="Medium" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Preferred Payment Method
                      </label>
                      <Select value="satpay" disabled={true}>
                        <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                          <SelectValue placeholder="SATpay" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="satpay">SATpay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-adalah-primary mb-2">
                        Payment Reminder (Days)
                      </label>
                      <Input
                        type="number"
                        min="1"
                        max="30"
                        placeholder="7"
                        value={formData.paymentReminderDays}
                        onChange={(e) =>
                          handleInputChange(
                            "paymentReminderDays",
                            e.target.value
                          )
                        }
                        disabled={!isEditMode}
                        className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                      />
                    </div>
                  </div>
                </div>

                {/* Document Requirements */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-adalah-primary mb-4">
                    Document Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="requireInsurance"
                        checked={formData.requireInsurance}
                        onChange={(e) =>
                          handleInputChange(
                            "requireInsurance",
                            e.target.checked.toString()
                          )
                        }
                        disabled={!isEditMode}
                        className="h-4 w-4 text-adalah-golden focus:ring-adalah-golden border-adalah-primary/20 rounded"
                      />
                      <label
                        htmlFor="requireInsurance"
                        className="text-sm font-medium text-adalah-primary"
                      >
                        Require Insurance Coverage
                      </label>
                    </div>

                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        id="requireMaintenance"
                        checked={formData.requireMaintenance}
                        onChange={(e) =>
                          handleInputChange(
                            "requireMaintenance",
                            e.target.checked.toString()
                          )
                        }
                        disabled={!isEditMode}
                        className="h-4 w-4 text-adalah-golden focus:ring-adalah-golden border-adalah-primary/20 rounded"
                      />
                      <label
                        htmlFor="requireMaintenance"
                        className="text-sm font-medium text-adalah-primary"
                      >
                        Require Maintenance Records
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    onClick={createContract}
                    disabled={
                      loading ||
                      !formData.vehicleId ||
                      !formData.downPayment ||
                      !formData.repaymentPeriod ||
                      !isEditMode
                    }
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg"
                  >
                    {loading ? "Creating..." : "Create Contract"}
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Step 2: AI Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                    <span className="text-adalah-primary text-sm font-bold">
                      2
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                    AI Analysis & Profiling
                  </h1>
                </div>

                {contract?.aiAnalysis ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-gradient-to-br from-adalah-golden/10 to-adalah-golden/5 rounded-lg border border-adalah-golden/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-adalah-golden"></div>
                          <span className="text-sm font-medium text-adalah-primary">
                            KYC Score
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-adalah-golden">
                          {contract.aiAnalysis.kycScore}%
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-adalah-primary/10 to-adalah-primary/5 rounded-lg border border-adalah-primary/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-adalah-primary"></div>
                          <span className="text-sm font-medium text-adalah-primary">
                            Credit Score
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-adalah-primary">
                          {contract.aiAnalysis.creditScore}
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg border border-green-500/20">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm font-medium text-adalah-primary">
                            Risk Level
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-green-600">
                          {contract.aiAnalysis.riskAssessment.level}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-adalah-golden/5 to-adalah-primary/5 rounded-lg border border-adalah-golden/20">
                      <h3 className="font-semibold text-adalah-primary mb-2">
                        Shariah Compliance Check
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            contract.aiAnalysis.shariahCompliance.isCompliant
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-adalah-primary">
                          {contract.aiAnalysis.shariahCompliance.isCompliant
                            ? "✓"
                            : "✗"}{" "}
                          Contract structure complies with Murabahah principles
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            contract.aiAnalysis.shariahCompliance.isCompliant
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></div>
                        <span className="text-sm text-adalah-primary">
                          Compliance Score:{" "}
                          {
                            contract.aiAnalysis.shariahCompliance
                              .complianceScore
                          }
                          %
                        </span>
                      </div>
                      {contract.aiAnalysis.shariahCompliance.complianceNotes
                        .length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-adalah-primary mb-1">
                            Notes:
                          </p>
                          <ul className="text-sm text-adalah-primary/70 space-y-1">
                            {contract.aiAnalysis.shariahCompliance.complianceNotes.map(
                              (note, index) => (
                                <li key={index}>• {note}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg border border-blue-500/20">
                      <h3 className="font-semibold text-adalah-primary mb-2">
                        Risk Assessment
                      </h3>
                      <p className="text-sm text-adalah-primary mb-2">
                        Risk Score: {contract.aiAnalysis.riskAssessment.score}
                        /100
                      </p>
                      <div className="space-y-1">
                        {contract.aiAnalysis.riskAssessment.factors.map(
                          (factor, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div className="h-1 w-1 rounded-full bg-adalah-primary"></div>
                              <span className="text-sm text-adalah-primary/70">
                                {factor}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-adalah-primary/70 mb-4">
                      AI analysis will be performed after contract creation
                    </p>
                    <Button
                      onClick={runAIAnalysis}
                      disabled={aiAnalysisLoading || !contract}
                      className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg"
                    >
                      {aiAnalysisLoading ? "Analyzing..." : "Run AI Analysis"}
                    </Button>
                  </div>
                )}

                {contract?.aiAnalysis && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={generateContract}
                      disabled={contractGenerationLoading}
                      className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg"
                    >
                      {contractGenerationLoading
                        ? "Generating..."
                        : "Generate Contract"}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>

            {/* Step 3: Contract Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                    <span className="text-adalah-primary text-sm font-bold">
                      3
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                    Generated Contract (Preview)
                  </h1>
                </div>

                {contract?.status === "pending_approval" ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h3 className="font-semibold text-adalah-primary">
                          Vehicle Details
                        </h3>
                        <div className="space-y-2 text-sm text-adalah-primary">
                          <p>
                            <strong>Make:</strong> {vehicle?.make}
                          </p>
                          <p>
                            <strong>Model:</strong> {vehicle?.model}
                          </p>
                          <p>
                            <strong>Year:</strong> {vehicle?.year}
                          </p>
                          {vehicle?.variant && (
                            <p>
                              <strong>Variant:</strong> {vehicle.variant}
                            </p>
                          )}
                          <p>
                            <strong>Price:</strong> {vehicle?.currency}{" "}
                            {vehicle?.price?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="font-semibold text-adalah-primary">
                          Financial Terms
                        </h3>
                        <div className="space-y-2 text-sm text-adalah-primary">
                          <p>
                            <strong>Purchase Price:</strong>{" "}
                            {contract.financialTerms.currency}{" "}
                            {contract.financialTerms.purchasePrice.toLocaleString()}
                          </p>
                          <p>
                            <strong>Down Payment:</strong>{" "}
                            {contract.financialTerms.currency}{" "}
                            {contract.financialTerms.downPayment.toLocaleString()}
                          </p>
                          <p>
                            <strong>Financing Amount:</strong>{" "}
                            {contract.financialTerms.currency}{" "}
                            {contract.financialTerms.financingAmount.toLocaleString()}
                          </p>
                          <p>
                            <strong>Profit Margin:</strong>{" "}
                            {contract.financialTerms.currency}{" "}
                            {contract.financialTerms.profitMargin.toLocaleString()}
                          </p>
                          <p className="font-semibold text-adalah-golden">
                            <strong>Total Amount:</strong>{" "}
                            {contract.financialTerms.currency}{" "}
                            {contract.financialTerms.totalAmount.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-semibold text-adalah-primary">
                        Payment Schedule
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-adalah-primary">
                        <div>
                          <p>
                            <strong>Installment Amount:</strong>{" "}
                            {contract.paymentSchedule.currency}{" "}
                            {contract.paymentSchedule.installmentAmount.toLocaleString()}
                          </p>
                          <p>
                            <strong>Number of Installments:</strong>{" "}
                            {contract.paymentSchedule.numberOfInstallments}
                          </p>
                          <p>
                            <strong>Frequency:</strong>{" "}
                            {contract.paymentSchedule.installmentFrequency}
                          </p>
                        </div>
                        <div>
                          <p>
                            <strong>First Payment:</strong>{" "}
                            {new Date(
                              contract.paymentSchedule.firstPaymentDate
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <strong>Last Payment:</strong>{" "}
                            {new Date(
                              contract.paymentSchedule.lastPaymentDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-adalah-golden/5 to-adalah-primary/5 rounded-lg border border-adalah-golden/20">
                      <h3 className="font-semibold text-adalah-primary mb-2">
                        Shariah Compliance
                      </h3>
                      <p className="text-sm text-adalah-primary">
                        This contract follows Murabahah principles with
                        transparent profit margins and no interest-based
                        elements. Ownership transfer is clearly defined and
                        price transparency is ensured throughout the
                        transaction.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-adalah-primary/70 mb-4">
                      Contract will be generated after AI analysis
                    </p>
                  </div>
                )}

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                    disabled={!contract}
                    onClick={() => {
                      setIsEditMode(true); // Enable edit mode
                      setCurrentStep(0);
                      // Reset steps to allow re-editing
                      setSteps((prev) =>
                        prev.map((step, index) =>
                          index === 0
                            ? { ...step, status: "in_progress" }
                            : { ...step, status: "pending" }
                        )
                      );
                    }}
                  >
                    Modify Details
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg"
                    onClick={submitContract}
                    disabled={loading || !contract}
                  >
                    {loading ? "Submitting..." : "Accept & Sign"}
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <DocumentCenter
                title="Contract Documents"
                documents={[
                  {
                    id: "d1",
                    name: "Murabahah Contract Draft",
                    version: "1.0",
                    status: "draft",
                    updatedAt: "just now",
                  },
                  {
                    id: "d2",
                    name: "KYC Summary",
                    version: "1.0",
                    status: "review",
                    updatedAt: "just now",
                  },
                ]}
              />
            </motion.div>
          </div>

          {/* Right: Workflow & Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <WorkflowTracker title="Process" steps={steps} />
            <SecureChat
              title="Advisor"
              initialMessages={[
                {
                  id: "1",
                  author: "AI Advisor",
                  text: "Ask me about Murabahah terms or compliance.",
                  time: "now",
                },
              ]}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MurabahahWizard;
