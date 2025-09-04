import { useState } from 'react';
import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";

const workflowSteps = [
  {
    number: "1",
    title: "Contract Creation",
    description: "Users fill contract details and automatically get unfunded participation agreement",
    color: "from-blue-500/20 to-blue-600/20",
    textColor: "text-blue-700"
  },
  {
    number: "2",
    title: "Scholar Review",
    description: "Scholars vote for Shariah compliance using enhanced AI analysis",
    color: "from-green-500/20 to-green-600/20",
    textColor: "text-green-700"
  },
  {
    number: "3",
    title: "Institutional Funding",
    description: "Approved contracts upgraded to funded participation with InstAuto-REINVMM",
    color: "from-orange-500/20 to-orange-600/20",
    textColor: "text-orange-700"
  },
  {
    number: "4",
    title: "Tokenization",
    description: "Funded contracts tokenized via Fireblocks for trading and management",
    color: "from-purple-500/20 to-purple-600/20",
    textColor: "text-purple-700"
  }
];

const tabs = [
  { id: "mpa", label: "MPA" },
  { id: "review", label: "Review" },
  { id: "tokenized", label: "Tokenized" },
  { id: "funded", label: "Funded" },
  { id: "marketplace", label: "Marketplace" }
];

interface ContractItemProps {
  title: string;
  amount: string;
  duration: string;
  type: string;
  workflowStage: string;
  nextStage: string;
}

const ContractItem = ({ title, amount, duration, type, workflowStage, nextStage }: ContractItemProps) => (
  <div className="border border-[#4A0404]/10 rounded-xl p-6 hover:bg-white/50 transition-all duration-300 group backdrop-blur-sm">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-medium text-[#4A0404] group-hover:text-[#4A0404] transition-colors">{title}</h3>
        <div className="flex items-center space-x-4 mt-3 text-[#B4925F]">
          <span className="font-medium">${amount}</span>
          <span className="text-[#4A0404]/20">•</span>
          <span>{duration}</span>
          <span className="text-[#4A0404]/20">•</span>
          <span>{type}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="p-2.5 hover:bg-[#4A0404]/5 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-[#4A0404]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-2.5 hover:bg-[#4A0404]/5 rounded-lg transition-colors">
          <svg className="w-5 h-5 text-[#4A0404]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between text-sm">
      <span className="text-[#B4925F]">Workflow Stage: {workflowStage}</span>
      <span className="text-[#4A0404] font-medium flex items-center">
        Next: {nextStage}
        <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
      </span>
    </div>
  </div>
);

const EnhancedWorkflow = () => {
  const [activeTab, setActiveTab] = useState('mpa');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-10">
        {/* Header */}
        <div className="flex items-center justify-between bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-[#4A0404]/10 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-br from-[#4A0404]/15 to-[#4A0404]/5 rounded-xl shadow-inner">
                <Sparkles className="h-7 w-7 text-[#4A0404]" />
              </div>
              <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">Enhanced Contract Workflow</h1>
            </div>
            <p className="text-[#B4925F] pl-14">Two-stage participation: Unfunded → Scholar Approval → Funded with Institutional Investors</p>
          </div>
          <Link 
            to="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 text-[#4A0404] hover:text-[#4A0404]/80 transition-colors bg-white/50 rounded-lg hover:bg-white/80"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="text-2xl font-semibold text-[#4A0404] tracking-tight mb-6">Enhanced Islamic Contract Generation Process</h2>
          <div className="grid grid-cols-4 gap-6">
            {workflowSteps.map((step, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-[#4A0404]/10 shadow-lg group hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-8 h-8 bg-gradient-to-br ${step.color} ${step.textColor} rounded-xl flex items-center justify-center text-sm font-medium shadow-inner group-hover:scale-110 transition-transform`}>
                    {step.number}
                  </div>
                  <h3 className="font-medium text-[#4A0404] tracking-tight">{step.title}</h3>
                </div>
                <p className="text-[#B4925F] pl-11">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Progress */}
        <Card className="p-8 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 shadow-lg">
          <div className="space-y-6">
            {/* Tabs */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-[#4A0404]/5 via-[#4A0404]/10 to-[#4A0404]/5 -translate-y-1/2" />
              <div className="relative flex justify-between items-center">
                {tabs.map((tab, index) => (
                  <div key={tab.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative px-8 py-3 text-sm font-medium transition-all
                        border-2 bg-white/90 backdrop-blur-sm w-full max-w-[150px] rounded-[20px]
                        ${activeTab === tab.id 
                          ? 'border-[#4A0404] text-[#4A0404] shadow-lg transform -translate-y-0.5' 
                          : 'border-[#4A0404]/20 text-[#4A0404]/60 hover:border-[#4A0404]/40 hover:text-[#4A0404]/80'
                        }
                        ${index === 0 ? 'ml-0' : ''}
                        ${index === tabs.length - 1 ? 'mr-0' : ''}
                      `}
                    >
                      {tab.label}
                    </button>
                    {index < tabs.length - 1 && (
                      <div className="h-[2px] w-full bg-gradient-to-r from-[#4A0404]/5 via-[#4A0404]/10 to-[#4A0404]/5 flex-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description text */}
            <div className="text-[#B4925F] mb-8 text-center">
              5-Stage Islamic Contract Process: Master Participation Agreement (MPA) → Scholar Review → Tokenization → Institutional Funding → Shariah Marketplace
            </div>

            {/* Content based on active tab */}
            {activeTab === 'mpa' && (
              <div className="space-y-6">
                <h3 className="text-[#4A0404] font-medium flex items-center text-lg">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#4A0404] text-sm mr-3">2</span>
                  MPA Approval
                </h3>
                <div className="space-y-4">
                  <ContractItem
                    title="Master Participation Agreement (MPA) - Tempore est sit r"
                    amount="35.00"
                    duration="24 months"
                    type="participation"
                    workflowStage="mpa_approval"
                    nextStage="funded_participation"
                  />
                  <ContractItem
                    title="Master Participation Agreement (MPA) - Anim et lorem a natu"
                    amount="25.00"
                    duration="24 months"
                    type="participation"
                    workflowStage="mpa_approval"
                    nextStage="funded_participation"
                  />
                </div>
              </div>
            )}
            {/* Add similar content sections for other tabs */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedWorkflow; 