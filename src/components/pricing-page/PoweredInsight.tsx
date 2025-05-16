import Image from 'next/image';
import React from 'react';
import { deploymentImg, insightImg } from '../../../public';

export default function PoweredInsight() {
	return (
		<section
			id="about"
			className="justify-center flex items-center align-middle sm:my-8 my-4"
		>
			<div className=" flex flex-1 flex-col justify-between md:justify-center md:items-center items-start align-middle text-left text-[40px] px-6 sm:px-8 sm:gap-10 gap-6 md:flex-row py-6">
				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={insightImg}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>

				<div className="flex flex-col flex-wrap justify-start items-start px-4 md:ml-20 ml-0 ">
					<div className="flex flex-col items-start justify-start text-[30px]">
						<h3 className="max-w-[369px] sm:text-[32px] leading-[38.41px] text-[28px] w-full font-normal py-2 text-wrap">
							AI-Powered Insights
						</h3>
						<h4 className="sm:text-[32px] leading-[38.41px] text-[28px] w-full font-normal py-3 text-wrap text-[#939292]">
							(Coming Soon)
						</h4>
						<p className="max-w-[369px] text-sm text-foundation-grey-grey-800">
							Leverage basic AI capabilities to gain valuable insights and
							automate routine tasks.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
