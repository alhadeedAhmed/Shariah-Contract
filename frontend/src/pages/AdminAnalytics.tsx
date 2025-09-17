// src/pages/AdminAnalytics.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart, PieChart, Activity, TrendingUp } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const AdminAnalytics = () => {
  const metrics = [
    { label: "Active Contracts", value: 320, icon: Activity },
    { label: "Monthly Volume", value: "$2.5M", icon: BarChart },
    { label: "Avg Risk Score", value: "78/100", icon: PieChart },
    { label: "Pending Reviews", value: 14, icon: TrendingUp },
  ];

  const chartData = [
    { month: "Jan", volume: 1.2 },
    { month: "Feb", volume: 1.6 },
    { month: "Mar", volume: 2.0 },
    { month: "Apr", volume: 2.5 },
    { month: "May", volume: 2.8 },
    { month: "Jun", volume: 3.1 },
  ];

  const optimizations = [
    "Optimize AI risk scoring algorithm",
    "Improve onboarding UX flow",
    "Plan Q4 system upgrade for scalability",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-6 md:px-10 py-10 space-y-10">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold text-maroon"
        >
          Analytics & Reporting
        </motion.h1>

        {/* Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg flex flex-col items-start space-y-3">
                <m.icon className="w-6 h-6 text-golden" />
                <p className="text-sm text-golden">{m.label}</p>
                <p className="text-xl font-bold text-maroon">{m.value}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-maroon mb-4">
              Monthly Transaction Volume
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#B4925F40" />
                  <XAxis dataKey="month" stroke="#4A0404" />
                  <YAxis stroke="#4A0404" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "#B4925F",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="volume"
                    stroke="#4A0404"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>

        {/* Optimization Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-maroon mb-4">
              System Optimization Notes
            </h2>
            <ul className="text-sm text-golden space-y-2 list-disc pl-5">
              {optimizations.map((o, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                >
                  {o}
                </motion.li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
