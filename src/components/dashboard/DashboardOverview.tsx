import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Contracts",
    value: "24",
    icon: FileText,
    change: "+12%",
    color: "maroon"
  },
  {
    title: "Compliant",
    value: "22",
    icon: Shield,
    change: "+8%",
    color: "golden"
  },
  {
    title: "Participants",
    value: "156",
    icon: Users,
    change: "+23%",
    color: "maroon"
  },
  {
    title: "Growth",
    value: "89%",
    icon: TrendingUp,
    change: "+5%",
    color: "golden"
  }
];

const DashboardOverview = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-maroon">Dashboard Overview</h1>
        <div className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-golden/20 shadow-elegant hover:shadow-golden transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.color === 'maroon' ? 'bg-maroon/10' : 'bg-golden/10'}`}>
                <stat.icon className={`h-4 w-4 ${stat.color === 'maroon' ? 'text-maroon' : 'text-golden-dark'}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-maroon">{stat.value}</div>
              <p className="text-xs text-golden-dark">
                <span className="font-semibold">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;