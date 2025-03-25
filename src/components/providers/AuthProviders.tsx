"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeApi } from "@/api/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    // Initialize the API with interceptors
    initializeApi();

    // Optional: Check token validity on mount
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // If no token exists and we're not on public routes, redirect to login
        if (
          !window.location.pathname.match(/\/(login|signup|reset-password)/)
        ) {
          router.push("/login");
        }
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
};
