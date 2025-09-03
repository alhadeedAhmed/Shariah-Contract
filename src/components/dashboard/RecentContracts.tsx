import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText } from "lucide-react";

const RecentContracts = () => {
  return (
    <Card className="border border-golden/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-maroon">Recent Contracts</h2>
          <span className="px-2.5 py-1 text-xs bg-gray-100 rounded-full">Draft</span>
        </div>
        
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 text-sm">No contracts yet</p>
          <Button className="bg-maroon hover:bg-maroon-dark text-white">
            Create Your First Contract
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RecentContracts; 