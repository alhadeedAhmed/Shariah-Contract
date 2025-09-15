// src/pages/CapitalProviderPortfolio.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const CapitalProviderPortfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [reports, setReports] = useState<string[]>([]);
  const [status, setStatus] = useState("compliant");

  const handleGenerateReport = () => {
    setReports((prev) => [
      ...prev,
      `Report for Contract ${id} generated at ${new Date().toLocaleString()}`,
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-dark/5 via-background to-adalah-golden/10">
      <DashboardHeader />

      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Title */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-adalah-dark"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Portfolio Detail – {id}
        </motion.h1>

        {/* Fund Disbursement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-lg border border-adalah-dark/10 rounded-2xl shadow-md space-y-3">
            <h2 className="text-xl font-semibold text-adalah-dark">
              Fund Disbursement
            </h2>
            <p className="text-golden">Funds disbursed successfully</p>
            <ul className="list-disc pl-6 text-sm text-golden space-y-1">
              <li>Asset ownership recorded (24-hour rule Murabahah)</li>
              <li>Transaction documentation completed</li>
              <li>Repayment schedule initiated</li>
            </ul>
          </Card>
        </motion.div>

        {/* Monitoring & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-lg border border-adalah-dark/10 rounded-2xl shadow-md space-y-3">
            <h2 className="text-xl font-semibold text-adalah-dark">
              Monitoring & Compliance
            </h2>
            <p className="text-sm text-golden">
              Current status:{" "}
              <span className="text-adalah-dark font-semibold">{status}</span>
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button
                className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white hover:opacity-90"
                onClick={() => setStatus("compliant")}
              >
                Mark Compliant
              </Button>
              <Button
                variant="outline"
                className="text-adalah-dark border-adalah-dark hover:bg-adalah-dark/5"
                onClick={() => setStatus("follow-up required")}
              >
                Mark Follow-Up
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Reports */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-lg border border-adalah-dark/10 rounded-2xl shadow-md space-y-4">
            <h2 className="text-xl font-semibold text-adalah-dark">Reports</h2>
            <Button
              className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold hover:opacity-90"
              onClick={handleGenerateReport}
            >
              Generate Performance Report
            </Button>
            {reports.length > 0 && (
              <ul className="mt-4 text-sm text-adalah-golden list-disc pl-6 space-y-1">
                {reports.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            )}
          </Card>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            className="text-adalah-dark border-adalah-dark hover:bg-adalah-dark/5"
            onClick={() => navigate("/capital/dashboard")}
          >
            ← Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CapitalProviderPortfolio;
