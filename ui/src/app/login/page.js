"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthApiClient } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

const LoginRegister = () => {
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ phone: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { phone, password } = loginData;

    if (!phone || !password) {
      setError("Please fill in all login fields.");
      return;
    }

    try {
      const res = await AuthApiClient.login({ phone, password });
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, password, confirmPassword } = registerData;

    if (!name || !phone || !password || !confirmPassword) {
      setError("Please fill in all registration fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await AuthApiClient.register({ name, phone, password });
      const res = await AuthApiClient.login({ phone, password }); // auto-login
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    }
  };

  return (
    <section className="relative min-h-screen w-full">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/international-logistics.1.14.avif')",
        }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 tracking-tight">
            Welcome to <span className="text-yellow-500">SV Supply Chain</span>
          </h1>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-6 bg-gray-100 p-1 rounded-full shadow-inner">
              <TabsTrigger
                value="login"
                className={cn(
                  "rounded-full px-4 py-2 font-semibold transition text-sm",
                  "data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
                )}
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className={cn(
                  "rounded-full px-4 py-2 font-semibold transition text-sm",
                  "data-[state=active]:bg-yellow-500 data-[state=active]:text-gray-900"
                )}
              >
                Register
              </TabsTrigger>
            </TabsList>

            {error && (
              <div className="mb-4 text-center text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="loginPhone">Phone</Label>
                  <Input
                    id="loginPhone"
                    type="text"
                    name="phone"
                    value={loginData.phone}
                    onChange={handleLoginChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="loginPassword">Password</Label>
                  <Input
                    id="loginPassword"
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm"
                >
                  Login
                </Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegisterSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="registerName">Full Name</Label>
                  <Input
                    id="registerName"
                    type="text"
                    name="name"
                    value={registerData.name}
                    onChange={handleRegisterChange}
                    placeholder="John Doe"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="registerPhone">Phone</Label>
                  <Input
                    id="registerPhone"
                    type="text"
                    name="phone"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                    placeholder="Enter your phone number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="registerPassword">Password</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    name="password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="registerConfirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="registerConfirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    placeholder="••••••••"
                    className="mt-1"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm"
                >
                  Register
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default LoginRegister;
