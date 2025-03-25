import { publicApi, privateApi } from "./axios";
import { toast } from "react-toastify";

interface RefreshTokenResponse {
  data: {
    access_token: string;
  };
  message: string;
  status: string;
}

// Function to refresh token
export const refreshToken = async (): Promise<string | null> => {
  try {
    const currentToken = localStorage.getItem("token");

    if (!currentToken) {
      throw new Error("No token found");
    }

    const response = await publicApi.post<RefreshTokenResponse>(
      "account_setup/refresh_token",
      null,
      {
        params: { token: currentToken },
      }
    );

    if (response.data.data?.access_token) {
      const newToken = response.data.data.access_token;
      localStorage.setItem("token", newToken);
      return newToken;
    }

    return null;
  } catch (error: any) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Axios interceptor to handle token refresh
export const setupAxiosInterceptors = () => {
  let isRefreshing = false;
  let failedQueue: any[] = [];

  const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
      if (token) {
        prom.resolve(token);
      } else {
        prom.reject(error);
      }
    });
    failedQueue = [];
  };

  privateApi.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If error is 401 and we haven't tried refreshing yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If token refresh is in progress, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return privateApi(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await refreshToken();
          if (newToken) {
            // Update the authorization header
            privateApi.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            // Process any queued requests
            processQueue(null, newToken);

            return privateApi(originalRequest);
          } else {
            // If refresh failed, redirect to login
            processQueue(error, null);
            handleAuthError();
            return Promise.reject(error);
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          handleAuthError();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// Handle authentication errors
const handleAuthError = () => {
  localStorage.clear();
  toast.error("Session expired. Please log in again.");
  window.location.href = "/login";
};

// Initialize axios interceptors
export const initializeApi = () => {
  setupAxiosInterceptors();
};
