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
    color: "bg-blue-500"
  },
  {
    number: "2",
    title: "Scholar Review",
    description: "Scholars vote for Shariah compliance using enhanced AI analysis",
    color: "bg-green-500"
  },
  {
    number: "3",
    title: "Institutional Funding",
    description: "Approved contracts upgraded to funded participation with InstAuto-REINVMM",
    color: "bg-orange-500"
  },
  {
    number: "4",
    title: "Tokenization",
    description: "Funded contracts tokenized via Fireblocks for trading and management",
    color: "bg-purple-500"
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
  <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-[#4A0404] font-medium">{title}</h3>
        <div className="flex items-center space-x-4 mt-2 text-sm text-[#B4925F]">
          <span>${amount}</span>
          <span>•</span>
          <span>{duration}</span>
          <span>•</span>
          <span>{type}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-md">
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
          </svg>
        </button>
      </div>
    </div>
    <div className="mt-4 flex items-center justify-between text-sm">
      <span className="text-gray-500">Workflow Stage: {workflowStage}</span>
      <span className="text-[#4A0404]">Next: {nextStage}</span>
    </div>
  </div>
);

const EnhancedWorkflow = () => {
  const [activeTab, setActiveTab] = useState('mpa');

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-[#4A0404]" />
              <h1 className="text-xl font-semibold text-[#4A0404]">Enhanced Contract Workflow</h1>
            </div>
            <p className="text-[#B4925F]">Two-stage participation: Unfunded → Scholar Approval → Funded with Institutional Investors</p>
          </div>
          <Link 
            to="/dashboard"
            className="flex items-center space-x-2 text-[#4A0404] hover:text-[#4A0404]/80"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        {/* Process Steps */}
        <div>
          <h2 className="text-lg font-semibold text-[#4A0404] mb-4">Enhanced Islamic Contract Generation Process</h2>
          <div className="grid grid-cols-4 gap-4">
            {workflowSteps.map((step, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-6 h-6 ${step.color} text-white rounded-full flex items-center justify-center text-sm font-medium`}>
                    {step.number}
                  </div>
                  <h3 className="font-medium text-[#4A0404]">{step.title}</h3>
                </div>
                <p className="text-sm text-[#B4925F]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Progress */}
        <Card className="p-6">
          <div className="space-y-4">
            {/* Tabs */}
            <div className="relative">
              <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -translate-y-1/2" />
              <div className="relative flex justify-between items-center">
                {tabs.map((tab, index) => (
                  <div key={tab.id} className="flex items-center flex-1">
                    <button
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        relative px-8 py-2.5 text-sm font-medium transition-all
                        border-2 bg-white w-full max-w-[150px] rounded-[20px]
                        ${activeTab === tab.id 
                          ? 'border-[#4A0404] text-[#4A0404] shadow-sm' 
                          : 'border-gray-200 text-gray-600 hover:border-[#4A0404]/50 hover:text-[#4A0404]'
                        }
                        ${index === 0 ? 'ml-0' : ''}
                        ${index === tabs.length - 1 ? 'mr-0' : ''}
                      `}
                    >
                      {tab.label}
                    </button>
                    {index < tabs.length - 1 && (
                      <div className="h-[1px] w-full bg-gray-200 flex-1" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Description text */}
            <div className="text-sm text-[#B4925F] mb-6">
              5-Stage Islamic Contract Process: Master Participation Agreement (MPA) → Scholar Review → Tokenization → Institutional Funding → Shariah Marketplace
            </div>

            {/* Content based on active tab */}
            {activeTab === 'mpa' && (
              <div className="space-y-4 mt-8">
                <h3 className="text-[#4A0404] font-medium flex items-center">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#4A0404] text-sm mr-2">2</span>
                  Mpa Approval
                </h3>
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
            )}
            {/* Add similar content sections for other tabs */}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EnhancedWorkflow; 