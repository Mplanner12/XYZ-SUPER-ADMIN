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
import { authImage, logoxyz } from "../../../../../public"; // Removed googleicon as it's not used with <GoogleLogin />
import PasswordInput from "../_components/passwordInput";
import { emailRegex } from "../RegexFile";
import { useGoogleSignUp } from "../../../../api/auth/googleSignup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { setAccessToken } from "@/api/utils/token";
import { storeUserInRedux } from "@/api/utils/setAuthUser";
import { useDispatch } from "react-redux";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google"; // Added for Google Sign-In

type SignupFormData = z.infer<typeof signUpFormSchema>;

export default function SignUp() {
  const { mutate: signupMutate, isPending } = useSignUp();
  const { mutate: googleSignup, isPending: isGoogleSigningUp } =
    useGoogleSignUp(); // Added isPending for Google
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    const { confirmPassword, ...cleanedData } = data;

    signupMutate(cleanedData, {
      onSuccess: () => {
        const { email } = data;
        // Redirect to email verification page
        router.push("/email-verification");
        if (email) {
          localStorage.setItem("local_store_email", email);
        }
        toast.success("Sign up successful! Please verify your email.");
      },
      onError: (error: any) => {
        console.error("[SIGNUP API ERROR]:", error?.response?.data);
        const backendErrors =
          error?.response?.data?.errors || error?.response?.data?.data?.errors;

        if (Array.isArray(backendErrors)) {
          backendErrors.forEach((errMsg: string) => {
            if (errMsg.toLowerCase().includes("password")) {
              setError("password", { type: "manual", message: errMsg });
            } else if (errMsg.toLowerCase().includes("email")) {
              setError("email", { type: "manual", message: errMsg });
            } else {
              setError("root.serverError", { type: "manual", message: errMsg });
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
        onSuccess: (apiResult: {
          // apiResult is the direct data returned by useGoogleSignUp's mutationFn (response.data)
          access_token: string;
          refresh_token?: string; // Optional
          user: {
            name: string;
            email: string;
            id: string;
          };
          message?: string;
        }) => {
          const { access_token: accessToken, user, message } = apiResult;

          setAccessToken(accessToken);
          storeUserInRedux(dispatch, {
            name: user.name,
            email: user.email,
            userId: user.id,
            accessToken,
          });
          toast.success(message || "Google sign-in successful!");
          router.push("/dashboard");
        },
        onError: (error: any) => {
          console.error("[GOOGLE SIGNUP API ERROR]:", error?.response?.data);
          toast.error(
            error?.response?.data?.message ||
              "Google sign-up with our server failed. Please try again."
          );
        },
      }
    );
  };

  // Handler for successful Google login from <GoogleLogin /> component
  const onGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      handleGoogleLogin(credentialResponse.credential);
    } else {
      toast.error("Google Sign-In failed: No credential received.");
      console.error(
        "Google Sign-In failed: No credential received.",
        credentialResponse
      );
    }
  };

  // Handler for Google login errors from <GoogleLogin /> component
  const onGoogleLoginError = () => {
    toast.error("Google Sign-In failed. Please try again.");
    console.error("Google Sign-In Error from <GoogleLogin /> component");
  };

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {(isPending || isGoogleSigningUp) && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="flex flex-col w-full justify-center items-center text-base font-inter mb-0">
            <div className="max-w-[510px] flex h-auto w-full flex-col justify-between items-start text-start px-8 xl:px-16 py-2 md:py-0">
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
                Create your XYZ account
              </h2>
              <form
                method="POST"
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
                noValidate
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
                      aria-invalid={errors.name ? "true" : "false"}
                    />
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
                  styles="w-full my-1 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md px-3.5 xl:px-6 py-0.5 xl:py-1.5 transition-all duration-300 text-sm"
                  disabled={isPending || isGoogleSigningUp}
                >
                  {isPending ? "Signing up..." : "Sign Up"}
                </NavButton>
                <p className="text-sm text-gray-700 text-center">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                  >
                    Login
                  </Link>
                </p>
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold text-foundation-grey-grey-300">
                    OR
                  </p>
                </div>
                <div className="flex justify-center mb-3 xl:mb-3.5 text-gray-700 text-[14.5px] xl:text-[18px] mt-4 xl:mt-6">
                  <GoogleLogin
                    onSuccess={onGoogleLoginSuccess}
                    onError={onGoogleLoginError}
                    useOneTap={false}
                    text="signup_with"
                    theme="outline"
                    shape="pill"
                    size="large"
                  />
                </div>
              </form>
            </div>
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
