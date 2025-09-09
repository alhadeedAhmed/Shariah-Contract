import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SignupIndex = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-2xl p-8 bg-white/80 backdrop-blur-sm border-[#4A0404]/10">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
            Create your account
          </h1>
        </div>
        <p className="text-[#B4925F] mb-6">
          Choose your role to continue with onboarding.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 bg-white/70 border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">Individual</p>
            <p className="text-sm text-[#B4925F] mb-4">
              Personal onboarding with KYC, MPA, and Passport issuance.
            </p>
            <Link to="/signup/individual">
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full">
                Continue as Individual
              </Button>
            </Link>
          </Card>
          <Card className="p-6 bg-white/70 border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">Business</p>
            <p className="text-sm text-[#B4925F] mb-4">
              KYB onboarding for companies with MPA and Passport issuance.
            </p>
            <Link to="/signup/business">
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full">
                Continue as Business
              </Button>
            </Link>
          </Card>
          <Card className="p-6 bg-white/70 border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">
              Service Provider
            </p>
            <p className="text-sm text-[#B4925F] mb-4">
              Onboard as a dealer to upload catalogs, respond to inquiries, and
              coordinate sales.
            </p>
            <Link to="/signup/service-provider">
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full">
                Continue as Service Provider
              </Button>
            </Link>
          </Card>
          <Card className="p-6 bg-white/70 border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">Scholar</p>
            <p className="text-sm text-[#B4925F] mb-4">
              Join as a certified Shariah scholar to review contracts, issue
              Proof of Faith (POF), and monitor compliance.
            </p>
            <Link to="/signup/scholar">
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full">
                Continue as Scholar
              </Button>
            </Link>
          </Card>
          <Card className="p-6 bg-white/70 border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">
              Capital Provider
            </p>
            <p className="text-sm text-[#B4925F] mb-4">
              Register as a capital provider to set risk profiles, review
              applications, issue financing offers, and manage portfolios.
            </p>
            <Link to="/signup/capital">
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full">
                Continue as Capital Provider
              </Button>
            </Link>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default SignupIndex;
