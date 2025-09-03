import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, MoreVertical } from "lucide-react";

const documents = [
  {
    name: "Murabaha Agreement",
    type: "PDF Document",
    size: "2.4 MB",
    date: "Mar 12, 2024",
    status: "Verified"
  },
  {
    name: "Shariah Compliance Certificate", 
    type: "PDF Document",
    size: "856 KB",
    date: "Mar 10, 2024",
    status: "Approved"
  },
  {
    name: "Participant Agreement",
    type: "Word Document", 
    size: "1.2 MB",
    date: "Mar 08, 2024",
    status: "Draft"
  },
  {
    name: "Risk Assessment Report",
    type: "PDF Document",
    size: "3.1 MB", 
    date: "Mar 05, 2024",
    status: "Review"
  }
];

const ContactDocuments = () => {
  return (
    <Card className="border-golden/20 shadow-elegant">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-maroon">Contract Documents</CardTitle>
          <Button variant="outline" size="sm" className="border-golden text-golden hover:bg-golden hover:text-maroon">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {documents.map((doc, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 border border-golden/20 rounded-lg hover:bg-golden/5 transition-colors">
            <div className="p-2 bg-maroon/10 rounded-lg">
              <FileText className="h-4 w-4 text-maroon" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-maroon truncate">{doc.name}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{doc.type}</span>
                <span className="text-xs text-golden-dark">•</span>
                <span className="text-xs text-muted-foreground">{doc.size}</span>
                <span className="text-xs text-golden-dark">•</span>
                <span className="text-xs text-muted-foreground">{doc.date}</span>
              </div>
              <div className="mt-1">
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  doc.status === 'Verified' ? 'bg-green-100 text-green-700' :
                  doc.status === 'Approved' ? 'bg-blue-100 text-blue-700' :
                  doc.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {doc.status}
                </span>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-golden hover:bg-golden/10">
                <Eye className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-golden hover:bg-golden/10">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-golden hover:bg-golden/10">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactDocuments;