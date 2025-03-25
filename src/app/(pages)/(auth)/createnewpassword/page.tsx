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
    <section className="bg-foundation-white-white-400 flex justify-center items-center text-gray-500 lg:p-28 h-screen">
      {isPending && <LoadingOverlay />}
      <div className="py-6 px-6 sm:px-16 w-full">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg">
          <div className="flex h-auto w-full flex-col justify-between items-start text-start px-4 py-2 md:py-0">
            <div className="mb-2">
              <Link href={"/"}>
                <Image
                  src={logoxyz}
                  alt=""
                  className="w-[74px] h-7 object-contain"
                />
              </Link>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter sm:mt-6 lg:mt-4">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-gray-700 mb-5 font-DmSans">
                  Create a New Password
                </h2>
                <p className="w-full font-normal text-wrap text-start text-gray-700 mb-5">
                  Kindly create a new password.
                </p>
                <form
                  className="w-full"
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label htmlFor="new_password" className="block mb-2.5">
                    <span className="text-foundation-grey-grey-900 text-[0.9rem]">
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
                    <span className="text-foundation-grey-grey-900 text-[0.9rem]">
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
                  <NavButton styles="w-full mb-2.5 mt-1.5 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100 rounded-md py-1.5">
                    {isPending ? "Submitting..." : "Submit"}
                  </NavButton>
                </form>
              </div>
            </div>
          </div>
          <div className="h-auto bg-foundation-purple-purple-400 rounded-none rounded-tr-xl rounded-r-xl sm:px-0 px-4 w-full flex justify-center items-center pb-5">
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
