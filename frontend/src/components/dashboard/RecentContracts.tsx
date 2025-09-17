import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Plus, ArrowRight } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const RecentContracts = () => {
  const hasContracts = false;

  return (
    <Card className="border-[#4A0404]/10 bg-white/70 backdrop-blur-sm">
      <motion.div
        className="p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex items-center justify-between mb-8"
          variants={itemVariants}
        >
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5 rounded-xl shadow-inner">
              <FileText className="h-6 w-6 text-[#4A0404]" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                Recent Contracts
              </h2>
              <p className="text-[#B4925F] mt-1">
                Your latest Islamic Economy Contracts
              </p>
            </div>
          </div>
          {hasContracts && (
            <Button
              variant="outline"
              className="border-[#4A0404] text-[#4A0404] hover:bg-[#4A0404]/5"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </motion.div>

        {!hasContracts ? (
          <motion.div className="text-center py-12" variants={itemVariants}>
            <motion.div
              className="inline-flex p-4 bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5 rounded-full mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <FileText className="h-8 w-8 text-[#4A0404]" />
            </motion.div>
            <h3 className="text-xl font-medium text-[#4A0404] mb-2">
              No contracts yet
            </h3>
            <p className="text-[#B4925F] mb-6 max-w-md mx-auto">
              Start by creating your first Islamic Economy Contract with our
              enhanced validation system
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Contract
              </Button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div className="space-y-4" variants={itemVariants}>
            {/* Add contract items here when they exist */}
          </motion.div>
        )}
      </motion.div>
    </Card>
  );
};

export default RecentContracts;
