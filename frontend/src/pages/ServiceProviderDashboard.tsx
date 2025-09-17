import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CustomerInquiries from "@/components/serviceProviderDashboard/CustomerInquiries";
import TransactionProcessing from "@/components/serviceProviderDashboard/TransactionProcessing";
import BankCoordination from "@/components/serviceProviderDashboard/BankCoordination";
import CustomerDelivery from "@/components/serviceProviderDashboard/CustomerDelivery";
import PostSaleSupport from "@/components/serviceProviderDashboard/PostSaleSupport";
import { motion } from "framer-motion";
import {
  Package,
  MessageSquare,
  ClipboardCheck,
  Landmark,
  Truck,
  Wrench,
  Menu,
  X,
} from "lucide-react";

const sections = [
  {
    id: "catalog",
    title: "Catalog & Inventory",
    desc: "Upload and manage your vehicle listings.",
    icon: Package,
  },
  {
    id: "inquiries",
    title: "Customer Inquiries",
    desc: "Respond to questions, send brochures & quotations.",
    icon: MessageSquare,
  },
  {
    id: "orders",
    title: "Orders & Transactions",
    desc: "Confirm POs, provide delivery timelines, update status.",
    icon: ClipboardCheck,
  },
  {
    id: "bank",
    title: "Bank Coordination",
    desc: "Coordinate ownership transfer & payments with banks.",
    icon: Landmark,
  },
  {
    id: "delivery",
    title: "Customer Delivery",
    desc: "Schedule and complete customer deliveries.",
    icon: Truck,
  },
  {
    id: "support",
    title: "Post-Sale Support",
    desc: "Warranty, service appointments, insurance claims.",
    icon: Wrench,
  },
];

const ProviderDashboard = () => {
  const [active, setActive] = useState("catalog");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5 flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        {/* Sidebar */}
        <aside
          className={`fixed md:static inset-y-0 left-0 w-64 bg-maroon text-white transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 z-30 flex flex-col`}
        >
          <div className="p-6 text-xl font-semibold border-b border-white/10 flex items-center justify-between">
            Provider Dashboard
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scroll only nav area */}
          <nav className="flex-1 overflow-y-auto">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActive(s.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-6 py-3 hover:bg-white/10 transition ${
                  active === s.id ? "bg-white/20 font-semibold" : ""
                }`}
              >
                <s.icon className="h-5 w-5" />
                <span>{s.title}</span>
              </button>
            ))}
          </nav>

          {/* Footer stays at bottom always */}
          <div className="p-4 border-t border-white/10">
            <Link to="/signin">
              <Button
                variant="outline"
                className="w-full text-maroon bg-white hover:bg-golden/20"
              >
                Sign Out
              </Button>
            </Link>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Mobile menu button */}
        <button
          className="md:hidden fixed bottom-6 right-6 z-40 bg-maroon text-white p-3 rounded-full shadow-lg"
          onClick={() => setSidebarOpen(!sidebarOpen)} // toggle instead of always true
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10">
          {sections.map(
            (s) =>
              active === s.id && (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="p-8 bg-white/80 backdrop-blur-md border border-maroon/10 rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-3 mb-6">
                      <s.icon className="h-7 w-7 text-maroon" />
                      <h2 className="text-2xl font-bold text-maroon">
                        {s.title}
                      </h2>
                    </div>
                    <p className="text-golden mb-6">{s.desc}</p>

                    {/* TODO: Replace with separate components */}
                    {s.id === "inquiries" && <CustomerInquiries />}
                    {s.id === "orders" && <TransactionProcessing />}
                    {s.id === "bank" && <BankCoordination />}
                    {s.id === "delivery" && <CustomerDelivery />}
                    {s.id === "support" && <PostSaleSupport />}
                  </Card>
                </motion.div>
              )
          )}
        </main>
      </div>
    </div>
  );
};

export default ProviderDashboard;
