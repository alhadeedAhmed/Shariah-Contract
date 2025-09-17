import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentCenter from "@/components/shared/DocumentCenter";
import SecureChat from "@/components/shared/SecureChat";
import { motion } from "framer-motion";

const MusharakahConvert = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Upload */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
                  <h1 className="text-xl md:text-2xl font-bold text-maroon tracking-tight">
                    Upload Private Agreement
                  </h1>
                </div>
                <input
                  type="file"
                  className="border border-maroon/20 rounded-lg p-3 bg-white/70 text-sm"
                />
                <div className="mt-4 flex justify-end">
                  <Button className="bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90">
                    Analyze & Convert
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Conversion Result */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-xl">
                <h2 className="text-xl font-semibold text-maroon mb-4 tracking-tight">
                  Conversion Result
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="p-4 rounded-xl border border-maroon/10 bg-gradient-to-br from-maroon/5 to-golden/5">
                    <p className="text-maroon font-medium mb-2">
                      Original Clauses
                    </p>
                    <ul className="list-disc pl-4 text-golden space-y-1">
                      <li>Interest-bearing clause (non-compliant)</li>
                      <li>Uncertain delivery terms (Gharar)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-maroon/10 bg-gradient-to-br from-golden/10 to-maroon/5">
                    <p className="text-maroon font-medium mb-2">
                      Islamic Alternatives
                    </p>
                    <ul className="list-disc pl-4 text-golden space-y-1">
                      <li>Profit-loss sharing (Musharakah)</li>
                      <li>Clear delivery and ownership structure</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button className="bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90">
                    Approve Islamic Version
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Docs + Execution */}
            <DocumentCenter
              title="Documents"
              documents={[
                {
                  id: "c1",
                  name: "Original Agreement",
                  version: "1.0",
                  status: "review",
                  updatedAt: "now",
                },
                {
                  id: "c2",
                  name: "Musharakah Converted",
                  version: "1.0",
                  status: "draft",
                  updatedAt: "now",
                },
              ]}
            />

            {/* Execution */}
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-maroon mb-4 tracking-tight">
                Contract Execution
              </h2>
              <ul className="list-disc pl-6 text-golden space-y-2 text-sm">
                <li>All parties sign the final agreement</li>
                <li>Capital transfer initiated</li>
                <li>Ownership recorded immutably</li>
                <li>Shares registered on platform</li>
              </ul>
              <div className="mt-4 flex justify-end space-x-3">
                <Button className="bg-maroon text-white">Sign Agreement</Button>
                <Button className="bg-golden text-white">
                  Record Ownership
                </Button>
              </div>
            </Card>

            {/* Partnership Mgmt */}
            <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-xl">
              <h2 className="text-xl font-semibold text-maroon mb-4 tracking-tight">
                Partnership Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border border-maroon/20 rounded-lg bg-white/60">
                  <p className="text-maroon font-medium">
                    Profit/Loss Tracking
                  </p>
                  <p className="text-sm text-golden">Current Quarter: +$120k</p>
                </div>
                <div className="p-4 border border-maroon/20 rounded-lg bg-white/60">
                  <p className="text-maroon font-medium">Performance</p>
                  <p className="text-sm text-golden">Stable growth (12% YoY)</p>
                </div>
                <div className="p-4 border border-maroon/20 rounded-lg bg-white/60">
                  <p className="text-maroon font-medium">Quarterly Review</p>
                  <p className="text-sm text-golden">
                    Q1 review scheduled March 30
                  </p>
                </div>
                <div className="p-4 border border-maroon/20 rounded-lg bg-white/60">
                  <p className="text-maroon font-medium">Partner Reports</p>
                  <p className="text-sm text-golden">
                    Downloadable financial reports
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <Button className="bg-maroon text-white">
                  Generate Report
                </Button>
              </div>
            </Card>
          </div>

          {/* Chat */}
          <SecureChat
            title="Scholar/Legal Chat"
            initialMessages={[
              {
                id: "m1",
                author: "AI Advisor",
                text: "We identified non-compliant clauses. Review suggested alternatives.",
                time: "now",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default MusharakahConvert;
