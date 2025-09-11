import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/context/AppStore";
import { FileText, TrendingUp, DollarSign } from "lucide-react";

const ProposalNew = () => {
  const navigate = useNavigate();
  const { createMusharakahApplication } = useAppStore();

  const submit = () => {
    const app = createMusharakahApplication();
    navigate(`/business/applications/${app.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-lg border-2 border-maroon" />
            <h1 className="text-2xl md:text-3xl font-bold text-maroon tracking-tight">
              New Partnership Proposal
            </h1>
          </div>
          <p className="mt-2 text-sm md:text-base text-golden">
            Define your business expansion plan, capital needs, and supporting
            documents to propose a Musharakah partnership.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/80 backdrop-blur-lg border border-maroon/10 shadow-xl rounded-2xl overflow-hidden">
            {/* Gradient header strip */}
            <div className="h-1 w-full bg-gradient-to-r from-maroon via-golden to-maroon-dark"></div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Expansion Plan */}
              <div>
                <label className="flex items-center text-maroon font-medium mb-2">
                  <TrendingUp className="h-5 w-5 mr-2 text-golden" />
                  Business Expansion Plan
                </label>
                <Textarea
                  className="min-h-[140px] border-maroon/20"
                  placeholder="Describe your business expansion strategy, goals, and expected outcomes..."
                />
              </div>

              {/* Capital Requirement */}
              <div>
                <label className="flex items-center text-maroon font-medium mb-2">
                  <DollarSign className="h-5 w-5 mr-2 text-golden" />
                  Capital Requirement (USD)
                </label>
                <Input
                  type="number"
                  className="border-maroon/20"
                  placeholder="e.g., 250000"
                />
              </div>

              {/* Upload Business Plan */}
              <div>
                <label className="flex items-center text-maroon font-medium mb-2">
                  <FileText className="h-5 w-5 mr-2 text-golden" />
                  Upload Business Plan
                </label>
                <Input type="file" className="border-maroon/20" />
                <p className="text-xs text-golden mt-1">
                  Supported: PDF, DOCX (max 10MB)
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  onClick={submit}
                  className="w-full sm:w-auto bg-gradient-to-r from-maroon to-maroon-dark text-white font-semibold rounded-xl hover:opacity-90 transition"
                >
                  Submit Proposal
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProposalNew;
