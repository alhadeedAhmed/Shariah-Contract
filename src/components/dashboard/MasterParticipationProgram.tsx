import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowRight } from "lucide-react";

const MasterParticipationProgram = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-maroon">Master Participation Program Workflow</h2>
      
      <Card className="border border-golden/20 bg-gradient-to-br from-maroon/5 to-golden/5 p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-maroon rounded-2xl flex items-center justify-center">
            <FileText className="h-8 w-8 text-white" />
          </div>

          {/* Title and Description */}
          <h3 className="text-xl font-semibold text-maroon">Begin with Master Participation Program</h3>
          <p className="text-golden-dark text-center max-w-2xl">
            All contracts start with a digital signature of the Master Participation Program (MPA).
            <br />
            Once signed, you proceed to Enhanced Contract Creation where AI populates details
            <br />
            and Smart Contract Recommendations provide institutional funding feedback.
          </p>

          {/* Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2 border-golden text-golden hover:bg-golden/10"
            >
              <FileText className="h-4 w-4" />
              <span>View MPA Template</span>
            </Button>
            <Button 
              className="flex items-center space-x-2 bg-maroon hover:bg-maroon-dark text-white"
            >
              <span>Start MPA Workflow</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MasterParticipationProgram; 