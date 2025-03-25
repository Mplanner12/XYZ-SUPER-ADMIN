"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { ChevronDownIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';


const InventoryLineChart = dynamic(() => import('@/components/inventory/overview/LineChart'), {
  loading: () => <p className='text-center'>Loading...</p>,
  ssr: false
});

const WarehouseLocationTable = dynamic(() => import('../location-management/components/WarehouseTable'), {
  ssr: false
});

const LocationManagement = () => {

	const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

  return (
		<div className="">
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Location Management"
				pageLink="/inventory/location-management"
				breadcrumbs={breadcrumbs}
			/>

			<main className="px-6 mt-4">
				{/* line chart */}
				<section className="bg-secondary rounded-2xl">
					<div className="flex flex-wrap md:px-4 px-2 py-4">
						<div className="bg-white shadow-custom mb-5 md:mb-0 w-full rounded-2xl py-6">
							<div className="flex justify-between gap-x-4 px-4 mb-4">
								<div>
									<div className=" items-end self-start text-base text-neutral-700">
										<p>Inventory Level Chart</p>
									</div>
									<p className="mt-2 text-xs text-[#939292]">
										A chart showing inventory level by warehouse location
									</p>
								</div>
								<div className="flex flex-wrap gap-x-4">
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-error w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Location 1</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#00A814] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Location 2</span>
									</div>
									<div className="flex items-center gap-x-2 h-fit">
										<span className="block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] " />
										<span className="text-[12px]">Location 3</span>
									</div>
								</div>
							</div>
							<div className="border border-solid border-[#F0f0f0]" />
							<div className="flex justify-end gap-x-3 text-foundation-purple-purple-300 pt-2 mr-4 font-medium">
								<button className="flex gap-2 items-center">
									Warehouse 1 <ChevronDownIcon size="16px" />
								</button>
								<button className="flex gap-2 items-center">
									This Week <ChevronDownIcon size="16px" />
								</button>
							</div>
							<div>
								<InventoryLineChart />
							</div>
						</div>
					</div>

					<div className="w-full flex justify-center items-center md:px-8 px-2 py-5 mb-5">
						<WarehouseLocationTable />
					</div>
				</section>
			</main>
		</div>
	);
}

export default LocationManagement