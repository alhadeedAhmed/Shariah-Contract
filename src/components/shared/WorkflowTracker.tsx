import { Card } from "@/components/ui/card";
import { CheckCircle, Clock } from "lucide-react";

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
  pending: "bg-[#4A0404]/10 text-[#4A0404]",
  in_progress: "bg-[#B4925F]/15 text-[#B4925F]",
  completed: "bg-green-100 text-green-700",
};

export const WorkflowTracker = ({
  title = "Workflow",
  steps,
}: WorkflowTrackerProps) => {
  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
      <div className="flex items-center space-x-3 mb-5">
        <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
        <h3 className="text-xl font-semibold text-[#4A0404] tracking-tight">
          {title}
        </h3>
      </div>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <li key={step.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              {step.status === "completed" ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Clock className="h-5 w-5 text-[#B4925F]" />
              )}
              {index < steps.length - 1 && (
                <div className="w-px h-8 bg-gradient-to-b from-[#4A0404]/20 to-transparent mt-1" />
              )}
            </div>
            <div>
              <div
                className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded ${
                  statusToColor[step.status]
                }`}
              >
                {step.status.replace("_", " ")}
              </div>
              <p className="text-[#4A0404] font-medium mt-2">{step.title}</p>
              {step.description && (
                <p className="text-sm text-[#B4925F] mt-1">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
};

export default WorkflowTracker;
