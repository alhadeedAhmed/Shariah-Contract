// src/pages/AdminSystemOversight.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Users, ShieldCheck, Database } from "lucide-react";

const AdminSystemOversight = () => {
  const activities = [
    { id: "U1001", action: "Created Murabahah Contract", time: "2m ago" },
    { id: "U1002", action: "Scholar approved POF", time: "10m ago" },
    { id: "U1003", action: "Capital provider funded loan", time: "1h ago" },
  ];

  const stats = [
    { label: "Transaction Volume Today", value: "248" },
    { label: "Avg Response Time", value: "320ms" },
    { label: "Active Users", value: "1,204" },
  ];

  const compliance = [
    { label: "Shariah Compliance Checks", value: "97%" },
    { label: "Regulatory Audits Passed", value: "12/12" },
    { label: "Flagged Transactions", value: "3" },
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
          System Oversight
        </motion.h1>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 space-x-3">
                <Activity className="w-7 h-7 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  Recent User Activities
                </h2>
              </div>
              <ul className="text-sm text-golden space-y-2">
                {activities.map((a, i) => (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="text-maroon font-medium">{a.id}</span> –{" "}
                    {a.action} <span className="text-xs">({a.time})</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* System Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <div className="flex items-center mb-4 space-x-3">
                <Database className="w-7 h-7 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  System Performance
                </h2>
              </div>
              <ul className="text-sm text-golden space-y-2">
                {stats.map((s) => (
                  <li key={s.label}>
                    {s.label}:{" "}
                    <span className="text-maroon font-semibold">{s.value}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Compliance Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg md:col-span-2">
              <div className="flex items-center mb-4 space-x-3">
                <ShieldCheck className="w-7 h-7 text-golden" />
                <h2 className="text-xl font-semibold text-maroon">
                  Compliance Snapshot
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {compliance.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="p-4 bg-golden/10 rounded-xl text-center"
                  >
                    <p className="text-sm text-golden">{c.label}</p>
                    <p className="text-lg font-bold text-maroon mt-1">
                      {c.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSystemOversight;
