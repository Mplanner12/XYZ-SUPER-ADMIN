"use client";
import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useLogin } from "@/hooks/mutate";
import { loginFormSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
  authImage,
  facebookicon,
  googleicon,
  logoxyz,
  vector102,
} from "../../../../../public";
import useGeolocation from "./GenerateLocation";
import { toast } from "react-toastify";

type LoginData = z.infer<typeof loginFormSchema>;

export default function LogIn() {
  const { latitude, longitude, address, error } = useGeolocation();

  // API CALL
  const { mutate: loginMutate, isPending } = useLogin();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = (data) => {
    if (error) {
      console.log("Geolocation error:", error);
    }

    event?.preventDefault();
    loginMutate(
      {
        ...data,
        longitude: longitude?.toString() || "",
        latitude: latitude?.toString() || "",
        address: address || "",
      },
      {
        onError(error, variables, context) {
          if (error.message === "Network Error") {
            toast.error("Network error: check your internet connection.");
          } else {
            toast.error(`Error: ${error.message}`);
          }
        },
      }
    );
  };

  return (
    <section className=" bg-foundation-white-white-400 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg">
          <div className="flex h-auto w-full flex-col justify-between items-start text-start px-11 py-2 md:py-0">
            <div className="mb-2 flex justify-start items-center gap-x-2">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[74px] h-7 object-contain"
                />
              </Link>
              <h1 className="text-lg font-semibold text-foundation-purple-purple-400">
                Admin
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-16">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-gray-700 mb-5 font-DmSans">
                  Login using your Admin credentials
                </h2>

                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label htmlFor="email_address" className="block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Email Address
                      </span>
                      <input
                        type="email"
                        id="email_address"
                        placeholder="Enter your email address"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0]"
                        {...register("email_address", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.email_address && (
                        <span className="error-message px-2">
                          {errors.email_address.message}
                        </span>
                      )}
                    </label>

                    <label className=" block mb-2.5">
                      <span className=" text-foundation-grey-grey-900 text-[0.9rem]">
                        Password
                      </span>
                      <input
                        type="password"
                        id="password"
                        placeholder="Create a password"
                        className="px-4 py-1.5 mt-1 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0] active:border-foundation-purple-purple-400 focus:border-foundation-purple-purple-400 focus:border-2 "
                        {...register("password", {
                          required: true,
                        })}
                      />
                      {/* error handler */}
                      {errors.password && (
                        <span className="error-message px-2">
                          {errors.password.message}
                        </span>
                      )}
                    </label>
                    <p className="text-sm text-gray-700 text-start my-1.5">
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
                  <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 rounded-md py-1.5">
                    {isPending ? "Logging in..." : "Login"}
                  </NavButton>
                  {/* <div className="flex justify-between items-center px-[0.85rem]">
                    testing path to access
                    <p className="text-[0.9rem] text-gray-700 text-center my-0">
                      direct access
                      <Link
                        href="/admin-setup/admin-dashboard"
                        className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                      >
                        {" "}
                        Setup page
                      </Link>
                    </p>
                  </div> */}
                </form>
              </div>
            </div>
            {/* <h3 className="md:w-[293px] w-full leading-[24px] text-base font-normal text-wrap text-[#d0d0d0]">
            © 2024 XYZ. All rights reserved.
          </h3> */}
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
