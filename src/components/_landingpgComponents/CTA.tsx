import React from 'react';

export default function CTA() {
  return (
		<section className="w-full h-full py-14 px-6 sm:px-8 flex justify-center items-center">
			<div className="item-center flex flex-col flex-wrap text-center justify-start gap-[24px] text-foundation-white-white-400 sm:py-10 py-0">
				<div className="w-full flex flex-col items-center justify-start gap-[20px]">
					<h3 className="font-normal sm:text-[32px] text-[28px] inline-block self-stretch">
						Get started with our 30-days free trial
					</h3>
					<p className="max-w-[980px] w-auto text-center font-normal text-base inline-block">
						Take the first step towards optimizing your business processes and
						driving growth with XYZ Business Management Applications. Contact us
						today to get started with your free trial!
					</p>
				</div>
				<div className="flex flex-col items-center justify-start pt-4 gap-[16px] text-base">
					<div className="w-full mt-4 flex flex-row flex-wrap items-center justify-center gap-[16px]">
						<input
							type="email"
							className="rounded-[16px] px-5 w-full py-4 text-foundation-black-black-400 placeholder:text-foundation-grey-grey-900"
							placeholder="Enter your email"
						/>
						<button className="bg-foundation-purple-purple-400 text-foundation-white-white-400 border-none hover:bg-foundation-purple-purple-100 py-4 px-6 cursor-pointer rounded-2xl whitespace-nowrap">
							Submit
						</button>
					</div>
					<p className="max-w-[635px]">
						By clicking Submit {"you're"} confirming that you agree with our{' '}
						<a href='' className="underline hover:text-foundation-purple-purple-400">Terms and Conditions.</a>
					</p>
				</div>
			</div>
		</section>
	);
}
