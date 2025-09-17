// src/pages/AdminUserManagement.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Users, HelpCircle, Shield, AlertTriangle } from "lucide-react";

const AdminUserManagement = () => {
  const inquiries = [
    { id: "Q101", user: "Ali Khan", issue: "Password reset", status: "open" },
    {
      id: "Q102",
      user: "Fatima Noor",
      issue: "KYC pending",
      status: "resolved",
    },
    {
      id: "Q103",
      user: "Ahmed Raza",
      issue: "Transaction delayed",
      status: "open",
    },
  ];

  const permissions = [
    { role: "Capital Provider", access: "Transactions, Portfolio" },
    { role: "Scholar", access: "Contract Reviews, POF Decisions" },
    { role: "Admin", access: "Full Access" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-6 md:px-10 py-10 space-y-8">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-maroon"
        >
          User Management
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 space-x-3">
                <HelpCircle className="w-6 h-6 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  User Inquiries
                </h2>
              </div>
              <ul className="text-sm text-golden space-y-2">
                {inquiries.map((i, idx) => (
                  <motion.li
                    key={i.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    className="flex justify-between items-center bg-golden/5 px-3 py-2 rounded-lg"
                  >
                    <span>
                      <span className="text-maroon font-medium">{i.user}</span>{" "}
                      – {i.issue}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        i.status === "resolved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {i.status}
                    </span>
                  </motion.li>
                ))}
              </ul>
              <Button className="mt-4 bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Handle Escalations
              </Button>
            </Card>
          </motion.div>

          {/* User Permissions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 space-x-3">
                <Shield className="w-6 h-6 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  User Permissions
                </h2>
              </div>
              <ul className="text-sm text-golden space-y-3">
                {permissions.map((p, idx) => (
                  <motion.li
                    key={p.role}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className="p-3 bg-golden/5 rounded-lg flex justify-between"
                  >
                    <span className="text-maroon font-medium">{p.role}</span>
                    <span>{p.access}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Scholar & AI Quality Control */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 space-x-3">
                <Users className="w-6 h-6 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  Scholar & AI Quality Control
                </h2>
              </div>
              <p className="text-sm text-golden mb-4">
                Review scholar decisions and validate AI-generated contracts to
                ensure Shariah compliance and transaction quality.
              </p>
              <Button
                variant="outline"
                className="text-maroon border-maroon hover:bg-maroon/5"
              >
                Start Review
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
