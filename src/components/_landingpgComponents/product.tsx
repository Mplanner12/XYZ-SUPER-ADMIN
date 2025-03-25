import Image from 'next/image';
import React from 'react';
import { featureChart, featureData, featureGraph } from '../../../public';

const featureCard = [
	{
		title: 'Multi-Location Sales Management',
		content:
			'Organize tasks, assign deadlines, track progress, and collaborate seamlessly with your team in real-time.',
		image: featureData,
	},
	{
		title: 'Multi-Location Purchase Management',
		content:
			'Streamline procurement processes and optimize inventory management with our purchase management module. Automate repeat orders, track vendor performance, and maintain accurate stock levels across all your locations.',
		image: featureChart,
	},
	{
		title: 'Multi Location Inventory Management',
		content: ' Take control of your inventory with our comprehensive inventory management module. Track stock levels, manage warehouses, and optimize replenishment strategies to minimize stockouts and reduce carrying costs.',
		image: featureGraph,
	},
];

export default function Product() {
  return (
		<div className="w-full flex justify-center items-center text-[40px] px-6 md:px-8">
			<div className="flex flex-col items-center justify-start">
				<div className="flex flex-col items-center justify-center gap-[16px]">
					<div className=" text-foundation-black-black-400 text-center flex-wrap">
						<h3 className="font-normal text-wrap sm:text-[40px] text-[28px]">{"Here's"} what XYZ can do for you</h3>
						<h4 className="max-w-[1039px] text-foundation-grey-grey-900 text-base font-normal text-center w-full text-wrap mt-2">
							Explore the robust features and capabilities of XYZ Business
							Management Applications. Our suite of products is designed to
							streamline your business processes, enhance productivity, and
							drive growth. Whether {"you're"} a small startup or a large
							enterprise, our customizable solutions cater to your specific
							needs.
						</h4>
					</div>
				</div>
				<div className="flex flex-row flex-wrap justify-between sm:justify-center items-center gap-[32px] text-[26px] mt-10">
					{featureCard.map((feature) => (
						<div
							key={feature.title}
							className="max-w-[368px] rounded-lg relative bg-foundation-grey-grey-50 hover:bg-foundation-purple-purple-400 hover:text-foundation-grey-grey-300 h-[535px] flex flex-col items-center justify-center p-6 box-border text-center cursor-pointer text-wrap"
						>
							<Image
								src={feature.image}
								alt=""
								className="w-fit h-[200px] object-contain "
								loading="lazy"
							/>
							<div className=" flex flex-col px-5 py-6">
								<h3 className="tracking-[-0.01em] font-normal leading-[90%] my-3">
									{feature.title}
								</h3>
								<p className="text-base hover:text-foundation-grey-grey-300 inline-block">
									{feature.content}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
