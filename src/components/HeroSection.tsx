import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Shield, BookOpen, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-background via-background to-adalah-golden/10 overflow-hidden">
      {/* Background Orbs */}
      <motion.div
        className="absolute top-[-5rem] right-[-5rem] w-96 h-96 bg-adalah-golden/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[-6rem] left-[-6rem] w-96 h-96 bg-adalah-primary/20 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, delay: 2 }}
      />

      <div className="container mx-auto px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* LEFT CONTENT */}
          <div className="text-left space-y-8">
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-adalah-primary px-4 py-2 rounded-full shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">
                AI-Powered Shariah Compliance Platform
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold text-adalah-primary leading-tight font-inter-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Transform Islamic Finance with
              <span className="bg-gradient-to-r from-adalah-golden to-adalah-dark bg-clip-text text-transparent block mt-2">
                Smart Contracts
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Automate Murabahah, Musharakah, and Islamic contracts with
              AI-powered Shariah validation, digital passports, and transparent
              blockchain technology. Join the future of Islamic finance.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-lg px-8 py-3 rounded-xl hover:shadow-xl transition-all">
                Start Creating Contracts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="border-2 border-adalah-golden text-adalah-golden hover:bg-gradient-to-r hover:from-adalah-golden hover:to-adalah-dark hover:text-white px-8 py-3 rounded-xl shadow-md transition-all"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* Glass card */}
            <div className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-adalah-golden/30 rounded-2xl shadow-2xl p-8 space-y-6">
              <h3 className="text-xl font-semibold text-adalah-primary font-inter-tight">
                Platform Highlights
              </h3>
              <ul className="space-y-3 text-sm text-adalah-primary/80">
                {[
                  "Murabahah Contracts with transparency",
                  "AI-powered Shariah validation",
                  "Secure blockchain execution",
                  "Digital passport identity system",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 hover:text-adalah-primary transition-colors"
                  >
                    <Zap className="h-4 w-4 text-adalah-golden" /> {item}
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: "1000+", label: "Contracts" },
                  { value: "99.9%", label: "Accuracy" },
                  { value: "24/7", label: "AI Validation" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/20 backdrop-blur-sm rounded-lg py-4 text-center hover:scale-105 transition-transform"
                  >
                    <div className="text-lg font-bold text-adalah-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-adalah-primary/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
