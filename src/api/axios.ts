// Admin axios
import axios from "axios";
import { useRouter } from "next/navigation";
import memoize from "memoize";
import { toast } from "react-toastify";
// import useStore from "@/store";

//create an Axios instance with a config to prevent us from repeating these options in every request
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// maxAge is 20sec
const maxAge = 20000;
let token: string | null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export const publicApi = axios.create({
  baseURL: BASE_URL,
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return config;
    }
    if (token) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle error refreshing refresh token
      // Log the user out and redirect to login page
      localStorage.clear();
      toast.info("Session timeout")
      if (window.location) window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);