import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-background to-golden-light/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-golden/10 text-maroon px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">Shariah Compliant Intelligence</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-maroon mb-6 leading-tight">
            Revolutionary Shariah Programmable 
            <span className="bg-gradient-to-r from-golden to-golden-dark bg-clip-text text-transparent"> Economy</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Use Dynamic Smart Contracts, Decentralized Autonomous Organizations, Shariah 
            validators and DeFi using economic mechanisms for transparent and trusted Shariah 
            finance ecosystem.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-golden text-golden hover:bg-golden hover:text-white transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;