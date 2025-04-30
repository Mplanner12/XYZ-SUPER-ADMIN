"use client";

import NavButton from "@/components/_landingpgComponents/navButton";
import { useEmailverification, useResendOtp } from "@/hooks/mutate";
import { useAppSelector } from "@/redux/Store";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { authImage, logoxyz } from "../../../../../public";
import OtpInputField from "../../../../components/otpInput";

// OTP schema
const otpVerificationSchema = z.object({
  otp: z.string().length(5, "OTP must be 5 digits"),
});

// Type definition
type VerificationData = z.infer<typeof otpVerificationSchema>;

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const UserEmail = useAppSelector((state: any) => state.Auth.email);
  const { mutate: otpMutate, isPending } = useEmailverification();
  const { mutate: resendOtpMutate } = useResendOtp();

  useEffect(() => {
    // Retrieve the email from localStorage when the component mounts
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationData>({
    resolver: zodResolver(otpVerificationSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<VerificationData> = (data) => {
    console.log("Submitted OTP:", data);
    otpMutate(
      {
        ...data,
        email_address: UserEmail,
      },
      {
        onSuccess: () => {
          console.log("OTP verified successfully");
          console.log(UserEmail, "email sent successfully");
        },
        onError: (error) => {
          console.error("Verification error:", error);
        },
      }
    );
  };

  // Handle code resend
  const handleResendCode = () => {
    if (!email) {
      toast("Email not available");
      return;
    }
    resendOtpMutate({
      email_address: email,
    });
  };

  return (
    <section className="bg-foundation-purple-purple-900 flex justify-center items-start lg:items-center text-gray-500 lg:p-28 h-screen relative overflow-hidden">
      <div className="py-6 px-6 sm:px-16 w-full mt-12 lg:mt-0 relative z-10">
        <div className="w-full flex flex-col md:flex-row justify-center items-start lg:gap-x-4 rounded-xl shadow-lg bg-foundation-black-black-500/80 backdrop-blur-md">
          <div className="max-w-[520px] flex h-auto w-full flex-col justify-between items-start text-start px-16 py-2 md:py-0">
            <div className="mb-2 flex justify-start items-center gap-x-2">
              <Image
                src={logoxyz}
                alt=""
                className="w-[74px] h-7 object-contain"
              />
              <h1 className="text-lg font-semibold text-foundation-purple-purple-400">
                Email Verification
              </h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center text-base font-inter mt-12">
              <div className="max-w-[450px] md:w-full flex flex-col justify-start text-start items-center">
                <h2 className="w-full font-normal text-start text-foundation-white-white-400 my-2.5 font-DmSans">
                  Kindly enter the five-digit verification code sent to your
                  email address.
                </h2>
                <form
                  method="POST"
                  className="w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field }) => (
                        <OtpInputField
                          id="otp"
                          control={control}
                          name="otp"
                          error={errors.otp?.message}
                        />
                      )}
                    />
                  </div>
                  <NavButton styles="w-full mb-6 mt-8 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-1.5 transition-all duration-300">
                    {isPending ? "Verifying..." : "Submit Code"}
                  </NavButton>
                  <p className="text-base text-gray-700 text-center my-0">
                    {`Didn't`} receive the code{" "}
                    <a
                      href="#"
                      className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300"
                      onClick={handleResendCode}
                    >
                      Resend Code
                    </a>
                    {isPending && <span> Sending...</span>}
                  </p>
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
