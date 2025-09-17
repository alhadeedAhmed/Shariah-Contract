// src/pages/ScholarDashboard.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

  // Save verification toggle
  useEffect(() => {
    try {
      localStorage.setItem("scholarVerified", scholarVerified.toString());
    } catch {}
  }, [scholarVerified]);

  // Filter applications
  const pending = applications.filter((a) => a.status?.scholar !== "approved");
  const approved = applications.filter((a) => a.status?.scholar === "approved");

  const seedMocks = () => {
    createMurabahahApplication();
    createMurabahahApplication();
    createMusharakahApplication();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />

      <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
          <h1 className="text-2xl md:text-3xl font-bold text-maroon tracking-tight">
            Scholar Dashboard
          </h1>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          <Button
            className="bg-gradient-to-r from-maroon to-maroon-dark text-white shadow-md"
            onClick={() => navigate("/scholar/applications")}
          >
            All Applications
          </Button>
          <Button
            variant="outline"
            className="text-maroon border-maroon hover:bg-maroon/5"
            onClick={seedMocks}
          >
            Seed Mock Applications
          </Button>
        </motion.div>

        {/* Training Progress */}
        {onboarding && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <p className="text-maroon font-semibold mb-2">
                Platform Training Progress
              </p>
              <p className="text-sm text-golden mb-4">
                Modules completed by {onboarding.name} ({onboarding.certificate}
                ):
              </p>
              <ul className="text-sm text-maroon space-y-1 mb-3">
                {onboarding.trainingModules.length > 0 ? (
                  onboarding.trainingModules.map((m, i) => (
                    <li key={i}>✅ {m}</li>
                  ))
                ) : (
                  <li>⚠️ No modules completed yet</li>
                )}
              </ul>
              <p className="text-sm text-maroon">
                Availability: {onboarding.availability || "Not provided yet"}
              </p>
            </Card>
          </motion.div>
        )}

        {/* Pending Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pending.length === 0 ? (
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 col-span-full rounded-2xl shadow-lg">
              <p className="text-maroon">
                No applications pending scholar review.
              </p>
            </Card>
          ) : (
            pending.map((app) => (
              <Card
                key={app.id}
                className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <p className="text-sm text-golden mb-2">ID: {app.id}</p>
                <p className="text-maroon font-semibold mb-1">
                  {app.type === "murabahah" ? "Murabahah" : "Musharakah"}{" "}
                  Application
                </p>
                <p className="text-sm text-golden mb-4">
                  Scholar status:{" "}
                  <span className="font-medium text-maroon">
                    {app.status?.scholar}
                  </span>
                </p>

                <div className="flex items-center justify-between gap-3">
                  <Button
                    className="bg-gradient-to-r from-maroon to-maroon-dark text-white"
                    onClick={() => navigate(`/scholar/applications/${app.id}`)}
                  >
                    Open Review
                  </Button>
                  <Button
                    variant="outline"
                    className="text-maroon border-maroon hover:bg-maroon/5"
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
            ))
          )}
        </motion.div>

        {/* Ongoing Monitoring */}
        {approved.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-lg">
              <p className="text-maroon font-semibold mb-2">
                Ongoing Monitoring
              </p>
              <p className="text-sm text-golden mb-4">
                Review compliance reports for previously approved contracts.
              </p>
              <ul className="text-sm text-maroon space-y-2">
                {approved.map((app) => (
                  <li key={app.id}>
                    Contract #{app.id} — status: compliant (last check mock)
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScholarDashboard;
