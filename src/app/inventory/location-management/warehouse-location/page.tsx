"use client"
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { ChevronDownIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import React from 'react';


const WarehouseLocationFullTable = dynamic(
	() => import('../components/WarehouseFullTable'),
	{ ssr: false }
);


const WarehouseLocation = () => {

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

			<main className="px-4 mt-2">
				{/* line chart */}
				<section className="bg-secondary rounded-2xl">
					<div className="w-full flex justify-center items-center md:px-6 px-4 py-2">
						<WarehouseLocationFullTable />
					</div>
				</section>
			</main>
		</div>
	);
}

export default WarehouseLocation