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

const steps = [
  "Registration",
  "Documents",
  "Biometric",
  "MPA",
  "Passport",
] as const;

const Signup = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const complete = () => {
    // After signup, require explicit sign in; preselect role
    try {
      localStorage.setItem("pendingRole", "individual");
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
              Sign up
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
              <Label className="mb-2 block text-[#4A0404]">Full Name</Label>
              <Input placeholder="Your name" className="border-[#4A0404]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Email</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="border-[#4A0404]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Employment</Label>
              <Input
                placeholder="e.g., Engineer"
                className="border-[#4A0404]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">Income</Label>
              <Input
                type="number"
                placeholder="5000"
                className="border-[#4A0404]/20"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-[#4A0404]">Upload ID</Label>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">
                Salary Certificate
              </Label>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#4A0404]">
                Bank Statements
              </Label>
              <Input type="file" multiple className="border-[#4A0404]/20" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-[#4A0404]">Biometric Verification (mock)</p>
            <p className="text-sm text-[#B4925F]">
              Simulate fingerprint/face verification. In production, integrate
              real biometric provider.
            </p>
            <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
              Capture Biometric
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <p className="text-[#4A0404] font-semibold">
              Master Platform Agreement (MPA)
            </p>
            <Textarea
              className="min-h-[160px] border-[#4A0404]/20"
              defaultValue={"[MPA content placeholder for user review]"}
            />
            <div className="flex items-center justify-between">
              <div className="w-1/2 pr-4">
                <Label className="mb-2 block text-[#4A0404]">
                  Digital Signature (type your full name)
                </Label>
                <Input
                  placeholder="Type your full name"
                  className="border-[#4A0404]/20"
                />
              </div>
              <div className="w-1/2 pl-4">
                <Label className="mb-2 block text-[#4A0404]">Agree</Label>
                <Select defaultValue="agree">
                  <SelectTrigger className="border-[#4A0404]/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agree">I Agree</SelectItem>
                    <SelectItem value="decline">I Do Not Agree</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <p className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              Shariah Digital Passport Issued
            </p>
            <p className="text-[#B4925F]">
              Your identity and agreement have been verified. You can now access
              the marketplace.
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

export default Signup;
