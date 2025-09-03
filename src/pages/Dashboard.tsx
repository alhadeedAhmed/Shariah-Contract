import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ContractActivityType from "@/components/dashboard/ContractActivityType";
import SmartContractsSection from "@/components/dashboard/SmartContractsSection";
import RecentActivity from "@/components/dashboard/RecentActivity";
import ContactDocuments from "@/components/dashboard/ContactDocuments";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-golden/5 to-background">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <DashboardOverview />
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <ContractActivityType />
              <SmartContractsSection />
            </div>
            <div className="space-y-6">
              <RecentActivity />
              <ContactDocuments />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;