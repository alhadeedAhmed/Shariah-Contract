import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="bg-maroon border-b border-golden/20 sticky top-0 z-50 shadow-lg">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-golden to-golden-light rounded-full flex items-center justify-center">
              <span className="text-maroon font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-golden">Adalah Chain</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden/70 h-4 w-4" />
              <Input
                placeholder="Search contracts, documents..."
                className="pl-10 bg-golden/10 border-golden/30 text-golden placeholder:text-golden/70 focus:border-golden"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-golden hover:bg-golden/10 hover:text-golden-light"
            >
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-golden hover:bg-golden/10 hover:text-golden-light"
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Avatar className="border-2 border-golden/30">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-golden text-maroon font-semibold">DC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;