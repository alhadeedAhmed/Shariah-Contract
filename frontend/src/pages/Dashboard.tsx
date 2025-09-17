import { motion } from "framer-motion";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import MasterParticipationProgram from "@/components/dashboard/MasterParticipationProgram";
import RecentContracts from "@/components/dashboard/RecentContracts";
import ScholarNetwork from "@/components/dashboard/ScholarNetwork";
import SmartContractRecommendations from "@/components/dashboard/SmartContractRecommendations";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TokenizationEngine from "@/components/dashboard/TokenizationEngine";
import ContractDocuments from "@/components/dashboard/ContractDocuments";

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <motion.main 
        className="container mx-auto px-8 py-10 space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Overview Section */}
        <motion.div variants={itemVariants}>
          <DashboardOverview />
        </motion.div>
        
        {/* Master Participation Program */}
        <motion.div variants={itemVariants}>
          <MasterParticipationProgram />
        </motion.div>

        {/* Recent Contracts and Scholar Network */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <div className="lg:col-span-2 transform hover:scale-[1.01] transition-transform duration-300">
            <RecentContracts />
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <ScholarNetwork />
          </div>
        </motion.div>

        {/* Smart Contract Recommendations */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={itemVariants}
        >
          <div className="lg:col-span-2 transform hover:scale-[1.01] transition-transform duration-300">
            <SmartContractRecommendations />
          </div>
          <div className="space-y-8">
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <RecentActivity />
            </div>
            <div className="transform hover:scale-[1.02] transition-transform duration-300">
              <TokenizationEngine />
            </div>
          </div>
        </motion.div>

        {/* Contract Documents */}
        <motion.div 
          variants={itemVariants}
          className="transform hover:scale-[1.01] transition-transform duration-300"
        >
          <ContractDocuments />
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Dashboard;