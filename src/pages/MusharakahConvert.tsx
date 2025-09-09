import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentCenter from "@/components/shared/DocumentCenter";
import SecureChat from "@/components/shared/SecureChat";

const MusharakahConvert = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
                <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                  Upload Private Agreement
                </h1>
              </div>
              <input
                type="file"
                className="border border-[#4A0404]/20 rounded p-3 bg-white/70"
              />
              <div className="mt-4 flex justify-end">
                <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                  Analyze & Convert
                </Button>
              </div>
            </Card>
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <h2 className="text-xl font-semibold text-[#4A0404] mb-4 tracking-tight">
                Conversion Result (Diff View)
              </h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="p-4 rounded-xl border border-[#4A0404]/10 bg-white/60">
                  <p className="text-[#4A0404] font-medium mb-2">
                    Original Clauses
                  </p>
                  <ul className="list-disc pl-4 text-[#B4925F] space-y-1">
                    <li>Interest-bearing clause (non-compliant)</li>
                    <li>Uncertain delivery terms (Gharar)</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl border border-[#4A0404]/10 bg-white/60">
                  <p className="text-[#4A0404] font-medium mb-2">
                    Islamic Alternatives
                  </p>
                  <ul className="list-disc pl-4 text-[#B4925F] space-y-1">
                    <li>Profit-loss sharing (Musharakah)</li>
                    <li>Clear delivery and ownership structure</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                  Approve Islamic Version
                </Button>
              </div>
            </Card>
            <DocumentCenter
              title="Documents"
              documents={[
                {
                  id: "c1",
                  name: "Original Agreement",
                  version: "1.0",
                  status: "review",
                  updatedAt: "now",
                },
                {
                  id: "c2",
                  name: "Musharakah Converted",
                  version: "1.0",
                  status: "draft",
                  updatedAt: "now",
                },
              ]}
            />
            {/* Contract Execution */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <h2 className="text-xl font-semibold text-[#4A0404] mb-4 tracking-tight">
                Contract Execution
              </h2>
              <ul className="list-disc pl-6 text-[#B4925F] space-y-2 text-sm">
                <li>All parties must sign the final agreement</li>
                <li>Capital transfer initiated after signing</li>
                <li>Asset/business ownership recorded on platform</li>
                <li>Ownership shares registered</li>
              </ul>
              <div className="mt-4 flex justify-end space-x-3">
                <Button className="bg-[#4A0404] text-white">
                  Sign Agreement
                </Button>
                <Button className="bg-[#B4925F] text-white">
                  Record Ownership
                </Button>
              </div>
            </Card>

            {/* Partnership Management */}
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <h2 className="text-xl font-semibold text-[#4A0404] mb-4 tracking-tight">
                Partnership Management
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 border border-[#4A0404]/20 rounded-lg bg-white/60">
                  <p className="text-[#4A0404] font-medium">
                    Profit/Loss Tracking
                  </p>
                  <p className="text-sm text-[#B4925F]">
                    Current Quarter: +$120k profit
                  </p>
                </div>
                <div className="p-4 border border-[#4A0404]/20 rounded-lg bg-white/60">
                  <p className="text-[#4A0404] font-medium">
                    Performance Monitoring
                  </p>
                  <p className="text-sm text-[#B4925F]">
                    Stable growth (12% YoY)
                  </p>
                </div>
                <div className="p-4 border border-[#4A0404]/20 rounded-lg bg-white/60">
                  <p className="text-[#4A0404] font-medium">Quarterly Review</p>
                  <p className="text-sm text-[#B4925F]">
                    Q1 review scheduled for March 30
                  </p>
                </div>
                <div className="p-4 border border-[#4A0404]/20 rounded-lg bg-white/60">
                  <p className="text-[#4A0404] font-medium">Partner Reports</p>
                  <p className="text-sm text-[#B4925F]">
                    Downloadable financial & progress reports
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-[#4A0404] text-white">
                  Generate Report
                </Button>
              </div>
            </Card>
          </div>
          <SecureChat
            title="Scholar/Legal Chat"
            initialMessages={[
              {
                id: "m1",
                author: "AI Advisor",
                text: "We identified non-compliant clauses. Review suggested alternatives.",
                time: "now",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MusharakahConvert;
