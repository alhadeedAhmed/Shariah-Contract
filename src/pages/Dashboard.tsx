import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import MasterParticipationProgram from "@/components/dashboard/MasterParticipationProgram";
import RecentContracts from "@/components/dashboard/RecentContracts";
import ScholarNetwork from "@/components/dashboard/ScholarNetwork";
import SmartContractRecommendations from "@/components/dashboard/SmartContractRecommendations";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TokenizationEngine from "@/components/dashboard/TokenizationEngine";
import ContractDocuments from "@/components/dashboard/ContractDocuments";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-golden/5 to-background">
      <DashboardHeader />
      <main className="container mx-auto p-6 space-y-6">
        {/* Overview Section */}
        <DashboardOverview />
        
        {/* Master Participation Program */}
        <MasterParticipationProgram />

        {/* Recent Contracts and Scholar Network */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentContracts />
          </div>
          <ScholarNetwork />
        </div>

        {/* Smart Contract Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SmartContractRecommendations />
          </div>
          <div className="space-y-6">
            <RecentActivity />
            <TokenizationEngine />
          </div>
        </div>

        {/* Contract Documents */}
        <ContractDocuments />
      </main>
    </div>
  );
};

export default Dashboard;