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

const ScholarApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applications, updateApplication } = useAppStore();

  const app = applications.find((a) => a.id === id);

  // Local document list for the review session (mock).
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

  // Scholar workflow with detailed steps
  const mapScholarStatusToStep = (s: string) =>
    s === "queued"
      ? "pending"
      : s === "in_review"
      ? "in_progress"
      : "completed";

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

  // Handlers
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

    // Add Proof of Faith doc
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
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left side */}
          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[#B4925F]">Application ID</p>
                  <p className="text-[#4A0404] font-semibold">{app.id}</p>
                </div>
                <div>
                  <p className="text-sm text-[#B4925F]">Type</p>
                  <p className="text-[#4A0404] font-semibold">{app.type}</p>
                </div>
              </div>

              <WorkflowTracker
                title="Scholar Review Process"
                steps={scholarSteps}
              />

              <div className="mt-4 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="text-[#4A0404] border-[#4A0404]"
                  onClick={handleRequestRevision}
                >
                  Request Revision
                </Button>
                <Button
                  className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                  onClick={handleApprove}
                >
                  Approve & Issue POF
                </Button>
                <Button
                  variant="destructive"
                  className="bg-red-600 text-white"
                  onClick={handleReject}
                >
                  Reject Contract
                </Button>
              </div>
            </Card>

            <DocumentCenter
              title="Documents for Review"
              documents={documents}
            />
          </div>

          {/* Right side: Scholar Peer Chat */}
          <SecureChat
            title="Scholar Discussion (Peer Consultation)"
            initialMessages={[
              {
                id: "m1",
                author: "AI Advisor",
                text: "This contract shows interest-bearing clause at clause 4.2.",
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
        </div>
      </div>
    </div>
  );
};

export default ScholarApplication;
