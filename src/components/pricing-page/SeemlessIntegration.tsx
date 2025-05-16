import Image from 'next/image';
import React from 'react';
import { integrateImg, mobileAccessImg } from '../../../public';

export default function SeemlessIntegration() {
	return (
		<section
			id="about"
			className="justify-center flex items-center align-middle sm:my-8 my-4"
		>
			<div className=" flex flex-1 flex-col justify-between md:justify-center md:items-center items-start align-middle text-left text-[40px] px-6 sm:px-8 sm:gap-10 gap-6 md:flex-row py-6">
				<div className="flex flex-col flex-wrap justify-start items-start px-4 md:mr-20 mr-0 ">
					<div className="flex flex-col items-start justify-start text-[30px]">
						<h3 className="max-w-[369px] sm:text-[32px] leading-[38.41px] text-[28px] w-full font-normal py-2 text-wrap">
							Seemless Integration
						</h3>
						<p className="max-w-[300px] text-sm text-foundation-grey-grey-800">
							Connect XYZ with your existing tools and software for a unified
							business ecosystem.
						</p>
					</div>
				</div>
				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={integrateImg}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
}
