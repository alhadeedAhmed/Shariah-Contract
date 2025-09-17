import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Car, Search, FileText } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const mockVehicles = [
  { id: "v1", make: "Toyota", model: "Corolla", price: 18750, year: 2022 },
  { id: "v2", make: "Honda", model: "Civic", price: 21500, year: 2023 },
  { id: "v3", make: "Hyundai", model: "Elantra", price: 19900, year: 2022 },
  { id: "v4", make: "Kia", model: "Cerato", price: 18500, year: 2021 },
];

const Marketplace = () => {
  const [selected, setSelected] = useState<(typeof mockVehicles)[0] | null>(
    null
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-adalah-primary/5 via-background to-adalah-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-lg rounded-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg border-2 border-adalah-primary flex items-center justify-center">
                  <Car className="h-5 w-5 text-adalah-primary" />
                </div>
                <h1 className="text-2xl font-bold text-adalah-primary tracking-tight font-inter-tight">
                  Marketplace
                </h1>
              </div>
              <div className="flex items-center space-x-2 w-full md:w-auto">
                <Input
                  placeholder="Search vehicles..."
                  className="w-full md:w-64 border-adalah-primary/20 focus:border-adalah-golden focus:ring-adalah-golden/30"
                />
                <Button
                  variant="outline"
                  className="text-adalah-primary border-adalah-primary hover:bg-adalah-primary/5"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockVehicles.map((v, index) => (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <Card className="p-6 bg-white/90 backdrop-blur-md border border-adalah-primary/20 shadow-md hover:shadow-xl transition-all rounded-2xl flex flex-col justify-between h-full">
                {/* Vehicle Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-adalah-golden/20 to-adalah-golden/10">
                    <Car className="h-6 w-6 text-adalah-primary" />
                  </div>
                  <div>
                    <p className="text-adalah-primary font-semibold text-lg font-inter-tight">
                      {v.make} {v.model}
                    </p>
                    <p className="text-sm text-adalah-golden">{v.year}</p>
                  </div>
                </div>

                <p className="text-2xl font-bold text-adalah-primary mb-6 tracking-tight font-inter-tight">
                  ${v.price.toLocaleString()}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-between gap-3 mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-b border-adalah-dark text-adalah-dark"
                      >
                        <FileText className="h-4 w-4" /> Get Quote
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[520px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-adalah-primary font-inter-tight">
                          Request Quote
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 text-sm">
                        <p className="text-adalah-primary font-medium font-inter-tight">
                          {v.make} {v.model} • {v.year}
                        </p>
                        <p className="text-adalah-golden">
                          Price: ${v.price.toLocaleString()}
                        </p>
                        <Button
                          onClick={() => setSelected(v)}
                          className="bg-gradient-to-r from-adalah-golden to-adalah-dark text-white font-semibold w-full shadow-md hover:shadow-lg"
                        >
                          Confirm Quote Request
                        </Button>
                        {selected?.id === v.id && (
                          <p className="text-green-700 text-xs mt-2">
                            Quote requested. A preliminary PO has been created
                            (mock).
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Link
                    to={`/murabahah/new?vehicle=${v.id}`}
                    className="flex-1"
                  >
                    <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark text-white shadow-md hover:shadow-lg">
                      Start Murabahah
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
