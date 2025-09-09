import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import SecureChat from "@/components/shared/SecureChat";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";

const initialSteps: WorkflowStep[] = [
  { id: "details", title: "Enter transaction details", status: "completed" },
  { id: "analysis", title: "AI analysis & profiling", status: "in_progress" },
  { id: "contract", title: "Generate & review contract", status: "pending" },
  { id: "sign", title: "Sign & submit for review", status: "pending" },
];

const MurabahahWizard = () => {
  const [steps] = useState<WorkflowStep[]>(initialSteps);
  const navigate = useNavigate();
  const { createMurabahahApplication } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
                <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                  Murabahah Contract - Step 1
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Vehicle
                  </label>
                  <Input
                    placeholder="e.g., Toyota Corolla 2023"
                    className="border-[#4A0404]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Price (USD)
                  </label>
                  <Input
                    type="number"
                    placeholder="21000"
                    className="border-[#4A0404]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Down Payment
                  </label>
                  <Input
                    type="number"
                    placeholder="3000"
                    className="border-[#4A0404]/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Repayment Period
                  </label>
                  <Select>
                    <SelectTrigger className="border-[#4A0404]/20">
                      <SelectValue placeholder="12 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                      <SelectItem value="36">36 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Purpose / Notes
                  </label>
                  <Textarea
                    placeholder="Describe the purpose and any specifics for this purchase"
                    className="border-[#4A0404]/20 min-h-[100px]"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                  Run AI Analysis
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <h2 className="text-xl font-semibold text-[#4A0404] mb-4 tracking-tight">
                AI Analysis Results
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {["Enhanced KYC", "Credit Scoring", "Risk Assessment"].map(
                  (t) => (
                    <div
                      key={t}
                      className="p-4 rounded-xl border border-[#4A0404]/10 bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5"
                    >
                      <p className="text-sm font-medium text-[#4A0404]">{t}</p>
                      <p className="text-xs text-[#B4925F] mt-1">
                        Mock result: PASS
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
                >
                  Back
                </Button>
                <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                  Generate Contract
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <h2 className="text-xl font-semibold text-[#4A0404] mb-4 tracking-tight">
                Generated Contract (Preview)
              </h2>
              <div className="space-y-3 text-sm text-[#4A0404]">
                <p>
                  <strong>Asset:</strong> Vehicle (details as provided)
                </p>
                <p>
                  <strong>Purchase Price:</strong> $21,000 •{" "}
                  <strong>Profit Margin:</strong> $1,800 •{" "}
                  <strong>Total:</strong> $22,800
                </p>
                <p>
                  <strong>Installments:</strong> 12 months • $1,900 / month
                </p>
                <p className="text-[#B4925F]">
                  Shariah note: Ownership transfer and price transparency
                  ensured. Riba avoided through cost-plus sale.
                </p>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
                >
                  Modify Terms
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                  onClick={() => {
                    const app = createMurabahahApplication();
                    navigate(`/applications/${app.id}`);
                  }}
                >
                  Accept & Sign
                </Button>
              </div>
            </Card>
            <DocumentCenter
              title="Contract Documents"
              documents={[
                {
                  id: "d1",
                  name: "Murabahah Contract Draft",
                  version: "1.0",
                  status: "draft",
                  updatedAt: "just now",
                },
                {
                  id: "d2",
                  name: "KYC Summary",
                  version: "1.0",
                  status: "review",
                  updatedAt: "just now",
                },
              ]}
            />
          </div>
          <div className="space-y-8">
            <WorkflowTracker title="Process" steps={steps} />
            <SecureChat
              title="Advisor"
              initialMessages={[
                {
                  id: "1",
                  author: "AI Advisor",
                  text: "Ask me about Murabahah terms or compliance.",
                  time: "now",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MurabahahWizard;
