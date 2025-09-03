import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const stats = [
  {
    title: "Active Contracts",
    value: "0",
    subtitle: "+12% from last month",
    color: "bg-[#1B3B36]"
  },
  {
    title: "Pending Validation",
    value: "0",
    subtitle: "Requires scholar review",
    color: "bg-[#FFC107]"
  },
  {
    title: "Scholar Votes",
    value: "0",
    subtitle: "This week",
    color: "bg-[#2196F3]"
  },
  {
    title: "Total Value",
    value: "$0",
    subtitle: "+8% this quarter",
    color: "bg-[#8BC34A]"
  }
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Manage Islamic contracts with full Shariah compliance validation
          </p>
        </div>
        <Button className="bg-[#1B3B36] hover:bg-[#152f2b] text-white">
          <FileText className="h-4 w-4 mr-2" />
          Create New Contract
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border border-gray-200 shadow-sm p-6 relative overflow-hidden">
            <div className="flex flex-col">
              <h3 className="text-gray-600 text-sm font-medium">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900 my-2">{stat.value}</p>
              <p className={`text-sm ${
                stat.subtitle.includes('+') ? 'text-green-600' : 
                stat.subtitle.includes('Requires') ? 'text-amber-600' :
                stat.subtitle.includes('This week') ? 'text-blue-600' :
                'text-gray-600'
              }`}>
                {stat.subtitle}
              </p>
            </div>
            <div className={`absolute right-0 top-0 w-3 h-full ${stat.color}`} />
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M11 12H12V16H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">General Islamic Finance Contracts</h3>
            <p className="text-blue-600">Standard Islamic finance contracts for individual and business use.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;