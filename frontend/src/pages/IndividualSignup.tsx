import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  FileText,
  Fingerprint,
  CheckCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const steps = [
  "Registration",
  "Documents",
  "Biometric",
  "MPA Agreement",
  "Verification",
] as const;

const IndividualSignup = () => {
  const [step, setStep] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();

  // Form state matching backend model exactly
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    employment: "",
    income: "",
    // Document Information - matching backend structure
    documents: {
      idDocument: {
        filename: "",
        originalName: "",
        mimetype: "",
        size: 0,
        uploadedAt: null as Date | null,
      },
      salaryCertificate: {
        filename: "",
        originalName: "",
        mimetype: "",
        size: 0,
        uploadedAt: null as Date | null,
      },
      bankStatements: [] as Array<{
        filename: string;
        originalName: string;
        mimetype: string;
        size: number;
        uploadedAt: Date;
      }>,
    },
    // Biometric Information - matching backend structure
    biometricData: {
      fingerprintHash: "",
      faceIdHash: "",
      verified: false,
      verifiedAt: null as Date | null,
    },
    // MPA Agreement - matching backend structure
    mpaAgreement: {
      accepted: false,
      acceptedAt: null as Date | null,
      version: "1.0",
      ipAddress: "",
    },
  });

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleInputChange = (field: string, value: any) => {
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

  const handleFileUpload = (field: string, file: File) => {
    const fileData = {
      filename: `${Date.now()}_${file.name}`,
      originalName: file.name,
      mimetype: file.type,
      size: file.size,
      uploadedAt: new Date(),
    };

    if (field === "documents.bankStatements") {
      setFormData((prev) => ({
        ...prev,
        documents: {
          ...prev.documents,
          bankStatements: [...prev.documents.bankStatements, fileData],
        },
      }));
    } else {
      handleInputChange(field, fileData);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.password ||
        !formData.employment ||
        !formData.income
      ) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      // Validate email format
      if (!validateEmail(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return;
      }

      // Validate documents
      if (
        !formData.documents.idDocument.filename ||
        !formData.documents.salaryCertificate.filename
      ) {
        toast({
          title: "Document Required",
          description: "Please upload ID document and salary certificate",
          variant: "destructive",
        });
        return;
      }

      // Validate biometric verification
      if (!formData.biometricData.verified) {
        toast({
          title: "Biometric Verification Required",
          description: "Please complete biometric verification",
          variant: "destructive",
        });
        return;
      }

      // Validate MPA agreement
      if (!formData.mpaAgreement.accepted) {
        toast({
          title: "MPA Agreement Required",
          description: "Please accept the Master Platform Agreement",
          variant: "destructive",
        });
        return;
      }

      // Convert income to number
      const userData = {
        ...formData,
        income: parseInt(formData.income),
      };

      await signUp(userData, "individual");

      toast({
        title: "Account Created!",
        description:
          "Your account has been created successfully. Please sign in to continue.",
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
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-adalah-dark via-adalah-primary to-adalah-primary relative overflow-hidden text-white">
        {/* Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-adalah-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-adalah-golden/60 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-adalah-golden to-adalah-golden/80 rounded-2xl flex items-center justify-center shadow-2xl">
                <User className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter-tight">
                  Individual Onboarding
                </h1>
                <p className="text-adalah-golden/90 text-lg">
                  Secure & Shariah-Compliant Identity
                </p>
              </div>
            </div>

            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-12">
              Onboard seamlessly with biometric verification, digital
              agreements, and your Shariah Digital Passport.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Paperless KYC
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <Fingerprint className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Biometric Login
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Compliance First
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-adalah-golden/10 p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-adalah-golden/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-adalah-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-adalah-primary via-adalah-golden to-adalah-dark"></div>

            <div className="flex items-center justify-between p-6">
              <h1 className="text-2xl font-bold text-adalah-primary font-inter-tight">
                Individual Signup
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

            {/* Steps */}
            <div className="px-6 pb-8 space-y-6">
              {step === 0 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Full Name *
                      </Label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Your full name"
                        className="border-adalah-primary/20"
                        required
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Email *
                      </Label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="you@example.com"
                        className={`border-adalah-primary/20 ${
                          formData.email && !validateEmail(formData.email)
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                        required
                      />
                      {formData.email && !validateEmail(formData.email) && (
                        <p className="text-red-500 text-sm mt-1">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Password *
                    </Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) =>
                          handleInputChange("password", e.target.value)
                        }
                        placeholder="Create a strong password"
                        className="border-adalah-primary/20 pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Employment *
                      </Label>
                      <Select
                        value={formData.employment}
                        onValueChange={(value) =>
                          handleInputChange("employment", value)
                        }
                      >
                        <SelectTrigger className="border-adalah-primary/20">
                          <SelectValue placeholder="Select employment status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employed">Employed</SelectItem>
                          <SelectItem value="self-employed">
                            Self-Employed
                          </SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="unemployed">Unemployed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Monthly Income *
                      </Label>
                      <Input
                        type="number"
                        value={formData.income}
                        onChange={(e) =>
                          handleInputChange("income", e.target.value)
                        }
                        placeholder="5000"
                        className="border-adalah-primary/20"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-adalah-primary mb-2">
                      Upload Required Documents
                    </h3>
                    <p className="text-sm text-adalah-golden">
                      Please upload clear, readable copies of your documents
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        ID Document * (Passport, Driver's License, or National
                        ID)
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload("documents.idDocument", file);
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.documents.idDocument.filename && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ {formData.documents.idDocument.originalName}{" "}
                          uploaded
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Salary Certificate *
                      </Label>
                      <Input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload(
                              "documents.salaryCertificate",
                              file
                            );
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.documents.salaryCertificate.filename && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ {formData.documents.salaryCertificate.originalName}{" "}
                          uploaded
                        </p>
                      )}
                    </div>

                    <div>
                      <Label className="mb-2 block text-adalah-primary">
                        Bank Statements - Multiple files allowed
                      </Label>
                      <Input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || []);
                          files.forEach((file) =>
                            handleFileUpload("documents.bankStatements", file)
                          );
                        }}
                        className="border-adalah-primary/20"
                      />
                      {formData.documents.bankStatements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-green-600 mb-1">
                            ✓ {formData.documents.bankStatements.length} bank
                            statement(s) uploaded:
                          </p>
                          <ul className="text-xs text-gray-600 ml-4">
                            {formData.documents.bankStatements.map(
                              (doc, index) => (
                                <li key={index}>• {doc.originalName}</li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 text-center">
                  <div>
                    <h3 className="text-lg font-semibold text-adalah-primary mb-2">
                      Biometric Verification
                    </h3>
                    <p className="text-sm text-adalah-golden mb-6">
                      Complete biometric verification for secure access. In
                      production, this would integrate with a real biometric
                      provider.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-adalah-primary/20 rounded-lg">
                      <Fingerprint className="h-8 w-8 text-adalah-golden mx-auto mb-2" />
                      <h4 className="font-medium text-adalah-primary mb-2">
                        Fingerprint
                      </h4>
                      <Button
                        onClick={() => {
                          handleInputChange(
                            "biometricData.fingerprintHash",
                            `fp_${Date.now()}`
                          );
                          // Check if both biometrics are now verified
                          const faceVerified =
                            formData.biometricData.faceIdHash !== "";
                          if (faceVerified) {
                            handleInputChange("biometricData.verified", true);
                            handleInputChange(
                              "biometricData.verifiedAt",
                              new Date()
                            );
                          }
                        }}
                        disabled={formData.biometricData.fingerprintHash !== ""}
                        className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                      >
                        {formData.biometricData.fingerprintHash
                          ? "✓ Verified"
                          : "Verify Fingerprint"}
                      </Button>
                    </div>

                    <div className="p-4 border border-adalah-primary/20 rounded-lg">
                      <User className="h-8 w-8 text-adalah-golden mx-auto mb-2" />
                      <h4 className="font-medium text-adalah-primary mb-2">
                        Face Recognition
                      </h4>
                      <Button
                        onClick={() => {
                          handleInputChange(
                            "biometricData.faceIdHash",
                            `face_${Date.now()}`
                          );
                          // Check if both biometrics are now verified
                          const fingerprintVerified =
                            formData.biometricData.fingerprintHash !== "";
                          if (fingerprintVerified) {
                            handleInputChange("biometricData.verified", true);
                            handleInputChange(
                              "biometricData.verifiedAt",
                              new Date()
                            );
                          }
                        }}
                        disabled={formData.biometricData.faceIdHash !== ""}
                        className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                      >
                        {formData.biometricData.faceIdHash
                          ? "✓ Verified"
                          : "Verify Face"}
                      </Button>
                    </div>
                  </div>

                  {formData.biometricData.verified && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 font-medium">
                        Biometric verification completed!
                      </p>
                      <div className="text-sm text-green-600 space-y-1">
                        <p>
                          ✓ Fingerprint:{" "}
                          {formData.biometricData.fingerprintHash
                            ? "Verified"
                            : "Not verified"}
                        </p>
                        <p>
                          ✓ Face Recognition:{" "}
                          {formData.biometricData.faceIdHash
                            ? "Verified"
                            : "Not verified"}
                        </p>
                        <p>
                          Verified at:{" "}
                          {formData.biometricData.verifiedAt?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-adalah-primary mb-2">
                      Master Platform Agreement (MPA)
                    </h3>
                    <p className="text-sm text-adalah-golden">
                      Please review and accept the terms to continue
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                    <h4 className="font-semibold text-adalah-primary mb-3">
                      Terms and Conditions
                    </h4>
                    <div className="text-sm text-gray-700 space-y-2">
                      <p>
                        <strong>1. Platform Usage:</strong> This platform
                        provides Shariah-compliant financial services and
                        contract management.
                      </p>
                      <p>
                        <strong>2. Data Protection:</strong> Your personal and
                        financial data will be protected according to
                        international standards.
                      </p>
                      <p>
                        <strong>3. Shariah Compliance:</strong> All services are
                        designed to comply with Islamic financial principles.
                      </p>
                      <p>
                        <strong>4. Digital Identity:</strong> Your biometric
                        data will be securely stored and used for authentication
                        purposes only.
                      </p>
                      <p>
                        <strong>5. Agreement Duration:</strong> This agreement
                        remains in effect until terminated by either party.
                      </p>
                      <p>
                        <strong>6. Dispute Resolution:</strong> Any disputes
                        will be resolved through Shariah-compliant arbitration.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="mpa-agreement"
                      checked={formData.mpaAgreement.accepted}
                      onChange={(e) => {
                        handleInputChange(
                          "mpaAgreement.accepted",
                          e.target.checked
                        );
                        if (e.target.checked) {
                          handleInputChange(
                            "mpaAgreement.acceptedAt",
                            new Date()
                          );
                          handleInputChange(
                            "mpaAgreement.ipAddress",
                            "127.0.0.1"
                          ); // Mock IP
                        }
                      }}
                      className="mt-1 h-4 w-4 text-adalah-primary border-adalah-primary/30 rounded focus:ring-adalah-primary/20"
                    />
                    <label
                      htmlFor="mpa-agreement"
                      className="text-sm text-adalah-primary leading-relaxed"
                    >
                      I have read and agree to the{" "}
                      <a
                        href="#"
                        className="text-adalah-golden hover:text-adalah-primary underline font-medium"
                        onClick={(e) => e.preventDefault()}
                      >
                        Master Platform Agreement (MPA)
                      </a>
                      , and understand the terms and conditions of using this
                      platform.
                    </label>
                  </div>

                  {formData.mpaAgreement.accepted && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
                      <p className="text-green-700 font-medium text-center">
                        MPA Agreement accepted!
                      </p>
                      <p className="text-sm text-green-600 text-center">
                        Accepted at:{" "}
                        {formData.mpaAgreement.acceptedAt?.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6 text-center">
                  <div className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold text-adalah-primary tracking-tight font-inter-tight mb-2">
                      Shariah Digital Passport Issued
                    </h3>
                    <p className="text-adalah-golden mb-6">
                      Your identity and agreement have been verified. You can
                      now access the marketplace.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700">
                        KYC Verification
                      </div>
                      <div className="text-green-600">✓ Completed</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700">
                        Credit Scoring
                      </div>
                      <div className="text-green-600">✓ Completed</div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-700">
                        Digital Passport
                      </div>
                      <div className="text-green-600">✓ Issued</div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-adalah-primary mb-2">
                      Next Steps
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>
                        • Access the marketplace to browse Shariah-compliant
                        contracts
                      </li>
                      <li>• Complete your profile setup</li>
                      <li>• Start your first investment or contract</li>
                    </ul>
                  </div>
                </div>
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
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold"
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

export default IndividualSignup;
