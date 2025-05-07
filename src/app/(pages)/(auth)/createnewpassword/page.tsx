"use client";

import NavButton from "@/components/_landingpgComponents/navButton";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useResetPassword } from "@/hooks/mutate";
import { resetPasswordSchema } from "@/lib/api/definition";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { authImage, logoxyz } from "../../../../../public";
import PasswordInput from "../_components/passwordInput";

type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export default function CreateNewPassword() {
  const { mutate: resetPasswordMutate, isPending } = useResetPassword();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    resetPasswordMutate(data);
  };

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      {isPending && <LoadingOverlay />}
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
                Create a New Password
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-12">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <p className="w-full font-normal text-wrap text-start text-foundation-white-white-400 mb-5">
                  Kindly create a new password.
                </p>
                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label htmlFor="new_password" className="block mb-2.5">
                    <span className="text-foundation-grey-grey-300 text-[0.9rem]">
                      Password
                    </span>
                    <PasswordInput
                      id="new_password"
                      placeholder="Create a new password"
                      register={register("new_password")}
                      error={errors.new_password?.message}
                    />
                    {errors.new_password && (
                      <span
                        role="alert"
                        className="error-message px-2 text-[14px] text-red-400"
                      >
                        {errors.new_password.message}
                      </span>
                    )}
                  </label>
                  <label htmlFor="confirm_password" className="block mb-2.5">
                    <span className="text-foundation-grey-grey-300 text-[0.9rem]">
                      Confirm Password
                    </span>
                    <PasswordInput
                      id="confirm_password"
                      placeholder="Confirm password"
                      register={register("confirm_password")}
                      error={errors.confirm_password?.message}
                    />
                    {errors.confirm_password && (
                      <span
                        role="alert"
                        className="error-message px-2 text-[14px] text-red-400"
                      >
                        {errors.confirm_password.message}
                      </span>
                    )}
                  </label>
                  <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-1.5 transition-all duration-300">
                    {isPending ? "Submitting..." : "Submit"}
                  </NavButton>
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
