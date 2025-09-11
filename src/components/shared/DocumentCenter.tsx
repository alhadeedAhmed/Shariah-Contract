import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Download } from "lucide-react";
import { motion } from "framer-motion";

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
  draft: "bg-maroon/10 text-maroon",
  review: "bg-golden/15 text-golden",
  approved: "bg-green-100 text-green-700",
};

export const DocumentCenter = ({
  title = "Documents",
  documents,
}: DocumentCenterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-maroon/20">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <div className="h-7 w-7 rounded-lg border-2 border-maroon flex items-center justify-center">
              <FileText className="h-4 w-4 text-maroon" />
            </div>
            <h3 className="text-xl font-bold text-maroon tracking-tight">
              {title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              className="text-maroon border-maroon hover:bg-maroon/5"
            >
              <Upload className="h-4 w-4 mr-2" /> Upload
            </Button>
            <Button className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold shadow-md hover:shadow-lg">
              <Download className="h-4 w-4 mr-2" /> Export All
            </Button>
          </div>
        </div>

        {/* Documents List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc, i) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-xl border border-maroon/10 bg-gradient-to-br from-white/70 to-golden/5 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-maroon/10">
                  <FileText className="h-5 w-5 text-maroon" />
                </div>
                <div>
                  <p className="text-maroon font-medium">{doc.name}</p>
                  <p className="text-sm text-golden">
                    v{doc.version} • Updated {doc.updatedAt}
                  </p>
                </div>
              </div>
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  statusBadge[doc.status]
                }`}
              >
                {doc.status}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

export default DocumentCenter;
