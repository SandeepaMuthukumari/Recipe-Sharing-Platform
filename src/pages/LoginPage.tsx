
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChefHat } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Failed to login");
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="flex flex-col items-center mb-8">
        <ChefHat className="h-12 w-12 text-recipe-primary mb-2" />
        <h1 className="text-2xl font-bold">Welcome back to FlavorExchange</h1>
        <p className="text-muted-foreground">Log in to continue your culinary journey</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-md bg-red-50 text-red-500 text-sm">
            {errorMessage}
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-recipe-primary hover:text-recipe-accent"
            >
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
        
        <div className="text-center text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-recipe-primary hover:text-recipe-accent font-medium">
            Sign up
          </Link>
        </div>
      </form>
      
      <div className="mt-8 border-t pt-6">
        <p className="text-center text-sm text-muted-foreground">
          For demo purposes, you can use:
        </p>
        <div className="mt-2 p-3 bg-muted rounded-md">
          <p className="text-xs mb-1">Email: john@example.com</p>
          <p className="text-xs">Password: password123</p>
        </div>
      </div>
    </div>
  );
}
