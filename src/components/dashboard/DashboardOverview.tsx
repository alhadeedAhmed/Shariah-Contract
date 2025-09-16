import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Users,
  DollarSign,
  TrendingUp,
  ArrowRight,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    title: "Active Contracts",
    value: "24",
    subtitle: "Last 30 days",
    icon: FileText,
    color: "from-[#4A0404] to-[#4A0404]/80",
    trend: "+12%",
    trendUp: true,
    pattern:
      "radial-gradient(circle at 100% 100%, rgba(180,146,95,0.1) 0%, transparent 50%)",
  },
  {
    title: "Pending Validation",
    value: "12",
    subtitle: "Scholar review",
    icon: Users,
    color: "from-[#B4925F] to-[#B4925F]/80",
    trend: "-3%",
    trendUp: false,
    pattern:
      "radial-gradient(circle at 0% 0%, rgba(74,4,4,0.1) 0%, transparent 50%)",
  },
  {
    title: "Scholar Votes",
    value: "156",
    subtitle: "Total votes",
    icon: TrendingUp,
    color: "from-[#4A0404] to-[#4A0404]/80",
    trend: "+8%",
    trendUp: true,
    pattern:
      "radial-gradient(circle at 100% 0%, rgba(180,146,95,0.1) 0%, transparent 50%)",
  },
  {
    title: "Total Value",
    value: "$1.2M",
    subtitle: "All contracts",
    icon: DollarSign,
    color: "from-[#B4925F] to-[#B4925F]/80",
    trend: "+15%",
    trendUp: true,
    pattern:
      "radial-gradient(circle at 0% 100%, rgba(74,4,4,0.1) 0%, transparent 50%)",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-[#4A0404] to-[#B4925F] rounded-full" />
            <h1 className="text-3xl font-bold text-[#4A0404] tracking-tight">
              Welcome to Your Islamic Economy Dashboard
            </h1>
            <p className="text-[#B4925F] mt-2 text-lg">
              Monitor and manage your Shariah-compliant contracts
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-4"
        >
          <Button
            variant="outline"
            className="border-2 border-[#4A0404] text-[#4A0404] hover:bg-[#4A0404]/5 px-6 h-12 rounded-xl"
          >
            View Analytics
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
          <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 h-12 rounded-xl relative overflow-hidden group">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#B4925F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center">
              Create New Contract
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ scale: 1.02, y: -5 }}
            className="transform transition-all duration-300"
          >
            <Card className="relative p-6 border border-[#4A0404]/10 bg-white/70 backdrop-blur-sm hover:shadow-2xl overflow-hidden group">
              <div
                className="absolute inset-0 opacity-30"
                style={{ background: stat.pattern }}
              />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg group-hover:shadow-2xl transition-shadow duration-300`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      stat.trendUp ? "text-green-600" : "text-red-600"
                    } flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm`}
                  >
                    {stat.trend}
                    <TrendingUp
                      className={`h-4 w-4 ml-1 ${
                        stat.trendUp ? "" : "rotate-180"
                      }`}
                    />
                  </span>
                </div>
                <p className="text-4xl font-bold text-[#4A0404] tracking-tight mb-2 group-hover:scale-105 transition-transform origin-left">
                  {stat.value}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-[#B4925F] font-medium">{stat.title}</p>
                  <p className="text-sm text-[#4A0404]/60 bg-[#4A0404]/5 px-2 py-1 rounded-md">
                    {stat.subtitle}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative bg-gradient-to-r from-[#4A0404]/5 to-[#B4925F]/5 rounded-2xl p-8 border border-[#4A0404]/10 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMjUyIDUuMTAyYy0yLjk4IDAtNS40IDIuNDItNS40IDUuNHMyLjQyIDUuNCA1LjQgNS40IDUuNC0yLjQyIDUuNC01LjQtMi40Mi01LjQtNS40LTUuNHptMTMuMiAwYy0yLjk4IDAtNS40IDIuNDItNS40IDUuNHMyLjQyIDUuNCA1LjQgNS40IDUuNC0yLjQyIDUuNC01LjQtMi40Mi01LjQtNS40LTUuNHoiIGZpbGw9InJnYmEoNzQsIDQsIDQsIDAuMDMpIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative flex items-center space-x-4 text-[#4A0404]">
          <div className="p-3 bg-gradient-to-br from-[#4A0404] to-[#4A0404]/80 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight group-hover:translate-x-1 transition-transform">
              General Islamic Economy Contracts
            </h2>
            <p className="text-[#B4925F] mt-1 group-hover:translate-x-1 transition-transform">
              Access and manage your Shariah-compliant financial contracts with
              enhanced validation and compliance checks.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardOverview;
