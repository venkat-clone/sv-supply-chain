// api/AuthApiClient.js
import apiClient from "@/utils/apiClient";

export const AuthApiClient = {
  login: async ({ phone, password }) => {
    const res = await apiClient.post("/auth/login", { phone, password });
    return res.data; // Should contain { token, user }
  },

  register: async (data) => {
    const res = await apiClient.post("/auth/register", data);
    return res.data;
  },

  getProfile: async () => {
    const res = await apiClient.get("/auth");
    return res.data; // User profile
  },
};
