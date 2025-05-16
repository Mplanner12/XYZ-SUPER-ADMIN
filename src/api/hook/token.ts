import { useState, useEffect } from "react";
import { getAccessToken } from "@/api/utils/token";
import { axiosInstance } from "@/api/utils/http";

const useAccessToken = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
  }, []);

  useEffect(() => {
    if (accessToken) {
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;
    }
  }, [accessToken]);

  return accessToken;
};
