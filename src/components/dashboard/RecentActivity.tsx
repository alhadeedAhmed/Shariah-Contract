import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, FileText, User, AlertCircle } from "lucide-react";

const activities = [
  {
    action: "Contract Approved",
    user: "Dr. Ahmad Hassan",
    userRole: "Shariah Scholar", 
    time: "2 hours ago",
    icon: CheckCircle,
    iconColor: "text-green-600"
  },
  {
    action: "New Document Added",
    user: "Sarah Al-Mahmoud",
    userRole: "Legal Advisor",
    time: "4 hours ago", 
    icon: FileText,
    iconColor: "text-blue-600"
  },
  {
    action: "Participant Joined",
    user: "Emirates NBD",
    userRole: "Financial Institution",
    time: "1 day ago",
    icon: User,
    iconColor: "text-maroon"
  },
  {
    action: "Compliance Alert",
    user: "System",
    userRole: "Automated Check",
    time: "2 days ago",
    icon: AlertCircle,
    iconColor: "text-amber-600"
  }
];

const RecentActivity = () => {
  return (
    <Card className="border-golden/20 shadow-elegant">
      <CardHeader>
        <CardTitle className="text-xl text-maroon">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-golden/5 transition-colors">
            <div className={`p-2 rounded-full bg-gray-100 ${activity.iconColor}`}>
              <activity.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium text-maroon text-sm">{activity.action}</p>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xs bg-golden/20 text-maroon">
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-xs font-medium text-maroon">{activity.user}</p>
                  <p className="text-xs text-muted-foreground">{activity.userRole}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;