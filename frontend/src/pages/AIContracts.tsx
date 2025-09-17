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
    bgColor: "bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5",
    textColor: "text-[#4A0404]",
    trend: "+12% from last month",
    trendColor: "text-green-600"
  },
  {
    label: "Total Value",
    value: "$105,051",
    icon: TrendingUp,
    bgColor: "bg-gradient-to-br from-[#B4925F]/15 to-[#B4925F]/5",
    textColor: "text-[#B4925F]",
    trend: "+8% this quarter",
    trendColor: "text-green-600"
  },
  {
    label: "Success Rate",
    value: "88%",
    icon: CheckCircle,
    bgColor: "bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5",
    textColor: "text-[#4A0404]",
    trend: "Last 30 days",
    trendColor: "text-blue-600"
  }
];

const SmartContractCard = () => {
  return (
    <Card className="border border-[#4A0404]/20 hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm">
      <div className="space-y-6 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5 rounded-xl shadow-inner">
              <FileText className="h-6 w-6 text-[#4A0404]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#4A0404] tracking-tight">Optimized Murabahah Asset Purchase</h3>
              <p className="text-[#B4925F] mt-1">Complete financing structure based on your requirements and history</p>
            </div>
          </div>
          <span className="px-4 py-2 text-xs font-medium bg-red-100/80 text-red-600 rounded-full flex items-center shadow-sm">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5" />
            BETA RISK
          </span>
        </div>
        
        <div className="flex items-center space-x-8 text-sm text-[#B4925F] bg-gradient-to-r from-[#4A0404]/5 via-[#4A0404]/10 to-[#4A0404]/5 rounded-xl p-4 shadow-inner">
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-[#B4925F]" />
            <span>91% confidence</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-[#B4925F]" />
            <span>2 days</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-[#B4925F]" />
            <span>Last used on 2024-02-09</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5 rounded-xl p-6 shadow-inner">
            <p className="text-sm font-medium text-[#4A0404] mb-2">Amount</p>
            <p className="text-4xl font-bold text-[#4A0404] tracking-tight">$67,750</p>
          </div>
          <div className="bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5 rounded-xl p-6 shadow-inner">
            <p className="text-sm font-medium text-[#4A0404] mb-2">Duration</p>
            <p className="text-4xl font-bold text-[#4A0404] tracking-tight">12 months</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-5 w-5 text-[#B4925F]" />
              <p className="text-sm font-semibold text-[#4A0404]">Key Benefits</p>
            </div>
            <ul className="space-y-3 text-[#B4925F]">
              {["Based on your transaction history", "Pre-approved with 88% approval rate", "Fixed monthly payments"].map((benefit, index) => (
                <li key={index} className="flex items-center space-x-3 group">
                  <div className="h-2 w-2 rounded-full bg-[#B4925F] group-hover:scale-125 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <AlertCircle className="h-5 w-5 text-[#4A0404]" />
              <p className="text-sm font-semibold text-[#4A0404]">Considerations</p>
            </div>
            <ul className="space-y-3 text-[#B4925F]">
              {["Asset ownership transfer required", "Market price verification needed"].map((item, index) => (
                <li key={index} className="flex items-center space-x-3 group">
                  <div className="h-2 w-2 rounded-full bg-[#4A0404] group-hover:scale-125 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#4A0404]/10">
          <Button variant="ghost" className="text-[#4A0404] hover:text-[#4A0404]/80 hover:bg-[#4A0404]/5">
            <FileText className="h-4 w-4 mr-2" />
            Murabahah Contract Template
          </Button>
          <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
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
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#4A0404]/10 shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5 rounded-xl shadow-inner">
              <Sparkles className="h-7 w-7 text-[#4A0404]" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">AI-Generated Contracts</h1>
              <p className="text-[#B4925F] mt-1">Automated Shariah-compliant contract generation</p>
            </div>
          </div>
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-2 px-4 py-2 text-sm text-[#4A0404] hover:text-[#4A0404]/80 transition-colors bg-white/50 rounded-lg hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-[#4A0404]/10 hover:shadow-xl transition-all duration-300 bg-white/50 backdrop-blur-sm overflow-hidden group">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-4 rounded-xl ${stat.bgColor} shadow-inner group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`h-7 w-7 ${stat.textColor}`} />
                  </div>
                  <span className={`text-sm ${stat.trendColor} font-medium`}>{stat.trend}</span>
                </div>
                <p className="text-4xl font-bold text-[#4A0404] mb-2 tracking-tight">{stat.value}</p>
                <p className="text-[#B4925F]">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Create Contract Section */}
        <Card className="border border-[#4A0404]/10 overflow-hidden bg-white/50 backdrop-blur-sm">
          <div className="p-12 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A0404]/10 via-transparent to-[#4A0404]/10" />
            <div className="relative">
              <h2 className="text-3xl font-semibold text-[#4A0404] mb-4 tracking-tight">Generate AI-Powered Shariah Contract</h2>
              <p className="text-[#B4925F] mb-8 max-w-2xl mx-auto text-lg">
                Create customized Islamic financing contracts with AI-powered compliance validation
              </p>
              <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 hover:from-[#4A0404]/90 hover:to-[#4A0404] text-white px-10 py-7 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Create New Contract
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </div>
          </div>
        </Card>

        {/* AI Generated Contracts List */}
        <AIGeneratedContractsList />

        {/* Smart Contract Recommendations */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-[#4A0404]" />
              <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight">Smart Contract Recommendations</h2>
            </div>
            <span className="px-4 py-2 text-sm bg-gradient-to-r from-[#4A0404]/10 to-[#4A0404]/5 text-[#4A0404] rounded-xl flex items-center shadow-inner">
              <Sparkles className="h-4 w-4 mr-2" />
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