import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";

const partnersSteps: WorkflowStep[] = [
  { id: "queued", title: "Partner approvals queued", status: "completed" },
  {
    id: "approving",
    title: "Partner approvals in progress",
    status: "in_progress",
  },
  { id: "approved", title: "Partner approvals complete", status: "pending" },
];

const scholarSteps: WorkflowStep[] = [
  { id: "queued", title: "Scholar review queued", status: "completed" },
  {
    id: "in_review",
    title: "Scholar review in progress",
    status: "in_progress",
  },
  { id: "approved", title: "Scholar approved", status: "pending" },
];

const financeSteps: WorkflowStep[] = [
  { id: "queued", title: "Finance review queued", status: "completed" },
  {
    id: "in_review",
    title: "Finance review in progress",
    status: "in_progress",
  },
  { id: "offer", title: "Offer Letter issued", status: "pending" },
];

const BusinessStatus = () => {
  const { id } = useParams();
  const { updateApplication } = useAppStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-3 gap-8">
          <WorkflowTracker title="Partner Approvals" steps={partnersSteps} />
          <WorkflowTracker title="Scholar Review" steps={scholarSteps} />
          <WorkflowTracker title="Finance Review" steps={financeSteps} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
            <p className="text-[#4A0404]">
              Use these actions to simulate multi-party approval flow.
            </p>
            <div className="mt-4 space-x-2">
              <Button
                className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                onClick={() =>
                  id &&
                  updateApplication(id, {
                    status: { partners: "approved" } as any,
                  })
                }
              >
                Partners Approve
              </Button>
              <Button
                variant="outline"
                className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
                onClick={() =>
                  id &&
                  updateApplication(id, {
                    status: { scholar: "approved" } as any,
                  })
                }
              >
                Scholar Approves
              </Button>
              <Button
                variant="outline"
                className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
                onClick={() =>
                  id &&
                  updateApplication(id, { status: { finance: "offer" } as any })
                }
              >
                Issue Offer Letter
              </Button>
            </div>
          </Card>
          <DocumentCenter
            title="Documents"
            documents={[
              {
                id: "b1",
                name: "Musharakah Contract",
                version: "0.9",
                status: "review",
                updatedAt: "now",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessStatus;
