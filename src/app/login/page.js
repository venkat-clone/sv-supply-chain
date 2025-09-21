"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LoginRegister = () => {
  const [error, setError] = useState("");
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setError("Please fill in all login fields.");
      return;
    }
    console.log("Login", loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = registerData;
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all registration fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log("Register", registerData);
  };

  return (
    <section className="relative min-h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/international-logistics.1.14.avif')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
        <div className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-2xl max-w-md w-full p-8">
          {/* Optional: Brand heading */}
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
                  <Label htmlFor="loginEmail">Email</Label>
                  <Input
                    id="loginEmail"
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="you@example.com"
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
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="you@example.com"
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
