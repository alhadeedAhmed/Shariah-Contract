// src/pages/AdminManageAccess.tsx
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Shield, UserCog } from "lucide-react";

const AdminManageAccess = () => {
  const users = [
    { id: "U1001", name: "Ali Khan", role: "Scholar" },
    { id: "U1002", name: "Fatima Noor", role: "Capital Provider" },
    { id: "U1003", name: "System Admin", role: "Admin" },
  ];

  const roles = [
    "Scholar",
    "Capital Provider",
    "Business",
    "Individual",
    "Admin",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5">
      <DashboardHeader />
      <div className="container mx-auto px-6 md:px-10 py-10 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-maroon"
        >
          Manage Access
        </motion.h1>

        {/* Users List */}
        <Card className="p-6 bg-white/90 border border-maroon/10 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-maroon mb-4 flex items-center gap-2">
            <UserCog className="w-5 h-5 text-golden" /> User Roles
          </h2>
          <ul className="divide-y divide-golden/20">
            {users.map((u) => (
              <li key={u.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-maroon">{u.name}</p>
                  <p className="text-sm text-golden">{u.role}</p>
                </div>
                <select
                  className="border border-maroon/30 rounded-lg px-3 py-1 text-sm text-maroon focus:ring-2 focus:ring-golden"
                  defaultValue={u.role}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        </Card>

        {/* Access Controls */}
        <Card className="p-6 bg-white/90 border border-maroon/10 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-maroon mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-golden" /> Access Policies
          </h2>
          <p className="text-sm text-golden mb-4">
            Manage platform-wide access rights and enforce compliance policies.
          </p>
          <div className="flex gap-3 flex-wrap">
            <Button className="bg-gradient-to-r from-maroon to-maroon-dark text-white">
              Update Policies
            </Button>
            <Button
              variant="outline"
              className="text-maroon border-maroon hover:bg-maroon/5"
            >
              Audit Logs
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminManageAccess;
