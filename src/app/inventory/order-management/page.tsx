"use client"

import PurchaseOrder from '@/components/inventory/orderManagement/PurchaseOrderManagement';
import ReceivingInventory from '@/components/inventory/orderManagement/ReceivingInventory';
import SalesFulfillment from '@/components/inventory/orderManagement/SalesFulfillment';
import SalesOrder from '@/components/inventory/orderManagement/SalesOrder';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import React, { useState } from 'react';

const OrderManagement = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const tabs = [
		'Purchase Orders Mangement',
		'Sales Order Management',
		'Receiving Inventory',
		'Sales Order Fulfillment',
	];

    const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

	return (
		<div>
			<HeaderLayout
				moduleName="Inventory Module"
				moduleLink="/inventory/overview"
				page="Order Management"
				pageLink="/inventory/order-management"
				breadcrumbs={breadcrumbs}
			/>

			<div className="sm:px-7 px-2 pt-4">
				<div className="bg-secondary px-5 py-4 rounded-2xl text-[#434343]">
					<div className="overflow-x-auto no-scrollbar">
						<div className="bg-[#8133F1] p-2 py-4 flex justify-between min-w-[100%] rounded-xl">
							{tabs.map((tab, index) => (
								<p
									key={index}
									onClick={() => setActiveTab(index)}
									className={`pl-3 pr-3 py-2 rounded-lg transition-colors duration-300 cursor-pointer ${
										activeTab === index
											? 'bg-white text-[#8133F1]'
											: 'text-white'
									}`}
								>
									{tab}
								</p>
							))}
						</div>
					</div>

					{activeTab === 0 && <PurchaseOrder />}
					{activeTab === 1 && <SalesOrder />}
					{activeTab === 2 && <ReceivingInventory />}
					{activeTab === 3 && <SalesFulfillment />}
				</div>
			</div>
		</div>
	);
};

export default OrderManagement