// src/components/dashboard/DashboardHeader.tsx
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, User, Settings, LogOut, Menu, X } from "lucide-react";
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
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const allNav = {
  common: [
    { label: "TEE Dashboard", path: "/tee-dashboard" },
    { label: "AI Contracts", path: "/ai-contracts" },
    { label: "Enhanced Workflow", path: "/enhanced-workflow" },
    { label: "Create Contract", path: "/create-contract" },
  ],
  individual: [
    { label: "Marketplace", path: "/marketplace" },
    { label: "My Applications", path: "/applications" },
    { label: "Payments", path: "/payments" },
    { label: "Vehicle Services", path: "/vehicle-services" },
  ],
  business: [
    { label: "Investments", path: "/investments" },
    { label: "My Applications", path: "/applications" },
    { label: "Proposals", path: "/proposal/new" },
    { label: "Musharakah Convert", path: "/musharakah/convert" },
  ],
  provider: [{ label: "Provider Dashboard", path: "/provider/dashboard" }],
  scholar: [
    { label: "Scholar Dashboard", path: "/scholar/dashboard" },
    { label: "Scholar Applications", path: "/scholar/applications/demo" },
  ],
  capitalProvider: [
    { label: "Capital Dashboard", path: "/capital/dashboard" },
    { label: "Applications", path: "/capital/applications/demo" },
    { label: "Portfolio", path: "/capital/portfolio/demo" },
  ],
  admin: [{ label: "Admin Dashboard", path: "/admin/dashboard" }],
};

const DashboardHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  // Pick correct nav items
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
      : role === "capitalProvider"
      ? allNav.capitalProvider
      : role === "admin"
      ? allNav.admin
      : []),
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-adalah-primary/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-adalah-primary rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-base md:text-lg font-bold text-adalah-primary whitespace-nowrap font-inter-tight">
              Shariah Contract Intelligence
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                    isActive
                      ? "border-adalah-primary text-adalah-primary"
                      : "border-transparent text-gray-600 hover:text-adalah-primary hover:border-adalah-primary/50"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-2 md:space-x-4">
            <Link to="/notifications" className="hidden sm:block">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-adalah-primary"
              >
                <Bell className="h-5 w-5" />
              </Button>
            </Link>

            {/* User Dropdown */}
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
                    <AvatarFallback className="bg-adalah-golden/20 text-adalah-primary">
                      {user?.fullName?.charAt(0)?.toUpperCase() ||
                        user?.institutionName?.charAt(0)?.toUpperCase() ||
                        "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-adalah-primary">
                      {user?.fullName || user?.institutionName || "User"}
                    </p>
                    <p className="text-xs leading-none text-gray-500">
                      {user?.email || "user@example.com"}
                    </p>
                    <p className="text-xs leading-none text-green-600">
                      {user?.accountStatus === "active"
                        ? "✓ Active"
                        : "⚠ Inactive"}
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
                  className="text-adalah-primary focus:text-adalah-primary cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-adalah-primary"
              onClick={() => setMobileOpen((prev) => !prev)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-adalah-primary/10 px-4 py-3 space-y-2"
          >
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-adalah-primary text-white"
                      : "text-gray-700 hover:bg-adalah-golden/20 hover:text-adalah-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default DashboardHeader;
