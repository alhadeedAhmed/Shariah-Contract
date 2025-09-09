import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";

const ProposalNew = () => {
  const navigate = useNavigate();
  const { createMusharakahApplication } = useAppStore();

  const submit = () => {
    const app = createMusharakahApplication();
    navigate(`/business/applications/${app.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
            <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
              New Partnership Proposal
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-[#4A0404] mb-2">
                Business Expansion Plan
              </p>
              <Textarea
                className="min-h-[120px] border-[#4A0404]/20"
                placeholder="Describe your plan..."
              />
            </div>
            <div>
              <p className="text-sm text-[#4A0404] mb-2">
                Capital Requirement (USD)
              </p>
              <Input
                type="number"
                className="border-[#4A0404]/20"
                placeholder="250000"
              />
            </div>
            <div className="col-span-2">
              <p className="text-sm text-[#4A0404] mb-2">
                Upload Business Plan (mock)
              </p>
              <Input type="file" className="border-[#4A0404]/20" />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
              onClick={submit}
            >
              Submit Proposal
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProposalNew;
