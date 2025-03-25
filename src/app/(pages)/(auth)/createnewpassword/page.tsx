"use client"

import NavButton from '@/components/_landingpgComponents/navButton';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import { useResetPassword } from '@/hooks/mutate';
import { resetPasswordSchema } from '@/lib/api/definition';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import z, { TypeOf } from 'zod';
import {
  authImage,
  facebookicon,
  googleicon,
  logoxyz,
  vector102,
} from '../../../../../public';
import PasswordInput from '../_components/passwordInput';

type ResetPaswordData = z.infer<typeof resetPasswordSchema>;

export default function CreateNewPassword() {

  // Api call
  const {mutate:resetPasswordMutate, isPending} = useResetPassword()

  const {handleSubmit, register, reset,  formState: {errors}} = useForm<ResetPaswordData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<ResetPaswordData> = (data) => {
    resetPasswordMutate({
      ...data
    })
  }

	return (
		<section className="bg-foundation-white-white-400 flex justify-center items-center text-gray-500">
      {isPending && <LoadingOverlay/>}
			<div className="flex flex-col md:flex-row gap-4 justify-between items-center py-6 px-6 sm:px-8 w-full">
				<div className="flex h-screen md:w-full flex-col justify-between items-start text-start px-6 md:px-0 py-2">
					<div className="mb-4">
						<Link href={'/'}>
							<Image
								src={logoxyz}
								alt=""
								className="w-[98px] h-10 object-contain"
							/>
						</Link>
					</div>
					<div className="flex flex-col w-full justify-center items-center text-base font-inter sm:my-8 my-4">
						<div className="max-w-[350px] md:w-full flex flex-col justify-start text-start items-center">
							<h2 className=" w-full font-normal text-start text-gray-700 mb-5">
								Create a New Password
							</h2>
							<p className=" w-full font-normal text-wrap text-start text-gray-700 mb-5">
								Kindly Create a new password.
							</p>
							<form
								className="w-full"
								method="POST"
								onSubmit={handleSubmit(onSubmit)}
							>
								<div>
									<label htmlFor="password" className=" block mb-4">
										<span className=" text-foundation-grey-grey-900">
											Password
										</span>
										<PasswordInput
											id="new_password"
											placeholder="Create a new password"
											register={register('new_password')}
											error={errors.new_password?.message}
										/>
										{/* error handler */}
										{errors.new_password && (
											<span
												role="alert"
												className="error-message px-2 text-[14px] text-red-400"
											>
												{errors.new_password.message}
											</span>
										)}
									</label>
									<label htmlFor="password" className=" block mb-4">
										<span className=" text-foundation-grey-grey-900">
											Confirm Password
										</span>
										<PasswordInput
											id="confirm_password"
											placeholder="Confirm password"
											register={register('confirm_password')}
											error={errors.confirm_password?.message}
										/>
										{/* error handler */}
										{errors.confirm_password && (
											<span
												role="alert"
												className="error-message px-2 text-[14px] text-red-400"
											>
												{errors.confirm_password.message}
											</span>
										)}
									</label>
								</div>
								<NavButton styles="w-full mb-6 mt-2 bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100">
                  {isPending ? 'Submitting...' : 'Submit'}
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
