"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useResetPassword } from "../../../../api/auth/resetPassword";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authImage, logoxyz } from "../../../../../public";
import { useRouter, useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    code: z
      .string()
      .min(1, "Reset code is required")
      .min(6, "Code must be at least 6 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmNewPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

interface ResetPasswordApiResponse {
  message: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const { mutate: resetPasswordMutate, isPending } = useResetPassword();

  const {
    handleSubmit: handleResetSubmit,
    register: registerReset,
    formState: { errors: resetErrors },
    setError,
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!email) {
      toast.error("Email not found. Please request a password reset again.");
      router.push("/forget-password");
    }
  }, [email, router]);

  const onResetPassword: SubmitHandler<ResetPasswordData> = (data) => {
    if (!email) {
      toast.error("Email is missing. Cannot reset password.");
      setError("root.serverError", {
        type: "manual",
        message: "Email is missing.",
      });
      return;
    }

    const payload = {
      email: email,
      token: data.code,
      new_password: data.newPassword,
    };

    resetPasswordMutate(payload, {
      onSuccess: (response: ResetPasswordApiResponse) => {
        toast.success(
          response.message || "Password has been reset successfully!"
        );
        router.push("/login");
      },
      onError: (error: any) => {
        console.error("[RESET PASSWORD API ERROR]:", error?.response?.data);
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to reset password. Please try again.";
        toast.error(errorMessage);
        setError("root.serverError", { type: "manual", message: errorMessage });
      },
    });
  };

  // If email is not present and we are not in a pending API state, show loading or redirect.
  // The useEffect above handles the redirect, but this can prevent rendering the form briefly.
  if (!email && !isPending) {
    return <LoadingOverlay />;
  }

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="lg:max-w-[520px] flex h-auto w-full flex-col justify-between items-start text-start px-8 xl:px-16 py-2 md:py-0">
            <div className="mb-2 lg:mb-2.5 xl:mb-0 flex justify-start items-center gap-x-2 lg:mt-6 xl:mt-0">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt="XYZ Company Logo"
                  className="w-[74px] h-7 object-contain"
                />
              </Link>
            </div>
            <h2 className="w-full font-normal text-start text-foundation-white-white-400 text-lg xl:text-3xl xl:my-2.5 leading-tight font-DmSans">
              Reset Your Password
            </h2>
            <p className="text-foundation-grey-grey-300 text-sm mb-4">
              Enter the code sent to{" "}
              <span className="font-semibold">{email || "your email"}</span> and
              set your new password.
            </p>
            <form
              className="w-full"
              method="POST"
              onSubmit={handleResetSubmit(onResetPassword)}
              noValidate
            >
              <label htmlFor="code" className="block mb-2.5">
                <span className="text-foundation-grey-grey-300 text-sm">
                  Reset Code
                </span>
                <input
                  type="text"
                  id="code"
                  placeholder="Enter the reset code"
                  className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                  {...registerReset("code")}
                  aria-invalid={resetErrors.code ? "true" : "false"}
                />
                {resetErrors.code && (
                  <span
                    role="alert"
                    className="error-message px-2 text-[14px] text-red-400"
                  >
                    {resetErrors.code.message}
                  </span>
                )}
              </label>
              <label htmlFor="newPassword" className="block mb-2.5">
                <span className="text-foundation-grey-grey-300 text-sm">
                  New Password
                </span>
                <input
                  type="password"
                  id="newPassword"
                  placeholder="Enter your new password"
                  className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                  {...registerReset("newPassword")}
                  aria-invalid={resetErrors.newPassword ? "true" : "false"}
                />
                {resetErrors.newPassword && (
                  <span
                    role="alert"
                    className="error-message px-2 text-[14px] text-red-400"
                  >
                    {resetErrors.newPassword.message}
                  </span>
                )}
              </label>
              <label htmlFor="confirmNewPassword" className="block mb-2.5">
                <span className="text-foundation-grey-grey-300 text-sm">
                  Confirm New Password
                </span>
                <input
                  type="password"
                  id="confirmNewPassword"
                  placeholder="Confirm your new password"
                  className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                  {...registerReset("confirmNewPassword")}
                  aria-invalid={
                    resetErrors.confirmNewPassword ? "true" : "false"
                  }
                />
                {resetErrors.confirmNewPassword && (
                  <span
                    role="alert"
                    className="error-message px-2 text-[14px] text-red-400"
                  >
                    {resetErrors.confirmNewPassword.message}
                  </span>
                )}
              </label>
              {resetErrors.root?.serverError && (
                <span
                  role="alert"
                  className="error-message block text-center px-2 py-1 text-[14px] text-red-400"
                >
                  {resetErrors.root.serverError.message}
                </span>
              )}
              <NavButton
                styles="w-full my-3 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md px-3.5 xl:px-6 py-0.5 xl:py-1.5 transition-all duration-300 text-sm"
                disabled={isPending}
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </NavButton>
              <p className="text-sm text-gray-700 text-center">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full lg:flex justify-center items-center pb-5">
            <Image
              src={authImage}
              alt="Illustration for authentication page"
              className="max-w-[1580px] w-auto h-fit object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
