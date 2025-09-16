import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Shield, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const footerSections = [
  {
    title: "Platform Services",
    links: [
      "Murabahah Contracts",
      "Musharakah Partnerships",
      "AI Shariah Validation",
      "Digital Passports",
      "Smart Contract Templates",
    ],
  },
  {
    title: "Compliance & Governance",
    links: [
      "Islamic Economy Guidelines",
      "Scholar Network",
      "Proof of Faith Certificates",
      "Audit & Compliance Reports",
      "Regulatory Framework",
    ],
  },
  {
    title: "Resources & Support",
    links: [
      "Developer Documentation",
      "API Integration Guide",
      "Islamic Economy Education",
      "Community Forum",
      "24/7 Technical Support",
    ],
  },
];

const platformStats = [
  { label: "Active Contracts", value: "10,000+" },
  { label: "Shariah Scholars", value: "50+" },
  { label: "Countries Served", value: "25+" },
  { label: "Compliance Rate", value: "99.9%" },
];

const Footer = () => {
  return (
    <footer className="bg-adalah-primary text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Section - Takes up more space */}
          <div className="lg:col-span-4">
            <motion.div
              className="flex items-center space-x-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-adalah-golden to-adalah-dark rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-adalah-golden font-inter-tight">
                  Adalah Chain Platform
                </span>
                <div className="text-xs text-adalah-golden/80">
                  Shariah-Compliant Smart Contracts
                </div>
              </div>
            </motion.div>

            <motion.p
              className="text-white/80 mb-6 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Revolutionizing Islamic Economy through AI-powered contract
              validation, blockchain security, and comprehensive Shariah
              compliance. Join thousands of users creating transparent, trusted
              financial agreements.
            </motion.p>

            {/* Platform Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {platformStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white/5 rounded-lg p-3"
                >
                  <div className="text-adalah-golden font-bold text-lg">
                    {stat.value}
                  </div>
                  <div className="text-white/70 text-xs">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Newsletter Signup */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-adalah-golden font-inter-tight">
                Stay Updated
              </h4>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 flex-1"
                />
                <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white px-4">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-white/60">
                Get updates on new Islamic Economy products and features
              </p>
            </motion.div>
          </div>

          {/* Footer Links - Each takes 2-3 columns */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-adalah-golden mb-4 font-inter-tight">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href="#"
                      className="text-white/80 hover:text-adalah-golden transition-colors text-sm flex items-center group"
                      whileHover={{ x: 4 }}
                    >
                      {link}
                      <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact Information */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold text-adalah-golden mb-4 font-inter-tight">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-adalah-golden" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-adalah-golden" />
                <span className="text-white/80">
                  support@islamicfintech.com
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-adalah-golden" />
                <span className="text-white/80">Dubai, UAE</span>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h5 className="text-sm font-medium text-adalah-golden mb-2">
                Certifications
              </h5>
              <div className="space-y-1 text-xs text-white/70">
                <div>✓ AAOIFI Compliant</div>
                <div>✓ ISO 27001 Certified</div>
                <div>✓ Shariah Board Approved</div>
              </div>
            </div>
          </motion.div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Adalah Chain Platform. All rights reserved. |
            <span className="text-adalah-golden ml-1">
              Shariah Compliant Technology
            </span>
          </div>

          {/* Legal Links */}
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Shariah Compliance"].map(
              (link, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-white/60 hover:text-adalah-golden transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  {link}
                </motion.a>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
