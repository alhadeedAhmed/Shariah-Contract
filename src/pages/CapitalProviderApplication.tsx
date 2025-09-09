// src/pages/CapitalProviderApplication.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

type Repayment = {
  dueDate: string;
  amount: number;
  status: "pending" | "paid" | "overdue";
};

const CapitalProviderApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [repayments, setRepayments] = useState<Repayment[]>([
    { dueDate: "2025-10-01", amount: 20000, status: "pending" },
    { dueDate: "2025-11-01", amount: 20000, status: "pending" },
    { dueDate: "2025-12-01", amount: 10000, status: "pending" },
  ]);

  const [offerIssued, setOfferIssued] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <h1 className="text-2xl font-semibold text-[#4A0404]">
          Application Detail – {id}
        </h1>

        {/* Due diligence */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-3">
          <h2 className="text-xl font-semibold text-[#4A0404]">
            Due Diligence
          </h2>
          <ul className="text-sm text-[#B4925F] list-disc pl-6">
            <li>KYC documents verified</li>
            <li>Collateral evaluated: Factory Equipment</li>
            <li>Financial statements reviewed</li>
          </ul>
        </Card>

        {/* Terms & Conditions */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-3">
          <h2 className="text-xl font-semibold text-[#4A0404]">
            Terms & Conditions
          </h2>
          <ul className="text-sm text-[#B4925F] list-disc pl-6">
            <li>Profit Rate: 10% per annum</li>
            <li>Tenure: 12 months</li>
            <li>Repayment: Monthly installments</li>
          </ul>
        </Card>

        {/* Offer Letter */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-3">
          <h2 className="text-xl font-semibold text-[#4A0404]">Offer Letter</h2>
          {offerIssued ? (
            <p className="text-[#B4925F]">
              Offer Letter issued — Terms confirmed with borrower.
            </p>
          ) : (
            <Button
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              onClick={() => setOfferIssued(true)}
            >
              Issue Offer Letter
            </Button>
          )}
        </Card>

        {/* Repayment Schedule */}
        <Card className="p-6 bg-white/80 border-[#4A0404]/20 space-y-3">
          <h2 className="text-xl font-semibold text-[#4A0404]">
            Repayment Schedule
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#4A0404] border-b border-[#B4925F]">
                <th className="py-2">Due Date</th>
                <th className="py-2">Amount</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {repayments.map((r, i) => (
                <tr key={i} className="border-b border-[#B4925F]/20">
                  <td className="py-2">{r.dueDate}</td>
                  <td className="py-2">${r.amount.toLocaleString()}</td>
                  <td className="py-2">
                    <span
                      className={
                        r.status === "paid"
                          ? "text-green-600"
                          : r.status === "overdue"
                          ? "text-red-600"
                          : "text-[#B4925F]"
                      }
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default CapitalProviderApplication;
