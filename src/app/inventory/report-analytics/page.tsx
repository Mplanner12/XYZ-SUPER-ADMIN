"use client"

import PurchaseOrder from '@/components/inventory/orderManagement/PurchaseOrderManagement';
import ReceivingInventory from '@/components/inventory/orderManagement/ReceivingInventory';
import SalesFulfillment from '@/components/inventory/orderManagement/SalesFulfillment';
import SalesOrder from '@/components/inventory/orderManagement/SalesOrder';
import InventoryMovementReport from '@/components/inventory/reportAnalytics/InventoryMovementReport';
import InventoryReport from '@/components/inventory/reportAnalytics/InventorySummaryReport';
import InventoryTurnoverReport from '@/components/inventory/reportAnalytics/InventoryTurnoverReport';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React, { useState } from 'react';

const OrderManagement = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const tabs = [
		'Select Report type',
		'Inventory Summary Report',
		'Inventory Movement Report',
		'Inventory Turnover Report',
		'Stock Movement Report',
		'Demand Forecasting Report',
		'Sales by Category',
		'Barcode Generation Log',
		'Product Performance Anaysis',
	];

	const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

	const handleTabChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setActiveTab(Number(event.target.value));
	};

	return (
		<div>
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Report & Analytics"
				pageLink="/inventory/report-analytics"
				breadcrumbs={breadcrumbs}
			/>

			<div className="px-4">
				<div className="bg-secondary px-4 py-4 rounded-2xl">
					<div className="pt-4">
						<h2 className="text-xl px-1 font-normal">Report & Analytics</h2>
						<div className=" px-2">
							<div className="py-2">
								<select
									value={activeTab}
									onChange={handleTabChange}
									className="text-foundation-purple-purple-300 outline-none text-base w-fit"
								>
									{tabs.map((tab, index) => (
										<option key={index} value={index} className="border-none">
											{tab}
										</option>
									))}
								</select>
							</div>

							{activeTab === 0 && (
								<div className="py-4">
									<button
										// onClick={openModal}
										className={` rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer sm:w-[40%] w-full`}
									>
										Proceed
									</button>
								</div>
							)}
							{activeTab === 1 && <InventoryReport />}
							{activeTab === 2 && <InventoryMovementReport />}
							{activeTab === 3 && <InventoryTurnoverReport />}
							{/* {activeTab === 3 && <SalesFulfillment />} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderManagement;
