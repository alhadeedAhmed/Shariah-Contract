import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Calendar } from "lucide-react";

const CustomerInquiries = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-6 bg-white/80 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-xl font-bold text-maroon flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-golden" /> Customer Inquiries
        </h2>
        <p className="text-golden">Manage all customer communications here.</p>

        <div className="space-y-4">
          <Button className="bg-maroon text-white w-full">
            <FileText className="h-4 w-4 mr-2" /> Send Quotation / Brochure
          </Button>
          <Button
            variant="outline"
            className="w-full text-maroon border-maroon hover:bg-maroon/5"
          >
            <MessageSquare className="h-4 w-4 mr-2" /> Answer Questions
          </Button>
          <Button className="bg-gradient-to-r from-golden to-golden-dark text-maroon font-semibold w-full">
            <Calendar className="h-4 w-4 mr-2" /> Schedule Consultation
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default CustomerInquiries;
