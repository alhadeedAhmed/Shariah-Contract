import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";

const AdminSystemOversight = () => {
  const activities = [
    { id: "U1001", action: "Created Murabahah Contract", time: "2m ago" },
    { id: "U1002", action: "Scholar approved POF", time: "10m ago" },
    { id: "U1003", action: "Capital provider funded loan", time: "1h ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-6">
        <h1 className="text-2xl font-semibold text-[#4A0404] mb-4">
          System Oversight
        </h1>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            Recent User Activities
          </h2>
          <ul className="text-sm text-[#B4925F] space-y-2">
            {activities.map((a) => (
              <li key={a.id}>
                <span className="text-[#4A0404] font-medium">{a.id}</span> –{" "}
                {a.action} ({a.time})
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            System Performance
          </h2>
          <ul className="text-sm text-[#B4925F] space-y-2">
            <li>Transaction Volume Today: 248</li>
            <li>Avg Response Time: 320ms</li>
            <li>Active Users: 1,204</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AdminSystemOversight;
