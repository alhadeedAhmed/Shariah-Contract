import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Shield,
  CheckCircle,
  Sparkles,
  Lock,
  Globe,
  Award,
  Eye,
  EyeOff,
} from "lucide-react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("demo@fintech.com");
  const [password, setPassword] = useState("demo123");
  const [role, setRole] = useState<string>(() => {
    try {
      return localStorage.getItem("pendingRole") || "individual";
    } catch {
      return "individual";
    }
  });
  const { signInAs } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoSignIn = async () => {
    setIsLoading(true);

    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Signed in as ${role} (demo)`,
      });
      setIsLoading(false);

      try {
        localStorage.setItem("role", role);
        localStorage.removeItem("pendingRole");
      } catch {}

      signInAs(role as any);

      if (role === "individual") navigate("/marketplace");
      else if (role === "business") navigate("/investments");
      else if (role === "provider") navigate("/provider/dashboard");
      else if (role === "scholar") navigate("/scholar/dashboard");
      else if (role === "capitalProvider") navigate("/capital/dashboard");
      else if (role === "admin") navigate("/admin/dashboard");
      else navigate("/dashboard");
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleDemoSignIn();
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI-powered Shariah Validation",
      description:
        "Advanced AI ensures every contract meets Islamic principles",
    },
    {
      icon: Award,
      title: "Digital Contract Passports",
      description: "Unique digital identities for seamless contract management",
    },
    {
      icon: Lock,
      title: "Blockchain-backed Security",
      description: "Immutable and transparent contract execution",
    },
  ];

  const stats = [
    { value: "10,000+", label: "Contracts Validated" },
    { value: "99.9%", label: "Shariah Compliance" },
    { value: "500+", label: "Trusted Partners" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand & Content */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-900 via-red-950 to-red-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-golden rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-golden-light rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 py-8 text-white">
          {/* Logo & Brand */}
          <div className="mb-4">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-golden to-golden-light rounded-2xl flex items-center justify-center shadow-2xl">
                <Shield className="text-red-900 h-8 w-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Islamic FinTech</h1>
                <p className="text-golden-light text-lg">
                  Shariah-Compliant Smart Contracts
                </p>
              </div>
            </div>
            <p className="text-xl text-white/90 leading-relaxed">
              Secure, transparent, and powered by AI-driven Shariah validation
              for the modern Islamic finance ecosystem.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-8 mb-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-start space-x-4 transform transition-transform hover:translate-x-2"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <IconComponent className="w-6 h-6 text-golden" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center transform transition-transform hover:scale-105"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="text-2xl font-bold text-golden mb-1">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-yellow-50 p-8 relative overflow-hidden">
        {/* Background Glow Effects */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 left-20 w-64 h-64 bg-red-900/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="w-full max-w-lg relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-golden to-golden-light rounded-xl flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3">
                <Shield className="text-red-900 h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-red-900 group-hover:text-red-700 transition-colors">
                Islamic FinTech
              </span>
            </div>
          </div>

          {/* Sign In Card */}
          <div className="transform transition-transform">
            <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-yellow-400 to-red-800"></div>

              <CardHeader className="text-center space-y-3 pt-8 pb-6">
                <CardTitle className="text-3xl font-bold text-red-900">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Sign in to access Shariah Digital Passport
                </CardDescription>
              </CardHeader>

              <CardContent className="px-6 pb-6">
                <div className="space-y-3">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-xl text-base bg-white/50 backdrop-blur-sm transition-all duration-200"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 border-2 border-gray-200 focus:border-yellow-400 focus:ring-yellow-400/20 rounded-xl text-base bg-white/50 backdrop-blur-sm pr-12 transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Role Select */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Select Your Role
                    </Label>
                    <Select value={role} onValueChange={setRole}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-400 bg-white/50 backdrop-blur-sm rounded-xl text-base">
                        <SelectValue placeholder="Choose your role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-2xl">
                        <SelectItem
                          value="individual"
                          className="h-12 rounded-lg"
                        >
                          Individual
                        </SelectItem>
                        <SelectItem
                          value="business"
                          className="h-12 rounded-lg"
                        >
                          Business
                        </SelectItem>
                        <SelectItem
                          value="provider"
                          className="h-12 rounded-lg"
                        >
                          Service Provider
                        </SelectItem>
                        <SelectItem value="scholar" className="h-12 rounded-lg">
                          Scholar
                        </SelectItem>
                        <SelectItem
                          value="capitalProvider"
                          className="h-12 rounded-lg"
                        >
                          Capital Provider
                        </SelectItem>
                        <SelectItem value="admin" className="h-12 rounded-lg">
                          Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sign In Button */}
                  <div className="transform transition-transform hover:scale-105 active:scale-95">
                    <Button
                      onClick={handleSubmit}
                      className="w-full bg-maroon-dark text-white font-semibold h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-base"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing In...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </div>

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-500 font-medium">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  {/* Demo Button */}
                  <div className="transform transition-transform hover:scale-105 active:scale-95">
                    <Button
                      onClick={handleDemoSignIn}
                      variant="outline"
                      className="w-full border-2 border-golden text-golden-dark hover:bg-golden hover:text-white font-semibold h-14 rounded-xl transition-all duration-200 text-base bg-white/50 backdrop-blur-sm"
                      disabled={isLoading}
                    >
                      <Sparkles className="w-5 h-5 mr-2" />
                      Demo Account ({role})
                    </Button>
                  </div>
                </div>

                {/* Footer Links */}
                <div className="text-center pt-6 border-t border-gray-100">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup">
                      <button className="text-yellow-600 hover:text-golden font-semibold transition-colors">
                        Sign Up
                      </button>
                    </Link>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
