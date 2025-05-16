import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  clearTokens,
  setRefreshToken as setNewRefreshToken,
} from "./token";
import { Endpoints } from "./endpoints"; // Ensure Endpoints.REFRESH_TOKEN is '/auth/direct/refresh'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://xyz-backend.onrender.com/v1";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor: Adds the Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken(); // Get current access token
    if (token && config.headers) {
      // This adds the Authorization header to ALL requests made by axiosInstance,
      // including the refresh token request itself, using the current (possibly expired) access token.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles 401 errors and token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // Check if it's a 401 error, not for the refresh token URL itself, and not already a retry.
    if (
      error.response?.status === 401 &&
      originalRequest.url !== Endpoints.REFRESH_TOKEN &&
      originalRequest.url !== Endpoints.LOGIN
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          // If token is already being refreshed, queue the original request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest); // Retry with new token
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;
        const currentRefreshToken = getRefreshToken();

        if (!currentRefreshToken) {
          isRefreshing = false;
          clearTokens();
          processQueue(new Error("No refresh token available."), null);
          // Consider redirecting to login page here
          // window.location.href = '/login';
          return Promise.reject(
            new Error("No refresh token. User needs to login again.")
          );
        }

        try {
          // This call to Endpoints.REFRESH_TOKEN will go through the request interceptor above.
          // The request interceptor should add `Authorization: Bearer <expired_access_token>`.
          // This is where your error log indicates the problem (line 29 or similar).
          const refreshResponse = await axiosInstance.post(
            Endpoints.REFRESH_TOKEN,
            { refresh_token: currentRefreshToken } // Send the refresh token in the body
          );

          // Adjust based on your backend's actual refresh response structure
          const newAccessToken =
            refreshResponse.data?.data?.access_token ||
            refreshResponse.data?.access_token;
          const newRefreshTokenFromResponse =
            refreshResponse.data?.data?.refresh_token ||
            refreshResponse.data?.refresh_token;

          if (!newAccessToken) {
            throw new Error("New access token not found in refresh response");
          }

          setAccessToken(newAccessToken);
          if (newRefreshTokenFromResponse) {
            setNewRefreshToken(newRefreshTokenFromResponse); // Store new refresh token if provided
          }

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }
          processQueue(null, newAccessToken);
          return axiosInstance(originalRequest); // Retry the original request
        } catch (refreshError: any) {
          processQueue(refreshError, null);
          clearTokens(); // Critical: clear tokens if refresh fails
          console.error(
            "Token refresh failed:",
            refreshError?.response?.data || refreshError.message
          );
          // window.location.href = '/login'; // Redirect to login
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
    } else if (
      error.response?.status === 401 &&
      originalRequest.url === Endpoints.REFRESH_TOKEN
    ) {
      // Refresh token itself is invalid or expired
      console.error("Refresh token is invalid or expired. Logging out.");
      clearTokens();
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
