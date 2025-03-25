"use client"
import NavButton from '@/components/_landingpgComponents/navButton';
import { useSendOtp } from '@/hooks/mutate';
import { setUser } from '@/redux/Slices/AuthSlice/authSlice';
import { useAppDispatch } from '@/redux/Store';
import { zodResolver } from '@hookform/resolvers/zod';
import { error } from 'console';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  authImage,
  logoxyz,
} from '../../../../../public';
import { data } from '../../sales/_salesComponent/salesDistribution';
import { emailRegex } from '../RegexFile';

const resetPasswordSchema = z.object({
	email_address: z
		.string()
		.email({ message: 'Please enter a valid email.' })
		.trim(),
});

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export default function ResetPassword() {
  const dispatch = useAppDispatch();

  const { mutate: resetPasswordMutate, isPending } = useSendOtp();

  const {register, handleSubmit, formState: {errors}} = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit: SubmitHandler<ResetPasswordData> = (data) => {
    resetPasswordMutate(
			{
				data,
			},
			{
				onSuccess: () => {
					const email = data?.email_address;

					dispatch(
						setUser({
							email: data?.email_address,
						})
					);

					if (email) {
						localStorage.setItem('local store email', email);
					}
				},
			}
		);
  }
    

	return (
		<section className="bg-foundation-white-white-400 flex justify-center items-center text-gray-500">
			<div className="flex flex-col md:flex-row justify-center items-center gap-4 py-6 px-6 sm:px-8 w-full">
				<div
					className="flex h-screen md:w-full flex-col just
        .ify-start items-start text-start"
				>
					<div className="mb-4">
						<Link href={'/'}>
							<Image
								src={logoxyz}
								alt=""
								className="w-[98px] h-10 object-contain"
							/>
						</Link>
					</div>
					<div className="flex flex-col w-full align-middle justify-center items-center text-base font-inter sm:my-8 my-4 sm:h-[70%] h-auto">
						<div className="max-w-[350px] w-full flex flex-col justify-start text-start items-center">
							<h2 className=" w-full font-normal text-start text-gray-700 mb-7">
								Reset Password
							</h2>
							<p className=" w-full font-normal text-start text-gray-700 mb-7">
								Kindly enter the email address you registered with us when you
								created the account.
							</p>
							<form
								className="w-full"
								method="POST"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label htmlFor="email_address" className="block mb-4">
										<span className=" text-foundation-grey-grey-900">
											Email Address
										</span>
										<input
											type="email"
											id="email_address"
											placeholder="e.g business@gmail.com"
											className="px-4 py-3 mt-2 placeholder:text-foundation-grey-grey-700 w-full rounded-lg border-[1px] border-solid border-[#d0d0d0]"
											{...register('email_address', {
												required: true,
												pattern: emailRegex,
											})}
										/>
										{/* error handler */}
										{errors.email_address && (
											<span className="error-message px-2">
												{errors.email_address.message}
											</span>
										)}
									</label>
								</div>
								<NavButton
									styles={`w-full mb-6 mt-2 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100`}
								>
									Submit
								</NavButton>
							</form>
						</div>
					</div>
					<h3 className="md:w-[293px] w-full leading-[24px] text-base font-normal text-wrap my-0 text-[#d0d0d0]">
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
