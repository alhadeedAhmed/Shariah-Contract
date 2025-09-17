"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { CheckCircle, Truck, FileText, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    id: "bank-ownership",
    title: "Bank 24h Ownership Recorded",
    icon: FileText,
    desc: "Ownership recorded immutably.",
  },
  {
    id: "schedule",
    title: "Delivery Scheduled",
    icon: Truck,
    desc: "Appointment confirmed with dealer.",
  },
  {
    id: "do",
    title: "Delivery Order Signed",
    icon: CheckCircle,
    desc: "DO signed and uploaded.",
  },
];

const DeliveryTimeline = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/10">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-8 py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex items-center space-x-3 mb-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center bg-adalah-primary/5"
              />
              <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                Delivery Timeline
              </h1>
            </div>

            {/* Steps */}
            <ol className="space-y-6">
              {steps.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex items-start space-x-4"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-adalah-primary/10 to-adalah-primary/5 shadow-md">
                    <s.icon className="h-6 w-6 text-adalah-primary" />
                  </div>
                  <div>
                    <p className="text-adalah-primary font-semibold text-lg font-inter-tight">
                      {s.title}
                    </p>
                    <p className="text-sm text-adalah-golden">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* Completion Note + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-10 text-center"
            >
              <p className="text-sm text-adalah-golden mb-4">
                Delivery completed! Now manage ongoing services and reminders.
              </p>
              <Link to="/vehicle-services">
                <Button className="flex items-center gap-2 bg-gradient-to-r from-adalah-golden to-adalah-dark text-white px-6 py-2 rounded-xl shadow hover:shadow-lg transition">
                  <Wrench className="h-4 w-4" />
                  Manage Vehicle Services
                </Button>
              </Link>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default DeliveryTimeline;
