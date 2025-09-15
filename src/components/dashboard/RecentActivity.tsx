import { Card } from "@/components/ui/card";

const activities = [
  {
    title: "New Contract Created",
    description: "Murabaha financing contract",
    time: "2 hours ago",
    color: "bg-adalah-primary",
  },
  {
    title: "Document Uploaded",
    description: "Shariah compliance certificate",
    time: "4 hours ago",
    color: "bg-golden",
  },
  {
    title: "Participant Joined",
    description: "Emirates NBD Bank",
    time: "1 day ago",
    color: "bg-maroon-light",
  },
];

const RecentActivity = () => {
  return (
    <Card className="border border-golden/20">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-maroon mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${activity.color}`} />
              <div>
                <h3 className="text-sm font-medium text-maroon">
                  {activity.title}
                </h3>
                <p className="text-sm text-golden-dark">
                  {activity.description}
                </p>
                <p className="text-xs text-golden/60 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RecentActivity;
