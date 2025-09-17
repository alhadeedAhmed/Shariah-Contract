import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter from "@/components/shared/DocumentCenter";
import SecureChat from "@/components/shared/SecureChat";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { motion } from "framer-motion";

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

const negotiationSteps: WorkflowStep[] = [
  { id: "started", title: "Negotiation initiated", status: "completed" },
  {
    id: "modifications",
    title: "Contract modifications ongoing",
    status: "in_progress",
  },
  { id: "finalized", title: "Final terms agreed", status: "pending" },
];

const BusinessStatus = () => {
  const { id } = useParams();
  const { updateApplication } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Phase 4.1 Approvals */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <WorkflowTracker title="Partner Approvals" steps={partnersSteps} />
          <WorkflowTracker title="Scholar Review" steps={scholarSteps} />
          <WorkflowTracker title="Finance Review" steps={financeSteps} />
        </div>

        {/* Actions */}
        <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-md">
          <p className="text-maroon font-medium">
            Simulate multi-party approvals:
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-maroon to-maroon-dark text-white"
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
              className="text-maroon border-maroon hover:bg-maroon/5"
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
              className="text-maroon border-maroon hover:bg-maroon/5"
              onClick={() =>
                id &&
                updateApplication(id, { status: { finance: "offer" } as any })
              }
            >
              Issue Offer Letter
            </Button>
          </div>
        </Card>

        {/* Phase 4.2 Negotiation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <WorkflowTracker title="Negotiation Phase" steps={negotiationSteps} />
          <SecureChat
            title="Multi-Party Negotiation"
            initialMessages={[
              {
                id: "n1",
                author: "Partner A",
                text: "We propose adjusting profit-sharing to 60/40.",
                time: "now",
              },
              {
                id: "n2",
                author: "Scholar",
                text: "Ensure compliance with Shariah in revenue allocation.",
                time: "now",
              },
            ]}
          />
        </motion.div>

        {/* Documents */}
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
            {
              id: "b2",
              name: "Negotiated Contract Draft",
              version: "1.0",
              status: "draft",
              updatedAt: "just now",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default BusinessStatus;
