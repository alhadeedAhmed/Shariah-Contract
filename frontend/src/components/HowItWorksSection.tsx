import { motion } from "framer-motion";
import { FileText, Shield, CheckCircle, Zap, Users, Brain } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Onboard & Create",
    description:
      "Register with digital identity verification, get your Shariah Digital Passport, and choose from Murabahah, Musharakah, or custom contract templates.",
    details: [
      "KYC Verification",
      "Biometric Authentication",
      "Digital Passport Generation",
    ],
  },
  {
    number: "2",
    icon: Brain,
    title: "AI Analysis",
    description:
      "Our advanced AI engine analyzes your contract for Shariah compliance, performs risk assessment, and generates personalized terms.",
    details: ["Riba Detection", "Gharar Analysis", "Risk Profiling"],
  },
  {
    number: "3",
    icon: Shield,
    title: "Scholar Validation",
    description:
      "Certified Islamic scholars review complex contracts through our secure platform, providing Proof of Faith (POF) certificates.",
    details: ["Expert Review", "Peer Consultation", "Compliance Certification"],
  },
  {
    number: "4",
    icon: Zap,
    title: "Execute & Monitor",
    description:
      "Smart contracts execute automatically with blockchain security, real-time monitoring, and integrated payment processing through SATpay.",
    details: [
      "Automated Execution",
      "Payment Integration",
      "Performance Tracking",
    ],
  },
];

const userTypes = [
  {
    icon: Users,
    title: "Individual Users",
    description: "Personal financing for vehicles, homes, and consumer goods",
    flow: "Vehicle Murabahah Example",
  },
  {
    icon: FileText,
    title: "Business Entities",
    description: "Partnership agreements and investment contracts",
    flow: "Musharakah Partnership",
  },
  {
    icon: Shield,
    title: "Service Providers",
    description: "Dealers, suppliers, and financial institutions",
    flow: "Integrated Marketplace",
  },
];

const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-b from-background via-adalah-golden/5 to-background relative overflow-hidden"
    >
      {/* Glow Background */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-adalah-primary/10 blur-3xl rounded-full"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-adalah-primary mb-6 font-inter-tight">
            How Our Platform Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive 4-step process ensuring complete Shariah compliance
            from contract creation to execution
          </p>
        </motion.div>

        {/* User Types - horizontal scroll */}
        <motion.div
          className="flex gap-6 overflow-x-auto pb-6 mb-16 scrollbar-hide"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {userTypes.map((type, index) => (
            <div
              key={index}
              className="min-w-[280px] bg-white/60 backdrop-blur-md border border-adalah-golden/20 p-6 rounded-2xl shadow-md flex-shrink-0 hover:shadow-lg hover:border-adalah-golden/40 transition"
            >
              <type.icon className="h-8 w-8 text-adalah-primary mb-4" />
              <h3 className="font-semibold text-adalah-primary mb-2 font-inter-tight">
                {type.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                {type.description}
              </p>
              <div className="text-xs text-adalah-golden font-medium">
                {type.flow}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative">
          {/* Golden vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-adalah-golden/50 to-adalah-primary/50 rounded-full"></div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative pl-20"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Step circle */}
                <div className="absolute left-2 top-2 w-12 h-12 rounded-full bg-gradient-to-br from-adalah-golden to-adalah-dark flex items-center justify-center text-white font-bold shadow-md">
                  {step.number}
                </div>

                {/* Content box */}
                <div className="bg-white/80 backdrop-blur-md rounded-xl border border-adalah-golden/20 p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-lg bg-adalah-golden/10 flex items-center justify-center mr-3">
                      <step.icon className="h-6 w-6 text-adalah-golden" />
                    </div>
                    <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {step.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-center space-x-2 hover:text-adalah-primary/80 transition"
                      >
                        <CheckCircle className="h-3 w-3 text-adalah-golden" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
