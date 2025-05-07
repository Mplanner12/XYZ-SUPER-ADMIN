"use client";

import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useSignUp } from "../../../../api/auth/signup";
import { signUpFormSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { authImage, googleicon, logoxyz } from "../../../../../public";
import PasswordInput from "../_components/passwordInput";
import { emailRegex } from "../RegexFile";
import { useGoogleSignUp } from "../../../../api/auth/googleSignup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/api/utils/token";
import { storeUserInRedux } from "@/api/utils/setAuthUser";
import { useDispatch } from "react-redux";

type SignupFormData = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const { mutate: signupMutate, isPending } = useSignUp();
  const { mutate: googleSignup } = useGoogleSignUp();
  const dispatch = useDispatch();
  const router = useRouter(); // Get the router instance

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    console.log("[FORM SUBMIT]:", data);

    const { confirmPassword, ...cleanedData } = data;

    signupMutate(cleanedData, {
      onSuccess: () => {
        const { email } = data;
        router.push("/email-verification");
        if (email) {
          localStorage.setItem("local_store_email", email);
        }
      },
      onError: (error: any) => {
        console.error("[SIGNUP ERROR]:", error?.response?.data);

        const backendErrors =
          error?.response?.data?.errors || error?.response?.data?.data?.errors;

        if (Array.isArray(backendErrors)) {
          backendErrors.forEach((errMsg: string) => {
            if (errMsg.toLowerCase().includes("password")) {
              setError("password", { type: "manual", message: errMsg });
            } else if (errMsg.toLowerCase().includes("email")) {
              setError("email", { type: "manual", message: errMsg });
            } else {
              setError("root.serverError", {
                type: "manual",
                message: errMsg,
              });
            }
          });
        } else {
          setError("root.serverError", {
            type: "manual",
            message:
              error?.response?.data?.message ||
              "Signup failed. Please try again.",
          });
        }
      },
    });
  };

  const handleGoogleLogin = (googleToken: string) => {
    googleSignup(
      { credential: googleToken },
      {
        onSuccess: (data) => {
          const { accessToken, refreshToken, user } = data;
          setAccessToken(accessToken);
          storeUserInRedux(dispatch, {
            name: user.name,
            email: user.email,
            userId: user.id,
            accessToken,
          });

          router.push("/dashboard");
        },
      }
    );
  };

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="flex flex-col w-full justify-center items-center text-base font-inter mb-0">
            <div className="max-w-[510px] flex h-auto w-full flex-col justify-between items-start text-start px-8 xl:px-16 py-2 md:py-0">
              <div className="mb-2 lg:mb-2.5 xl:mb-0 flex justify-start items-center gap-x-2 lg:mt-6 xl:mt-0">
                <Link href={"/"}>
                  <Image
                    src={logoxyz}
                    alt=""
                    className="w-[74px] h-7 object-contain"
                  />
                </Link>
              </div>
              <h2 className="w-full font-normal text-start text-foundation-white-white-400 text-lg xl:text-3xl xl:my-2.5 leading-tight font-DmSans">
                Create your XYZ account
              </h2>
              <form
                method="POST"
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <label htmlFor="name" className="block mb-1.5">
                    <span className="text-foundation-grey-grey-300 text-sm">
                      Full Name
                    </span>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className="px-2 xl:px-3.5 py-0.5 lg:py-1.5 mt-0.5 text-sm placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                      {...register("name")}
                    />
                    {/* error handler */}
                    {errors.name && (
                      <span
                        role="alert"
                        className="error-message px-2 text-[14px] text-red-400"
                      >
                        {errors.name.message}
                      </span>
                    )}
                  </label>
                  <label htmlFor="email" className="block mb-1.5">
                    <span className="text-foundation-grey-grey-300 text-sm">
                      Email Address
                    </span>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="px-2 xl:px-3.5 py-0.5 lg:py-1.5 mt-0.5 text-sm placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: emailRegex,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {/* error handler - use 'email' */}
                    {errors.email && (
                      <span
                        role="alert"
                        className="error-message px-2 text-[14px] text-red-400"
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </label>

                  <label htmlFor="password" className="block mb-1.5">
                    <span className="text-foundation-grey-grey-300 text-sm">
                      Password
                    </span>
                    <PasswordInput
                      id="password"
                      placeholder="Create password"
                      register={register("password")}
                      error={errors.password?.message}
                    />
                  </label>

                  <label htmlFor="confirmPassword" className="block mb-1.5">
                    <span className="text-foundation-grey-grey-300 text-sm">
                      Confirm Password
                    </span>
                    <PasswordInput
                      id="confirmPassword"
                      placeholder="Confirm password"
                      register={register("confirmPassword")}
                      error={errors.confirmPassword?.message}
                    />
                    {/* {errors.confirmPassword && (
                      <span
                        role="alert"
                        className="error-message px-2 text-[14px] text-red-400"
                      >
                        {errors.confirmPassword.message}
                      </span>
                    )} */}
                  </label>
                </div>
                {/* Display general server errors */}
                {errors.root?.serverError && (
                  <span
                    role="alert"
                    className="error-message block text-center px-2 py-1 text-[14px] text-red-400"
                  >
                    {errors.root.serverError.message}
                  </span>
                )}
                <NavButton
                  // type="submit"
                  styles="w-full my-1 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md px-3.5 xl:px-6 py-0.5 xl:py-1.5 transition-all duration-300 text-sm"
                >
                  {isPending ? "Signing up..." : "Sign Up"}
                </NavButton>
                <p className="text-sm text-gray-700 text-center">
                  already have an account{" "}
                  <a
                    href="/login"
                    className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                  >
                    Login
                  </a>
                </p>
                <div className="flex justify-center mb-3 xl:mb-3.5 gap-1.5 xl:gap-2.5 text-gray-700 text-[14.5px] xl:text-[18px] mt-4 xl:mt-6">
                  <button className="relative bg-foundation-purple-purple-400 text-white rounded-2xl border-2 border-transparent cursor-pointer flex items-center justify-center font-semibold py-2.5 px-6 gap-[10px] text-center align-middle transition-all duration-300 hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200">
                    <Image
                      src={googleicon}
                      alt="Google icon"
                      className="filter brightness-0 invert"
                    />
                    <span className="relative z-10 glow-effect">
                      Sign up with Google
                    </span>
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-foundation-purple-purple-300 to-foundation-purple-purple-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="hidden h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full md:flex justify-center items-center pb-5 mb-0">
            <Image
              src={authImage}
              alt=""
              className="max-w-[1580px] w-auto h-fit object-contain"
            />
          </div>
          {/* </div> */}
        </div>
      </div>
    </section>
  );
}
