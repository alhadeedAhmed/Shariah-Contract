// src/pages/CapitalProviderApplication.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/10">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Page Title */}
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-maroon"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Application Detail – {id}
        </motion.h1>

        {/* Due diligence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-md space-y-3">
            <h2 className="text-xl font-semibold text-maroon">Due Diligence</h2>
            <ul className="text-sm text-golden list-disc pl-6 space-y-1">
              <li>KYC documents verified</li>
              <li>Collateral evaluated: Factory Equipment</li>
              <li>Financial statements reviewed</li>
            </ul>
          </Card>
        </motion.div>

        {/* Terms & Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-md space-y-3">
            <h2 className="text-xl font-semibold text-maroon">
              Terms & Conditions
            </h2>
            <ul className="text-sm text-golden list-disc pl-6 space-y-1">
              <li>Profit Rate: 10% per annum</li>
              <li>Tenure: 12 months</li>
              <li>Repayment: Monthly installments</li>
            </ul>
          </Card>
        </motion.div>

        {/* Offer Letter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-md space-y-3">
            <h2 className="text-xl font-semibold text-maroon">Offer Letter</h2>
            {offerIssued ? (
              <p className="text-golden">
                Offer Letter issued — Terms confirmed with borrower.
              </p>
            ) : (
              <Button
                className="bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90"
                onClick={() => setOfferIssued(true)}
              >
                Issue Offer Letter
              </Button>
            )}
          </Card>
        </motion.div>

        {/* Repayment Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-md space-y-4 overflow-x-auto">
            <h2 className="text-xl font-semibold text-maroon">
              Repayment Schedule
            </h2>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-left text-maroon border-b border-golden/40">
                  <th className="py-2 px-2">Due Date</th>
                  <th className="py-2 px-2">Amount</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {repayments.map((r, i) => (
                  <tr
                    key={i}
                    className="border-b border-golden/20 hover:bg-golden/5 transition"
                  >
                    <td className="py-2 px-2">{r.dueDate}</td>
                    <td className="py-2 px-2">${r.amount.toLocaleString()}</td>
                    <td className="py-2 px-2">
                      <span
                        className={
                          r.status === "paid"
                            ? "text-green-600 font-medium"
                            : r.status === "overdue"
                            ? "text-red-600 font-medium"
                            : "text-golden font-medium"
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
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="outline"
            className="text-maroon border-maroon hover:bg-maroon/5"
            onClick={() => navigate("/capital/dashboard")}
          >
            ← Back to Dashboard
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default CapitalProviderApplication;
