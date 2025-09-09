import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminUserManagement = () => {
  const inquiries = [
    { id: "Q101", user: "Ali Khan", issue: "Password reset", status: "open" },
    {
      id: "Q102",
      user: "Fatima Noor",
      issue: "KYC pending",
      status: "resolved",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-6">
        <h1 className="text-2xl font-semibold text-[#4A0404] mb-4">
          User Management
        </h1>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            User Inquiries
          </h2>
          <ul className="text-sm text-[#B4925F] space-y-2">
            {inquiries.map((i) => (
              <li key={i.id}>
                {i.user} – {i.issue} ({i.status})
              </li>
            ))}
          </ul>
          <Button className="mt-4 bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
            Handle Escalations
          </Button>
        </Card>

        <Card className="p-6 bg-white/80 border-[#4A0404]/20">
          <h2 className="text-xl font-semibold text-[#4A0404] mb-3">
            Scholar & AI Quality Control
          </h2>
          <p className="text-sm text-[#B4925F] mb-2">
            Review scholar decisions and validate AI contracts.
          </p>
          <Button variant="outline" className="text-[#4A0404] border-[#4A0404]">
            Start Review
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AdminUserManagement;
