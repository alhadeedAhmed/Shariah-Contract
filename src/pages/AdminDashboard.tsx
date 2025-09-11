// src/pages/AdminDashboard.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Users, BarChart3, Activity, Lock } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "System Oversight",
      desc: "Monitor users, transactions, and system health in real time.",
      icon: <Activity className="w-8 h-8 text-golden" />,
      action: "Open Oversight",
      route: "/admin/system-oversight",
    },
    {
      title: "User Management",
      desc: "Support users, handle issues, and manage permissions.",
      icon: <Users className="w-8 h-8 text-golden" />,
      action: "Manage Users",
      route: "/admin/user-management",
    },
    {
      title: "Analytics & Reports",
      desc: "Generate insights, track metrics, and optimize systems.",
      icon: <BarChart3 className="w-8 h-8 text-golden" />,
      action: "View Analytics",
      route: "/admin/analytics",
    },
    {
      title: "Compliance Management",
      desc: "Monitor Shariah & regulatory compliance with audit reports.",
      icon: <ShieldCheck className="w-8 h-8 text-golden" />,
      action: "Compliance Hub",
      route: "/admin/compliance",
    },
    {
      title: "Access & Permissions",
      desc: "Manage user roles, access rights, and platform security.",
      icon: <Lock className="w-8 h-8 text-golden" />,
      action: "Manage Access",
      route: "/admin/permissions",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />

      <div className="container mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
          <h1 className="text-2xl md:text-3xl font-bold text-maroon">
            Admin Dashboard
          </h1>
        </motion.div>

        {/* Module Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <Card className="p-6 h-full bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-maroon/90 to-maroon text-white shadow-md">
                    {m.icon}
                  </div>
                  <h2 className="text-lg font-semibold text-maroon">
                    {m.title}
                  </h2>
                </div>
                <p className="text-sm text-golden flex-grow leading-relaxed mb-6">
                  {m.desc}
                </p>
                <Button
                  onClick={() => navigate(m.route)}
                  className="mt-auto w-full bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90 rounded-xl"
                >
                  {m.action}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
