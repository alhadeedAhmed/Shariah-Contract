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
import { User, FileText, Fingerprint, CheckCircle } from "lucide-react";

const steps = [
  "Registration",
  "Documents",
  "Biometric",
  "MPA",
  "Passport",
] as const;

const IndividualSignup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    try {
      localStorage.setItem("pendingRole", "individual");
      localStorage.removeItem("role");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-maroon-dark via-maroon to-maroon relative overflow-hidden text-white">
        {/* Glow */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-maroon-light rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-golden to-golden-light rounded-2xl flex items-center justify-center shadow-2xl">
                <User className="text-maroon h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Individual Onboarding</h1>
                <p className="text-golden-light text-lg">
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
                <div className="w-12 h-12 rounded-xl bg-golden/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Paperless KYC
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-golden/20 flex items-center justify-center">
                  <Fingerprint className="h-6 w-6 text-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Biometric Login
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-golden/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-golden" />
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
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-golden/10 p-8 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-golden/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-maroon/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-2xl relative z-10">
          <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-maroon via-golden to-maroon-dark"></div>

            <div className="flex items-center justify-between p-6">
              <h1 className="text-2xl font-bold text-maroon">Sign up</h1>
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

            {/* Steps */}
            <div className="px-6 pb-8 space-y-6">
              {step === 0 && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-2 block text-maroon">Full Name</Label>
                    <Input
                      placeholder="Your name"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">Email</Label>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">Employment</Label>
                    <Input
                      placeholder="e.g., Engineer"
                      className="border-maroon/20"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">Income</Label>
                    <Input
                      type="number"
                      placeholder="5000"
                      className="border-maroon/20"
                    />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block text-maroon">Upload ID</Label>
                    <Input type="file" className="border-maroon/20" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Salary Certificate
                    </Label>
                    <Input type="file" className="border-maroon/20" />
                  </div>
                  <div>
                    <Label className="mb-2 block text-maroon">
                      Bank Statements
                    </Label>
                    <Input type="file" multiple className="border-maroon/20" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 text-center">
                  <p className="text-maroon font-semibold">
                    Biometric Verification (mock)
                  </p>
                  <p className="text-sm text-golden">
                    Simulate fingerprint/face verification. In production,
                    integrate a real biometric provider.
                  </p>
                  <Button className="bg-gradient-to-r from-maroon to-maroon-dark text-white">
                    Capture Biometric
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-maroon font-semibold">
                    Master Platform Agreement (MPA)
                  </p>
                  <Textarea
                    className="min-h-[160px] border-maroon/20"
                    defaultValue={"[MPA content placeholder for user review]"}
                  />
                  <div className="flex items-center justify-between">
                    <div className="w-1/2 pr-4">
                      <Label className="mb-2 block text-maroon">
                        Digital Signature
                      </Label>
                      <Input
                        placeholder="Type your full name"
                        className="border-maroon/20"
                      />
                    </div>
                    <div className="w-1/2 pl-4">
                      <Label className="mb-2 block text-maroon">Agree</Label>
                      <Select defaultValue="agree">
                        <SelectTrigger className="border-maroon/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agree">I Agree</SelectItem>
                          <SelectItem value="decline">
                            I Do Not Agree
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4 text-center">
                  <p className="text-2xl font-semibold text-maroon tracking-tight">
                    Shariah Digital Passport Issued
                  </p>
                  <p className="text-golden">
                    Your identity and agreement have been verified. You can now
                    access the marketplace.
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
                    className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold"
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
