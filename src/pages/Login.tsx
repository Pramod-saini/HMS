import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// --- API Endpoint ---
const API_URL = "http://192.168.1.9:8000/api/login/";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. API Call
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      // 2. SUCCESS BLOCK: response.ok is true (Status 200-299)
      if (response.ok) {
        const data = await response.json();
        // console.log("✅ SUCCESS: API Response Data:", data); // --- अब यह ज़रूर दिखना चाहिए ---
        
        // 3. Store Tokens and User Data
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user)); 

        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        
        window.location.href = "/dashboard"; 
        
      } else {
        // 4. ERROR BLOCK: response.ok is false (Status 400, 401, 500)
        // console.error(`🛑 ERROR: Login failed with status code: ${response.status}`);
        
        let errorMessage = "Invalid credentials or Server Error.";
        
        try {
            // response को JSON के रूप में पढ़ने की कोशिश करें
            const errorData = await response.json(); 
            console.error("Error Data from API:", errorData);
            
            // API से error message की key ढूंढें
            errorMessage = errorData.detail || errorData.error || errorData.non_field_errors?.[0] || errorMessage;
            
        } catch (e) {
            // अगर response JSON नहीं है (e.g., सादा HTML error), तो यहाँ catch होगा
            console.error("Could not parse error response as JSON:", e);
            errorMessage = `Login failed. Server responded with status ${response.status}.`;
        }

        toast({
          title: "Login Failed",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } catch (error) {
      // 5. NETWORK FAILURE (CORS or Server Down)
      console.error("🚨 CRITICAL NETWORK ERROR:", error);
      toast({
        title: "Network Error",
        description: "Could not connect to the server. Check if the backend is running and check for CORS issues.",
        variant: "destructive",
      });
    } finally {
      // 6. Reset loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/home" className="text-sm text-muted-foreground hover:underline">
              Continue as guest
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;