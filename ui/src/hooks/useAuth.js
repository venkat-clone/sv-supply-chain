// hooks/useAuth.js
import { useEffect, useState } from "react";
import { AuthApiClient } from "@/api/AuthApiClient";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await AuthApiClient.getProfile(token); // send token
      setUser(res.user || res);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (credentials) => {
    const res = await AuthApiClient.login(credentials);
    localStorage.setItem("token", res.token);
    setUser(res.user);
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, loading, login, logout, isAuthenticated: !!user };
};
