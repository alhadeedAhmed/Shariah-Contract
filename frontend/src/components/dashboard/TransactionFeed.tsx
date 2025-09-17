import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  FileText,
  Clock,
  CheckCircle,
  AlertTriangle,
  X,
  Filter,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "payment" | "contract" | "application" | "service" | "compliance";
  direction: "incoming" | "outgoing";
  amount: number;
  description: string;
  timestamp: string;
  status: "completed" | "pending" | "failed" | "processing";
  userType: string;
  category: string;
  reference: string;
}

const TransactionFeed = () => {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const transactionTypes = [
    { id: "all", label: "All Transactions", icon: Activity },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "contract", label: "Contracts", icon: FileText },
    { id: "application", label: "Applications", icon: FileText },
    { id: "service", label: "Services", icon: Activity },
    { id: "compliance", label: "Compliance", icon: CheckCircle },
  ];

  const statusOptions = [
    { id: "all", label: "All Status" },
    { id: "completed", label: "Completed" },
    { id: "pending", label: "Pending" },
    { id: "processing", label: "Processing" },
    { id: "failed", label: "Failed" },
  ];

  const mockTransactions: Transaction[] = [
    {
      id: "1",
      type: "payment",
      direction: "incoming",
      amount: 1200.0,
      description: "Murabahah Installment Payment",
      timestamp: "2024-01-15 14:30:25",
      status: "completed",
      userType: "individual",
      category: "Loan Payment",
      reference: "TXN-2024-001234",
    },
    {
      id: "2",
      type: "contract",
      direction: "outgoing",
      amount: 25000.0,
      description: "Vehicle Murabahah Contract",
      timestamp: "2024-01-15 10:15:42",
      status: "completed",
      userType: "individual",
      category: "Contract Creation",
      reference: "CNT-2024-005678",
    },
    {
      id: "3",
      type: "payment",
      direction: "outgoing",
      amount: 450.0,
      description: "Vehicle Insurance Premium",
      timestamp: "2024-01-14 16:20:18",
      status: "completed",
      userType: "individual",
      category: "Insurance",
      reference: "TXN-2024-001233",
    },
    {
      id: "4",
      type: "application",
      direction: "outgoing",
      amount: 0.0,
      description: "Business Registration Application",
      timestamp: "2024-01-14 09:45:33",
      status: "pending",
      userType: "business",
      category: "Application",
      reference: "APP-2024-002345",
    },
    {
      id: "5",
      type: "service",
      direction: "outgoing",
      amount: 350.0,
      description: "Vehicle Maintenance Service",
      timestamp: "2024-01-13 11:30:55",
      status: "processing",
      userType: "service_provider",
      category: "Maintenance",
      reference: "SRV-2024-003456",
    },
    {
      id: "6",
      type: "compliance",
      direction: "incoming",
      amount: 0.0,
      description: "KYC Verification Completed",
      timestamp: "2024-01-12 15:22:10",
      status: "completed",
      userType: "individual",
      category: "Compliance",
      reference: "KYC-2024-004567",
    },
    {
      id: "7",
      type: "payment",
      direction: "incoming",
      amount: 2500.0,
      description: "Salary Deposit",
      timestamp: "2024-01-10 08:00:00",
      status: "completed",
      userType: "individual",
      category: "Salary",
      reference: "TXN-2024-001232",
    },
    {
      id: "8",
      type: "payment",
      direction: "outgoing",
      amount: 1200.0,
      description: "Murabahah Installment Payment",
      timestamp: "2024-01-08 14:30:25",
      status: "failed",
      userType: "individual",
      category: "Loan Payment",
      reference: "TXN-2024-001231",
    },
  ];

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesType =
      selectedType === "all" || transaction.type === selectedType;
    const matchesStatus =
      selectedStatus === "all" || transaction.status === selectedStatus;
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const getTransactionIcon = (type: string, direction: string) => {
    const iconClass =
      direction === "incoming" ? "text-green-500" : "text-red-500";
    switch (type) {
      case "payment":
        return <CreditCard className={`h-4 w-4 ${iconClass}`} />;
      case "contract":
        return <FileText className={`h-4 w-4 ${iconClass}`} />;
      case "application":
        return <FileText className={`h-4 w-4 ${iconClass}`} />;
      case "service":
        return <Activity className={`h-4 w-4 ${iconClass}`} />;
      case "compliance":
        return <CheckCircle className={`h-4 w-4 ${iconClass}`} />;
      default:
        return <Activity className={`h-4 w-4 ${iconClass}`} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3" />;
      case "pending":
        return <Clock className="h-3 w-3" />;
      case "processing":
        return <RefreshCw className="h-3 w-3" />;
      case "failed":
        return <X className="h-3 w-3" />;
      default:
        return <AlertTriangle className="h-3 w-3" />;
    }
  };

  const getDirectionIcon = (direction: string) => {
    return direction === "incoming" ? (
      <ArrowDownLeft className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-500" />
    );
  };

  const formatAmount = (amount: number, direction: string) => {
    const sign = direction === "incoming" ? "+" : "-";
    return `${sign}$${amount.toLocaleString()}`;
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Transaction Feed Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
              <Activity className="h-6 w-6 text-adalah-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Transaction & Activity Feed
              </h3>
              <p className="text-sm text-adalah-golden">
                Real-time updates and transaction history
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
            <Button
              variant="outline"
              size="sm"
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </Card>

      {/* Filters and Search */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Filters & Search
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-adalah-primary mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-adalah-primary/20 rounded-md focus:border-adalah-golden focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-adalah-primary mb-2">
              Transaction Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
            >
              {transactionTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-adalah-primary mb-2">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
            >
              {statusOptions.map((status) => (
                <option key={status.id} value={status.id}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
              onClick={() => {
                setSelectedType("all");
                setSelectedStatus("all");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Transactions ({filteredTransactions.length})
          </h3>
        </div>
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl hover:bg-adalah-primary/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
                  {getTransactionIcon(transaction.type, transaction.direction)}
                </div>
                <div>
                  <div className="font-medium text-adalah-primary">
                    {transaction.description}
                  </div>
                  <div className="text-sm text-adalah-golden">
                    {transaction.category} • {transaction.reference}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatTimestamp(transaction.timestamp)}
                    </span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {transaction.userType}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div
                    className={`font-semibold ${
                      transaction.direction === "incoming"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formatAmount(transaction.amount, transaction.direction)}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    {getDirectionIcon(transaction.direction)}
                    <Badge className={getStatusColor(transaction.status)}>
                      {getStatusIcon(transaction.status)}
                      <span className="ml-1 capitalize">
                        {transaction.status}
                      </span>
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-adalah-golden">
              No transactions found for the selected filters.
            </div>
          )}
        </div>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-adalah-primary">
                $4,200
              </div>
              <div className="text-sm text-adalah-golden">Total Incoming</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <TrendingDown className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-adalah-primary">
                $2,200
              </div>
              <div className="text-sm text-adalah-golden">Total Outgoing</div>
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-adalah-primary">
                $2,000
              </div>
              <div className="text-sm text-adalah-golden">Net Balance</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionFeed;
