import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Truck, CheckCircle } from "lucide-react";

const CustomerDelivery = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-maroon flex items-center gap-2">
          <Truck className="h-5 w-5 text-golden" /> Customer Delivery
        </h2>
        <p className="text-golden">
          Schedule and manage final vehicle delivery.
        </p>

        <div className="space-y-4">
          <Button className="bg-maroon text-white w-full">
            Schedule Delivery
          </Button>
          <Button
            variant="outline"
            className="w-full text-maroon border-maroon hover:bg-maroon/5"
          >
            Prepare Vehicle for Handover
          </Button>
          <Button className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold w-full">
            Complete Delivery
          </Button>
          <Button className="bg-maroon text-white w-full">
            <CheckCircle className="h-4 w-4 mr-2" /> Submit Confirmation
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default CustomerDelivery;
