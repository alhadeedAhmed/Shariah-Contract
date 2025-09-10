import { motion } from "framer-motion";
import { Shield, Users, FileText, Zap, Brain, CheckCircle } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Murabahah Contracts",
    description:
      "Automated vehicle financing with transparent profit margins and Shariah compliance validation",
  },
  {
    icon: Users,
    title: "Multi-Party Musharakah",
    description:
      "Business partnership contracts with profit-sharing, risk distribution, and automated governance",
  },
  {
    icon: Brain,
    title: "AI Shariah Validation",
    description:
      "Intelligent contract analysis detecting Riba, Gharar, and Haram elements with 99.9% accuracy",
  },
  {
    icon: Shield,
    title: "Digital Shariah Passports",
    description:
      "Cryptographic identity verification with blockchain-secured Proof of Faith certificates",
  },
  {
    icon: Zap,
    title: "Instant Contract Generation",
    description:
      "AI-powered contract creation from templates or document conversion in minutes, not days",
  },
  {
    icon: CheckCircle,
    title: "Scholar Network Integration",
    description:
      "Direct access to certified Islamic scholars for complex contract validation and approval",
  },
];

const extraHighlights = [
  {
    title: "Hyperledger Integration",
    desc: "Enterprise-grade blockchain security",
  },
  { title: "IPFS Storage", desc: "Decentralized document management" },
  { title: "SATpay Integration", desc: "Seamless payment processing" },
];

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="py-24 relative bg-gradient-to-b from-background via-golden/5 to-background overflow-hidden"
    >
      {/* Glowing Background Shapes */}
      <motion.div
        className="absolute -top-24 -left-24 w-96 h-96 bg-golden/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-80 h-80 bg-maroon/10 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
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
          <h2 className="text-4xl md:text-5xl font-extrabold text-maroon mb-6">
            Comprehensive Islamic Finance Platform
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From individual Murabahah contracts to complex business Musharakah
            partnerships, our AI-powered platform ensures complete Shariah
            compliance.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/60 backdrop-blur-md rounded-2xl shadow-lg border border-golden/20 p-8 hover:shadow-xl hover:border-golden/40 transition-all"
            >
              {/* Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-golden/20 to-maroon/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-maroon" />
                </div>
              </div>
              {/* Title */}
              <h3 className="text-xl font-semibold text-maroon mb-3 group-hover:text-maroon-light transition-colors">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Extra Highlights */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {extraHighlights.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-r from-maroon/5 to-golden/5 rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
            >
              <h4 className="font-semibold text-maroon mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
