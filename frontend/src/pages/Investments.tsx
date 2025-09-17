import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2, FileText, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [query, setQuery] = useState("");

  const filteredProviders = providers.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.risk.toLowerCase().includes(query.toLowerCase()) ||
      p.products.some((prod) =>
        prod.toLowerCase().includes(query.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 md:px-8 py-10 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center space-x-3">
            <div className="h-6 w-6 rounded-lg border-2 border-maroon" />
            <h1 className="text-2xl md:text-3xl font-bold text-maroon tracking-tight">
              Investment Opportunities
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex w-full md:w-auto items-center space-x-2">
            <Input
              placeholder="Search providers..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-maroon/20 w-full md:w-72"
            />
            <Button
              variant="outline"
              className="text-maroon border-maroon hover:bg-maroon/5"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Provider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProviders.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/10 shadow-xl rounded-2xl hover:shadow-2xl transition">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-maroon/10 to-golden/10">
                    <Building2 className="h-6 w-6 text-maroon" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-maroon">
                      {p.name}
                    </p>
                    <p className="text-sm text-golden">Risk: {p.risk}</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="text-sm text-golden">
                    Products: {p.products.join(", ")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <Link to="/proposal/new" className="w-full sm:w-auto">
                      <Button className="w-full sm:w-auto bg-gradient-to-r from-maroon to-maroon-dark text-white hover:opacity-90">
                        <Users className="h-4 w-4 mr-2" /> New Proposal
                      </Button>
                    </Link>
                    <Link to="/musharakah/convert" className="w-full sm:w-auto">
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto text-maroon border-maroon hover:bg-maroon/5"
                      >
                        <FileText className="h-4 w-4 mr-2" /> Convert Agreement
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}

          {filteredProviders.length === 0 && (
            <p className="text-center text-golden col-span-full">
              No providers match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Investments;
