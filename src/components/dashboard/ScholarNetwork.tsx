import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ScholarNetwork = () => {
  return (
    <Card className="border border-golden/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-maroon">Scholar Network</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-6 space-y-3">
          <p className="text-gray-500 text-sm">No scholars available</p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
            Become a Scholar
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ScholarNetwork; 