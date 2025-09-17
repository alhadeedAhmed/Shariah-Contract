import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Star, Shield, Sparkles, CheckCircle } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
};

const stats = [
  {
    label: "Active Scholars",
    value: "24",
    icon: Users,
    color: "from-[#4A0404] to-[#4A0404]/80"
  },
  {
    label: "Reviews Today",
    value: "12",
    icon: CheckCircle,
    color: "from-[#B4925F] to-[#B4925F]/80"
  }
];

const ScholarNetwork = () => {
  return (
    <Card className="relative overflow-hidden border-[#4A0404]/10 bg-white/70 backdrop-blur-sm">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzYuMjUyIDUuMTAyYy0yLjk4IDAtNS40IDIuNDItNS40IDUuNHMyLjQyIDUuNCA1LjQgNS40IDUuNC0yLjQyIDUuNC01LjQtMi40Mi01LjQtNS40LTUuNHptMTMuMiAwYy0yLjk4IDAtNS40IDIuNDItNS40IDUuNHMyLjQyIDUuNCA1LjQgNS40IDUuNC0yLjQyIDUuNC01LjQtMi40Mi01LjQtNS40LTUuNHoiIGZpbGw9InJnYmEoNzQsIDQsIDQsIDAuMDMpIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L2c+PC9zdmc+')] opacity-30" />
      <motion.div 
        className="relative p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4A0404] to-[#B4925F] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-3 bg-gradient-to-br from-[#4A0404] to-[#4A0404]/80 rounded-xl shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">Scholar Network</h2>
                <span className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-700 rounded-full flex items-center shadow-inner">
                  <span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                  Active
                </span>
              </div>
              <p className="text-[#B4925F] mt-1">Certified Shariah scholars</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="relative text-center py-12"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A0404]/5 via-transparent to-[#B4925F]/5 opacity-50" />
          <motion.div
            className="relative inline-flex flex-col items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4A0404] to-[#B4925F] rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-4 bg-gradient-to-br from-[#4A0404] to-[#4A0404]/80 rounded-full shadow-lg">
                <Star className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-[#4A0404] mb-3">Join Our Scholar Network</h3>
            <p className="text-[#B4925F] text-lg mb-8 max-w-md mx-auto">
              Contribute your expertise to our growing network of certified Shariah scholars
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                className="relative group bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 h-12 rounded-xl overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#B4925F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center text-lg">
                  Become a Scholar
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-8 pt-8 border-t border-[#4A0404]/10"
          variants={itemVariants}
        >
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A0404] to-[#B4925F] rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
                <div className="relative bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-[#4A0404]/10">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color} shadow-lg mb-4 group-hover:shadow-2xl transition-shadow duration-300`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-[#4A0404] tracking-tight group-hover:translate-x-1 transition-transform">
                    {stat.value}
                  </p>
                  <p className="text-[#B4925F] group-hover:translate-x-1 transition-transform">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-8 pt-8 border-t border-[#4A0404]/10"
          variants={itemVariants}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[#4A0404]">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Verified Scholars</span>
            </div>
            <div className="flex items-center space-x-2 text-[#4A0404]">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm">AI-Assisted Review</span>
            </div>
            <div className="flex items-center space-x-2 text-[#4A0404]">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">Fast Approval</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default ScholarNetwork; 