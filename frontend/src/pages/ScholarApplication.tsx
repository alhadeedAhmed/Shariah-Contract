// src/pages/ScholarApplication.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useNavigate } from "react-router-dom";
import WorkflowTracker, {
  WorkflowStep,
} from "@/components/shared/WorkflowTracker";
import DocumentCenter, {
  DocumentItem,
} from "@/components/shared/DocumentCenter";
import SecureChat from "@/components/shared/SecureChat";
import { useAppStore } from "@/context/AppStore";
import { useState } from "react";
import { motion } from "framer-motion";

const ScholarApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplication } = useAppStore();

  const app = applications.find((a) => a.id === id);

  // Local documents
  const [documents, setDocuments] = useState<DocumentItem[]>(
    app
      ? [
          {
            id: "doc1",
            name: `${app.type} Contract Draft`,
            version: "1.0",
            status: "review",
            updatedAt: "just now",
          },
          {
            id: "doc2",
            name: "KYC Summary",
            version: "1.0",
            status: "review",
            updatedAt: "just now",
          },
        ]
      : []
  );

  if (!app) {
    return (
      <div className="min-h-screen">
        <DashboardHeader />
        <div className="container mx-auto px-8 py-10">
          <Card className="p-6">Application not found.</Card>
        </div>
      </div>
    );
  }

  // Workflow mapping
  const mapScholarStatusToStep = (s: string) =>
    s === "queued"
      ? "pending"
      : s === "in_review"
      ? "in_progress"
      : s === "approved"
      ? "completed"
      : "pending";

  const scholarSteps: WorkflowStep[] = [
    {
      id: "assignment",
      title: "Review Assignment",
      status: mapScholarStatusToStep(app.status.scholar) as any,
    },
    {
      id: "analysis",
      title: "Scholarly Analysis",
      status:
        app.status.scholar === "approved"
          ? "completed"
          : app.status.scholar === "in_review"
          ? "in_progress"
          : "pending",
    },
    {
      id: "peer",
      title: "Peer Consultation",
      status: app.status.scholar === "in_review" ? "in_progress" : "pending",
    },
    {
      id: "decision",
      title: "Decision & Documentation",
      status: app.status.scholar === "approved" ? "completed" : "pending",
    },
  ];

  // Actions
  const handleApprove = () => {
    if (!app) return;
    if (app.type === "murabahah") {
      updateApplication(app.id, {
        status: { scholar: "approved", finance: "in_review" } as any,
      } as any);
    } else if (app.type === "musharakah") {
      updateApplication(app.id, {
        status: {
          scholar: "approved",
          finance: "in_review",
          partners: "approving",
        } as any,
      } as any);
    } else {
      updateApplication(app.id, { status: { scholar: "approved" } } as any);
    }

    setDocuments((prev) => [
      ...prev,
      {
        id: `pof-${Date.now()}`,
        name: "Proof of Faith (POF)",
        version: "1.0",
        status: "approved",
        updatedAt: "just now",
      },
    ]);

    navigate("/scholar/dashboard");
  };

  const handleRequestRevision = () => {
    updateApplication(app.id, { status: { scholar: "in_review" } } as any);
    setDocuments((prev) => [
      ...prev,
      {
        id: `rev-${Date.now()}`,
        name: "Requested Revisions",
        version: "1.0",
        status: "review",
        updatedAt: "just now",
      },
    ]);
  };

  const handleReject = () => {
    updateApplication(app.id, { status: { scholar: "rejected" } } as any);
    setDocuments((prev) => [
      ...prev,
      {
        id: `rej-${Date.now()}`,
        name: "Scholar Rejection Note",
        version: "1.0",
        status: "draft",
        updatedAt: "just now",
      },
    ]);
    navigate("/scholar/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Side */}
          <div className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-maroon/10">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-golden">Application ID</p>
                  <p className="text-maroon font-semibold">{app.id}</p>
                </div>
                <div>
                  <p className="text-sm text-golden">Type</p>
                  <p className="text-maroon font-semibold">{app.type}</p>
                </div>
              </div>

              <WorkflowTracker
                title="Scholar Review Process"
                steps={scholarSteps}
              />

              <div className="mt-6 flex flex-wrap gap-3 justify-end">
                <Button
                  variant="outline"
                  className="text-maroon border-maroon hover:bg-maroon/5"
                  onClick={handleRequestRevision}
                >
                  Request Revision
                </Button>
                <Button
                  className="bg-gradient-to-r from-maroon to-maroon-dark text-white"
                  onClick={handleApprove}
                >
                  Approve & Issue POF
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleReject}
                >
                  Reject Contract
                </Button>
              </div>
            </Card>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <DocumentCenter
                title="Documents for Review"
                documents={documents}
              />
            </motion.div>
          </div>

          {/* Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <SecureChat
              title="Scholar Discussion (Peer Consultation)"
              initialMessages={[
                {
                  id: "m1",
                  author: "AI Advisor",
                  text: "This contract shows an interest-bearing clause at 4.2.",
                  time: "now",
                },
                {
                  id: "m2",
                  author: "You",
                  text: "Please clarify the profit split in clause 7.",
                  time: "now",
                },
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScholarApplication;
