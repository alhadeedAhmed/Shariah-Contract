import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Building, Store, BookOpen, Wallet, Shield } from "lucide-react";

const roles = [
  {
    icon: User,
    title: "Individual",
    description: "Personal onboarding with KYC, MPA, and Passport issuance.",
    link: "/signup/individual",
  },
  {
    icon: Building,
    title: "Business",
    description: "KYB onboarding for companies with MPA and Passport issuance.",
    link: "/signup/business",
  },
  {
    icon: Store,
    title: "Service Provider",
    description:
      "Onboard as a dealer to upload catalogs, respond to inquiries, and coordinate sales.",
    link: "/signup/service-provider",
  },
  {
    icon: BookOpen,
    title: "Scholar",
    description:
      "Join as a certified Shariah scholar to review contracts, issue Proof of Faith (POF), and monitor compliance.",
    link: "/signup/scholar",
  },
  {
    icon: Wallet,
    title: "Capital Provider",
    description:
      "Register as a capital provider to set risk profiles, review applications, issue financing offers, and manage portfolios.",
    link: "/signup/capital",
  },
];

const SignupIndex = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-adalah-primary/10 via-background to-adalah-golden/10 px-4 py-16 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute top-24 left-16 w-72 h-72 bg-adalah-golden/30 rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-24 right-16 w-80 h-80 bg-adalah-primary/25 rounded-full blur-3xl"
        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.15, 0.3] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Main Container */}
      <Card className="w-full max-w-7xl -mt-7 p-10 bg-white/90 backdrop-blur-lg border border-adalah-primary/20 shadow-2xl rounded-3xl relative z-10">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-12 h-12 bg-gradient-to-br from-adalah-golden to-adalah-dark rounded-xl flex items-center justify-center shadow-md">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-adalah-primary tracking-tight font-inter-tight">
            Create Your Account
          </h1>
        </div>
        <p className="text-adalah-golden mb-6 text-lg">
          Choose your role to continue with onboarding.
        </p>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04 }}
              >
                <Card className="p-6 rounded-2xl overflow-hidden relative shadow-lg group cursor-pointer h-full bg-adalah-primary border border-adalah-golden/30 hover:border-adalah-golden/60 transition-all duration-300">
                  {/* Icon + Title */}
                  <div className="relative flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-adalah-golden/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-xl font-semibold text-white">
                      {role.title}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-white/80 relative mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* CTA */}
                  <div className="relative">
                    <Link to={role.link}>
                      <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold rounded-xl shadow-md hover:shadow-xl transition-all">
                        Continue as {role.title}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default SignupIndex;
