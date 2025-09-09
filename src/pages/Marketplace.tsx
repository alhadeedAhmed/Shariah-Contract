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
    <div className="min-h-screen bg-gradient-to-br from-[#4A0404]/5 via-background to-[#B4925F]/5">
      <DashboardHeader />
      <div className="container mx-auto px-8 py-10 space-y-8">
        <Card className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-6 w-6 rounded-lg border-2 border-[#4A0404]" />
              <h1 className="text-2xl font-semibold text-[#4A0404] tracking-tight">
                Marketplace
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search vehicles..."
                className="w-64 border-[#4A0404]/20"
              />
              <Button
                variant="outline"
                className="text-[#4A0404] border-[#4A0404] hover:bg-[#4A0404]/5"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-4 gap-6">
          {mockVehicles.map((v) => (
            <Card
              key={v.id}
              className="p-6 bg-white/70 backdrop-blur-sm border-[#4A0404]/10"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-[#4A0404]/10 to-[#4A0404]/5">
                  <Car className="h-6 w-6 text-[#4A0404]" />
                </div>
                <div>
                  <p className="text-[#4A0404] font-semibold">
                    {v.make} {v.model}
                  </p>
                  <p className="text-sm text-[#B4925F]">{v.year}</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-[#4A0404] mb-4 tracking-tight">
                ${v.price.toLocaleString()}
              </p>
              <div className="flex items-center justify-between">
                <Button variant="ghost" className="text-[#4A0404]">
                  <Dialog>
                    <DialogTrigger className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" /> Get Quote
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[520px]">
                      <DialogHeader>
                        <DialogTitle className="text-[#4A0404]">
                          Request Quote
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-3 text-sm">
                        <p className="text-[#4A0404]">
                          {v.make} {v.model} • {v.year}
                        </p>
                        <p className="text-[#B4925F]">
                          Price: ${v.price.toLocaleString()}
                        </p>
                        <Button
                          onClick={() => setSelected(v)}
                          className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white w-full"
                        >
                          Confirm Quote Request
                        </Button>
                        {selected?.id === v.id && (
                          <p className="text-green-700 text-xs">
                            Quote requested. A preliminary PO has been created
                            (mock).
                          </p>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </Button>
                <Link to={`/murabahah/new?vehicle=${v.id}`}>
                  <Button className="bg-gradient-to-r from-[#4A0404] to-[#4A0404]/90 text-white">
                    Start Murabahah
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
