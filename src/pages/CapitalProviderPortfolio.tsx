// src/pages/CapitalProviderPortfolio.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

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
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <h1 className="text-2xl font-semibold text-[#4A0404]">
          Portfolio Detail – {id}
        </h1>

        {/* Fund Disbursement */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-2">
          <h2 className="text-xl font-semibold text-[#4A0404]">
            Fund Disbursement
          </h2>
          <p className="text-[#B4925F]">Funds disbursed successfully</p>
          <ul className="list-disc pl-6 text-sm text-[#B4925F]">
            <li>Asset ownership recorded (24-hour rule Murabahah)</li>
            <li>Transaction documentation completed</li>
            <li>Repayment schedule initiated</li>
          </ul>
        </Card>

        {/* Monitoring */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-2">
          <h2 className="text-xl font-semibold text-[#4A0404]">
            Monitoring & Compliance
          </h2>
          <p className="text-sm text-[#B4925F]">
            Current status:{" "}
            <span className="text-[#4A0404] font-semibold">{status}</span>
          </p>
          <div className="flex gap-2 mt-3">
            <Button
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              onClick={() => setStatus("compliant")}
            >
              Mark Compliant
            </Button>
            <Button
              variant="outline"
              className="text-[#4A0404] border-[#4A0404]"
              onClick={() => setStatus("follow-up required")}
            >
              Mark Follow-Up
            </Button>
          </div>
        </Card>

        {/* Reports */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-2">
          <h2 className="text-xl font-semibold text-[#4A0404]">Reports</h2>
          <Button
            className="bg-[#B4925F] text-white"
            onClick={handleGenerateReport}
          >
            Generate Performance Report
          </Button>
          <ul className="mt-4 text-sm text-[#B4925F] list-disc pl-6">
            {reports.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </Card>

        <Button
          variant="outline"
          className="text-[#4A0404] border-[#4A0404]"
          onClick={() => navigate("/capital/dashboard")}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CapitalProviderPortfolio;
