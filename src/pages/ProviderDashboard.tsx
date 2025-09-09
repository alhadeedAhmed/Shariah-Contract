// src/pages/ProviderDashboard.tsx
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const sections = [
  {
    id: "catalog",
    title: "Catalog & Inventory",
    desc: "Upload and manage your vehicle listings.",
  },
  {
    id: "inquiries",
    title: "Customer Inquiries",
    desc: "Respond to questions, send brochures & quotations.",
  },
  {
    id: "orders",
    title: "Orders & Transactions",
    desc: "Confirm POs, provide delivery timelines, update status.",
  },
  {
    id: "bank",
    title: "Bank Coordination",
    desc: "Coordinate ownership transfer & payments with banks.",
  },
  {
    id: "delivery",
    title: "Customer Delivery",
    desc: "Schedule and complete customer deliveries.",
  },
  {
    id: "support",
    title: "Post-Sale Support",
    desc: "Warranty, service appointments, insurance claims.",
  },
];

const ProviderDashboard = () => {
  const [active, setActive] = useState("catalog");

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      {/* Sidebar */}
      <div className="flex flex-1">
        <aside className="w-64 bg-[#4A0404] text-white flex flex-col">
          <div className="p-6 text-xl font-semibold border-b border-white/10">
            Provider Dashboard
          </div>
          <nav className="flex-1">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={`w-full text-left px-6 py-3 hover:bg-white/10 ${
                  active === s.id ? "bg-white/20 font-semibold" : ""
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <Link to="/signin">
              <Button
                variant="outline"
                className="w-full text-[#042A2A] bg-white"
              >
                Sign Out
              </Button>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8 bg-gradient-to-br from-[#042A2A]/5 to-[#B4925F]/5">
          <Card className="p-6 bg-white/80 backdrop-blur-sm">
            {sections.map(
              (s) =>
                active === s.id && (
                  <div key={s.id}>
                    <h2 className="text-2xl font-bold text-[#4A0404] mb-4">
                      {s.title}
                    </h2>
                    <p className="text-[#B4925F] mb-6">{s.desc}</p>

                    {/* Phase-based placeholders */}
                    {s.id === "catalog" && (
                      <div className="space-y-4">
                        <Button className="bg-[#4A0404] text-white">
                          Upload New Vehicle
                        </Button>
                        <Card className="p-4 border-[#4A0404]/20">
                          <p className="text-sm text-[#4A0404]">
                            Vehicle list will appear here.
                          </p>
                        </Card>
                      </div>
                    )}

                    {s.id === "inquiries" && (
                      <Card className="p-4 border-[#4A0404]/20">
                        <p className="text-sm text-[#4A0404]">
                          No customer inquiries yet.
                        </p>
                      </Card>
                    )}

                    {s.id === "orders" && (
                      <Card className="p-4 border-[#4A0404]/20">
                        <p className="text-sm text-[#4A0404]">
                          Orders will show up here when customers place POs.
                        </p>
                      </Card>
                    )}

                    {s.id === "bank" && (
                      <Card className="p-4 border-[#4A0404]/20">
                        <p className="text-sm text-[#4A0404]">
                          Bank coordination tasks (ownership transfer, payments)
                          will appear here.
                        </p>
                      </Card>
                    )}

                    {s.id === "delivery" && (
                      <Card className="p-4 border-[#4A0404]/20">
                        <p className="text-sm text-[#4A0404]">
                          Delivery schedules and confirmations will appear here.
                        </p>
                      </Card>
                    )}

                    {s.id === "support" && (
                      <Card className="p-4 border-[#4A0404]/20">
                        <p className="text-sm text-[#4A0404]">
                          Warranty claims, service requests, and insurance
                          processing will be listed here.
                        </p>
                      </Card>
                    )}
                  </div>
                )
            )}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;
