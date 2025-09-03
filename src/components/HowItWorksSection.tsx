import { CheckCircle, FileText, Shield, Banknote } from "lucide-react";

const steps = [
  {
    number: "1",
    icon: FileText,
    title: "Create",
    description: "Create smart contracts and choose between numerous financial instrument frameworks."
  },
  {
    number: "2", 
    icon: Shield,
    title: "Validate",
    description: "Get independent and collective Islamic Shariah Compliance validations."
  },
  {
    number: "3",
    icon: CheckCircle, 
    title: "Verify",
    description: "Publish Islamic scholars validation along with Shariah compliance proofs."
  },
  {
    number: "4",
    icon: Banknote,
    title: "Execute",
    description: "Automate contracts and governed smart financial transactions for maximum."
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-golden/5 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Our revolutionary 200-year-roadmap approach complete Shariah compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Step Number */}
              <div className="relative mb-6">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-maroon to-maroon-light rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-golden/50 to-transparent -translate-x-8"></div>
                )}
              </div>

              {/* Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 mx-auto bg-golden/10 rounded-lg flex items-center justify-center">
                  <step.icon className="h-6 w-6 text-golden-dark" />
                </div>
              </div>

              {/* Content */}
              <h3 className="font-semibold text-xl mb-3 text-maroon">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;