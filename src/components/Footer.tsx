import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerSections = [
  {
    title: "Platform",
    links: ["Smart Contracts", "Shariah Validation", "PKR Stablecoin", "API Documentation", "Developer Tools"]
  },
  {
    title: "Compliance", 
    links: ["Shariah Guidelines", "Regulatory Framework", "Audit Reports", "Certification Process", "Legal Documentation"]
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Support", "Community Forum", "Knowledge Base", "Status Page"]
  }
];

const Footer = () => {
  return (
    <footer className="bg-maroon text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-golden to-golden-light rounded-lg"></div>
              <span className="text-xl font-bold">Shariah Control Intelligence</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              Revolutionary platform enabling transparent, compliant, and efficient Shariah-based financial ecosystem through smart contracts and decentralized validation.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="font-semibold">Stay Updated</h4>
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
                <Button 
                  variant="secondary" 
                  className="bg-golden hover:bg-golden-light text-maroon"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-golden mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="text-white/80 hover:text-golden transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Shariah Control Intelligence. All rights reserved.
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
              <a 
                key={index}
                href="#" 
                className="text-white/60 hover:text-golden transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;