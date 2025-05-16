"use client";
import axios from "axios";
import NavButton from "@/components/_landingpgComponents/navButton";
// import { useEmailverification, useResendOtp } from "@/hooks/mutate/index";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { authImage, logoxyz } from "../../../../../public";
import OtpInputField from "../../../../components/otpInput";
import { axiosInstance } from "@/api/utils/http";
import { Endpoints } from "@/api/utils/endpoints";
import { useRouter } from "next/navigation";

// Verification code schema
const verificationCodeSchema = z.object({
  verificationCode: z.string().length(6, "Code must be 6 characters"),
});

// Type definition for verification data
type VerificationData = z.infer<typeof verificationCodeSchema>;

export default function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [isPending, setPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem("local_store_email");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VerificationData>({
    resolver: zodResolver(verificationCodeSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<VerificationData> = async (data) => {
    setPending(true);
    try {
      const response = await axiosInstance.post(Endpoints.VERIFY_TOKEN, {
        email: email,
        token: data.verificationCode,
      });

      if (response.status === 200 || response.status === 201) {
        console.log("Verification code verified successfully");
        toast.success("Verification successful!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error(
        "Verification error:",
        error.response?.data || error.message
      );
      toast.error("Failed to verify OTP. Please try again.");
    }
    setPending(false);
  };

  // const handleResendCode = async () => {
  //   if (!email) {
  //     toast("Email not available");
  //     return;
  //   }

  //   try {
  //     const response = await axios.post("/auth/direct/resend-otp", {
  //       email_address: email,
  //     });

  //     if (response.status === 200) {
  //       toast.success("Verification code resent successfully!");
  //     }
  //   } catch (error: any) {
  //     console.error("Resend error:", error.response?.data || error.message); // Added type annotation
  //     toast.error("Failed to resend OTP. Please try again.");
  //   }
  // };

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
                  Kindly enter the five-character verification code sent to your
                  email address.
                </h2>
                <form
                  method="POST"
                  className="w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <Controller
                      name="verificationCode"
                      control={control}
                      render={({ field }) => (
                        <OtpInputField
                          id="verificationCode"
                          control={control}
                          name="verificationCode"
                          error={errors.verificationCode?.message}
                        />
                      )}
                    />
                  </div>
                  <NavButton styles="w-full mb-6 mt-8 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-300 active:bg-foundation-purple-purple-200 rounded-md py-1.5 transition-all duration-300">
                    {isPending ? "Verifying..." : "Submit Code"}
                  </NavButton>
                  {/* <p className="text-base text-gray-700 text-center my-0">
                    {`Didn't`} receive the code{" "}
                    <a
                      href="#"
                      className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300"
                      onClick={handleResendCode}
                    >
                      Resend Code
                    </a>
                    {isPending && <span> Sending...</span>}
                  </p> */}
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
