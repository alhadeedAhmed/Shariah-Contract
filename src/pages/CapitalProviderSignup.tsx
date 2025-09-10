// src/pages/CapitalProviderSignup.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Banknote, ShieldCheck, BarChart3 } from "lucide-react";

const steps = [
  "Institution Onboarding",
  "Risk Profile Setup",
  "Completion",
] as const;

const CapitalProviderSignup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    try {
      localStorage.setItem("pendingRole", "capitalProvider");
      localStorage.removeItem("role");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-maroon via-maroon-dark to-maroon relative overflow-hidden text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-golden to-golden-light rounded-2xl flex items-center justify-center shadow-2xl">
                <Banknote className="text-maroon h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">
                  Capital Provider Onboarding
                </h1>
                <p className="text-golden-light text-lg">
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
                <ShieldCheck className="w-8 h-8 text-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Compliance Verification</p>
              </div>
              <div className="text-center">
                <BarChart3 className="w-8 h-8 text-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Risk Profile Setup</p>
              </div>
              <div className="text-center">
                <Banknote className="w-8 h-8 text-golden mx-auto mb-2" />
                <p className="text-sm text-white/70">Capital Allocation</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-golden/10 p-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-golden/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-maroon/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maroon via-golden to-maroon-dark"></div>

            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <h1 className="text-2xl font-bold text-maroon">
                Capital Provider Signup
              </h1>
              <Link
                to="/signin"
                className="text-sm text-golden hover:text-maroon transition-colors"
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
              <p className="text-sm text-golden mb-6">
                Step {step + 1} of {steps.length}: {steps[step]}
              </p>
            </div>

            {/* Step Content */}
            <div className="px-6 pb-8 space-y-6">
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Institution Name
                    </Label>
                    <Input
                      placeholder="e.g., Al Noor Bank"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Regulatory License #
                    </Label>
                    <Input
                      placeholder="e.g., LIC-2025-XYZ"
                      className="border-maroon/20"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="mb-2 block text-maroon">
                      Compliance Officer
                    </Label>
                    <Input
                      placeholder="e.g., Ahmed Khan"
                      className="border-maroon/20"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Risk Parameters
                    </Label>
                    <Input
                      placeholder="e.g., Low, Medium, High"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Lending Criteria
                    </Label>
                    <Input
                      placeholder="e.g., SMEs, Startups"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Product Offerings
                    </Label>
                    <Input
                      placeholder="e.g., Murabahah, Ijara"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Pricing Models
                    </Label>
                    <Input
                      placeholder="e.g., Fixed, Profit-Sharing"
                      className="border-maroon/20"
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 text-center">
                  <p className="text-2xl font-semibold text-maroon tracking-tight">
                    Capital Provider Digital Passport Issued
                  </p>
                  <p className="text-golden">
                    Your institution is now verified and ready to participate in
                    Islamic finance transactions on the platform.
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-6">
                <Button
                  variant="outline"
                  onClick={back}
                  disabled={step === 0}
                  className="text-maroon border-maroon hover:bg-maroon/5"
                >
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    className="bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90"
                    onClick={next}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold hover:opacity-90"
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
