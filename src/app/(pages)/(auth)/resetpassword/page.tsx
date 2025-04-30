"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { authImage, logoxyz } from "../../../../../public";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetPasswordSchema = z.object({
  code: z.string().min(6, "Code must be at least 6 characters"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

type EmailData = z.infer<typeof emailSchema>;
type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword() {
  const [stage, setStage] = useState<"request" | "reset">("request");

  // Form for requesting a reset code
  const {
    handleSubmit: handleEmailSubmit,
    register: registerEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailData>({
    resolver: zodResolver(emailSchema),
  });

  // Form for resetting the password
  const {
    handleSubmit: handleResetSubmit,
    register: registerReset,
    formState: { errors: resetErrors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onRequestCode: SubmitHandler<EmailData> = (data) => {
    // Simulate API call
    console.log("Requesting reset code for:", data.email);
    toast.success("Reset code sent to your email!");
    setStage("reset");
  };

  const onResetPassword: SubmitHandler<ResetPasswordData> = (data) => {
    // Simulate API call
    console.log("Resetting password with code:", data.code);
    toast.success("Password reset successfully!");
  };

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="max-w-[520px] flex h-auto w-full flex-col justify-between items-start text-start px-16 py-2 md:py-0">
            <div className="mb-2 flex justify-start items-center gap-x-2">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[74px] h-7 object-contain"
                />
              </Link>
              <h1 className="text-lg font-semibold text-foundation-purple-purple-400">
                Reset Password
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-12">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-foundation-white-white-400 my-2.5 font-DmSans">
                  {stage === "request"
                    ? "Forgot Password"
                    : "Reset Your Password"}
                </h2>

                {stage === "request" ? (
                  <form
                    className="w-full"
                    method="POST"
                    onSubmit={handleEmailSubmit(onRequestCode)}
                  >
                    <label htmlFor="email" className="block mb-2.5">
                      <span className="text-foundation-grey-grey-300 text-[0.9rem]">
                        Email Address
                      </span>
                      <input
                        type="email"
                        id="email"
                        placeholder="Enter your email address"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...registerEmail("email")}
                      />
                      {emailErrors.email && (
                        <span className="error-message px-2 text-red-500">
                          {emailErrors.email.message}
                        </span>
                      )}
                    </label>
                    <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-1.5 transition-all duration-300">
                      Send Reset Code
                    </NavButton>
                  </form>
                ) : (
                  <form
                    className="w-full"
                    method="POST"
                    onSubmit={handleResetSubmit(onResetPassword)}
                  >
                    <label htmlFor="code" className="block mb-2.5">
                      <span className="text-foundation-grey-grey-300 text-[0.9rem]">
                        Reset Code
                      </span>
                      <input
                        type="text"
                        id="code"
                        placeholder="Enter the reset code"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...registerReset("code")}
                      />
                      {resetErrors.code && (
                        <span className="error-message px-2 text-red-500">
                          {resetErrors.code.message}
                        </span>
                      )}
                    </label>
                    <label htmlFor="newPassword" className="block mb-2.5">
                      <span className="text-foundation-grey-grey-300 text-[0.9rem]">
                        New Password
                      </span>
                      <input
                        type="password"
                        id="newPassword"
                        placeholder="Enter your new password"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...registerReset("newPassword")}
                      />
                      {resetErrors.newPassword && (
                        <span className="error-message px-2 text-red-500">
                          {resetErrors.newPassword.message}
                        </span>
                      )}
                    </label>
                    <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-1.5 transition-all duration-300">
                      Reset Password
                    </NavButton>
                  </form>
                )}
              </div>
            </div>
          </div>
          <div className="hidden h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full lg:flex justify-center items-center pb-5">
            <Image
              src={authImage}
              alt=""
              className="max-w-[1580px] w-auto h-fit object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
