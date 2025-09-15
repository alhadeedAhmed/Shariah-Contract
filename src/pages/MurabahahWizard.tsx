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
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Wizard Steps */}
          <div className="lg:col-span-2 space-y-10">
            {/* Step 1: Transaction Details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                    <span className="text-adalah-primary text-sm font-bold">
                      1
                    </span>
                  </div>
                  <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                    Transaction Details
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Vehicle
                    </label>
                    <Input
                      placeholder="e.g., Toyota Corolla 2023"
                      className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Price (USD)
                    </label>
                    <Input
                      type="number"
                      placeholder="21000"
                      className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Down Payment
                    </label>
                    <Input
                      type="number"
                      placeholder="3000"
                      className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Repayment Period
                    </label>
                    <Select>
                      <SelectTrigger className="border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30">
                        <SelectValue placeholder="12 months" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-adalah-primary mb-2">
                      Purpose / Notes
                    </label>
                    <Textarea
                      placeholder="Describe purpose and specifics"
                      className="border-adalah-primary/20 min-h-[100px] focus:border-adalah-golden focus:ring-adalah-golden/30"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg">
                    Run AI Analysis
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Step 2: AI Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <h2 className="text-xl font-bold text-adalah-primary mb-6 tracking-tight font-inter-tight">
                  AI Analysis Results
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Enhanced KYC", "Credit Scoring", "Risk Assessment"].map(
                    (t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="p-4 rounded-xl border border-adalah-golden/30 bg-gradient-to-br from-adalah-golden/20 to-white/80 text-center shadow-sm"
                      >
                        <p className="text-sm font-medium text-adalah-primary">
                          {t}
                        </p>
                        <p className="text-xs text-adalah-golden mt-1">
                          Mock result: PASS
                        </p>
                      </motion.div>
                    )
                  )}
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                  >
                    Back
                  </Button>
                  <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-md hover:shadow-lg">
                    Generate Contract
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Step 3: Contract Preview */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="p-8 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-adalah-primary/20">
                <h2 className="text-xl font-bold text-adalah-primary mb-6 tracking-tight font-inter-tight">
                  Generated Contract (Preview)
                </h2>

                <div className="space-y-3 text-sm text-adalah-primary">
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
                  <p className="text-adalah-golden text-sm">
                    Shariah note: Ownership transfer and price transparency
                    ensured. Riba avoided through cost-plus sale.
                  </p>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <Button
                    variant="outline"
                    className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                  >
                    Modify Terms
                  </Button>
                  <Button
                    className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold shadow-md hover:shadow-lg"
                    onClick={() => {
                      const app = createMurabahahApplication();
                      navigate(`/applications/${app.id}`);
                    }}
                  >
                    Accept & Sign
                  </Button>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
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
            </motion.div>
          </div>

          {/* Right: Workflow & Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MurabahahWizard;
