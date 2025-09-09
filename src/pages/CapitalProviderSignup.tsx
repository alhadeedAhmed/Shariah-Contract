import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CapitalProviderSignup = () => {
  const navigate = useNavigate();
  const [institution, setInstitution] = useState("");
  const [license, setLicense] = useState("");
  const [complianceOfficer, setComplianceOfficer] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally send to API — here we just redirect
    navigate("/capital/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg p-8 bg-white/80 backdrop-blur-sm border-[#4A0404]/20">
        <h1 className="text-2xl font-bold text-[#4A0404] mb-2">
          Capital Provider Registration
        </h1>
        <p className="text-[#B4925F] mb-6">
          Register your institution and begin onboarding.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="institution">Institution Name</Label>
            <Input
              id="institution"
              placeholder="e.g. Al Noor Bank"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="border-[#B4925F]/40"
              required
            />
          </div>

          <div>
            <Label htmlFor="license">Regulatory License #</Label>
            <Input
              id="license"
              placeholder="e.g. LIC-2025-XYZ"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              className="border-[#B4925F]/40"
              required
            />
          </div>

          <div>
            <Label htmlFor="officer">Compliance Officer</Label>
            <Input
              id="officer"
              placeholder="e.g. Ahmed Khan"
              value={complianceOfficer}
              onChange={(e) => setComplianceOfficer(e.target.value)}
              className="border-[#B4925F]/40"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
          >
            Complete Registration
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CapitalProviderSignup;
