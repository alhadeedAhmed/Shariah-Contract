import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Copy, FileText, Download, Sparkles, ExternalLink } from "lucide-react";

interface ContractProps {
  title: string;
  description: string;
  type: string;
  amount: string;
  duration: string;
  status: string;
  complianceRate: string;
}

const ContractCard = ({
  title,
  description,
  type,
  amount,
  duration,
  status,
  complianceRate
}: ContractProps) => {
  return (
    <Card className="p-6 border border-[#4A0404]/10">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center space-x-2">
          <span className="flex items-center px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium">
            <Sparkles className="h-3 w-3 mr-1" />
            AI Generated
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">
            {complianceRate} Compliant
          </span>
        </div>

        {/* Title and Description */}
        <div>
          <h3 className="text-lg font-semibold text-[#4A0404]">{title}</h3>
          <p className="text-sm text-[#B4925F] mt-1">{description}</p>
        </div>

        {/* Contract Details */}
        <div className="grid grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-[#4A0404] font-medium">Type:</p>
            <p className="text-sm text-[#B4925F]">{type}</p>
          </div>
          <div>
            <p className="text-sm text-[#4A0404] font-medium">Amount:</p>
            <p className="text-sm text-[#B4925F]">{amount}</p>
          </div>
          <div>
            <p className="text-sm text-[#4A0404] font-medium">Duration:</p>
            <p className="text-sm text-[#B4925F]">{duration}</p>
          </div>
          <div>
            <p className="text-sm text-[#4A0404] font-medium">Status:</p>
            <p className="text-sm text-[#B4925F]">{status}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#4A0404] border-[#4A0404]/20 hover:bg-[#4A0404]/5"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#4A0404] border-[#4A0404]/20 hover:bg-[#4A0404]/5"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="text-[#4A0404] border-[#4A0404]/20 hover:bg-[#4A0404]/5"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button 
            className="bg-[#4A0404] text-white hover:bg-[#4A0404]/90 ml-auto"
            size="sm"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Tokenize via Fireblocks
          </Button>
        </div>
      </div>
    </Card>
  );
};

const AIGeneratedContractsList = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-[#4A0404]" />
          <h2 className="text-xl font-semibold text-[#4A0404]">Your AI-Generated Contracts</h2>
        </div>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          4 contracts
        </span>
      </div>

      <ContractCard
        title="Master Participation Agreement (MPA) - Tempore est sit r"
        description="Initial Master Participation Agreement structure for Ipsa molestias sed"
        type="Participation"
        amount="$30"
        duration="24 months"
        status="Draft"
        complianceRate="85%"
      />
    </div>
  );
};

export default AIGeneratedContractsList; 