"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useLogin } from "../../../../api/auth/login";
import { useGoogleLogin } from "../../../../api/auth/googleLogin";
import { loginFormSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { authImage, logoxyz } from "../../../../../public";
import { toast } from "react-toastify";
import { setAccessToken, setRefreshToken } from "@/api/utils/token"; // Import setRefreshToken
import { storeUserInRedux } from "@/api/utils/setAuthUser";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useGetBusiness } from "@/api/admin/getBusiness";

type LoginData = z.infer<typeof loginFormSchema>;

export default function LogIn() {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { mutate: loginMutate, isPending } = useLogin();
  const { mutate: googleLoginMutate, isPending: isGoogleLoggingIn } =
    useGoogleLogin();
  const router = useRouter();
  const { data: business, isLoading } = useGetBusiness();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    loginMutate(data, {
      onSuccess: (response: {
        data: {
          access_token: string;
          refresh_token: string;
          user: any;
          message?: string;
        };
      }) => {
        const {
          access_token: accessToken,
          refresh_token: refreshToken,
          user,
        } = response.data;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);

        storeUserInRedux(dispatch, {
          name: user.name,
          email: user.email,
          userId: user.id,
          accessToken,
        });

        toast.success("Login successful!");
        setTimeout(() => {
          toast.info("Redirecting ...");
          if (isLoading) {
            <div className="flex justify-center items-center h-screen">
              <div
                className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-gray-500"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
              <span className="ml-4 text-gray-500">Loading...</span>
            </div>;
          } else if (!business) {
            router.push("/businessSetup");
          } else {
            router.push("/dashboard");
          }
        }, 1250);
      },
      onError(error: any) {
        if (error.message === "Network Error") {
          toast.error("Network error: check your internet connection.");
        } else {
          toast.error(
            error?.response?.data?.message || "Login failed. Please try again."
          );
        }
      },
    });
  };

  const handleGoogleLogin = (googleToken: string) => {
    googleLoginMutate(
      { credential: googleToken },
      {
        onSuccess: (apiResult: {
          access_token: string;
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
          console.error("[GOOGLE LOGIN API ERROR]:", error?.response?.data);
          toast.error(
            error?.response?.data?.message ||
              "Google sign-in failed. Please try again."
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
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {(isPending || isGoogleLoggingIn) && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-8 xl:mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="lg:max-w-[520px] flex h-auto w-full flex-col justify-between items-start text-start px-8 xl:px-16 py-2 md:py-0">
            <div className="mb-2 xl:mb-0 flex justify-start items-center gap-x-2 lg:mt-4">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[70px] h-5 object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-7">
              <div className="lg:max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-foundation-white-white-400 text-lg xl:text-3xl xl:my-2.5 leading-tight font-DmSans">
                  Login using your credentials
                </h2>

                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="email_address"
                      className="block mb-1.5 xl:mb-2.5"
                    >
                      <span className="text-foundation-grey-grey-300 text-sm xl:text-[0.9rem]">
                        Email Address
                      </span>
                      <input
                        type="email"
                        id="email_address"
                        placeholder="Enter your email address"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300"
                        {...register("email", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.email && (
                        <span className="error-message px-2 text-red-500">
                          {errors.email.message}
                        </span>
                      )}
                    </label>

                    <label className="block mb-1.5 xl:mb-2.5">
                      <span className="text-foundation-grey-grey-300 text-sm xl:text-[0.9rem]">
                        Password
                      </span>

                      <div className="relative">
                        <input
                          type={passwordType}
                          id="password"
                          placeholder="Create a password"
                          className="px-2 xl:px-4 py-0.5 lg:py-1.5 xl:py-3 mt-0.5 xl:mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] bg-foundation-black-black-400 text-foundation-white-white-400 focus:border-foundation-purple-purple-400 focus:ring-2 focus:ring-foundation-purple-purple-300 transition-all duration-300 pr-10"
                          {...register("password", {
                            required: true,
                          })}
                        />

                        <span
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => {
                            setIsPasswordVisible(!isPasswordVisible);
                            setPasswordType(
                              isPasswordVisible ? "password" : "text"
                            );
                          }}
                        >
                          {isPasswordVisible ? (
                            <LuEye size={18} color="#8a8a8a" />
                          ) : (
                            <LuEyeOff size={18} color="#8a8a8a" />
                          )}
                        </span>
                      </div>

                      {errors.password && (
                        <span className="error-message px-2 text-red-500">
                          {errors.password.message}
                        </span>
                      )}
                    </label>

                    <p className="text-sm text-foundation-grey-grey-300 text-start my-1.5">
                      Forgotten password
                      <Link
                        href="/resetpassword"
                        className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                      >
                        {" "}
                        Click to Reset
                      </Link>
                    </p>
                  </div>
                  <NavButton
                    styles="w-full my-1 xl:mb-2.5 xl:mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-0.5 xl:py-1.5 transition-all duration-300"
                    disabled={isPending || isGoogleLoggingIn}
                  >
                    {isPending ? "Logging in..." : "Login"}
                  </NavButton>
                  <p className="text-sm xl:text-[0.9rem] text-gray-700 text-center">
                    {`don't`} have an account{" "}
                    <a
                      href="/signup"
                      className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                    >
                      Sign Up
                    </a>
                  </p>

                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center font-semibold text-foundation-grey-grey-300">
                      OR
                    </p>
                  </div>

                  <div className="flex justify-center mb-3 xl:mb-3.5 gap-1.5 xl:gap-2.5 text-gray-700 text-[14.5px] xl:text-[18px] mt-4 xl:mt-6">
                    <GoogleLogin
                      onSuccess={onGoogleLoginSuccess}
                      onError={onGoogleLoginError}
                      useOneTap={false}
                      text="signin_with"
                      theme="outline"
                      shape="pill"
                      size="large"
                    />
                  </div>
                </form>
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
