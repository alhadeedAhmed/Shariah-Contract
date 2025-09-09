import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const schedule = [
  { id: 1, due: "2025-10-01", amount: 1900, status: "upcoming" },
  { id: 2, due: "2025-11-01", amount: 1900, status: "upcoming" },
  { id: 3, due: "2025-12-01", amount: 1900, status: "upcoming" },
];

const Payments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold">SATpay</p>
            <p className="text-sm text-[#B4925F]">
              Make installment payments securely.
            </p>
            <div className="mt-4 space-y-3">
              {schedule.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-[#4A0404]/10 bg-white/60"
                >
                  <span className="text-[#4A0404] text-sm">{s.due}</span>
                  <span className="text-[#4A0404] font-medium">
                    ${s.amount}
                  </span>
                  <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                    Pay
                  </Button>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 col-span-2">
            <p className="text-[#4A0404] font-semibold">Settings</p>
            <div className="mt-4 flex items-center justify-between p-4 rounded-xl border border-[#4A0404]/10 bg-white/60">
              <div>
                <p className="text-[#4A0404]">Autopay</p>
                <p className="text-sm text-[#B4925F]">
                  Automatically pay installments on due date.
                </p>
              </div>
              <Switch />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payments;
