// src/pages/AdminComplianceHub.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText, ShieldCheck, AlertTriangle } from "lucide-react";

const AdminComplianceHub = () => {
  const reports = [
    { id: "R101", title: "Q1 Regulatory Audit", status: "passed" },
    {
      id: "R102",
      title: "Shariah Review – Murabahah Contracts",
      status: "pending",
    },
    { id: "R103", title: "AML Compliance Audit", status: "flagged" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-6 md:px-10 py-10 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-maroon"
        >
          Compliance Hub
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {reports.map((r) => (
            <motion.div
              key={r.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="p-6 bg-white/90 border border-maroon/10 rounded-2xl shadow-lg space-y-3">
                <div className="flex items-center space-x-3">
                  {r.status === "passed" && (
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  )}
                  {r.status === "pending" && (
                    <FileText className="w-6 h-6 text-golden" />
                  )}
                  {r.status === "flagged" && (
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  )}
                  <h2 className="text-lg font-semibold text-maroon">
                    {r.title}
                  </h2>
                </div>
                <p
                  className={`text-sm ${
                    r.status === "passed"
                      ? "text-green-600"
                      : r.status === "flagged"
                      ? "text-red-600"
                      : "text-golden"
                  }`}
                >
                  Status: {r.status}
                </p>
                <Button
                  variant="outline"
                  className="text-maroon border-maroon hover:bg-maroon/5"
                >
                  View Report
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminComplianceHub;
