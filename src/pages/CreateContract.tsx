import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { FileText, Users, DollarSign, CheckCircle, ArrowRight } from "lucide-react";

const processSteps = [
  {
    icon: FileText,
    title: "1. Contract Creation",
    subtitle: "Master Participation Program",
    bgColor: "from-blue-500/20 to-blue-600/20",
    textColor: "text-blue-700"
  },
  {
    icon: Users,
    title: "2. Scholar Review",
    subtitle: "Shariah compliance validation",
    bgColor: "from-green-500/20 to-green-600/20",
    textColor: "text-green-700"
  },
  {
    icon: DollarSign,
    title: "3. Institutional Funding",
    subtitle: "Funded Participation Agreement",
    bgColor: "from-orange-500/20 to-orange-600/20",
    textColor: "text-orange-700"
  },
  {
    icon: CheckCircle,
    title: "4. Tokenization",
    subtitle: "Fireblocks enterprise execution",
    bgColor: "from-purple-500/20 to-purple-600/20",
    textColor: "text-purple-700"
  }
];

const CreateContract = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        {/* Process Steps */}
        <Card className="p-8 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
            <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">Enhanced Two-Stage Process</h2>
          </div>
          <div className="grid grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className={`bg-gradient-to-br ${step.bgColor} p-6 rounded-xl group hover:shadow-lg transition-all duration-300`}>
                <div className="flex flex-col space-y-3">
                  <step.icon className={`h-6 w-6 ${step.textColor} group-hover:scale-110 transition-transform`} />
                  <p className={`text-sm font-medium ${step.textColor}`}>{step.title}</p>
                  <p className="text-sm text-gray-600">{step.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Form Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Contract Details */}
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight mb-2">Contract Details</h2>
            <p className="text-[#B4925F] mb-8">Basic information about your Islamic finance contract</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Contract Type <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12">
                    <SelectValue placeholder="Investment Validation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="investment">Investment Validation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Contract Title <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="e.g., Equipment Financing for Manufacturing Business"
                  className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  placeholder="Detailed description of the financing purpose, asset or business activity"
                  className="min-h-[120px] bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Amount (USD) <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    type="number"
                    placeholder="50000"
                    className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#4A0404] mb-2">
                    Duration (Months) <span className="text-red-500">*</span>
                  </label>
                  <Select>
                    <SelectTrigger className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12">
                      <SelectValue placeholder="12 months" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12">12 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </Card>

          {/* Business Profile */}
          <Card className="p-8 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 shadow-lg">
            <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight mb-2">Business Profile</h2>
            <p className="text-[#B4925F] mb-8">Information about the contract applicant</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Applicant Type <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12">
                    <SelectValue placeholder="Business Entity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business Entity</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Full Name / Business Name <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="Enter your name or business name"
                  className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Contact Email <span className="text-red-500">*</span>
                </label>
                <Input 
                  type="email"
                  placeholder="email@example.com"
                  className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Contact Phone
                </label>
                <Input 
                  placeholder="+1 (555) 123-4567"
                  className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Occupation / Business Activity <span className="text-red-500">*</span>
                </label>
                <Input 
                  placeholder="e.g., Technology Consultant, Manufacturing"
                  className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#4A0404] mb-2">
                  Activity Type <span className="text-red-500">*</span>
                </label>
                <Select>
                  <SelectTrigger className="bg-white border-[#4A0404]/20 focus:border-[#4A0404] focus:ring-[#4A0404] h-12">
                    <SelectValue placeholder="Public LLC" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public LLC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </div>

        {/* AI Generation Section */}
        <Card className="p-8 bg-gradient-to-r from-blue-50 to-blue-50/50 backdrop-blur-sm border-[#4A0404]/10 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
                <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">Enhanced AI-Powered Contract Generation</h2>
              </div>
              <p className="text-[#B4925F] pl-9">
                Your contract will be enhanced with Master Participation Agreement structure, Shariah compliance analysis, and authentic Islamic banking practices including due wakalah arrangements.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5 px-6 h-12">
                Cancel
              </Button>
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white px-8 h-12 shadow-lg hover:shadow-xl transition-all duration-300">
                Create Enhanced Contract
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateContract; 