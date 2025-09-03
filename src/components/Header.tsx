import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-maroon border-b border-golden/20 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-golden to-golden-light rounded-full flex items-center justify-center">
              <span className="text-maroon font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-golden">Adalah Chain Shariah Contract Intelligence</span>
          </Link>

          {/* Sign In Button */}
          <div className="flex items-center">
            <Link to="/signin">
              <Button 
                className="bg-golden hover:bg-golden-light text-maroon font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;