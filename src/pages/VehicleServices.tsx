"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Wrench, Shield, FileText } from "lucide-react";
import { motion } from "framer-motion";

const reminders = [
  {
    id: "r1",
    title: "Maintenance Service",
    due: "2025-10-15",
    desc: "10,000 km service due",
    icon: Wrench,
  },
  {
    id: "r2",
    title: "Insurance Renewal",
    due: "2025-11-01",
    desc: "Comprehensive policy renewal",
    icon: Shield,
  },
  {
    id: "r3",
    title: "Registration",
    due: "2026-01-10",
    desc: "Annual registration renewal",
    icon: FileText,
  },
];

const VehicleServices = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />

      <div className="container mx-auto px-6 md:px-10 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/70 backdrop-blur-sm border-maroon/10">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
              <h1 className="text-2xl font-semibold text-maroon tracking-tight">
                Vehicle Lifecycle Services
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Section - Reminders */}
              <div className="lg:col-span-2 space-y-4">
                {reminders.map((r, i) => (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 rounded-xl border border-maroon/10 bg-white/60 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-maroon/10 to-maroon/5">
                        <r.icon className="h-5 w-5 text-maroon" />
                      </div>
                      <div>
                        <p className="text-maroon font-medium">{r.title}</p>
                        <p className="text-sm text-golden">
                          Due {r.due} • {r.desc}
                        </p>
                      </div>
                    </div>
                    <Button className="bg-gradient-to-r from-maroon to-maroon/90 text-white rounded-xl shadow hover:shadow-lg w-full sm:w-auto">
                      Schedule
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Right Section - Auto-pay options */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-6 bg-white/70 backdrop-blur-sm border-maroon/10 space-y-5">
                  <p className="text-maroon font-semibold text-lg">
                    Insurance & Taxes
                  </p>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-maroon/10 bg-white/60">
                    <div className="flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-maroon" />
                      <div>
                        <p className="text-maroon">Auto-pay Insurance</p>
                        <p className="text-xs text-golden">
                          Pay policy renewals automatically
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-maroon/10 bg-white/60">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-maroon" />
                      <div>
                        <p className="text-maroon">Auto-pay Registration</p>
                        <p className="text-xs text-golden">
                          Pay registration fees automatically
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </Card>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VehicleServices;
