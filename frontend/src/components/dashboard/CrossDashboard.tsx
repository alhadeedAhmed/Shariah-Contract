import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  LayoutGrid,
  Users,
  Building2,
  GraduationCap,
  Wrench,
  DollarSign,
  TrendingUp,
  Activity,
  Eye,
  ArrowRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  CreditCard,
  Shield,
} from "lucide-react";

interface CrossDashboardData {
  userType:
    | "individual"
    | "business"
    | "scholar"
    | "service_provider"
    | "capital_provider";
  activities: {
    id: string;
    type: "contract" | "payment" | "application" | "service" | "compliance";
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "pending" | "in_progress" | "failed";
    userType: string;
    priority: "high" | "medium" | "low";
  }[];
  metrics: {
    totalContracts: number;
    activeApplications: number;
    pendingPayments: number;
    completedServices: number;
    complianceScore: number;
  };
  recentUpdates: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    userType: string;
    status: string;
  }[];
}

const CrossDashboard = () => {
  const [selectedUserType, setSelectedUserType] = useState<string>("all");
  const [selectedActivityType, setSelectedActivityType] =
    useState<string>("all");

  const userTypes = [
    { id: "all", label: "All Users", icon: Users, color: "text-blue-500" },
    {
      id: "individual",
      label: "Individuals",
      icon: Users,
      color: "text-green-500",
    },
    {
      id: "business",
      label: "Businesses",
      icon: Building2,
      color: "text-purple-500",
    },
    {
      id: "scholar",
      label: "Scholars",
      icon: GraduationCap,
      color: "text-orange-500",
    },
    {
      id: "service_provider",
      label: "Service Providers",
      icon: Wrench,
      color: "text-red-500",
    },
    {
      id: "capital_provider",
      label: "Capital Providers",
      icon: DollarSign,
      color: "text-yellow-500",
    },
  ];

  const activityTypes = [
    { id: "all", label: "All Activities", icon: Activity },
    { id: "contract", label: "Contracts", icon: FileText },
    { id: "payment", label: "Payments", icon: CreditCard },
    { id: "application", label: "Applications", icon: FileText },
    { id: "service", label: "Services", icon: Wrench },
    { id: "compliance", label: "Compliance", icon: Shield },
  ];

  const mockData: CrossDashboardData = {
    userType: "individual",
    activities: [
      {
        id: "1",
        type: "contract",
        title: "Murabahah Contract Signed",
        description: "New vehicle financing contract completed",
        timestamp: "2024-01-15 14:30",
        status: "completed",
        userType: "individual",
        priority: "high",
      },
      {
        id: "2",
        type: "payment",
        title: "Installment Payment Received",
        description: "Monthly payment of $1,200 processed",
        timestamp: "2024-01-14 09:15",
        status: "completed",
        userType: "individual",
        priority: "medium",
      },
      {
        id: "3",
        type: "application",
        title: "New Business Application",
        description: "Al-Rashid Trading LLC application submitted",
        timestamp: "2024-01-13 16:45",
        status: "pending",
        userType: "business",
        priority: "high",
      },
      {
        id: "4",
        type: "service",
        title: "Vehicle Maintenance Scheduled",
        description: "Annual service appointment booked",
        timestamp: "2024-01-12 11:20",
        status: "in_progress",
        userType: "service_provider",
        priority: "medium",
      },
      {
        id: "5",
        type: "compliance",
        title: "KYC Verification Completed",
        description: "Identity verification process finished",
        timestamp: "2024-01-11 13:10",
        status: "completed",
        userType: "individual",
        priority: "high",
      },
    ],
    metrics: {
      totalContracts: 24,
      activeApplications: 8,
      pendingPayments: 3,
      completedServices: 156,
      complianceScore: 95,
    },
    recentUpdates: [
      {
        id: "1",
        title: "System Maintenance Completed",
        description: "Platform maintenance finished successfully",
        timestamp: "2024-01-15 06:00",
        userType: "system",
        status: "completed",
      },
      {
        id: "2",
        title: "New Compliance Rules Added",
        description: "Updated Shariah compliance guidelines",
        timestamp: "2024-01-14 10:30",
        userType: "system",
        status: "completed",
      },
      {
        id: "3",
        title: "Payment Gateway Updated",
        description: "SATpay integration enhanced",
        timestamp: "2024-01-13 15:45",
        userType: "system",
        status: "completed",
      },
    ],
  };

  const filteredActivities = mockData.activities.filter((activity) => {
    const matchesUserType =
      selectedUserType === "all" || activity.userType === selectedUserType;
    const matchesActivityType =
      selectedActivityType === "all" || activity.type === selectedActivityType;
    return matchesUserType && matchesActivityType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contract":
        return <FileText className="h-4 w-4 text-adalah-primary" />;
      case "payment":
        return <CreditCard className="h-4 w-4 text-green-500" />;
      case "application":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "service":
        return <Wrench className="h-4 w-4 text-orange-500" />;
      case "compliance":
        return <Shield className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Cross-Dashboard Header */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
              <LayoutGrid className="h-6 w-6 text-adalah-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
                Cross-Dashboard View
              </h3>
              <p className="text-sm text-adalah-golden">
                Unified view across all user types
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-blue-100 text-blue-800">
              <Activity className="h-3 w-3 mr-1" />
              Live Updates
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              All Systems Active
            </Badge>
          </div>
        </div>
      </Card>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-adalah-primary">
              {mockData.metrics.totalContracts}
            </div>
            <div className="text-sm text-adalah-golden">Total Contracts</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-adalah-primary">
              {mockData.metrics.activeApplications}
            </div>
            <div className="text-sm text-adalah-golden">
              Active Applications
            </div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-adalah-primary">
              {mockData.metrics.pendingPayments}
            </div>
            <div className="text-sm text-adalah-golden">Pending Payments</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-adalah-primary">
              {mockData.metrics.completedServices}
            </div>
            <div className="text-sm text-adalah-golden">Completed Services</div>
          </div>
        </Card>
        <Card className="p-4 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-xl shadow-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-adalah-primary">
              {mockData.metrics.complianceScore}%
            </div>
            <div className="text-sm text-adalah-golden">Compliance Score</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Eye className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Filters
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-adalah-primary mb-2">
              User Type
            </label>
            <select
              value={selectedUserType}
              onChange={(e) => setSelectedUserType(e.target.value)}
              className="w-full border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
            >
              {userTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-adalah-primary mb-2">
              Activity Type
            </label>
            <select
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.target.value)}
              className="w-full border border-adalah-primary/20 rounded-md px-3 py-2 focus:border-adalah-golden"
            >
              {activityTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Activities Feed */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Activity className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Activities Feed ({filteredActivities.length})
          </h3>
        </div>
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 border border-adalah-primary/10 rounded-xl hover:bg-adalah-primary/5 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <div className="font-medium text-adalah-primary">
                    {activity.title}
                  </div>
                  <div className="text-sm text-adalah-golden">
                    {activity.description}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.timestamp}
                    </span>
                    <Badge className="bg-blue-100 text-blue-800 text-xs">
                      {userTypes.find((t) => t.id === activity.userType)
                        ?.label || activity.userType}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status.replace("_", " ")}
                </Badge>
                <Badge className={getPriorityColor(activity.priority)}>
                  {activity.priority}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
          {filteredActivities.length === 0 && (
            <div className="text-center py-8 text-adalah-golden">
              No activities found for the selected filters.
            </div>
          )}
        </div>
      </Card>

      {/* Recent Updates */}
      <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 rounded-2xl shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-5 w-5 text-adalah-primary" />
          <h3 className="text-lg font-semibold text-adalah-primary font-inter-tight">
            Recent System Updates
          </h3>
        </div>
        <div className="space-y-3">
          {mockData.recentUpdates.map((update) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 border border-adalah-primary/10 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="p-1 bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10 rounded">
                  <TrendingUp className="h-4 w-4 text-adalah-primary" />
                </div>
                <div>
                  <div className="font-medium text-adalah-primary text-sm">
                    {update.title}
                  </div>
                  <div className="text-xs text-adalah-golden">
                    {update.description}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">{update.timestamp}</div>
                <Badge className="bg-green-100 text-green-800 text-xs">
                  {update.status}
                </Badge>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CrossDashboard;
