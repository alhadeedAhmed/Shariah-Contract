import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="min-h-screen bg-gradient-to-br from-[#042A2A]/5 via-background to-[#B4925F]/5 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-3xl p-8 bg-white/80 backdrop-blur-sm border-[#042A2A]/10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-[#042A2A] tracking-tight">
            Service Provider Onboarding
          </h1>
          <Link
            to="/signin"
            className="text-sm text-[#B4925F] hover:text-[#042A2A]"
          >
            Have an account? Sign in
          </Link>
        </div>

        {/* Progress Bar */}
        <Progress value={((step + 1) / steps.length) * 100} className="mb-6" />
        <div className="text-sm text-[#B4925F] mb-6">
          Step {step + 1} of {steps.length}: {steps[step]}
        </div>

        {/* Step 1 - Business Registration */}
        {step === 0 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-[#042A2A]">Business Name</Label>
              <Input
                placeholder="Dealer Motors Ltd"
                className="border-[#042A2A]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Registration Number
              </Label>
              <Input placeholder="REG-123456" className="border-[#042A2A]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">Industry</Label>
              <Input
                placeholder="Car Dealership"
                className="border-[#042A2A]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Business License
              </Label>
              <Input type="file" className="border-[#042A2A]/20" />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Certifications
              </Label>
              <Input type="file" className="border-[#042A2A]/20" />
            </div>
          </div>
        )}

        {/* Step 2 - Compliance Verification */}
        {step === 1 && (
          <div className="space-y-4 text-center">
            <p className="text-[#042A2A] font-semibold text-lg">
              Compliance Verification
            </p>
            <p className="text-[#B4925F]">
              Your documents will be reviewed for regulatory and Shariah
              compliance. This may take up to 48 hours.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4">
              <input type="checkbox" id="compliance" className="h-4 w-4" />
              <Label htmlFor="compliance" className="text-[#042A2A]">
                I agree to the platform’s compliance requirements.
              </Label>
            </div>
          </div>
        )}

        {/* Step 3 - Provider Profile */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Company Description
              </Label>
              <Textarea
                placeholder="We are an authorized Toyota dealer..."
                className="border-[#042A2A]/20 min-h-[120px]"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Office Address
              </Label>
              <Input
                placeholder="123 Auto Street, Lahore"
                className="border-[#042A2A]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">Contact Email</Label>
              <Input
                placeholder="contact@dealermotors.com"
                className="border-[#042A2A]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">Upload Logo</Label>
              <Input type="file" className="border-[#042A2A]/20" />
            </div>
          </div>
        )}

        {/* Step 4 - Platform Integration */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Upload Catalog
              </Label>
              <Input type="file" className="border-[#042A2A]/20" />
              <p className="text-xs text-[#B4925F] mt-1">
                Supported: CSV, Excel, or Images
              </p>
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Pricing Preferences
              </Label>
              <Input
                placeholder="e.g. Retail price, Dealer price"
                className="border-[#042A2A]/20"
              />
            </div>
            <div>
              <Label className="mb-2 block text-[#042A2A]">
                Payment Preferences
              </Label>
              <Input
                placeholder="Bank account / SATpay ID"
                className="border-[#042A2A]/20"
              />
            </div>
          </div>
        )}

        {/* Step 5 - Completion */}
        {step === 4 && (
          <div className="space-y-4 text-center">
            <p className="text-2xl font-semibold text-[#042A2A] tracking-tight">
              Service Provider Digital Passport Issued
            </p>
            <p className="text-[#B4925F]">
              Your onboarding is complete. You now have access to the provider
              dashboard to manage inventory, respond to customers, and
              coordinate with banks.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={back}
            disabled={step === 0}
            className="text-[#042A2A] border-[#042A2A] hover:bg-[#042A2A]/5"
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

export default ServiceProviderSignup;
