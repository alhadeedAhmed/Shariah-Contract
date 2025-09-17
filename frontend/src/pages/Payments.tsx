import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { CreditCard, Settings } from "lucide-react";

const schedule = [
  { id: 1, due: "2025-10-01", amount: 1900, status: "upcoming" },
  { id: 2, due: "2025-11-01", amount: 1900, status: "upcoming" },
  { id: 3, due: "2025-12-01", amount: 1900, status: "upcoming" },
];

const Payments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* SATpay Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <CreditCard className="h-6 w-6 text-adalah-primary" />
                <h2 className="text-xl font-bold text-adalah-primary font-inter-tight">
                  SATpay
                </h2>
              </div>
              <p className="text-sm text-adalah-golden">
                Make installment payments securely.
              </p>

              <div className="mt-5 space-y-4">
                {schedule.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-xl border border-adalah-primary/20 bg-white shadow-sm"
                  >
                    <span className="text-adalah-primary font-medium">
                      {s.due}
                    </span>
                    <span className="text-adalah-primary font-semibold text-lg">
                      ${s.amount}
                    </span>
                    <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-md rounded-xl px-6">
                      Pay
                    </Button>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Settings Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <Settings className="h-6 w-6 text-adalah-primary" />
                <h2 className="text-xl font-bold text-adalah-primary font-inter-tight">
                  Settings
                </h2>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl border border-adalah-primary/20 bg-white shadow-sm"
              >
                <div>
                  <p className="text-adalah-primary font-medium">Autopay</p>
                  <p className="text-sm text-adalah-golden">
                    Automatically pay installments on due date.
                  </p>
                </div>
                <Switch />
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
