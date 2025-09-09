// src/pages/CapitalProviderDashboard.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type RiskProfile = {
  riskParameters: string;
  lendingCriteria: string;
  products: string;
  pricing: string;
};

type Application = {
  id: string;
  borrower: string;
  amount: number;
  collateral: string;
  status: "pending" | "approved" | "rejected" | "funded";
  riskScore?: number;
};

const CapitalProviderDashboard = () => {
  const [riskProfile, setRiskProfile] = useState<RiskProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([
    {
      id: "APP-1001",
      borrower: "Ali Traders",
      amount: 50000,
      collateral: "Vehicle Fleet",
      status: "pending",
    },
    {
      id: "APP-1002",
      borrower: "Noor Textiles",
      amount: 120000,
      collateral: "Factory Equipment",
      status: "pending",
    },
  ]);
  const [portfolio, setPortfolio] = useState<Application[]>([]);
  const navigate = useNavigate();

  const handleSetRiskProfile = () => {
    setRiskProfile({
      riskParameters: "Max LTV 70%",
      lendingCriteria: "SMEs only",
      products: "Murabahah, Musharakah",
      pricing: "Profit rate 8-12%",
    });
  };

  const handleRiskAssessment = (app: Application) => {
    const score = Math.floor(Math.random() * 40) + 60; // 60–100
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, riskScore: score } : a))
    );
  };

  const handleApprove = (app: Application) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: "approved" } : a))
    );
  };

  const handleFund = (app: Application) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === app.id ? { ...a, status: "funded" } : a))
    );
    setPortfolio((prev) => [...prev, { ...app, status: "funded" }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404]">
            Capital Provider Dashboard
          </h1>
        </div>

        {/* Phase 1: Registration & Risk Setup */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6 bg-white/80 border-[#4A0404]/20">
            <h2 className="text-xl font-semibold text-[#4A0404] mb-2">
              Risk Profile Setup
            </h2>
            {riskProfile ? (
              <ul className="text-sm text-[#B4925F] space-y-1">
                <li>Parameters: {riskProfile.riskParameters}</li>
                <li>Criteria: {riskProfile.lendingCriteria}</li>
                <li>Products: {riskProfile.products}</li>
                <li>Pricing: {riskProfile.pricing}</li>
              </ul>
            ) : (
              <Button
                onClick={handleSetRiskProfile}
                className="mt-4 bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              >
                Configure Risk Profile
              </Button>
            )}
          </Card>

          <Card className="p-6 bg-white/80 border-[#4A0404]/20">
            <h2 className="text-xl font-semibold text-[#4A0404] mb-2">
              Institution Status
            </h2>
            <p className="text-[#B4925F]">
              Institution registered and compliance verified
            </p>
          </Card>
        </div>

        {/* Phase 2: Applications */}
        <div>
          <h2 className="text-2xl font-semibold text-[#4A0404] mb-4">
            Financing Applications
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {applications.map((app) => (
              <Card
                key={app.id}
                className="p-6 bg-white/80 border-[#4A0404]/20 space-y-3"
              >
                <p className="text-sm text-[#B4925F]">ID: {app.id}</p>
                <p className="text-[#4A0404] font-semibold">{app.borrower}</p>
                <p className="text-sm text-[#B4925F]">
                  Amount: ${app.amount.toLocaleString()}
                </p>
                <p className="text-sm text-[#B4925F]">
                  Collateral: {app.collateral}
                </p>
                {app.riskScore && (
                  <p className="text-sm text-[#B4925F]">
                    Risk Score:{" "}
                    <span className="text-[#4A0404] font-bold">
                      {app.riskScore}
                    </span>
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    className="text-[#4A0404] border-[#4A0404]"
                    onClick={() => handleRiskAssessment(app)}
                  >
                    Assess Risk
                  </Button>

                  <Button
                    className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                    onClick={() => handleApprove(app)}
                  >
                    Approve
                  </Button>

                  <Button
                    className="bg-[#B4925F] text-white"
                    onClick={() => handleFund(app)}
                  >
                    Fund
                  </Button>

                  <Button
                    variant="outline"
                    className="text-[#4A0404] border-[#4A0404]"
                    onClick={() => navigate(`/capital/applications/${app.id}`)}
                  >
                    Open Application
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Phase 3: Portfolio Management */}
        <div>
          <h2 className="text-2xl font-semibold text-[#4A0404] mb-4">
            Portfolio Management
          </h2>

          {portfolio.length === 0 ? (
            <Card className="p-6 bg-white/80 border-[#4A0404]/20">
              <p className="text-[#B4925F]">No funded contracts yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {portfolio.map((loan) => (
                <Card
                  key={loan.id}
                  className="p-6 bg-white/80 border-[#4A0404]/20"
                >
                  <p className="text-sm text-[#B4925F] mb-1">
                    Contract #{loan.id}
                  </p>
                  <p className="text-[#4A0404] font-semibold mb-1">
                    {loan.borrower}
                  </p>
                  <p className="text-sm text-[#B4925F]">
                    Amount: ${loan.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-[#B4925F]">
                    Status: {loan.status}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 text-[#4A0404] border-[#4A0404]"
                    onClick={() => navigate(`/capital/portfolio/${loan.id}`)}
                  >
                    View Portfolio
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapitalProviderDashboard;
