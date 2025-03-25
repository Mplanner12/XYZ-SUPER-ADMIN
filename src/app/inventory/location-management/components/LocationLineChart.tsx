import dynamic from 'next/dynamic';
import Image from 'next/image';
import React, { lazy, Suspense } from 'react';

const LineChart = dynamic(
	() => import('@/components/Charts/LineChart/LineChart'),
	{
		loading: () => <p>Loading...</p>,
		ssr: false,
	}
);

const LocationLineChart: React.FC = () => {
	const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	const seriesData = [
		{
			name: 'Inventory level',
			data: [1, 3, 6, 3, 8, 9, 7],
			color: '#B78AF7',
		},
		{
			name: 'Turnover Rates',
			data: [4, 3, 10, 12, 15, 20],
			color: '#8133F1',
		},
		{
			name: 'Inventory Demand',
			data: [8, 7, 8, 4, 5, 15],
			color: '#8133F1',
		},
	];

	return (
		<div className="shadow-md  rounded-xl p-4 bg-white">
			<div className="flex justify-between items-baseline mb-5">
				<div className="">
					<div className="flex items-center mb-3">
						<h2 className="text-[#434343] text-base font-normal mr-2">
							Inventory Level Chart
						</h2>
						<Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
					</div>
					<p className="text-[#939292] text-sm">
						A line chart showing inventory level by warehouse location
					</p>
				</div>

				<div className="bg-[#fff] flex flex-wrap  text-[13px] items-center text-[#374B58] gap-[7px]">
					<div className="flex">
						<div>
							<span className="bg-[#B78AF7] mr-2 inline-block rounded-3xl p-[3px]"></span>
						</div>
						<p>Location 1</p>
					</div>
					<div className="flex">
						<div>
							<span className="bg-[#9654F4] mr-2 inline-block rounded-3xl p-[3px]"></span>
						</div>
						<p>Location 2</p>
					</div>
					<div className="flex">
						<div>
							<span className="bg-[#8133F1] mr-2 inline-block rounded-3xl p-[3px]"></span>
						</div>
						<p>Location 3</p>
					</div>
				</div>
			</div>
			<LineChart
				categories={categories}
				seriesData={seriesData}
				yAxisMin={0}
				yAxisTickAmount={4}
				showGridLines={true}
				showLegend={false}
			/>
		</div>
	);
};

export default LocationLineChart;
