import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter from "@/components/shared/DocumentCenter";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Workflow Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <WorkflowTracker title="Scholar Review" steps={scholarSteps} />
          <WorkflowTracker title="Financial Assessment" steps={financeSteps} />
        </motion.div>

        {/* Notifications + Documents */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
            <h2 className="text-lg font-bold text-adalah-primary mb-3 font-inter-tight">
              Notifications
            </h2>
            <p className="text-adalah-primary/80 text-sm leading-relaxed">
              Notifications and timestamps will appear here. This is a mock UI
              showing real-time updates once integrated.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-md hover:shadow-lg"
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
                className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                onClick={() =>
                  id &&
                  updateApplication(id, {
                    status: { finance: "offer" } as any,
                  })
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
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Link to={`/delivery/${id ?? "unknown"}`}>
            <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg">
              Go to Delivery
            </Button>
          </Link>
          <Link to={`/payments`}>
            <Button
              variant="outline"
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              Go to Payments
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationStatus;
