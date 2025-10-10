import axios from "axios";
import { BASE_URL } from "./ApiRoutes";

const base_url = BASE_URL;

const axiosInstance = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
//   withCredentials: true, // if you need to send cookies with requests
});

export default axiosInstance;