"use client"; // Can be removed if page.tsx only renders Suspense and ResetPasswordForm
import React, { Suspense } from "react";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import ResetPasswordForm from "../../../../components/ResetPasswordForm";

export default function ResetPasswordPageWrapper() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
