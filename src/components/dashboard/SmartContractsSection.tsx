import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const recommendations = [
  {
    title: "Credit Debt-new Package",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Available",
    avatar: "CD",
  },
  {
    title: "Tawaruq-islamic Bonds",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Available",
    avatar: "TB",
  },
  {
    title: "Sukook-Islamic Finance",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    status: "Active",
    avatar: "SF",
  },
];

const SmartContractsSection = () => {
  return (
    <Card className="border-adalah-golden/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-adalah-primary font-inter-tight">
            Smart Online Recommendation
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="border-adalah-golden text-adalah-golden hover:bg-gradient-to-r hover:from-adalah-golden hover:to-adalah-dark hover:text-white"
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 border border-adalah-golden/20 rounded-lg hover:bg-adalah-golden/5 transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-adalah-primary/10 text-adalah-primary font-semibold text-sm">
                {rec.avatar}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-adalah-primary text-sm font-inter-tight">
                {rec.title}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {rec.description}
              </p>
              <span
                className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${
                  rec.status === "Available"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {rec.status}
              </span>
            </div>
            <Button
              size="sm"
              className="bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white whitespace-nowrap"
            >
              Apply Now
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartContractsSection;
