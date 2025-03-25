import download from '@/assets/icons/box-arrow-top-right.svg';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { lazy, Suspense } from 'react';

const HorizontalChart = dynamic(
	() => import('@/components/Charts/HorizontalChart/HorizontalChart'),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	}
);

const InventoryHorizontalChart: React.FC = () => {
	const categories = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	const seriesData = [
		{
			name: 'Account 1',
			data: [1, 3, 6, 3, 8, 9, 7],
			color: '#CEB0FA',
		},
		{
			name: 'Account 2',
			data: [4, 3, 10, 12, 15, 20, 9],
			color: '#B78AF7',
		},
	];

	return (
		<div className="w-full">
			{/* Horizontal Bar Chart */}
			<div className="bg-white rounded-xl shadow-md py-6">
				<div className="flex justify-between items-start gap-x-4 px-4 mb-4">
					<div>
						<div className="flex gap-2 text-base text-neutral-700">
							<p>Inventory Value Chart</p>
							<Image
								loading="lazy"
								src={download}
								alt=""
								className="h-auto object-contain shrink-0 w-5 aspect-square"
							/>
						</div>
						<p className="mt-2 text-xs text-[#939292]">
							A Bar Chart showing inventory revenue by product category
						</p>
					</div>
					<div className="flex items-center justify-between gap-5 gap-x-4 ">
						<div className="flex items-center gap-x-2">
							<span className="block bg-[#CEB0FA] rounded-full h-[12px] " />
							<span className="text-[12px]">Product category 1</span>
						</div>
						<div className="flex items-center gap-x-2">
							<span className="block bg-[#B78AF7] rounded-full h-[12px] " />
							<span className="text-[12px]">Product category 2</span>
						</div>
					</div>
				</div>
				{/* border line */}
				<div className="border border-solid border-[#F0F0F0]" />
				<HorizontalChart
					categories={categories}
					seriesData={seriesData}
					width="572px"
					height="300px"
					showToolbar={true}
					barHeight="60%"
				/>
			</div>
		</div>
	);
};

export default InventoryHorizontalChart;
