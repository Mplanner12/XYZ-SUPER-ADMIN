"use client"

import InventoryTable from '@/components/inventory/inventoryManagement/InventoryTable';
import ReturnedGoods from '@/components/inventory/inventoryManagement/ReturnedGoods';
import StockCountsTable from '@/components/inventory/inventoryManagement/StockCount';
import TransactionManagement from '@/components/inventory/inventoryManagement/TransactionManagement';
import TransferManagement from '@/components/inventory/inventoryManagement/TransferManagement';
import React, { useState } from 'react';

const InventoryManagement = () => {

    const [activeTab, setActiveTab] = useState<number>(0);

    const tabs = [
        'Inventory',
        'Stock Count & Adjustment Inventory',
        'Returned Goods',
        'Transfer Management',
        'Transaction Management',
    ]

   return (
			<div>
				<div className=" pt-4">
					<div className="bg-secondary py-4 rounded-2xl text-[#434343]">
						<div className="overflow-x-auto no-scrollbar">
							<div className="bg-[#8133F1] p-2 py-4 flex justify-between min-w-[100%] rounded-xl">
								{tabs.map((tab, index) => (
									<p
										key={index}
										onClick={() => setActiveTab(index)}
										className={`pl-3 pr-3 py-2 rounded-md transition-colors duration-300 cursor-pointer ${
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

						{activeTab === 0 && <InventoryTable />}
						{activeTab === 1 && <StockCountsTable />}
						{activeTab === 2 && <ReturnedGoods />}
						{activeTab === 3 && <TransferManagement />}
						{activeTab === 4 && <TransactionManagement />}
					</div>
				</div>
			</div>
		);
}

export default InventoryManagement