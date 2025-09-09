// src/pages/ScholarSignup.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const ScholarSignup = () => {
  const { signInAs } = useAuth();
  const navigate = useNavigate();

  // Step management (Onboarding Flow)
  const steps = [
    "Qualification Verification",
    "Background Verification",
    "Platform Training",
    "Availability Setup",
  ];
  const [step, setStep] = useState(0);

  // Form state
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
    // Mock: Save scholar onboarding data in localStorage
    try {
      localStorage.setItem(
        "scholarOnboarding",
        JSON.stringify({
          name,
          certificate,
          file: file?.name,
          backgroundVerified,
          trainingModules,
          availability,
        })
      );
    } catch {}

    // Directly log scholar in
    signInAs("scholar");
    navigate("/scholar/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5 px-4 py-10">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-sm border-[#4A0404]/10 space-y-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
            Scholar Onboarding
          </h1>
        </div>

        <p className="text-[#B4925F] mb-4">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>

        {/* Step 1: Qualification Verification */}
        {step === 0 && (
          <div className="space-y-4">
            <Label className="block text-[#4A0404]">Full Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />

            <Label className="block text-[#4A0404]">
              Islamic Finance Qualification
            </Label>
            <Input
              value={certificate}
              onChange={(e) => setCertificate(e.target.value)}
              placeholder="e.g., AAOIFI Certified"
            />

            <Label className="block text-[#4A0404]">
              Upload Education Certificates
            </Label>
            <Input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        )}

        {/* Step 2: Background Verification */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-[#4A0404] font-medium">
              Background Verification
            </p>
            <p className="text-sm text-[#B4925F]">
              Complete your background verification. (Mock toggle below)
            </p>
            <Button
              className={`${
                backgroundVerified
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90"
              } text-white`}
              onClick={() => setBackgroundVerified(true)}
            >
              {backgroundVerified
                ? "Verification Completed"
                : "Complete Verification"}
            </Button>
          </div>
        )}

        {/* Step 3: Platform Training */}
        {step === 2 && (
          <div className="space-y-4">
            <p className="text-[#4A0404] font-medium">Training Modules</p>
            <div className="space-y-2">
              {[
                "Review Processes",
                "Communication Tools",
                "Compliance Principles",
              ].map((m) => (
                <label
                  key={m}
                  className="flex items-center space-x-2 text-sm text-[#4A0404]"
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

        {/* Step 4: Availability */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-[#4A0404] font-medium">
              Set Availability Schedule
            </p>
            <Input
              placeholder="e.g., Weekdays 5-8 PM"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Button
            variant="outline"
            className="text-[#4A0404] border-[#4A0404]"
            disabled={step === 0}
            onClick={back}
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              onClick={next}
            >
              Next
            </Button>
          ) : (
            <Button
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              onClick={handleSubmit}
            >
              Finish & Access Dashboard
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ScholarSignup;
