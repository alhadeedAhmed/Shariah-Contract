import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Wallet,
  CreditCard,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Plus,
  Minus,
  History,
  Settings,
  Shield,
  CheckCircle,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "income" | "expense" | "transfer";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  category: string;
}

const WalletDisplay = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const balance = 15420.5;
  const monthlyIncome = 8500.0;
  const monthlyExpenses = 3200.75;
  const netWorth = 125000.0;

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "income",
      amount: 1900.0,
      description: "Murabahah Payment Received",
      date: "2024-01-15",
      status: "completed",
      category: "Contract Payment",
    },
    {
      id: "2",
      type: "expense",
      amount: 450.0,
      description: "Vehicle Insurance",
      date: "2024-01-14",
      status: "completed",
      category: "Insurance",
    },
    {
      id: "3",
      type: "income",
      amount: 2500.0,
      description: "Salary Deposit",
      date: "2024-01-10",
      status: "completed",
      category: "Salary",
    },
    {
      id: "4",
      type: "expense",
      amount: 1200.0,
      description: "Murabahah Installment",
      date: "2024-01-08",
      status: "completed",
      category: "Loan Payment",
    },
    {
      id: "5",
      type: "expense",
      amount: 350.0,
      description: "Vehicle Maintenance",
      date: "2024-01-05",
      status: "pending",
      category: "Maintenance",
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Wallet },
    { id: "transactions", label: "Transactions", icon: History },
    { id: "cards", label: "Cards", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "income":
        return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case "expense":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "transfer":
        return <ArrowUpRight className="h-4 w-4 text-blue-500" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Wallet Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
              <Wallet className="h-6 w-6 text-adalah-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Digital Wallet
              </h3>
              <p className="text-sm text-adalah-golden">SATpay Integration</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
            >
              {showBalance ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Balance Overview */}
      <Card className="p-6 bg-gradient-to-br from-adalah-golden/10 to-adalah-dark/5 border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="text-center">
          <h4 className="text-sm text-adalah-golden mb-2">Total Balance</h4>
          <div className="text-4xl font-bold text-adalah-primary font-inter-tight mb-4">
            {showBalance ? `$${balance.toLocaleString()}` : "••••••"}
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-adalah-golden">Monthly Income</div>
              <div className="font-semibold text-adalah-primary">
                {showBalance ? `$${monthlyIncome.toLocaleString()}` : "••••"}
              </div>
            </div>
            <div>
              <div className="text-sm text-adalah-golden">Monthly Expenses</div>
              <div className="font-semibold text-adalah-primary">
                {showBalance ? `$${monthlyExpenses.toLocaleString()}` : "••••"}
              </div>
            </div>
            <div>
              <div className="text-sm text-adalah-golden">Net Worth</div>
              <div className="font-semibold text-adalah-primary">
                {showBalance ? `$${netWorth.toLocaleString()}` : "••••"}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <CreditCard className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Quick Actions
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white h-auto p-4 flex flex-col items-center space-y-2">
            <Plus className="h-5 w-5" />
            <span className="text-sm">Add Money</span>
          </Button>
          <Button
            variant="outline"
            className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5 h-auto p-4 flex flex-col items-center space-y-2"
          >
            <Minus className="h-5 w-5" />
            <span className="text-sm">Send Money</span>
          </Button>
          <Button
            variant="outline"
            className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5 h-auto p-4 flex flex-col items-center space-y-2"
          >
            <CreditCard className="h-5 w-5" />
            <span className="text-sm">Pay Bills</span>
          </Button>
          <Button
            variant="outline"
            className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5 h-auto p-4 flex flex-col items-center space-y-2"
          >
            <History className="h-5 w-5" />
            <span className="text-sm">View History</span>
          </Button>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-adalah-golden to-adalah-dark text-white"
                    : "text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{tab.label}</span>
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <History className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  Recent Transactions
                </h3>
              </div>
              <div className="space-y-3">
                {transactions.slice(0, 3).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <div className="font-medium text-adalah-primary text-sm">
                          {transaction.description}
                        </div>
                        <div className="text-xs text-adalah-golden">
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`font-semibold text-sm ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </div>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Financial Summary */}
            <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-5 w-5 text-adalah-primary" />
                <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                  Financial Summary
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-adalah-golden">This Month Income</span>
                  <span className="font-semibold text-green-600">
                    +${monthlyIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-adalah-golden">
                    This Month Expenses
                  </span>
                  <span className="font-semibold text-red-600">
                    -${monthlyExpenses.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-adalah-golden">Net Profit</span>
                  <span className="font-semibold text-adalah-primary">
                    +${(monthlyIncome - monthlyExpenses).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-adalah-primary/10 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-adalah-golden">Total Net Worth</span>
                    <span className="font-bold text-adalah-primary text-lg">
                      ${netWorth.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "transactions" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <History className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                All Transactions
              </h3>
            </div>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl hover:bg-adalah-primary/5 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div>
                      <div className="font-medium text-adalah-primary">
                        {transaction.description}
                      </div>
                      <div className="text-sm text-adalah-golden">
                        {transaction.category} • {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`font-semibold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </div>
                    <Badge className={getStatusColor(transaction.status)}>
                      {transaction.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === "cards" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Payment Methods
              </h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 border border-adalah-primary/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-6 w-6 text-adalah-primary" />
                    <div>
                      <div className="font-medium text-adalah-primary">
                        SATpay Primary Card
                      </div>
                      <div className="text-sm text-adalah-golden">
                        **** **** **** 1234
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </Card>
        )}

        {activeTab === "settings" && (
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <Settings className="h-5 w-5 text-adalah-primary" />
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Wallet Settings
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Auto-pay Installments
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Automatically pay Murabahah installments
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Transaction Notifications
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Get notified for all transactions
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl">
                <div>
                  <div className="font-medium text-adalah-primary">
                    Security Alerts
                  </div>
                  <div className="text-sm text-adalah-golden">
                    Receive security notifications
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary"
                >
                  Enable
                </Button>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  );
};

export default WalletDisplay;
