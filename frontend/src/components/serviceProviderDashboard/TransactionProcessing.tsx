import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ClipboardCheck, Truck } from "lucide-react";

const TransactionProcessing = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-maroon flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-golden" /> Orders &
          Transactions
        </h2>
        <p className="text-golden">Track and process all purchase orders.</p>

        <div className="space-y-4">
          <Button className="bg-maroon text-white w-full">
            Receive Purchase Orders
          </Button>
          <Button
            variant="outline"
            className="w-full text-maroon border-maroon hover:bg-maroon/5"
          >
            Confirm Availability
          </Button>
          <Button className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold w-full">
            <Truck className="h-4 w-4 mr-2" /> Provide Delivery Timelines
          </Button>
          <Button className="bg-maroon text-white w-full">
            Update Inventory
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default TransactionProcessing;
