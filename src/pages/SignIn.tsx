import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDemoSignIn = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Signed in with demo account",
      });
      setIsLoading(false);
      navigate("/dashboard");
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
              Continue with Demo Account
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="#" className="text-golden hover:text-golden-dark font-semibold">
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