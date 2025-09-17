import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const activities = [
  {
    title: "Murabaha-Finance",
    value: "$156",
    status: "Active",
    progress: 75
  },
  {
    title: "Ijara-Equipment",
    value: "$89",
    status: "Pending",
    progress: 45
  },
  {
    title: "Takaful-Insurance",
    value: "$234",
    status: "Completed",
    progress: 100
  }
];

const ContractActivityType = () => {
  return (
    <Card className="border-golden/20 shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-maroon">Contract Activity Type</CardTitle>
          <Button variant="outline" size="sm" className="text-xs text-muted-foreground hover:text-maroon">
            See All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="p-4 border border-golden/20 rounded-lg hover:bg-golden/5 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-semibold text-maroon">{activity.title}</h4>
                <p className="text-lg font-bold text-maroon">{activity.value}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.status === 'Active' ? 'bg-green-100 text-green-700' :
                activity.status === 'Pending' ? 'bg-blue-100 text-blue-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {activity.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-maroon">{activity.progress}%</span>
              </div>
              <Progress value={activity.progress} className="h-2" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContractActivityType;