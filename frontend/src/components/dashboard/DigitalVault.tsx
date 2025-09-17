import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Upload,
  Download,
  FileText,
  Image,
  File,
  Search,
  Filter,
  Eye,
  Trash2,
  Shield,
  Lock,
  CheckCircle,
  AlertTriangle,
  Folder,
  FolderOpen,
  Hash,
  Database,
} from "lucide-react";

interface Document {
  id: string;
  name: string;
  type:
    | "contract"
    | "invoice"
    | "po"
    | "do"
    | "personal"
    | "family"
    | "business";
  size: string;
  uploadDate: string;
  status: "encrypted" | "processing" | "ready";
  metadata?: {
    hash: string;
    category: string;
    tags: string[];
    blockchainHash?: string;
  };
}

const DigitalVault = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Murabahah_Contract_v1.2.pdf",
      type: "contract",
      size: "2.4 MB",
      uploadDate: "2024-01-15",
      status: "encrypted",
      metadata: {
        hash: "0x4a7b8c9d2e1f3a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d",
        category: "Legal Documents",
        tags: ["murabahah", "contract", "shariah"],
        blockchainHash: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d",
      },
    },
    {
      id: "2",
      name: "Vehicle_Invoice_2024.pdf",
      type: "invoice",
      size: "1.8 MB",
      uploadDate: "2024-01-14",
      status: "ready",
      metadata: {
        hash: "0x5b8c9d2e1f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e",
        category: "Financial Documents",
        tags: ["invoice", "vehicle", "payment"],
      },
    },
    {
      id: "3",
      name: "PO_12345.pdf",
      type: "po",
      size: "956 KB",
      uploadDate: "2024-01-13",
      status: "processing",
      metadata: {
        hash: "0x6c9d2e1f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
        category: "Purchase Orders",
        tags: ["purchase", "order", "pending"],
      },
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const documentTypes = [
    { value: "all", label: "All Documents", icon: File },
    { value: "contract", label: "Contracts", icon: FileText },
    { value: "invoice", label: "Invoices", icon: FileText },
    { value: "po", label: "Purchase Orders", icon: FileText },
    { value: "do", label: "Delivery Orders", icon: FileText },
    { value: "personal", label: "Personal", icon: Folder },
    { value: "family", label: "Family", icon: FolderOpen },
    { value: "business", label: "Business", icon: Database },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "Legal Documents", label: "Legal Documents" },
    { value: "Financial Documents", label: "Financial Documents" },
    { value: "Purchase Orders", label: "Purchase Orders" },
    { value: "Personal Documents", label: "Personal Documents" },
  ];

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    const matchesCategory =
      selectedCategory === "all" || doc.metadata?.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const newDoc: Document = {
          id: Date.now().toString(),
          name: file.name,
          type: "contract", // Default type
          size: (file.size / 1024 / 1024).toFixed(1) + " MB",
          uploadDate: new Date().toISOString().split("T")[0],
          status: "processing",
          metadata: {
            hash: "0x" + Math.random().toString(16).substr(2, 40),
            category: "Uploaded Documents",
            tags: ["uploaded", "new"],
          },
        };
        setDocuments((prev) => [newDoc, ...prev]);
      });
    }
  };

  const handleDownload = (doc: Document) => {
    // Simulate download
    console.log("Downloading:", doc.name);
  };

  const handleDelete = (docId: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId));
  };

  const convertToMetadata = (doc: Document) => {
    // Simulate metadata conversion
    const updatedDoc = {
      ...doc,
      status: "ready" as const,
      metadata: {
        ...doc.metadata,
        blockchainHash: "0x" + Math.random().toString(16).substr(2, 40),
      },
    };
    setDocuments((prev) => prev.map((d) => (d.id === doc.id ? updatedDoc : d)));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "encrypted":
        return <Shield className="h-4 w-4 text-green-500" />;
      case "processing":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "ready":
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "encrypted":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "ready":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Vault Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
              <Shield className="h-6 w-6 text-adalah-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Digital Vault
              </h3>
              <p className="text-sm text-adalah-golden">
                Secure document storage with metadata conversion
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Lock className="h-3 w-3 mr-1" />
              Encrypted
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Hash className="h-3 w-3 mr-1" />
              Blockchain Ready
            </Badge>
          </div>
        </div>
      </Card>

      {/* Upload Section */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Upload className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Upload Documents
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="file"
            multiple
            onChange={handleUpload}
            className="flex-1 border-adalah-primary/20 focus:border-adalah-golden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </div>
        <p className="text-sm text-adalah-golden mt-2">
          Supported formats: PDF, DOC, DOCX, JPG, PNG. Documents will be
          automatically encrypted and converted to metadata.
        </p>
      </Card>

      {/* Search and Filter */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Search className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Search & Filter
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-adalah-primary/20 focus:border-adalah-golden"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
          >
            {documentTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
          >
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Documents List */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <FileText className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Documents ({filteredDocuments.length})
          </h3>
        </div>
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl hover:bg-adalah-primary/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
                  <FileText className="h-5 w-5 text-adalah-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-adalah-primary">
                    {doc.name}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-adalah-golden">
                    <span>{doc.size}</span>
                    <span>{doc.uploadDate}</span>
                    <Badge className={getStatusColor(doc.status)}>
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </Badge>
                  </div>
                  {doc.metadata && (
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Hash: {doc.metadata.hash.substring(0, 16)}...
                      </span>
                      {doc.metadata.blockchainHash && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          <Hash className="h-3 w-3 mr-1" />
                          On Blockchain
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(doc)}
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => convertToMetadata(doc)}
                  disabled={doc.status === "ready"}
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <Hash className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(doc.id)}
                  className="text-red-500 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-8 text-adalah-golden">
              No documents found. Upload some documents to get started.
            </div>
          )}
        </div>
      </Card>

      {/* Metadata Conversion Info */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Database className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Metadata Conversion
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-adalah-golden/10 to-adalah-golden/5 rounded-xl">
            <div className="text-2xl font-bold text-adalah-primary">3</div>
            <div className="text-sm text-adalah-golden">Total Documents</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">1</div>
            <div className="text-sm text-green-600">Converted to Metadata</div>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">1</div>
            <div className="text-sm text-blue-600">On Blockchain</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DigitalVault;
