import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";

export type DocumentItem = {
  id: string;
  name: string;
  version: string;
  status: "draft" | "review" | "approved";
  updatedAt: string;
};

interface DocumentCenterProps {
  title?: string;
  documents: DocumentItem[];
}

const statusBadge: Record<DocumentItem["status"], string> = {
  draft: "bg-[#4A0404]/10 text-[#4A0404]",
  review: "bg-[#B4925F]/15 text-[#B4925F]",
  approved: "bg-green-100 text-green-700",
};

export const DocumentCenter = ({
  title = "Documents",
  documents,
}: DocumentCenterProps) => {
  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h3 className="text-xl font-semibold text-[#4A0404] tracking-tight">
            {title}
          </h3>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
          >
            <Upload className="h-4 w-4 mr-2" /> Upload
          </Button>
          <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
            <Download className="h-4 w-4 mr-2" /> Export All
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-xl border border-[#4A0404]/10 bg-white/60"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5">
                <FileText className="h-5 w-5 text-[#4A0404]" />
              </div>
              <div>
                <p className="text-[#4A0404] font-medium">{doc.name}</p>
                <p className="text-sm text-[#B4925F]">
                  v{doc.version} • Updated {doc.updatedAt}
                </p>
              </div>
            </div>
            <div
              className={`text-xs font-medium px-2 py-1 rounded ${
                statusBadge[doc.status]
              }`}
            >
              {doc.status}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DocumentCenter;
