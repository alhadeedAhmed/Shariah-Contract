// src/pages/CapitalProviderSignup.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Banknote, ShieldCheck, BarChart3, Upload } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { createFileData, FileData } from "@/utils/fileUtils";

const steps = [
  "Institution Onboarding",
  "Risk Profile Setup",
  "Compliance Documents",
  "Completion",
] as const;

const CapitalProviderSignup = () => {
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    institutionName: "",
    email: "",
    password: "",
    regulatoryLicense: {
      licenseNumber: "",
      issuingAuthority: "",
      issueDate: "",
      expiryDate: "",
      status: "active",
    },
    complianceOfficer: {
      name: "",
      email: "",
      phone: "",
    },
    complianceDocuments: {
      licenseDocument: {
        filename: "",
        originalName: "",
        mimetype: "",
        size: 0,
        uploadedAt: null as Date | null,
        base64Data: "",
        publicUrl: "",
      },
      complianceCertificate: {
        filename: "",
        originalName: "",
        mimetype: "",
        size: 0,
        uploadedAt: null as Date | null,
        base64Data: "",
        publicUrl: "",
      },
      auditReports: [] as Array<FileData & { year: number }>,
    },
    riskProfile: {
      riskTolerance: "medium",
      lendingCriteria: [] as string[],
      productOfferings: [] as string[],
      pricingModels: [] as string[],
      maximumLoanAmount: "",
      minimumLoanAmount: "",
    },
    complianceVerified: false,
  });

  const handleChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleArrayChange = (
    field: string,
    value: string,
    checked: boolean
  ) => {
    const [parent, child] = field.split(".");
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...(prev[parent as keyof typeof prev] as any),
        [child]: checked
          ? [...(prev[parent as keyof typeof prev] as any)[child], value]
          : (prev[parent as keyof typeof prev] as any)[child].filter(
              (item: string) => item !== value
            ),
      },
    }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleFileUpload = async (field: string, file: File) => {
    try {
      if (field === "complianceDocuments.auditReports") {
        const year = new Date().getFullYear();
        const fileData = await createFileData(file, { year });
        setFormData((prev) => ({
          ...prev,
          complianceDocuments: {
            ...prev.complianceDocuments,
            auditReports: [...prev.complianceDocuments.auditReports, fileData],
          },
        }));
      } else {
        const fileData = await createFileData(file);
        handleChange(field, fileData);
      }
    } catch (error) {
      toast({
        title: "File Upload Error",
        description: "Failed to process the file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const validateStep = (stepNumber: number) => {
    switch (stepNumber) {
      case 0: // Institution Onboarding
        if (!formData.institutionName.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter institution name",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.email.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter email address",
            variant: "destructive",
          });
          return false;
        }
        if (!validateEmail(formData.email)) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.password.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter password",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.regulatoryLicense.licenseNumber.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter regulatory license number",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.regulatoryLicense.issuingAuthority.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter issuing authority",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.regulatoryLicense.issueDate) {
          toast({
            title: "Validation Error",
            description: "Please select license issue date",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.regulatoryLicense.expiryDate) {
          toast({
            title: "Validation Error",
            description: "Please select license expiry date",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.complianceOfficer.name.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter compliance officer name",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.complianceOfficer.email.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter compliance officer email",
            variant: "destructive",
          });
          return false;
        }
        if (!validateEmail(formData.complianceOfficer.email)) {
          toast({
            title: "Invalid Compliance Officer Email",
            description:
              "Please enter a valid compliance officer email address",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 1: // Risk Profile Setup
        if (!formData.riskProfile.maximumLoanAmount.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter maximum loan amount",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.riskProfile.minimumLoanAmount.trim()) {
          toast({
            title: "Validation Error",
            description: "Please enter minimum loan amount",
            variant: "destructive",
          });
          return false;
        }
        if (formData.riskProfile.lendingCriteria.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please select at least one lending criteria",
            variant: "destructive",
          });
          return false;
        }
        if (formData.riskProfile.productOfferings.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please select at least one product offering",
            variant: "destructive",
          });
          return false;
        }
        if (formData.riskProfile.pricingModels.length === 0) {
          toast({
            title: "Validation Error",
            description: "Please select at least one pricing model",
            variant: "destructive",
          });
          return false;
        }
        return true;

      case 2: // Compliance Documents
        if (!formData.complianceDocuments.licenseDocument.filename) {
          toast({
            title: "Validation Error",
            description: "Please upload license document",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.complianceDocuments.complianceCertificate.filename) {
          toast({
            title: "Validation Error",
            description: "Please upload compliance certificate",
            variant: "destructive",
          });
          return false;
        }
        if (!formData.complianceVerified) {
          toast({
            title: "Validation Error",
            description: "Please confirm compliance verification",
            variant: "destructive",
          });
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const next = () => {
    if (validateStep(step)) {
      setStep((s) => Math.min(s + 1, steps.length - 1));
    }
  };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (
        !formData.institutionName ||
        !formData.email ||
        !formData.password ||
        !formData.regulatoryLicense.licenseNumber ||
        !formData.regulatoryLicense.issuingAuthority ||
        !formData.regulatoryLicense.issueDate ||
        !formData.regulatoryLicense.expiryDate ||
        !formData.complianceOfficer.name ||
        !formData.complianceOfficer.email ||
        !formData.riskProfile.maximumLoanAmount ||
        !formData.riskProfile.minimumLoanAmount ||
        formData.riskProfile.lendingCriteria.length === 0 ||
        formData.riskProfile.productOfferings.length === 0 ||
        formData.riskProfile.pricingModels.length === 0 ||
        !formData.complianceVerified
      ) {
        toast({
          title: "Validation Error",
          description:
            "Please fill in all required fields and complete compliance verification",
          variant: "destructive",
        });
        return;
      }

      // Validate email formats
      if (!validateEmail(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid institution email address",
          variant: "destructive",
        });
        return;
      }

      if (!validateEmail(formData.complianceOfficer.email)) {
        toast({
          title: "Invalid Compliance Officer Email",
          description: "Please enter a valid compliance officer email address",
          variant: "destructive",
        });
        return;
      }

      // Convert loan amounts to numbers
      const userData = {
        ...formData,
        riskProfile: {
          ...formData.riskProfile,
          maximumLoanAmount: parseInt(formData.riskProfile.maximumLoanAmount),
          minimumLoanAmount: parseInt(formData.riskProfile.minimumLoanAmount),
        },
      };

      await signUp(userData, "capitalProvider");

      toast({
        title: "Account Created!",
        description:
          "Your institution account has been created successfully. Please sign in to continue.",
      });

      navigate("/signin");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Signup failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const complete = () => {
    handleSubmit();
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-adalah-primary via-adalah-dark to-adalah-primary relative overflow-hidden text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-adalah-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-adalah-golden to-adalah-dark rounded-2xl flex items-center justify-center shadow-2xl">
                <Banknote className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter-tight">
                  Capital Provider Onboarding
                </h1>
                <p className="text-adalah-golden/90 text-lg">
                  Institutional Financing Gateway
                </p>
              </div>
            </div>

            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-12">
              Register your institution, configure compliance and risk settings,
              and gain access to our Islamic financing marketplace.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <ShieldCheck className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Compliance Verification</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Risk Profile Setup</p>
              </div>
              <div className="text-center">
                <Banknote className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Capital Allocation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-adalah-golden/10 p-6 sm:p-10 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-adalah-golden/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-adalah-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-adalah-primary via-adalah-golden to-adalah-dark"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <h1 className="text-2xl font-bold text-adalah-primary font-inter-tight">
                Capital Provider Signup
              </h1>
              <Link
                to="/signin"
                className="text-sm text-adalah-golden hover:text-adalah-primary transition-colors"
              >
                Have an account? Sign in
              </Link>
            </div>

            {/* Progress */}
            <div className="px-6">
              <Progress
                value={((step + 1) / steps.length) * 100}
                className="mb-3"
              />
              <p className="text-sm text-adalah-golden mb-6">
                Step {step + 1} of {steps.length}: {steps[step]}
              </p>
            </div>

            {/* Step Content */}
            <div className="px-6 pb-8 space-y-6">
              {step === 0 && (
                <motion.div
                  key="onboarding"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Institution Name *
                    </Label>
                    <Input
                      placeholder="e.g., Al Noor Bank"
                      className="border-adalah-primary/20"
                      value={formData.institutionName}
                      onChange={(e) =>
                        handleChange("institutionName", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="bank@alnoor.com"
                      className={`border-adalah-primary/20 ${
                        formData.email && !validateEmail(formData.email)
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {formData.email && !validateEmail(formData.email) && (
                      <p className="text-red-500 text-sm mt-1">
                        Please enter a valid email address
                      </p>
                    )}
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Password *
                    </Label>
                    <Input
                      type="password"
                      placeholder="Create a secure password"
                      className="border-adalah-primary/20"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Regulatory License # *
                    </Label>
                    <Input
                      placeholder="e.g., SAMA-2024-001"
                      className="border-adalah-primary/20"
                      value={formData.regulatoryLicense.licenseNumber}
                      onChange={(e) =>
                        handleChange(
                          "regulatoryLicense.licenseNumber",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Issuing Authority *
                    </Label>
                    <Input
                      placeholder="e.g., Saudi Arabian Monetary Authority"
                      className="border-adalah-primary/20"
                      value={formData.regulatoryLicense.issuingAuthority}
                      onChange={(e) =>
                        handleChange(
                          "regulatoryLicense.issuingAuthority",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      License Issue Date *
                    </Label>
                    <Input
                      type="date"
                      className="border-adalah-primary/20"
                      value={formData.regulatoryLicense.issueDate}
                      onChange={(e) =>
                        handleChange(
                          "regulatoryLicense.issueDate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      License Expiry Date *
                    </Label>
                    <Input
                      type="date"
                      className="border-adalah-primary/20"
                      value={formData.regulatoryLicense.expiryDate}
                      onChange={(e) =>
                        handleChange(
                          "regulatoryLicense.expiryDate",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Compliance Officer Name *
                    </Label>
                    <Input
                      placeholder="e.g., Dr. Fatima Al-Zahra"
                      className="border-adalah-primary/20"
                      value={formData.complianceOfficer.name}
                      onChange={(e) =>
                        handleChange("complianceOfficer.name", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Compliance Officer Email *
                    </Label>
                    <Input
                      type="email"
                      placeholder="compliance@alnoor.com"
                      className={`border-adalah-primary/20 ${
                        formData.complianceOfficer.email &&
                        !validateEmail(formData.complianceOfficer.email)
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }`}
                      value={formData.complianceOfficer.email}
                      onChange={(e) =>
                        handleChange("complianceOfficer.email", e.target.value)
                      }
                    />
                    {formData.complianceOfficer.email &&
                      !validateEmail(formData.complianceOfficer.email) && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a valid email address
                        </p>
                      )}
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Compliance Officer Phone
                    </Label>
                    <Input
                      type="tel"
                      placeholder="+966112345678"
                      className="border-adalah-primary/20"
                      value={formData.complianceOfficer.phone}
                      onChange={(e) =>
                        handleChange("complianceOfficer.phone", e.target.value)
                      }
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-2 block text-adalah-primary">
                      Upload Compliance Document
                    </Label>
                    <div className="flex items-center gap-3">
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        className="border-adalah-primary/20"
                        onChange={(e) =>
                          handleChange("complianceFile", e.target.files?.[0])
                        }
                      />
                      <Upload className="text-adalah-primary w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="risk"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Risk Tolerance *
                    </Label>
                    <select
                      className="w-full p-2 border border-adalah-primary/20 rounded-md"
                      value={formData.riskProfile.riskTolerance}
                      onChange={(e) =>
                        handleChange(
                          "riskProfile.riskTolerance",
                          e.target.value
                        )
                      }
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="very-high">Very High</option>
                    </select>
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Maximum Loan Amount *
                    </Label>
                    <Input
                      type="number"
                      placeholder="5000000"
                      className="border-adalah-primary/20"
                      value={formData.riskProfile.maximumLoanAmount}
                      onChange={(e) =>
                        handleChange(
                          "riskProfile.maximumLoanAmount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Minimum Loan Amount *
                    </Label>
                    <Input
                      type="number"
                      placeholder="50000"
                      className="border-adalah-primary/20"
                      value={formData.riskProfile.minimumLoanAmount}
                      onChange={(e) =>
                        handleChange(
                          "riskProfile.minimumLoanAmount",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Lending Criteria *
                    </Label>
                    <div className="space-y-2">
                      {[
                        "SMEs",
                        "Startups",
                        "Large Corporations",
                        "Government Entities",
                        "Individuals",
                      ].map((criteria) => (
                        <label
                          key={criteria}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.riskProfile.lendingCriteria.includes(
                              criteria
                            )}
                            onChange={(e) =>
                              handleArrayChange(
                                "riskProfile.lendingCriteria",
                                criteria,
                                e.target.checked
                              )
                            }
                            className="rounded"
                          />
                          <span className="text-sm">{criteria}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Product Offerings *
                    </Label>
                    <div className="space-y-2">
                      {[
                        "Murabahah",
                        "Musharakah",
                        "Ijara",
                        "Salam",
                        "Istisna",
                        "Takaful",
                      ].map((product) => (
                        <label
                          key={product}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.riskProfile.productOfferings.includes(
                              product
                            )}
                            onChange={(e) =>
                              handleArrayChange(
                                "riskProfile.productOfferings",
                                product,
                                e.target.checked
                              )
                            }
                            className="rounded"
                          />
                          <span className="text-sm">{product}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Pricing Models *
                    </Label>
                    <div className="space-y-2">
                      {[
                        "Fixed Rate",
                        "Variable Rate",
                        "Profit Sharing",
                        "Cost Plus",
                      ].map((model) => (
                        <label
                          key={model}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            checked={formData.riskProfile.pricingModels.includes(
                              model
                            )}
                            onChange={(e) =>
                              handleArrayChange(
                                "riskProfile.pricingModels",
                                model,
                                e.target.checked
                              )
                            }
                            className="rounded"
                          />
                          <span className="text-sm">{model}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="compliance"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-adalah-primary mb-2">
                      Upload Compliance Documents
                    </h3>
                    <p className="text-sm text-adalah-golden">
                      Please upload required compliance documents
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        License Document *
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload(
                              "complianceDocuments.licenseDocument",
                              file
                            );
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.complianceDocuments.licenseDocument
                        .filename && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 mb-2">
                            ✓{" "}
                            {
                              formData.complianceDocuments.licenseDocument
                                .originalName
                            }{" "}
                            uploaded
                          </p>
                          {formData.complianceDocuments.licenseDocument
                            .publicUrl && (
                            <div className="mt-2">
                              <img
                                src={
                                  formData.complianceDocuments.licenseDocument
                                    .publicUrl
                                }
                                alt="License Document Preview"
                                className="max-w-xs max-h-32 object-contain border border-gray-200 rounded"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Compliance Certificate *
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload(
                              "complianceDocuments.complianceCertificate",
                              file
                            );
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.complianceDocuments.complianceCertificate
                        .filename && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 mb-2">
                            ✓{" "}
                            {
                              formData.complianceDocuments.complianceCertificate
                                .originalName
                            }{" "}
                            uploaded
                          </p>
                          {formData.complianceDocuments.complianceCertificate
                            .publicUrl && (
                            <div className="mt-2">
                              <img
                                src={
                                  formData.complianceDocuments
                                    .complianceCertificate.publicUrl
                                }
                                alt="Compliance Certificate Preview"
                                className="max-w-xs max-h-32 object-contain border border-gray-200 rounded"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Audit Reports (Multiple files allowed)
                      </Label>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach((file) =>
                            handleFileUpload(
                              "complianceDocuments.auditReports",
                              file
                            )
                          );
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.complianceDocuments.auditReports.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 mb-2">
                            ✓ {formData.complianceDocuments.auditReports.length}{" "}
                            audit report(s) uploaded:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {formData.complianceDocuments.auditReports.map(
                              (doc, index) => (
                                <div
                                  key={index}
                                  className="border border-gray-200 rounded p-2"
                                >
                                  <p className="text-xs text-gray-600 mb-1">
                                    • {doc.originalName} ({doc.year})
                                  </p>
                                  {doc.publicUrl && (
                                    <img
                                      src={doc.publicUrl}
                                      alt={`Audit Report ${index + 1} Preview`}
                                      className="max-w-full max-h-24 object-contain"
                                    />
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start space-x-3 pt-4">
                      <input
                        type="checkbox"
                        id="compliance-verified"
                        checked={formData.complianceVerified}
                        onChange={(e) =>
                          handleChange("complianceVerified", e.target.checked)
                        }
                        className="mt-1 h-4 w-4 text-adalah-primary border-adalah-primary/30 rounded focus:ring-adalah-primary/20"
                      />
                      <label
                        htmlFor="compliance-verified"
                        className="text-sm text-adalah-primary leading-relaxed"
                      >
                        I confirm that all compliance documents are accurate and
                        up-to-date. Our institution meets all regulatory
                        requirements for Shariah-compliant financial services.
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="completion"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 text-center"
                >
                  <p className="text-2xl font-semibold text-adalah-primary tracking-tight font-inter-tight">
                    Capital Provider Digital Passport Issued
                  </p>
                  <p className="text-adalah-golden">
                    Your institution is now verified and ready to participate in
                    Islamic economy transactions on the platform.
                  </p>
                </motion.div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 0}
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white hover:opacity-90"
                    onClick={next}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold hover:opacity-90"
                    onClick={complete}
                  >
                    Finish
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CapitalProviderSignup;
