import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Store, Globe } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  "Business Registration",
  "Compliance Verification",
  "Provider Profile",
  "Platform Integration",
  "Completion",
] as const;

const ServiceProviderSignup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    try {
      localStorage.setItem("pendingRole", "provider");
      localStorage.removeItem("role");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-adalah-dark via-adalah-primary to-adalah-primary relative overflow-hidden text-white">
        {/* Background Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-adalah-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-adalah-golden/60 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-adalah-golden to-adalah-golden/80 rounded-2xl flex items-center justify-center shadow-2xl">
                <Store className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter-tight">
                  Service Provider Onboarding
                </h1>
                <p className="text-adalah-golden text-lg">
                  Upload catalogs, respond to inquiries, and connect with banks.
                </p>
              </div>
            </div>

            <p className="text-lg text-white/90 leading-relaxed mb-6">
              Become a trusted dealer or supplier in the Islamic Economy
              ecosystem. Get your Shariah-compliant digital passport and
              integrate seamlessly with SATpay.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-8">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <Store className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Marketplace Access
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Shariah-Compliant Certification
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Seamless Platform Integration
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-adalah-golden/10 p-8 relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-adalah-golden/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-adalah-primary/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-adalah-primary via-adalah-golden to-adalah-golden/60"></div>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <h1 className="text-2xl font-bold text-adalah-primary font-inter-tight">
                Service Provider Signup
              </h1>
              <Link
                to="/signin"
                className="text-sm text-adalah-golden hover:text-adalah-primary font-medium"
              >
                Have an account? Sign in
              </Link>
            </div>

            {/* Progress */}
            <div className="px-8">
              <Progress
                value={((step + 1) / steps.length) * 100}
                className="mb-4"
              />
              <p className="text-sm text-adalah-golden mb-6">
                Step {step + 1} of {steps.length}: {steps[step]}
              </p>
            </div>

            {/* Steps */}
            <div className="px-8 pb-8">
              {step === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Business Name
                    </Label>
                    <Input
                      placeholder="Dealer Motors Ltd"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Registration Number
                    </Label>
                    <Input
                      placeholder="REG-123456"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Industry
                    </Label>
                    <Input
                      placeholder="Car Dealership"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Business License
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Certifications
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4 text-center">
                  <p className="text-adalah-primary font-semibold text-lg font-inter-tight">
                    Compliance Verification
                  </p>
                  <p className="text-adalah-golden">
                    Your documents will be reviewed for regulatory and Shariah
                    compliance. This may take up to 48 hours.
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <input
                      type="checkbox"
                      id="compliance"
                      className="h-4 w-4"
                    />
                    <Label htmlFor="compliance" className="text-adalah-primary">
                      I agree to the platform’s compliance requirements.
                    </Label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Company Description
                    </Label>
                    <Textarea
                      placeholder="We are an authorized Toyota dealer..."
                      className="border-adalah-primary/20 min-h-[120px]"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Office Address
                    </Label>
                    <Input
                      placeholder="123 Auto Street, Lahore"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Contact Email
                    </Label>
                    <Input
                      placeholder="contact@dealermotors.com"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Upload Logo
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Upload Catalog
                    </Label>
                    <Input type="file" className="border-adalah-primary/20" />
                    <p className="text-xs text-adalah-golden mt-1">
                      Supported: CSV, Excel, or Images
                    </p>
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Pricing Preferences
                    </Label>
                    <Input
                      placeholder="e.g. Retail price, Dealer price"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Inventory Setup
                    </Label>
                    <Input
                      placeholder="e.g. 25 cars in stock"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-adalah-primary">
                      Payment Preferences
                    </Label>
                    <Input
                      placeholder="Bank account / SATpay ID"
                      className="border-adalah-primary/20"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="checkbox" id="bank" className="h-4 w-4" />
                    <Label htmlFor="bank" className="text-adalah-primary">
                      Confirm bank/SATpay account linked
                    </Label>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 text-center">
                  <p className="text-2xl font-semibold text-adalah-primary tracking-tight font-inter-tight">
                    Service Provider Digital Passport Issued
                  </p>
                  <p className="text-adalah-golden">
                    Your onboarding is complete. You now have access to the
                    provider dashboard to manage inventory, respond to
                    customers, and coordinate with banks.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex items-center justify-between">
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
                    onClick={next}
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    onClick={complete}
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold"
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

export default ServiceProviderSignup;
