import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";

const AdminAnalytics = () => {
  const metrics = [
    { label: "Active Contracts", value: 320 },
    { label: "Monthly Volume", value: "$2.5M" },
    { label: "Avg Risk Score", value: "78/100" },
    { label: "Pending Reviews", value: 14 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-6">
        <h1 className="text-2xl font-semibold text-[#4A0404] mb-4">
          Analytics & Reporting
        </h1>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            Key Metrics
          </h2>
          <ul className="text-sm text-[#B4925F] space-y-2">
            {metrics.map((m) => (
              <li key={m.label}>
                {m.label}:{" "}
                <span className="text-[#4A0404] font-semibold">{m.value}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            System Optimization Notes
          </h2>
          <ul className="text-sm text-[#B4925F] space-y-2">
            <li>Optimize AI risk scoring algorithm</li>
            <li>Improve onboarding UX flow</li>
            <li>Plan Q4 system upgrade for scalability</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
