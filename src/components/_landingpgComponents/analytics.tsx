import Image from 'next/image';
import React from 'react';
import { guageChart } from '../../../public';

export default function AnalyticsAndReport() {
	return (
		<div className="justify-center flex items-center align-middle">
			<div className="flex flex-1 flex-col justify-between md:justify-center md:items-center items-center align-middle text-left text-[40px] sm:px-6 px-8 gap-6 md:flex-row py-6">
				<div className="flex flex-row flex-wrap justify-start items-start px-4">
					<div className="flex flex-col items-start justify-start gap-[4px] text-[30px]">
						<h3 className="max-w-[480px] text-[48px] sm:text-[28px] font-normal text-wrap py-2">
							Reporting and Analytics
						</h3>
						<p className="max-w-[440px] text-base text-foundation-grey-grey-800 py-2">
							Unlock valuable insights into your business performance with our
							reporting and analytics module. Visualize data, track key metrics,
							and make informed decisions to drive business success.
						</p>
					</div>
				</div>
				<div className="max-w-[605px] flex justify-start items-center relative h-[365px]">
					<Image
						src={guageChart}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	);
}
