// hooks/useAuth.js
import { useEffect, useState } from "react";
import { AuthApiClient } from "@/lib/api/auth";

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {

    try {
      const res = await AuthApiClient.getProfile(); // send token
      setUser(res);
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
