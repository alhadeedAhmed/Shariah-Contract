import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Download, MoreVertical } from "lucide-react";

const contracts = [
  {
    name: "Murabaha Property Finance",
    participants: "Al Rajhi Bank, Customer",
    progress: 85,
    status: "Active",
    value: "$250,000",
    dueDate: "Mar 15, 2024"
  },
  {
    name: "Ijara Equipment Lease",
    participants: "Dubai Islamic Bank, Corp Ltd",
    progress: 60,
    status: "In Progress", 
    value: "$150,000",
    dueDate: "Apr 22, 2024"
  },
  {
    name: "Musharaka Partnership",
    participants: "ADIB, Startup Inc",
    progress: 95,
    status: "Review",
    value: "$500,000",
    dueDate: "Feb 28, 2024"
  }
];

const SmartContractsSection = () => {
  return (
    <Card className="border-golden/20 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-maroon">Smart Contract Recommendations</CardTitle>
          <Button variant="outline" size="sm" className="border-golden text-golden hover:bg-golden hover:text-maroon">
            View All Contracts
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {contracts.map((contract, index) => (
          <div key={index} className="border border-golden/20 rounded-lg p-4 hover:shadow-golden/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-maroon mb-1">{contract.name}</h4>
                <p className="text-sm text-muted-foreground">{contract.participants}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={`
                  ${contract.status === 'Active' ? 'bg-green-100 text-green-700' : ''}
                  ${contract.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : ''}  
                  ${contract.status === 'Review' ? 'bg-amber-100 text-amber-700' : ''}
                `}>
                  {contract.status}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-maroon">{contract.progress}%</span>
              </div>
              <Progress value={contract.progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-4 text-sm">
                <span className="text-muted-foreground">Value: <span className="font-semibold text-maroon">{contract.value}</span></span>
                <span className="text-muted-foreground">Due: <span className="text-golden-dark">{contract.dueDate}</span></span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-golden/30 text-golden hover:bg-golden/10">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="border-golden/30 text-golden hover:bg-golden/10">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SmartContractsSection;