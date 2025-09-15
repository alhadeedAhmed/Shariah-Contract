import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Shield, CheckCircle } from "lucide-react";

const ScholarSignup = () => {
  const { signInAs } = useAuth();
  const navigate = useNavigate();

  const steps = [
    "Qualification Verification",
    "Background Verification",
    "Platform Training",
    "Availability Setup",
  ];
  const [step, setStep] = useState(0);

  const [name, setName] = useState("");
  const [certificate, setCertificate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [backgroundVerified, setBackgroundVerified] = useState(false);
  const [trainingModules, setTrainingModules] = useState<string[]>([]);
  const [availability, setAvailability] = useState("");

  const toggleTrainingModule = (module: string) => {
    setTrainingModules((prev) =>
      prev.includes(module)
        ? prev.filter((m) => m !== module)
        : [...prev, module]
    );
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = () => {
    try {
      localStorage.setItem("pendingRole", "scholar");
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
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-adalah-golden/60 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-adalah-golden to-adalah-golden/80 rounded-2xl flex items-center justify-center shadow-2xl">
                <BookOpen className="text-white h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold font-inter-tight">
                  Scholar Onboarding
                </h1>
                <p className="text-adalah-golden/90 text-lg">
                  Faith. Knowledge. Compliance.
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-white/80 max-w-lg leading-relaxed mb-12">
              Join as a Shariah scholar to review contracts, issue Proof of
              Faith (POF), and ensure compliance with Islamic finance
              principles.
            </p>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Trusted Identity
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Knowledge Verified
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <div className="w-12 h-12 rounded-xl bg-adalah-golden/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-adalah-golden" />
                </div>
                <p className="text-sm text-white/90 font-medium">
                  Compliance Driven
                </p>
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

            <div className="p-6">
              <h1 className="text-2xl font-bold text-adalah-primary mb-2 font-inter-tight">
                Scholar Signup
              </h1>
              <p className="text-sm text-adalah-golden mb-6">
                Step {step + 1} of {steps.length}: {steps[step]}
              </p>

              {/* Step Content */}
              {step === 0 && (
                <div className="space-y-4">
                  <Label className="block text-adalah-primary">Full Name</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                  />

                  <Label className="block text-adalah-primary">
                    Islamic Finance Qualification
                  </Label>
                  <Input
                    value={certificate}
                    onChange={(e) => setCertificate(e.target.value)}
                    placeholder="e.g., AAOIFI Certified"
                  />

                  <Label className="block text-adalah-primary">
                    Upload Credentials
                  </Label>
                  <Input
                    type="file"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />

                  <Label className="block text-adalah-primary">
                    Upload Education Certificates
                  </Label>
                  <Input type="file" />
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <p className="text-adalah-primary font-medium font-inter-tight">
                    Background Verification
                  </p>
                  <p className="text-sm text-adalah-golden">
                    Complete your background verification. (Mock toggle below)
                  </p>
                  <Button
                    className={`${
                      backgroundVerified
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gradient-to-r from-adalah-golden to-adalah-dark"
                    } text-white`}
                    onClick={() => setBackgroundVerified(true)}
                  >
                    {backgroundVerified
                      ? "Verification Completed"
                      : "Complete Verification"}
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-adalah-primary font-medium font-inter-tight">
                    Platform Training Modules
                  </p>
                  <div className="space-y-2">
                    {[
                      "Review Processes",
                      "Communication Tools",
                      "Compliance Principles",
                    ].map((m) => (
                      <label
                        key={m}
                        className="flex items-center space-x-2 text-sm text-adalah-primary"
                      >
                        <input
                          type="checkbox"
                          checked={trainingModules.includes(m)}
                          onChange={() => toggleTrainingModule(m)}
                        />
                        <span>{m}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <p className="text-adalah-primary font-medium font-inter-tight">
                    Set Availability Schedule
                  </p>
                  <Input
                    placeholder="e.g., Weekdays 5-8 PM"
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                  />
                </div>
              )}

              {/* Buttons */}
              <div className="mt-6 flex justify-between">
                <Button
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                  disabled={step === 0}
                  onClick={back}
                >
                  Back
                </Button>
                {step < steps.length - 1 ? (
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                    onClick={next}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold"
                    onClick={handleSubmit}
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

export default ScholarSignup;
