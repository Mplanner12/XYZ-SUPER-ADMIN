import Image from 'next/image';
import React from 'react';
import { monday, morphesus, oracle, proton, samsung, segment, zepline } from '../../../public';

export default function Features() {
  return (
		<section
			id="features"
			className="w-full h-auto align-middle flex text-center px-6 md:px-12 py-4 sm:py-6"
		>
			<div className="flex w-full flex-col justify-center items-center gap-4">
				<h3 className="text-[20px] leading-[30px] font-semibold">
					Over 32+ software company businesses Partner with XYZ
				</h3>
				<div className="flex flex-row flex-1 flex-wrap justify-center gap-[30px] items-center">
					<Image
						src={zepline}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={oracle}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={morphesus}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={samsung}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={monday}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={segment}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
					<Image
						src={proton}
						alt=""
						className="w-[137px] h-auto object-contain"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
}
