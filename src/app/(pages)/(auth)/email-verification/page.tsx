"use client"

import NavButton from '@/components/_landingpgComponents/navButton';
import { useEmailverification, useResendOtp } from '@/hooks/mutate';
import { useAppSelector } from '@/redux/Store';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { z } from 'zod';
import {
  authImage,
  logoxyz,
} from '../../../../../public';
import OtpInputField from '../../../../components/otpInput';

// otp schema
const otpVerificationSchema = z.object({
  otp: z.string().length(5, 'OTP must be 5 digits')
});

// type definition
type VerificationData = z.infer<typeof otpVerificationSchema>;

export default function VerifyEmail() {

  const [email, setEmail] = useState('');

  const UserEmail = useAppSelector((state : any) => state.Auth.email);

  const {mutate:otpMutate, isPending} = useEmailverification();

  const {mutate: resendOtpMutate} = useResendOtp();

  useEffect(() => {
		// Retrieve the email from localStorage when the component mounts
		const savedEmail = localStorage.getItem('email');
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
    mode: 'onChange',
	});

  const onSubmit: SubmitHandler<VerificationData> = (data) => {
    console.log('Submitted OTP:', data);

    otpMutate(
			{
				...data,
				email_address: UserEmail,
			},
			{
				onSuccess: () => {
					console.log('OTP verified successfully');
					console.log(UserEmail, 'email sent successfully');
				},
				onError: (error) => {
					console.error('Verification error:', error);
				},
			}
		);
  }

  // handle code resend

  const handleResendCode = () => {
    if(!email) {
      toast('email not available');
      return;
    }

    resendOtpMutate({
      email_address: email
    });
  };

  

	return (
		<section className=" bg-foundation-white-white-400 flex justify-center items-center text-gray-500">
			<div className="flex flex-col md:flex-row justify-center items-start gap-4 py-6 px-6 sm:px-8 w-full">
				<div className="flex h-screen w-full flex-col items-start justify-between ">
					<div className="mb-4">
						<Image
							src={logoxyz}
							alt=""
							className="w-[98px] h-10 object-contain"
						/>
					</div>
					<div className="flex flex-col w-full justify-center items-center text-base font-inter sm:my-8 my-4">
						<div className="max-w-[350px] w-full flex flex-col justify-start text-start items-center">
							<h2 className=" w-full font-normal text-start text-foundation-grey-grey-900 mb-2">
								Email Verification
							</h2>
							<p className=" w-full font-normal text-start text-foundation-grey-grey-900 mb-8">
								Kindly enter the five digit verification code sent to your email
								address.
							</p>
							<form method="POST" className="w-full" onSubmit={handleSubmit(onSubmit)}>
								<div>
                  <Controller 
                    name="otp" 
                    control={control}
                    render={({field}) =>(
                      <OtpInputField 
                        id="otp" 
                        control={control} 
                        name='otp' 
                        error={errors.otp?.message} 
                      />
                    )}
                  />
								</div>
								<NavButton styles="w-full mb-6 mt-8 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100">
									{isPending ? 'Verifying...' : 'Submit Code'}
								</NavButton>
								<p className="text-base text-gray-700 text-center my-0">
									{`Didn't`} receive the code{' '}
									<a
										href="#"
										className="text-foundation-purple-purple-400 hover:text-foundation-purple-purple-200"
                    onClick={handleResendCode}
									>
										Resend Code
									</a>
                  {isPending && <span>Sending...</span>}
								</p>
							</form>
						</div>
					</div>
					<h3 className="md:w-[293px] w-full leading-[24px] text-base font-normal text-wrap text-[#d0d0d0] mt-10">
						© 2024 XYZ. All rights reserved.
					</h3>
				</div>

				<div className="h-auto bg-foundation-purple-purple-400 rounded-xl sm:px-0 px-4">
					<Image
						src={authImage}
						alt=""
						className="max-w-[1050px] w-auto h-screen object-contain"
					/>
				</div>
			</div>
		</section>
	);
}
