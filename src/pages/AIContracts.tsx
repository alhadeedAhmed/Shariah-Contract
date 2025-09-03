import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, ArrowRight, Sparkles, Clock, CheckCircle, TrendingUp, Star, AlertCircle, ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Link } from "react-router-dom";
import AIGeneratedContractsList from "@/components/dashboard/AIGeneratedContractsList";

const stats = [
  {
    label: "Total Contracts",
    value: "4",
    icon: FileText,
    bgColor: "bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5",
    textColor: "text-[#4A0404]",
    trend: "+12% from last month"
  },
  {
    label: "Total Value",
    value: "$105,051",
    icon: TrendingUp,
    bgColor: "bg-gradient-to-br from-[#B4925F]/10 to-[#B4925F]/5",
    textColor: "text-[#B4925F]",
    trend: "+8% this quarter"
  },
  {
    label: "Success Rate",
    value: "88%",
    icon: CheckCircle,
    bgColor: "bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5",
    textColor: "text-[#4A0404]",
    trend: "Last 30 days"
  }
];

const SmartContractCard = () => {
  return (
    <Card className="border border-[#4A0404]/20 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4A0404]/5 rounded-lg">
              <FileText className="h-5 w-5 text-[#4A0404]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#4A0404]">Optimized Murabahah Asset Purchase</h3>
              <p className="text-sm text-[#B4925F] mt-1">Complete financing structure based on your requirements and history</p>
            </div>
          </div>
          <span className="px-3 py-1.5 text-xs font-medium bg-red-100 text-red-600 rounded-full flex items-center">
            <AlertCircle className="h-3.5 w-3.5 mr-1" />
            BETA RISK
          </span>
        </div>
        
        <div className="flex items-center space-x-6 text-xs text-[#B4925F] bg-[#4A0404]/5 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-[#B4925F]" />
            <span>91% confidence</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#B4925F]" />
            <span>2 days</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-[#B4925F]" />
            <span>Last used on 2024-02-09</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-[#4A0404]/5 rounded-lg p-4">
            <p className="text-sm font-medium text-[#4A0404] mb-2">Amount</p>
            <p className="text-3xl font-bold text-[#4A0404]">$67,750</p>
          </div>
          <div className="bg-[#4A0404]/5 rounded-lg p-4">
            <p className="text-sm font-medium text-[#4A0404] mb-2">Duration</p>
            <p className="text-3xl font-bold text-[#4A0404]">12 months</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Star className="h-4 w-4 text-[#B4925F]" />
              <p className="text-sm font-medium text-[#4A0404]">Key Benefits</p>
            </div>
            <ul className="space-y-2 text-sm text-[#B4925F]">
              {["Based on your transaction history", "Pre-approved with 88% approval rate", "Fixed monthly payments"].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#B4925F]" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <AlertCircle className="h-4 w-4 text-[#4A0404]" />
              <p className="text-sm font-medium text-[#4A0404]">Considerations</p>
            </div>
            <ul className="space-y-2 text-sm text-[#B4925F]">
              {["Asset ownership transfer required", "Market price verification needed"].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#4A0404]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="link" className="text-[#4A0404] hover:text-[#4A0404]/80 p-0">
            <FileText className="h-4 w-4 mr-2" />
            Murabahah Contract Template
          </Button>
          <Button className="bg-[#4A0404] hover:bg-[#4A0404]/90 text-white px-6">
            Generate AI Contract
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

const AIContracts = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 to-background">
      <DashboardHeader />
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#4A0404]/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#4A0404]/5 rounded-lg">
              <Sparkles className="h-6 w-6 text-[#4A0404]" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#4A0404]">AI-Generated Contracts</h1>
              <p className="text-sm text-[#B4925F]">Automated Shariah-compliant contract generation</p>
            </div>
          </div>
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 px-3 py-1.5 text-sm text-[#4A0404] hover:text-[#4A0404]/80 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-[#4A0404]/20 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                  <span className="text-xs text-[#B4925F]">{stat.trend}</span>
                </div>
                <p className="text-3xl font-bold text-[#4A0404] mb-1">{stat.value}</p>
                <p className="text-sm text-[#B4925F]">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Contract Section */}
        <Card className="border border-[#4A0404]/20 overflow-hidden">
          <div className="p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A0404]/5 via-transparent to-[#4A0404]/5" />
            <div className="relative">
              <h2 className="text-2xl font-semibold text-[#4A0404] mb-3">Generate AI-Powered Shariah Contract</h2>
              <p className="text-[#B4925F] mb-6 max-w-2xl mx-auto">
                Create customized Islamic financing contracts with AI-powered compliance validation
              </p>
              <Button className="bg-[#4A0404] hover:bg-[#4A0404]/90 text-white px-8 py-6 text-lg">
                Create New Contract
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Generated Contracts List */}
        <AIGeneratedContractsList />

        {/* Smart Contract Recommendations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-[#4A0404]" />
              <h2 className="text-lg font-semibold text-[#4A0404]">Smart Contract Recommendations</h2>
            </div>
            <span className="px-3 py-1.5 text-xs bg-[#4A0404]/10 text-[#4A0404] rounded-full flex items-center">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              AI Powered
            </span>
          </div>
          <SmartContractCard />
        </div>
      </div>
    </div>
  );
};

export default AIContracts; 