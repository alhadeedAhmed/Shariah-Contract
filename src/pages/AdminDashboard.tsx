import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404]">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card className="p-6 bg-white/80 border-[#4A0404]/20 flex flex-col">
            <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
              System Oversight
            </h2>
            <p className="text-sm text-[#B4925F] mb-4">
              Monitor user activities, transactions, and system health.
            </p>
            <Button
              onClick={() => navigate("/admin/system-oversight")}
              className="mt-auto bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            >
              Open Oversight
            </Button>
          </Card>

          <Card className="p-6 bg-white/80 border-[#4A0404]/20 flex flex-col">
            <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
              User Management
            </h2>
            <p className="text-sm text-[#B4925F] mb-4">
              Support users, manage permissions, and validate decisions.
            </p>
            <Button
              onClick={() => navigate("/admin/user-management")}
              className="mt-auto bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            >
              Manage Users
            </Button>
          </Card>

          <Card className="p-6 bg-white/80 border-[#4A0404]/20 flex flex-col">
            <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
              Analytics & Reports
            </h2>
            <p className="text-sm text-[#B4925F] mb-4">
              Generate insights, track metrics, and optimize systems.
            </p>
            <Button
              onClick={() => navigate("/admin/analytics")}
              className="mt-auto bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white"
            >
              View Analytics
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
