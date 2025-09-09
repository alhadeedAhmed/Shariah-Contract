import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Wrench, Shield, FileText } from "lucide-react";

const reminders = [
  {
    id: "r1",
    title: "Maintenance Service",
    due: "2025-10-15",
    desc: "10,000 km service due",
  },
  {
    id: "r2",
    title: "Insurance Renewal",
    due: "2025-11-01",
    desc: "Comprehensive policy renewal",
  },
  {
    id: "r3",
    title: "Registration",
    due: "2026-01-10",
    desc: "Annual registration renewal",
  },
];

const VehicleServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
              <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                Vehicle Lifecycle Services
              </h1>
            </div>
            <div className="space-y-3">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-[#4A0404]/10 bg-white/60"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5">
                      <Wrench className="h-5 w-5 text-[#4A0404]" />
                    </div>
                    <div>
                      <p className="text-[#4A0404] font-medium">{r.title}</p>
                      <p className="text-sm text-[#B4925F]">
                        Due {r.due} • {r.desc}
                      </p>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                    Schedule
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">
              Insurance & Taxes
            </p>
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#4A0404]/10 bg-white/60 mb-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[#4A0404]" />
                <div>
                  <p className="text-[#4A0404]">Auto-pay Insurance</p>
                  <p className="text-xs text-[#B4925F]">
                    Pay policy renewals automatically
                  </p>
                </div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-[#4A0404]/10 bg-white/60">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-[#4A0404]" />
                <div>
                  <p className="text-[#4A0404]">Auto-pay Registration</p>
                  <p className="text-xs text-[#B4925F]">
                    Pay registration fees automatically
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VehicleServices;
