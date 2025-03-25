import Image from 'next/image';
import React from 'react';
import { crmImage } from '../../../public';

export default function Crm() {
	return (
		<div className="justify-center flex items-center align-middle">
			<div className="flex flex-1 flex-col justify-between md:justify-center items-center align-middle text-left text-[40px] px-6 sm:px-8 gap-6 md:flex-row py-6">
				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={crmImage}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>
				<div className="flex flex-row flex-wrap justify-start items-start px-4">
					<div className="flex flex-col items-start justify-start gap-[4px] text-[30px]">
						<h3 className="max-w-[480px] text-[40px] sm:text-[28px] font-normal py-2 text-wrap">
							Customer Relationship Management (CRM)
						</h3>
						<p className="max-w-[460px] text-base text-foundation-grey-grey-800 py-2">
							Build stronger customer relationships and drive sales growth with
							our CRM module. Manage leads, track interactions, and personalize
							communication to deliver exceptional customer experiences.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
