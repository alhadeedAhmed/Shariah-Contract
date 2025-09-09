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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
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

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: `Signed in as ${role} (demo)`,
      });
      setIsLoading(false);
      // Persist and set auth context immediately
      try {
        localStorage.setItem("role", role);
        localStorage.removeItem("pendingRole");
      } catch {}
      signInAs(role as any);
      if (role === "individual") {
        navigate("/marketplace");
      } else if (role === "business") {
        navigate("/investments");
      } else if (role === "provider") {
        navigate("/provider/dashboard");
      } else if (role === "scholar") {
        navigate("/scholar/dashboard");
      } else if (role === "capital") {
        navigate("/capital/dashboard");
      } else if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoSignIn();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon/5 via-background to-golden/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-golden to-golden-light rounded-full flex items-center justify-center">
              <span className="text-maroon font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-maroon">Adalah Chain</span>
          </Link>
        </div>

        <Card className="border-golden/20 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-maroon">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your Shariah Contract Intelligence account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@adalahchain.com"
                  defaultValue="demo@adalahchain.com"
                  className="border-golden/30 focus:border-golden"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  defaultValue="demo123"
                  className="border-golden/30 focus:border-golden"
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full bg-white border-golden/30 focus:border-golden h-12">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="provider">Service Provider</SelectItem>
                    <SelectItem value="scholar">Scholar</SelectItem>
                    <SelectItem value="capital">Capital Provider</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-maroon to-maroon-light hover:from-maroon-dark hover:to-maroon text-white font-semibold py-3"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-golden/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Button
              onClick={handleDemoSignIn}
              variant="outline"
              className="w-full border-golden text-golden hover:bg-golden hover:text-maroon font-semibold py-3"
              disabled={isLoading}
            >
              Continue with Demo Account (as {role})
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-golden hover:text-golden-dark font-semibold"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
