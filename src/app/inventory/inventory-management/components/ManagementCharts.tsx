import { cn } from '@/lib/utils';
import React from 'react';
// import InventoryLineChart from '../../overview/components/DashboardCharts/DashboardLineChart';
import download from '@/assets/icons/box-arrow-top-right.svg';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import InventoryHorizontalBarChart from './InventoryHorizontalChart';
import InventoryTransferTable from './InventoryTransferTable';
import NotificationCenter from './NotificationCenter';

const InventoryLineChart = dynamic(() => import('@/components/inventory/overview/LineChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const HorizontalBarChart = dynamic(() => import('@/components/inventory/overview/HorizontalBarChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const ManagementCharts = () => {
  return (
		<>
			<main className="py-4">
				<section className="bg-[#FCFCFC] rounded-md">
					{/* dashboard Charts */}

					<div className="flex justify-between flex-wrap gap-5 mb-4 items-baseline">
						<div className="bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6">
							<div className="flex justify-between gap-x-4 px-4 mb-4">
								<div>
									<div className="flex gap-2 items-end self-start text-base text-neutral-700">
										<p>Inventory Trends Chart</p>
										<Image
											loading="lazy"
											src={download}
											alt=""
											className="h-auto object-contain shrink-0 w-5 aspect-square"
										/>
									</div>
									<p className="mt-2 text-xs text-[#939292]">
										A line chart showing trends in Inventory.
									</p>
								</div>
								<div className="flex flex-wrap gap-x-4">
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-error w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Inventory Levels</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#00A814] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Turnover Rates</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Inventory Demand</span>
									</div>
								</div>
							</div>
							<div className="border border-solid border-[#F0f0f0]" />
							<div>
								<InventoryLineChart />
							</div>
						</div>

						<div className="bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[33%] rounded-2xl py-6 h-full">
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
										A bar chart showing inventory revenue by product category
									</p>
								</div>
								<div className="flex flex-wrap gap-x-4">
									<div className="flex items-center gap-x-2">
										<span className="block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Product category 1</span>
									</div>
									<div className="flex items-center gap-x-2">
										<span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Product category 2</span>
									</div>
								</div>
							</div>
							{/* border line */}
							<div className="border border-solid border-[#F0F0F0]" />
							<div className="">
								<HorizontalBarChart />
							</div>
						</div>
					</div>

					<div className="flex justify-between flex-wrap gap-1 items-start mb-4">
						<div className=" w-full md:w-[65%] ">
							<InventoryTransferTable />
						</div>
						<div className=" w-full md:w-[33%]">
							<NotificationCenter />
						</div>
					</div>
				</section>
			</main>
		</>
	);
}

export default ManagementCharts