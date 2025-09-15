import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
  Shield,
  Briefcase,
  FileText,
  CheckCircle,
  Fingerprint,
  UserCheck,
} from "lucide-react";

const steps = [
  "KYB Details",
  "Docs Upload",
  "Biometric Verification",
  "Business Verification",
  "MPA",
  "Passport",
] as const;

const BusinessSignup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();
  const { signInAs } = useAuth();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    try {
      localStorage.setItem("pendingRole", "business");
      localStorage.removeItem("role");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-adalah-primary via-adalah-dark to-adalah-primary relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-10">
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
              <div className="w-16 h-16 bg-gradient-to-br from-adalah-golden to-adalah-golden/80 rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter-tight">
                  Business Onboarding
                </h1>
                <p className="text-adalah-golden/90 text-lg">
                  Shariah-Compliant Corporate Identity
                </p>
              </div>
            </div>

            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-12">
              Seamlessly onboard your business with KYB, biometric verification,
              digital agreements, and Shariah-compliant passports.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <Briefcase className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-xl font-bold text-adalah-golden">500+</p>
                <p className="text-sm text-white/70">Businesses Verified</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-xl font-bold text-adalah-golden">100%</p>
                <p className="text-sm text-white/70">Paperless KYB</p>
              </div>
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-adalah-golden mx-auto mb-2" />
                <p className="text-xl font-bold text-adalah-golden">99.9%</p>
                <p className="text-sm text-white/70">Compliance Rate</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-adalah-golden/10 p-8 relative overflow-hidden">
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
                Business Signup
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
              {/* Step 0: KYB */}
              {step === 0 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Business Name
                    </Label>
                    <Input
                      placeholder="Company LLC"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Industry
                    </Label>
                    <Input
                      placeholder="e.g., Manufacturing"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Annual Revenue
                    </Label>
                    <Input
                      type="number"
                      placeholder="2500000"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Employees
                    </Label>
                    <Input
                      type="number"
                      placeholder="50"
                      className="border-adalah-primary/20"
                    />
                  </div>
                </div>
              )}

              {/* Step 1: Docs Upload */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Business License
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Financial Statements
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Tax Records
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                </div>
              )}

              {/* Step 2: Biometric Verification */}
              {step === 2 && (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-10">
                  <Fingerprint className="h-16 w-16 text-adalah-primary" />
                  <p className="text-lg text-adalah-primary font-semibold">
                    Authorized Representative Biometric Verification
                  </p>
                  <p className="text-sm text-golden max-w-md">
                    Please scan your fingerprint or face ID to continue (mock
                    step).
                  </p>
                  <Button className="bg-gradient-to-r from-adalah-primary to-adalah-golden text-white">
                    Verify Biometric
                  </Button>
                </div>
              )}

              {/* Step 3: Business Verification */}
              {step === 3 && (
                <div className="space-y-6">
                  <p className="text-adalah-primary font-semibold">
                    Business KYC & Compliance
                  </p>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      "KYC Check",
                      "Compliance Screening",
                      "Credit Scoring",
                    ].map((t) => (
                      <div
                        key={t}
                        className="p-4 rounded-xl border border-adalah-primary/10 bg-gradient-to-br from-adalah-primary/5 to-adalah-golden/5 text-center"
                      >
                        <UserCheck className="h-6 w-6 text-adalah-primary mx-auto mb-2" />
                        <p className="text-sm font-medium text-adalah-primary">
                          {t}
                        </p>
                        <p className="text-xs text-adalah-golden mt-1">PASS</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: MPA */}
              {step === 4 && (
                <div className="space-y-4">
                  <p className="text-adalah-primary font-semibold">
                    Master Platform Agreement (MPA)
                  </p>
                  <Textarea
                    className="min-h-[160px] border-adalah-primary/20"
                    defaultValue={"[Business MPA content placeholder]"}
                  />
                  <Label className="mb-2 block text-adalah-primary">
                    Authorized Representative Signature
                  </Label>
                  <Input
                    placeholder="Type full name"
                    className="border-adalah-primary/20"
                  />
                </div>
              )}

              {/* Step 5: Passport */}
              {step === 5 && (
                <div className="space-y-4 text-center">
                  <p className="text-2xl font-semibold text-adalah-primary tracking-tight">
                    Business Shariah Digital Passport Issued
                  </p>
                  <p className="text-adalah-golden">
                    Your KYB, biometric, and compliance checks are complete. You
                    may now browse Musharakah opportunities.
                  </p>
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
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white hover:opacity-90"
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

export default BusinessSignup;
