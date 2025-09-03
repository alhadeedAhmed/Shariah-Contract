import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, DollarSign, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Contracts"
  },
  {
    icon: DollarSign,
    value: "$10M+", 
    label: "Total Value Processed"
  },
  {
    icon: TrendingUp,
    value: "99.9%",
    label: "Uptime"
  }
];

const benefits = [
  "PKR Stablecoin",
  "Automated Smart Contracts",
  "Real-time Integration",
  "AI-powered Shariah Validation",
  "Complete regulatory compliance solutions",
  "99% Seamless API integrations"
];

const WhyChooseSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-6">
              Why Choose Our Platform?
            </h2>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-golden rounded-full"></div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Right Content - Stats Card */}
          <div>
            <Card className="bg-gradient-to-br from-maroon to-maroon-light text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Join the Future of Shariah Programmable Economy
                </h3>
                
                <div className="space-y-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <stat.icon className="h-5 w-5 text-golden-light" />
                        <span className="text-white/90">{stat.label}</span>
                      </div>
                      <span className="font-bold text-xl text-golden-light">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button 
                    variant="secondary" 
                    className="bg-white text-maroon hover:bg-golden-light hover:text-white w-full"
                  >
                    View Platform Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;