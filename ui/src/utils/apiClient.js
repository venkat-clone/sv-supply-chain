// lib/apiClient.js
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Create Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});



export default apiClient;
