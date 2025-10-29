import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsLoading(true);
    const loadingToastId = toast.loading("Attempting to login...");

    try {
      const response = await fetch(
        "https://protofolio-website-1.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            email: email.trim(), 
            password: password 
          }),
        }
      );

      const data = await response.json();
      console.log("Response received:", data);

      if (response.ok && data.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("admin", JSON.stringify(data.admin));
        
        toast.success("Login successful! Redirecting...", { id: loadingToastId });
        
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        const errorMessage = data.message || "Login failed. Please check your credentials.";
        toast.error(errorMessage, { id: loadingToastId });
      }

    } catch (err) {
      console.error("Login error:", err);
      let errorText = "Connection failed. Please check your internet connection.";
      
      if (err.name === 'AbortError') {
        errorText = "Request timeout. Server might be starting up.";
      }
      
      toast.error(errorText, { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--light-primary)" }}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <div>
          <h2
            className="mt-6 text-center text-3xl font-extrabold"
            style={{ color: "var(--primary-color)" }}
          >
            Login to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-[--text-color] rounded-t-md focus:outline-none focus:ring-[--primary-color] focus:border-[--primary-color] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-[--text-color] rounded-b-md focus:outline-none focus:ring-[--primary-color] focus:border-[--primary-color] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white transition-colors duration-200 ${
                isLoading ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
              }`}
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <Link
            to="/"
            className="font-medium hover:text-[--primary-color] transition-colors duration-200"
            style={{ color: "var(--text-color)" }}
          >
            Cancel and return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;