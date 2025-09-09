import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const steps = ["KYB Details", "Docs Upload", "MPA", "Passport"] as const;

const BusinessSignup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();
  const { signInAs } = useAuth();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    // After signup, require explicit sign in; preselect role
    try {
      localStorage.setItem("pendingRole", "business");
      localStorage.removeItem("role");
    } catch {}
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl p-8 bg-white/80 backdrop-blur-sm border-[#4A0404]/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
            <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              Business Onboarding
            </h1>
          </div>
          <Link
            to="/signin"
            className="text-sm text-[#B4925F] hover:text-[#4A0404]"
          >
            Have an account? Sign in
          </Link>
        </div>

        <Progress value={((step + 1) / steps.length) * 100} className="mb-6" />
        <div className="text-sm text-[#B4925F] mb-6">
          Step {step + 1} of {steps.length}: {steps[step]}
        </div>

        {step === 0 && (
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="mb-2 block text-[#4A0404]">Business Name</Label>
              <Input
                placeholder="Company LLC"
                className="border-[#4A0404]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Industry</Label>
              <Input
                placeholder="e.g., Manufacturing"
                className="border-[#4A0404]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">
                Annual Revenue
              </Label>
              <Input
                type="number"
                placeholder="2500000"
                className="border-[#4A0404]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Employees</Label>
              <Input
                type="number"
                placeholder="50"
                className="border-[#4A0404]/20"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-[#4A0404]">
                Business License
              </Label>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">
                Financial Statements
              </Label>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Tax Records</Label>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-[#4A0404] font-semibold">
              Master Platform Agreement (MPA)
            </p>
            <Textarea
              className="min-h-[160px] border-[#4A0404]/20"
              defaultValue={"[Business MPA content placeholder]"}
            />
            <Label className="mb-2 block text-[#4A0404]">
              Authorized Representative Signature
            </Label>
            <Input
              placeholder="Type full name"
              className="border-[#4A0404]/20"
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 text-center">
            <p className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              Business Shariah Digital Passport Issued
            </p>
            <p className="text-[#B4925F]">
              Your KYB and agreement are verified. You can now browse
              investments.
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={back}
            disabled={step === 0}
            className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button
              onClick={next}
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={complete}
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            >
              Finish
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default BusinessSignup;
