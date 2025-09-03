import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-golden/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-maroon to-golden rounded-lg"></div>
            <span className="text-xl font-bold text-maroon">Shariah Control Intelligence</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-maroon transition-colors">Home</a>
            <a href="#" className="text-foreground hover:text-maroon transition-colors">About</a>
            <a href="#" className="text-foreground hover:text-maroon transition-colors">Services</a>
            <a href="#" className="text-foreground hover:text-maroon transition-colors">Contact</a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-white">
              Get Started
            </Button>
            <Button className="bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white">
              Learn More
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-maroon transition-colors">Home</a>
              <a href="#" className="text-foreground hover:text-maroon transition-colors">About</a>
              <a href="#" className="text-foreground hover:text-maroon transition-colors">Services</a>
              <a href="#" className="text-foreground hover:text-maroon transition-colors">Contact</a>
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="border-maroon text-maroon hover:bg-maroon hover:text-white">
                  Get Started
                </Button>
                <Button className="bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white">
                  Learn More
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;