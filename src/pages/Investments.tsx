import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";

const providers = [
  {
    id: "p1",
    name: "Al Baraka Capital",
    risk: "Moderate",
    products: ["Musharakah", "Murabahah"],
  },
  {
    id: "p2",
    name: "Noor Islamic Bank",
    risk: "Conservative",
    products: ["Musharakah"],
  },
];

const Investments = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <div className="flex items-center space-x-3">
          <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
          <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
            Investment Opportunities
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {providers.map((p) => (
            <Card
              key={p.id}
              className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5">
                  <Building2 className="h-6 w-6 text-[#4A0404]" />
                </div>
                <div>
                  <p className="text-[#4A0404] font-semibold">{p.name}</p>
                  <p className="text-sm text-[#B4925F]">Risk: {p.risk}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-[#B4925F]">
                  Products: {p.products.join(", ")}
                </div>
                <div className="space-x-2">
                  <Link to="/proposal/new">
                    <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                      <Users className="h-4 w-4 mr-2" /> New Proposal
                    </Button>
                  </Link>
                  <Link to="/musharakah/convert">
                    <Button
                      variant="outline"
                      className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
                    >
                      <FileText className="h-4 w-4 mr-2" /> Convert Agreement
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Investments;
