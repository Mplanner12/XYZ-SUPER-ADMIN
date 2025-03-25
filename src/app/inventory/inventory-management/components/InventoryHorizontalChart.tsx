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

const InventoryHorizontalBarChart: React.FC = () => {
	const categories = [
		'Mon',
		'Tues',
		'Wed',
		'Thur',
		'Fri',
		'Sat',
		'Sun',
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
				<div className="flex justify-between items-start gap-x-4 px-2 mb-4">
					<div>
						<div className="flex gap-2 text-base text-neutral-700">
							<p>Stock Level Chart</p>
						</div>
						<p className="mt-2 text-xs text-[#939292]">
							A bar chart showing stock level.
						</p>
					</div>
					<div className="flex flex-col text-sm items-center justify-between gap-2 mr-8">
						<div className="flex">
							<div>
								<span className="bg-[#CEB0FA] mr-2 inline-block rounded-3xl p-[3px]"></span>
							</div>
							<p>Product category 1</p>
						</div>
						<div className="flex">
							<div>
								<span className="bg-[#B78AF7] mr-2 inline-block rounded-3xl p-[3px]"></span>
							</div>
							<p>Product category 2</p>
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

export default InventoryHorizontalBarChart;
