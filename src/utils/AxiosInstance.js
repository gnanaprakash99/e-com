import axios from "axios";
import ApiRoutes, { BASE_URL } from "./ApiRoutes";
import { toast } from "react-hot-toast";

let isHandling401 = false;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    toast.error("Request setup error");
    return Promise.reject(error);
  }
);

// ✅ Handle global responses and errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;
    const url = originalRequest?.url;

    if (status === 401 && url !== ApiRoutes.LOGIN.path) {
      if (!isHandling401) {
        isHandling401 = true;
        toast.error("Session expired. Please log in again.");
        localStorage.clear();
        isHandling401 = false;
      }
    } else {
      const errorMsg =
        error.response?.detail ||
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(errorMsg);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
