import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const contractBenefits = [
  "AI-powered Shariah validation",
  "Scholar-approved templates",
  "Blockchain security",
  "Real-time monitoring",
  "Automated compliance",
  "Transparent pricing",
];

const WhyChooseSection = () => {
  return (
    <section id="why-choose-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="mt-6 bg-gradient-to-r from-adalah-golden to-adalah-dark rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">
              Why Choose Our Islamic Contract Platform?
            </h3>
            <p className="text-white/90 max-w-2xl mx-auto">
              Experience the future of Islamic Economy with our comprehensive,
              AI-powered platform designed for complete Shariah compliance.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {contractBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-3 bg-white/10 rounded-lg p-4"
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                }}
              >
                <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white font-semibold px-8"
              >
                Start Creating Contracts Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
