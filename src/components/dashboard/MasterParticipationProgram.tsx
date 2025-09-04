import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";

const MasterParticipationProgram = () => {
  return (
    <Card className="relative overflow-hidden border-[#4A0404]/10 bg-white/70 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-[#4A0404]/5 via-transparent to-[#4A0404]/5" />
      <motion.div 
        className="relative p-8 md:p-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex-1 space-y-4">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-3 bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5 rounded-xl shadow-inner">
                <FileText className="h-6 w-6 text-[#4A0404]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                Master Participation Program Workflow
              </h2>
            </motion.div>
            <motion.p 
              className="text-[#B4925F] pl-11"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Streamline your Islamic finance contracts with our enhanced Master Participation Agreement (MPA) workflow. 
              Get instant access to Shariah-compliant templates and automated validation.
            </motion.p>
          </div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button 
              variant="outline" 
              className="border-[#4A0404] text-[#4A0404] hover:bg-[#4A0404]/5 px-6"
            >
              <FileText className="h-4 w-4 mr-2" />
              View MPA Template
            </Button>
            <Button 
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6"
            >
              Start MPA Workflow
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        <motion.div 
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {[
            {
              title: "Automated Compliance",
              description: "AI-powered Shariah compliance validation with real-time feedback"
            },
            {
              title: "Scholar Network",
              description: "Direct access to our network of certified Shariah scholars"
            },
            {
              title: "Smart Contracts",
              description: "Blockchain-based contract execution and management"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-[#4A0404]/5 to-[#4A0404]/10 rounded-xl p-6 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-medium text-[#4A0404] mb-2">{feature.title}</h3>
              <p className="text-[#B4925F]">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Card>
  );
};

export default MasterParticipationProgram; 