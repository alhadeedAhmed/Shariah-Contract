import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Eye } from "lucide-react";

const ContractDocuments = () => {
  return (
    <Card className="border border-[#4A0404]/20">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#4A0404]">Contract Documents</h2>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#4A0404]/10 text-[#4A0404]">
            AAOIFI & IFSA Compliant
          </span>
        </div>

        <div className="border border-[#4A0404]/20 rounded-lg p-4 hover:bg-[#4A0404]/5 transition-all duration-300">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-[#4A0404]/5 rounded-lg">
              <FileText className="h-5 w-5 text-[#4A0404]" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-medium text-[#4A0404]">Murabahah Contract</h3>
              <p className="text-sm text-[#4A0404]/70 mt-1">
                Customized Murabahah Facility Agreement for Asset Acquisition
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-[#4A0404]/70">Created 9/3/2025</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-[#4A0404]/10 text-[#4A0404] rounded-full">
                  DRAFT
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-[#4A0404] text-[#4A0404] hover:bg-[#4A0404]/5"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 border-[#4A0404] text-[#4A0404] hover:bg-[#4A0404]/5"
              >
                <Eye className="h-4 w-4" />
                <span>View</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContractDocuments; 