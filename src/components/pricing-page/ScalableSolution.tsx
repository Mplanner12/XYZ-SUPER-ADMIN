import Image from 'next/image';
import React from 'react';
import { scalableSolution } from '../../../public';

export default function ScalableSolution() {
	return (
		<section
			id="about"
			className="justify-center flex items-center align-middle sm:mt-8 mt-4"
		>
			<div className=" flex flex-1 flex-col justify-between md:justify-center md:items-center items-start align-middle text-left text-[40px] px-6 sm:px-8 gap-6 md:flex-row py-6">
				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={scalableSolution}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>

				<div className="flex flex-col flex-wrap justify-start items-start px-4 md:mt-0 mt-3 md:ml-20 ml-0">
					<div className="flex flex-col items-start justify-start text-[30px]">
						<h3 className="max-w-[583px] sm:text-[32px] leading-[38.41px] text-[28px] w-full font-normal py-2 text-wrap">
							Scalable Solution
						</h3>
						<p className="max-w-[380px] text-sm text-foundation-grey-grey-800">
							From micro to small businesses then to large enterprises, XYZ
							scales effortlessly to meet your growing needs.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
