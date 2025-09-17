import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useAppStore, Application } from "@/context/AppStore";
import { useAuth } from "@/context/AuthContext";

const ApplicationsList = () => {
  const { applications } = useAppStore();
  const { role } = useAuth();
  const myApps = applications.filter((a) =>
    role === "business"
      ? a.type === "musharakah"
      : role === "individual"
      ? a.type === "murabahah"
      : true
  );

  const toPath = (a: Application) =>
    a.type === "musharakah"
      ? `/business/applications/${a.id}`
      : `/applications/${a.id}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
            My Applications
          </h1>
        </div>
        <div className="space-y-3">
          {myApps.length === 0 && (
            <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
              <p className="text-[#B4925F]">No applications yet.</p>
            </Card>
          )}
          {myApps.map((a) => (
            <Link key={a.id} to={toPath(a)}>
              <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10 hover:shadow">
                <div className="flex items-center justify-between">
                  <p className="text-[#4A0404] font-semibold">
                    {a.type === "musharakah" ? "Musharakah" : "Murabahah"}{" "}
                    Application
                  </p>
                  <p className="text-sm text-[#B4925F]">ID: {a.id}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsList;
