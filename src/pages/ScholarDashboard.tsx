// src/pages/ScholarDashboard.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { useState, useEffect } from "react";

interface OnboardingData {
  name: string;
  certificate: string;
  file?: string;
  backgroundVerified: boolean;
  trainingModules: string[];
  availability: string;
}

const ScholarDashboard = () => {
  const {
    applications,
    createMurabahahApplication,
    createMusharakahApplication,
    updateApplication,
  } = useAppStore();
  const navigate = useNavigate();

  const [scholarVerified, setScholarVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem("scholarVerified") === "true";
    } catch {
      return false;
    }
  });

  // Load scholar onboarding details
  const [onboarding, setOnboarding] = useState<OnboardingData | null>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("scholarOnboarding");
      if (saved) {
        setOnboarding(JSON.parse(saved));
      }
    } catch {}
  }, []);

  // Save training complete toggle
  useEffect(() => {
    try {
      localStorage.setItem("scholarVerified", scholarVerified.toString());
    } catch {}
  }, [scholarVerified]);

  // Pending apps for scholar review
  const pending = applications.filter((a) => {
    // @ts-ignore
    return a.status?.scholar !== "approved";
  });

  // Approved apps (for monitoring)
  const approved = applications.filter((a) => {
    // @ts-ignore
    return a.status?.scholar === "approved";
  });

  const seedMocks = () => {
    createMurabahahApplication();
    createMurabahahApplication();
    createMusharakahApplication();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
            Scholar Dashboard
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            onClick={() => navigate("/scholar/applications")}
          >
            All Applications
          </Button>
          <Button
            variant="outline"
            className="text-[#4A0404] border-[#4A0404]"
            onClick={seedMocks}
          >
            Seed Mock Applications
          </Button>
        </div>

        {/* Training Progress */}
        {onboarding && (
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
            <p className="text-[#4A0404] font-semibold mb-2">
              Platform Training Progress
            </p>
            <p className="text-sm text-[#B4925F] mb-4">
              Modules completed by {onboarding.name} ({onboarding.certificate}):
            </p>
            <ul className="text-sm text-[#4A0404] space-y-1 mb-3">
              {onboarding.trainingModules.length > 0 ? (
                onboarding.trainingModules.map((m, i) => (
                  <li key={i}>✅ {m}</li>
                ))
              ) : (
                <li>⚠️ No modules completed yet</li>
              )}
            </ul>
            <p className="text-sm text-[#4A0404]">
              Availability: {onboarding.availability || "Not provided yet"}
            </p>
          </Card>
        )}

        {/* Pending Applications */}
        <div className="grid grid-cols-3 gap-6">
          {pending.length === 0 && (
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 col-span-3">
              <p className="text-[#4A0404]">
                No applications pending scholar review.
              </p>
            </Card>
          )}

          {pending.map((app) => (
            <Card
              key={app.id}
              className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10"
            >
              <p className="text-sm text-[#B4925F] mb-2">ID: {app.id}</p>
              <p className="text-[#4A0404] font-semibold mb-1">
                {app.type === "murabahah" ? "Murabahah" : "Musharakah"}{" "}
                Application
              </p>
              <p className="text-sm text-[#B4925F] mb-4">
                Scholar status:{" "}
                <span className="font-medium text-[#4A0404]">
                  {/* @ts-ignore */}
                  {app.status?.scholar}
                </span>
              </p>

              <div className="flex items-center justify-between">
                <Button
                  className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
                  onClick={() => navigate(`/scholar/applications/${app.id}`)}
                >
                  Open Review
                </Button>

                <Button
                  variant="outline"
                  className="text-[#4A0404] border-[#4A0404]"
                  onClick={() =>
                    updateApplication(app.id, {
                      status: {
                        scholar: "approved",
                        ...(app.type === "murabahah"
                          ? { finance: "in_review" }
                          : app.type === "musharakah"
                          ? {
                              finance: "in_review",
                              partners: "approving" as any,
                            }
                          : {}),
                      } as any,
                    } as any)
                  }
                >
                  Quick Approve
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Monitoring */}
        {approved.length > 0 && (
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 col-span-3">
            <p className="text-[#4A0404] font-semibold mb-2">
              Ongoing Monitoring
            </p>
            <p className="text-sm text-[#B4925F] mb-4">
              Review compliance reports for previously approved contracts.
            </p>
            <ul className="text-sm text-[#4A0404] space-y-2">
              {approved.map((app) => (
                <li key={app.id}>
                  Contract #{app.id} — status: compliant (last check mock)
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ScholarDashboard;
