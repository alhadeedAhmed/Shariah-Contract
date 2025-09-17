import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Car, Building, FileText, ArrowRight, CheckCircle } from "lucide-react";

const contracts = [
  {
    icon: Car,
    title: "Murabahah Vehicle Financing",
    description: "Islamic car financing with transparent profit margins",
    features: [
      "24-hour bank ownership rule",
      "Fixed profit margin",
      "No hidden fees",
      "Halal financing structure",
    ],
    example: "Young professional buying a car",
    gradient: "from-adalah-primary to-adalah-golden",
  },
  {
    icon: Building,
    title: "Musharakah Business Partnership",
    description: "Profit-sharing investment partnerships for businesses",
    features: [
      "Risk-sharing mechanism",
      "Profit distribution",
      "Multi-party governance",
      "Business expansion funding",
    ],
    example: "Company seeking investment capital",
    gradient: "from-adalah-golden to-adalah-dark",
  },
];

const ContractsSection = () => {
  return (
    <section
      id="contracts"
      className="py-24 bg-gradient-to-b from-background via-adalah-golden/5 to-background relative overflow-hidden"
    >
      <motion.div
        className="absolute -top-20 right-20 w-72 h-72 bg-adalah-primary/10 blur-3xl rounded-full"
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-adalah-primary mb-6 font-inter-tight">
            Islamic Economy Contract Types
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive range of Shariah-compliant financial instruments
            powered by AI validation and blockchain technology for complete
            transparency and trust
          </p>
        </motion.div>

        {/* Contract Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {contracts.map((contract, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <Card className="relative bg-white/80 backdrop-blur-lg border border-adalah-golden/30 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 group h-full flex flex-col">
                <div className="p-8 flex flex-col flex-grow">
                  {/* Icon at top inside card */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-adalah-golden to-adalah-dark flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                    <contract.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title + Description */}
                  <h3 className="font-bold text-2xl text-adalah-primary mb-3 text-center group-hover:text-adalah-primary/80 transition font-inter-tight">
                    {contract.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-center">
                    {contract.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    {contract.features.map((feature, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1 text-xs bg-adalah-golden/10 text-adalah-primary px-3 py-1.5 rounded-full font-medium shadow-sm"
                      >
                        <CheckCircle className="h-3 w-3 text-adalah-golden" />
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Example Use Case */}
                  <div className="bg-gradient-to-r from-adalah-golden/10 to-adalah-primary/5 rounded-xl p-4 mb-8 border border-adalah-golden/20">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="h-4 w-4 text-adalah-primary" />
                      <span className="text-sm font-semibold text-adalah-primary">
                        Example Use Case
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {contract.example}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button className="w-full min-h-[48px] whitespace-normal bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white font-semibold shadow-lg px-4 py-3 rounded-xl text-center">
                      Create {contract.title}
                      <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                    </Button>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContractsSection;
