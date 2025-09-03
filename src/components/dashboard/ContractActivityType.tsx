import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const activities = [
  {
    type: "Smart Contract Created",
    description: "Murabaha financing contract for property purchase",
    time: "2 hours ago",
    status: "active",
    icon: FileText
  },
  {
    type: "Compliance Check",
    description: "Shariah compliance validation completed",
    time: "4 hours ago", 
    status: "completed",
    icon: CheckCircle
  },
  {
    type: "Participant Added",
    description: "New Islamic bank joined the network",
    time: "1 day ago",
    status: "pending",
    icon: Clock
  },
  {
    type: "Validation Required",
    description: "Ijara contract needs scholar review",
    time: "2 days ago",
    status: "warning",
    icon: AlertTriangle
  }
];

const ContractActivityType = () => {
  return (
    <Card className="border-golden/20 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-maroon">Contract Activity Type</CardTitle>
          <Button variant="outline" size="sm" className="border-golden text-golden hover:bg-golden hover:text-maroon">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-golden/5 transition-colors">
            <div className={`p-2 rounded-full ${
              activity.status === 'completed' ? 'bg-green-100 text-green-600' :
              activity.status === 'warning' ? 'bg-amber-100 text-amber-600' :
              activity.status === 'pending' ? 'bg-blue-100 text-blue-600' :
              'bg-maroon/10 text-maroon'
            }`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-maroon">{activity.type}</h4>
                <Badge variant={
                  activity.status === 'completed' ? 'default' :
                  activity.status === 'warning' ? 'destructive' :
                  'secondary'
                } className={`
                  ${activity.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                  ${activity.status === 'warning' ? 'bg-amber-100 text-amber-700' : ''}
                  ${activity.status === 'pending' ? 'bg-blue-100 text-blue-700' : ''}
                  ${activity.status === 'active' ? 'bg-maroon/10 text-maroon' : ''}
                `}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-golden-dark">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContractActivityType;