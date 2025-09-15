import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#contracts", label: "Contracts" },
    { href: "#why-choose-us", label: "Why Choose Us" },
  ];

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Detect scroll for transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      ref={headerRef}
      className={`sticky top-4 z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "bg-transparent" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-11/12 max-w-6xl mx-auto px-4">
        {/* Rounded pill navbar */}
        <div
          ref={menuRef}
          className="flex items-center justify-between bg-adalah-primary text-white px-6 py-3 rounded-full shadow-lg border border-adalah-golden/20 relative"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-adalah-golden to-adalah-dark rounded-full flex items-center justify-center shadow-md">
              <Shield className="text-white h-4 w-4" />
            </div>
            <span className="text-sm font-bold font-inter-tight">
              Adalah Chain
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="hover:text-white transition-colors text-sm font-medium font-inter"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Sign In (Desktop) */}
          <div className="hidden md:flex">
            <Link to="/signin">
              <Button className="bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white font-semibold font-inter px-5 py-2 rounded-full shadow-md">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Dropdown */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-full bg-adalah-primary/95 border border-adalah-golden/20 rounded-2xl shadow-lg flex flex-col space-y-3 p-4 md:hidden"
              >
                {navItems.map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="block text-white/90 hover:text-white hover:bg-adalah-golden/20 rounded-md px-3 py-2 transition-all text-sm font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Link to="/signin" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-adalah-golden to-adalah-dark hover:from-adalah-golden/90 hover:to-adalah-dark/90 text-white font-semibold rounded-full shadow-md">
                    Sign In
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
