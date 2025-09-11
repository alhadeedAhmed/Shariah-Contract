// src/pages/CapitalProviderDashboard.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/10">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
          <h1 className="text-2xl md:text-3xl font-bold text-maroon">
            Capital Provider Dashboard
          </h1>
        </div>

        {/* Phase 1: Registration & Risk Setup */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-maroon/10">
              <h2 className="text-xl font-semibold text-maroon mb-3">
                Risk Profile Setup
              </h2>
              {riskProfile ? (
                <ul className="text-sm text-golden space-y-1">
                  <li>Parameters: {riskProfile.riskParameters}</li>
                  <li>Criteria: {riskProfile.lendingCriteria}</li>
                  <li>Products: {riskProfile.products}</li>
                  <li>Pricing: {riskProfile.pricing}</li>
                </ul>
              ) : (
                <Button
                  onClick={handleSetRiskProfile}
                  className="mt-4 bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90"
                >
                  Configure Risk Profile
                </Button>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-maroon/10">
              <h2 className="text-xl font-semibold text-maroon mb-3">
                Institution Status
              </h2>
              <p className="text-golden">
                Institution registered and compliance verified
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Phase 2: Applications */}
        <div>
          <h2 className="text-2xl font-bold text-maroon mb-4">
            Financing Applications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app, index) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-maroon/10 space-y-3">
                  <p className="text-sm text-golden">ID: {app.id}</p>
                  <p className="text-maroon font-semibold">{app.borrower}</p>
                  <p className="text-sm text-golden">
                    Amount: ${app.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-golden">
                    Collateral: {app.collateral}
                  </p>
                  {app.riskScore && (
                    <p className="text-sm text-golden">
                      Risk Score:{" "}
                      <span className="text-maroon font-bold">
                        {app.riskScore}
                      </span>
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="text-maroon border-maroon hover:bg-maroon/5"
                      onClick={() => handleRiskAssessment(app)}
                    >
                      Assess Risk
                    </Button>

                    <Button
                      className="bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90"
                      onClick={() => handleApprove(app)}
                    >
                      Approve
                    </Button>

                    <Button
                      className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold hover:opacity-90"
                      onClick={() => handleFund(app)}
                    >
                      Fund
                    </Button>

                    <Button
                      variant="outline"
                      className="text-maroon border-maroon hover:bg-maroon/5"
                      onClick={() =>
                        navigate(`/capital/applications/${app.id}`)
                      }
                    >
                      Open Application
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Phase 3: Portfolio Management */}
        <div>
          <h2 className="text-2xl font-bold text-maroon mb-4">
            Portfolio Management
          </h2>

          {portfolio.length === 0 ? (
            <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-maroon/10">
              <p className="text-golden">No funded contracts yet.</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.map((loan, index) => (
                <motion.div
                  key={loan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-maroon/10">
                    <p className="text-sm text-golden mb-1">
                      Contract #{loan.id}
                    </p>
                    <p className="text-maroon font-semibold mb-1">
                      {loan.borrower}
                    </p>
                    <p className="text-sm text-golden">
                      Amount: ${loan.amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-golden">Status: {loan.status}</p>
                    <Button
                      variant="outline"
                      className="mt-2 text-maroon border-maroon hover:bg-maroon/5"
                      onClick={() => navigate(`/capital/portfolio/${loan.id}`)}
                    >
                      View Portfolio
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CapitalProviderDashboard;
