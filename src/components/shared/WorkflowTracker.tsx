import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

export type WorkflowStep = {
  id: string;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed";
};

interface WorkflowTrackerProps {
  title?: string;
  steps: WorkflowStep[];
}

const statusToColor: Record<WorkflowStep["status"], string> = {
  pending: "bg-maroon/10 text-maroon border border-maroon/20",
  in_progress: "bg-golden/15 text-golden border border-golden/30",
  completed: "bg-green-100 text-green-700 border border-green-300",
};

export const WorkflowTracker = ({
  title = "Workflow",
  steps,
}: WorkflowTrackerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-lg">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="h-8 w-8 rounded-lg border-2 border-maroon flex items-center justify-center bg-maroon/5"
          />
          <h3 className="text-xl font-bold text-maroon tracking-tight">
            {title}
          </h3>
        </div>

        {/* Steps */}
        <ol className="space-y-6">
          {steps.map((step, index) => (
            <motion.li
              key={step.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-start space-x-4"
            >
              {/* Icon + Connector */}
              <div className="flex flex-col items-center">
                {step.status === "completed" ? (
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-golden" />
                )}
                {index < steps.length - 1 && (
                  <div className="w-px h-8 bg-gradient-to-b from-maroon/30 to-transparent mt-1" />
                )}
              </div>

              {/* Content */}
              <div>
                <div
                  className={`inline-flex items-center text-xs font-semibold px-3 py-1 rounded-lg capitalize ${
                    statusToColor[step.status]
                  }`}
                >
                  {step.status.replace("_", " ")}
                </div>
                <p className="text-maroon font-semibold text-lg mt-2">
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-sm text-golden mt-1">{step.description}</p>
                )}
              </div>
            </motion.li>
          ))}
        </ol>
      </Card>
    </motion.div>
  );
};

export default WorkflowTracker;
