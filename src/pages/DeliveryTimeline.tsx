import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { CheckCircle, Truck, FileText } from "lucide-react";

const steps = [
  {
    id: "bank-ownership",
    title: "Bank 24h Ownership Recorded",
    icon: FileText,
    desc: "Ownership recorded immutably.",
  },
  {
    id: "schedule",
    title: "Delivery Scheduled",
    icon: Truck,
    desc: "Appointment confirmed with dealer.",
  },
  {
    id: "do",
    title: "Delivery Order Signed",
    icon: CheckCircle,
    desc: "DO signed and uploaded.",
  },
];

const DeliveryTimeline = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
          <div className="flex items-center space-x-3 mb-5">
            <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
            <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              Delivery Timeline
            </h1>
          </div>
          <ol className="space-y-6">
            {steps.map((s) => (
              <li key={s.id} className="flex items-start space-x-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5">
                  <s.icon className="h-5 w-5 text-[#4A0404]" />
                </div>
                <div>
                  <p className="text-[#4A0404] font-medium">{s.title}</p>
                  <p className="text-sm text-[#B4925F]">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryTimeline;
