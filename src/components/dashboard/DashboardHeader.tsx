import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, Settings, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allNav = {
  common: [
    { label: "AI Contracts", path: "/ai-contracts" },
    { label: "Enhanced Workflow", path: "/enhanced-workflow" },
    { label: "Create Contract", path: "/create-contract" },
    { label: "Audit Log", path: "/audit" },
  ],
  individual: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "My Applications", path: "/applications" },
    { label: "Payments", path: "/payments" },
    { label: "Vehicle Services", path: "/vehicle-services" },
  ],
  business: [
    { label: "Investments", path: "/investments" },
    { label: "Business Dashboard", path: "/business/dashboard" },
    { label: "My Applications", path: "/applications" },
    { label: "Proposals", path: "/proposal/new" },
    { label: "Musharakah Convert", path: "/musharakah/convert" },
  ],
  provider: [{ label: "Provider Dashboard", path: "/provider/dashboard" }],
  scholar: [
    { label: "Scholar Dashboard", path: "/scholar/dashboard" },
    { label: "Scholar Applications", path: "/scholar/applications/demo" }, // demo path
  ],
  capital: [
    { label: "Capital Dashboard", path: "/capital/dashboard" },
    { label: "Applications", path: "/capital/applications/demo" },
    { label: "Portfolio", path: "/capital/portfolio/demo" },
  ],
  admin: [
    { label: "Admin Dashboard", path: "/admin/dashboard" },
    { label: "System Oversight", path: "/admin/system-oversight" },
    { label: "User Management", path: "/admin/user-management" },
    { label: "Analytics & Reports", path: "/admin/analytics" },
  ],
};

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = useAuth();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  // Pick correct nav items based on role
  const navItems = [
    ...allNav.common,
    ...(role === "individual"
      ? allNav.individual
      : role === "business"
      ? allNav.business
      : role === "provider"
      ? allNav.provider
      : role === "scholar"
      ? allNav.scholar
      : role === "capital"
      ? allNav.capital
      : role === "admin"
      ? allNav.admin
      : []),
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-maroon rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-lg font-bold text-maroon whitespace-nowrap">
              Shariah Contract Intelligence
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 text-[12px] font-medium transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? "border-maroon text-maroon"
                      : "border-transparent text-gray-600 hover:text-maroon hover:border-maroon/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-maroon"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full p-0"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt="User Avatar"
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600">
                      U
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-maroon">
                      User Name
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center cursor-pointer"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/settings"
                    className="flex items-center cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
