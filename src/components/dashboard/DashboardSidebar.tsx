import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FileText, 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  Plus
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "Contracts", active: false },
  { icon: Shield, label: "Compliance", active: false },
  { icon: Users, label: "Participants", active: false },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Settings, label: "Settings", active: false },
  { icon: HelpCircle, label: "Help", active: false },
];

const DashboardSidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");

  return (
    <aside className="w-64 bg-card border-r border-golden/20 h-screen sticky top-16">
      <div className="p-4 space-y-2">
        {/* Create New Button */}
        <Button className="w-full bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white mb-4">
          <Plus className="mr-2 h-4 w-4" />
          Create New Contract
        </Button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {sidebarItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left",
                activeItem === item.label
                  ? "bg-golden/10 text-maroon border-r-2 border-golden"
                  : "text-muted-foreground hover:bg-golden/5 hover:text-maroon"
              )}
              onClick={() => setActiveItem(item.label)}
            >
              <item.icon className="mr-3 h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default DashboardSidebar;