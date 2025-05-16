"use client";

import React from "react";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import ResetPasswordFormContent from "@/components/auth/ResetPasswordFormContent";

export default function ResetPasswordPage() {
  return (
    <React.Suspense fallback={<LoadingOverlay />}>
      <ResetPasswordFormContent />
    </React.Suspense>
  );
}
