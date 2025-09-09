import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";

const scholarSteps: WorkflowStep[] = [
  { id: "queued", title: "Queued for scholar review", status: "completed" },
  { id: "analysis", title: "Compliance analysis", status: "in_progress" },
  { id: "pof", title: "Issue Proof of Faith (POF)", status: "pending" },
];

const financeSteps: WorkflowStep[] = [
  {
    id: "queued",
    title: "Queued for financial assessment",
    status: "completed",
  },
  { id: "risk", title: "Risk assessment & scoring", status: "in_progress" },
  { id: "offer", title: "Offer Letter issuance", status: "pending" },
];

const ApplicationStatus = () => {
  const { id } = useParams();
  const { updateApplication } = useAppStore();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <WorkflowTracker title="Scholar Review" steps={scholarSteps} />
          <WorkflowTracker title="Financial Assessment" steps={financeSteps} />
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
            <p className="text-[#4A0404]">
              Notifications and timestamps will appear here. This is a mock UI
              showing real-time updates once integrated.
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <Button
                className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                onClick={() =>
                  id &&
                  updateApplication(id, {
                    status: { scholar: "approved" } as any,
                  })
                }
              >
                Mark Scholar Approved (POF)
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
            title="Attached Documents"
            documents={[
              {
                id: "d10",
                name: "Offer Letter (Draft)",
                version: "0.9",
                status: "review",
                updatedAt: "5m ago",
              },
              {
                id: "d11",
                name: "POF (Pending)",
                version: "-",
                status: "draft",
                updatedAt: "5m ago",
              },
            ]}
          />
        </div>
        <div className="flex items-center space-x-3">
          <Link to={`/delivery/${id ?? "unknown"}`}>
            <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
              Go to Delivery
            </Button>
          </Link>
          <Link to={`/payments`}>
            <Button
              variant="outline"
              className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
            >
              Go to Payments
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
