"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useForgetPassword } from "../../../../api/auth/forgetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { authImage, logoxyz } from "../../../../../public";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const forgetPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgetPasswordData = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordPage() {
  const router = useRouter();
  const { mutate: forgetPasswordMutate, isPending } = useForgetPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<ForgetPasswordData>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ForgetPasswordData> = (data) => {
    forgetPasswordMutate(data, {
      onSuccess: (response) => {
        toast.success(
          response.message || "Password reset instructions sent to your email!"
        );
        router.push(`/resetpassword?email=${encodeURIComponent(data.email)}`);
      },
      onError: (error: any) => {
        console.error("[FORGET PASSWORD API ERROR]:", error?.response?.data);
        const errorMessage =
          error?.response?.data?.message ||
          "Failed to send reset instructions. Please try again.";
        toast.error(errorMessage);
        setError("root.serverError", { type: "manual", message: errorMessage });
      },
    });
  };

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
              Forgot Your Password?
            </h2>
            <p className="text-foundation-grey-grey-300 text-sm mb-4">
              No worries! Enter your email address below and we&apos;ll send you
              instructions to reset your password.
            </p>
            <form
              method="POST"
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div>
                <label htmlFor="email" className="block mb-1.5">
                  <span className="text-foundation-grey-grey-300 text-sm">
                    Email Address
                  </span>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    className="px-2 xl:px-3.5 py-0.5 lg:py-1.5 mt-0.5 text-sm placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                    {...register("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <span
                      role="alert"
                      className="error-message px-2 text-[14px] text-red-400"
                    >
                      {errors.email.message}
                    </span>
                  )}
                </label>
              </div>
              {errors.root?.serverError && (
                <span
                  role="alert"
                  className="error-message block text-center px-2 py-1 text-[14px] text-red-400"
                >
                  {errors.root.serverError.message}
                </span>
              )}
              <NavButton
                styles="w-full my-3 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md px-3.5 xl:px-6 py-0.5 xl:py-1.5 transition-all duration-300 text-sm"
                disabled={isPending}
              >
                {isPending ? "Sending..." : "Send Reset Instructions"}
              </NavButton>
              <p className="text-sm text-gray-700 text-center">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                >
                  Login
                </Link>
              </p>
            </form>
          </div>
          <div className="hidden h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full md:flex justify-center items-center pb-5 mb-0">
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
