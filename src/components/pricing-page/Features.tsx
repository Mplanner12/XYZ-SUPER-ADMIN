import { Dot } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { moduleImg } from '../../../public';

const modules = [
	{
		content: 'Finance',
	},
	{
		content: 'Accounting',
	},
	{
		content: 'Client Management',
	},
	{
		content: 'Inventory Control',
	},
	{
		content:
			'Order Processing',
	},
  {
		content:
			'Warehouse Management',
	},
  {
		content:
			'Production Planning',
	},
  {
		content:
			'Procurement',
	},
  {
		content:
			'Human Resources',
	},
  {
		content:
			'Payroll Processing',
	},
  {
		content:
			'Business Forecasting',
	},
  {
		content:
			'Business Intelligence',
	},
];

export default function Features() {
	return (
		<section
			id="about"
			className="justify-center flex flex-col items-center align-middle sm:my-5 my-2 px-2 sm:px-8s"
		>
			<h2 className="text-[2.5em] leading-10 font-normal w-full text-center py-2 text-wrap">
				Features That Drive Success
			</h2>
			<div className=" flex flex-col justify-between md:justify-center md:items-center items-center align-middle text-left sm:gap-10 gap-4 md:flex-row sm:py-6 py-3 sm:mt-14 mt-0">
				<div className="flex flex-col flex-wrap justify-start items-start px-4">
					<div className="flex flex-col items-start justify-start text-[30px]">
						<h3 className="max-w-[583px] sm:text-[32px] leading-[38.4px] text-[28px] w-full font-normal py-2 text-wrap">
							Management Module Suite
						</h3>
						<p className="max-w-[380px] text-sm text-foundation-grey-grey-800">
							Manage your business with a wide range of management tools
							including:
						</p>
					</div>

					<div className="text-foundation-grey-grey-800 rounded-2xl w-full">
						<div className="py-[1px] w-full">
							{modules.map((item, index) => (
								<div key={index}>
									<ul className="text-sm font-normal leading-3 flex gap-1 items-center text-foundation-grey-grey-800">
										<span>
											<Dot size={20} />
										</span>
										{item.content}
									</ul>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="max-w-[605px] flex justify-start items-center align-middle relative h-[365px]">
					<Image
						src={moduleImg}
						alt=""
						className="w-fit h-fit object-contain"
						loading="lazy"
					/>
				</div>
			</div>
		</section>
	);
}
