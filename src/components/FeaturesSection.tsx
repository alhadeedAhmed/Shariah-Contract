import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shield, Users, TrendingUp, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Smart Shariah Contracts",
    description: "Automated compliance verification through smart contracts",
    color: "text-maroon"
  },
  {
    icon: Users,
    title: "Shariah Gamma Contracts",
    description: "Community-driven governance and validation mechanisms",
    color: "text-golden-dark"
  },
  {
    icon: TrendingUp,
    title: "Trust-based Certificates",
    description: "Transparent and verifiable Shariah compliance certificates",
    color: "text-maroon-light"
  },
  {
    icon: Award,
    title: "Voluntary Sadaqah Contracts",
    description: "Facilitating charitable giving through automated smart contracts",
    color: "text-golden"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">
            Greater Access to Shariah Compliant Economy
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empowering Islamic Digital Economy Integration, Transparency and Credibility
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300 border-golden/20 hover:border-golden/40">
              <CardHeader className="pb-4">
                <div className="mx-auto w-16 h-16 rounded-lg bg-gradient-to-br from-golden/10 to-maroon/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2 text-maroon">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;