import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";

const entries = [
  {
    id: "a1",
    time: "2025-09-08 10:15",
    actor: "User",
    action: "Signed MPA",
    ref: "Signup",
  },
  {
    id: "a2",
    time: "2025-09-08 10:20",
    actor: "System",
    action: "Created Preliminary PO",
    ref: "Marketplace",
  },
  {
    id: "a3",
    time: "2025-09-08 10:35",
    actor: "User",
    action: "Accepted Murabahah Contract",
    ref: "Wizard",
  },
  {
    id: "a4",
    time: "2025-09-08 10:36",
    actor: "System",
    action: "Submitted for Scholar & Finance Review",
    ref: "Application",
  },
];

const AuditLog = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
          <div className="flex items-center space-x-3 mb-5">
            <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
            <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              Audit Log
            </h1>
          </div>
          <div className="divide-y divide-[#4A0404]/10">
            {entries.map((e) => (
              <div
                key={e.id}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-[#4A0404] font-medium">{e.action}</p>
                  <p className="text-xs text-[#B4925F]">
                    {e.actor} • {e.ref}
                  </p>
                </div>
                <span className="text-xs text-[#B4925F]">{e.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuditLog;
