"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { pricingHero } from '../../../public';
import NavButton from '../_landingpgComponents/navButton';

const PricingHero = () => {
  const router = useRouter();

  const handleClick = async () => {
     router.push('/signup')
  };

  return (
		<div className="flex lg:flex-row flex-col flex-1 justify-between sm:justify-center items-start sm:items-center text-foundation-black-black-500 mt-2 md:py-14 py-10 md:px-40 px-6 sm:gap-14 gap-8">
			<div className="flex flex-col flex-1 flex-wrap gap-3 sm:px-8 px-0">
				<h1 className="text-start font-normal sm:text-[3.5em] text-4xl leading-[67.7px]">
					XYZ PRICING
				</h1>
				<h2 className="text-start font-semibold text-foundation-grey-grey-800 text-2xl">
					Empower Your Business with XYZ
				</h2>
				<p className=" max-w-[422px] w-full text-foundation-grey-grey-800 text-base font-normal flex-wrap">
					XYZ is a versatile, cloud-based management system designed to
					streamline your business operations from SMB to Enterprise level. With
					a wide range of modules and high scalability, XYZ grows with your
					business.
				</p>
        <NavButton styles="w-fit mb-6 font-normal text-[16px] bg-foundation-purple-purple-400 text-white hover:bg-foundation-purple-purple-200 active:bg-foundation-purple-purple-100" 
        onClick={handleClick}
        >
          Get Started
        </NavButton>
			</div>

			<div className="flex sm:flex-1 flex-none">
				<Image
					src={pricingHero}
					alt=""
					className="max-w-[400px] w-full rounded-lg h-auto object-contain mix-blend-normal"
				/>
			</div>
		</div>
	);
}

export default PricingHero