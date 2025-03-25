'use client';
import OverViewFilter from '@/components/finance/OverviewFilter';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, Minimize } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { LuCable } from 'react-icons/lu';
import { dashboardLogo } from '../../../../public';
import TableDropDown from '../TableDropDown/TableDropDown';
import ReplenishProductTable from './ReplenishProductTable';

interface InventoryData {
	id: number;
	productName: string;
	category: string;
	inventoryQuantity: string;
	reorderQuantity: string;
	stockThreshold: string;
	status: string;
	stockValue: string;
	restockDate: string;
	action?: string;
	icon?: string | StaticImageData;
}

const columnHelper = createColumnHelper<InventoryData>();

const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];


const InventoryTable: React.FC = () => {
	// for filter
	const [openFilter, setOpenFilter] = useState<string | null>(null);

	const handleToggle = (filterName: string) => {
		setOpenFilter(openFilter === filterName ? null : filterName);
	};

	const handleStoreSelect = (selectedOption: string) => {
		console.log('Selected Store:', selectedOption);
	};

	const [data, setData] = useState<InventoryData[]>([
		{
			id: 1,
			productName: 'Invoicing',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			status: 'Low Stock',
			reorderQuantity: '15',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			productName: 'Receive Payment',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			status: 'Stock Out',
			reorderQuantity: '150',
			stockValue: '10000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			productName: 'Sale Reconcilation',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			status: 'Full Stock',
			reorderQuantity: '150',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
	]);

    // handle category change
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>, id: number) => {
        const newCategory = e.target.value;
        const updatedData = data.map((item) => {
            if (item.id === id) {
                return { ...item, category: newCategory };
            }
            return item;
        });
        setData(updatedData);
    };

    // Table header and body data
    const columns = [
        columnHelper.accessor('productName', {
            header: 'Product Name',
            cell: (info) => (
                <div className="flex items-start text-start">
                    {info.row.original.icon && (
                        <Image
                            alt=""
                            src={info.row.original.icon}
                            width={40}
                            height={40}
                            className="mr-2"
                        />
                    )}
                    {info.getValue()}
                </div>
            ),
        }),
        columnHelper.accessor('category', {
            header: 'Category',
            cell: (info) => {
            const category = info.getValue();
            return (
                <select
                    value={category}
                    onChange={(e) => handleCategoryChange(e, info.row.original.id)}
                >
                    <option value="">Select Category</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Non-Consumables">Non-Consumables</option>
                </select>
            );
            },
        }),
        columnHelper.accessor('inventoryQuantity', {
            header: 'Inventory Quantity',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('stockThreshold', {
            header: 'Stock Threshold(USD)',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            cell: (info) => {
                const status = info.getValue();
                let bgColor = '';
                if (status === 'Low Stock') {
                    bgColor = 'red';
                } else if (status === 'Full Stock') {
                    bgColor = 'green';
                } else if (status === 'Stock Out') {
                    bgColor = 'gray';
                }
                return (
                    <div
                        style={{
                            backgroundColor: bgColor,
                            padding: '4px 8px',
                            borderRadius: '6px',
                            fontSize: '14px',
                            color: 'white',
                        }}
                        className=" text-nowrap"
                    >
                        {status}
                    </div>
                );
            },
        }),
        columnHelper.accessor('reorderQuantity', {
            header: 'Reorder Quantity',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('stockValue', {
            header: 'Stock Value(USD)',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('restockDate', {
            header: 'Last Restocked Date',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('action', {
            header: 'Action',
            cell: (info) => (
                <div className="flex justify-center">
                    <TableDropDown options={generateTscTableOptions} />
                    {info.getValue()}
                </div>
            ),
        }),
    ];

    const [selectedTab, setSelectedTab] = useState('inventory-product');

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const amount = 1000;

	return (
		<>
			<div className=" w-full mt-5 flex flex-col gap-4">
				<div className="text-foundation-black-black-400 text-2xl">
					<OverViewFilter
						label="Filter By Store"
						options={['Mushin', 'Lekki', 'Tar']}
						onSelect={handleStoreSelect}
						isOpen={openFilter === 'location'}
						onToggle={() => handleToggle('location')}
					/>
				</div>

				{selectedTab === 'inventory-product' && (
					<main>
						<div className="flex justify-between items-center sm:pb-6 pb-4">
							<h2 className="text-xl font-normal">Product({amount})</h2>

                            {/* search input */}
							<div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
								<div className="relative w-full">
									<input
										type="text"
										name="search"
										placeholder="Search for a product"
										size={70}
										className={
											'block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none'
										}
									/>
									<span>
										<FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
									</span>
								</div>
							</div>
							<p
								className="text-foundation-purple-purple-400 text-sm cursor-pointer flex gap-1 items-center"
								onClick={() => handleTabChange('replenish-product')}
							>
								<Image
									src="/replenish.svg"
									alt=""
									width={20}
									height={20}
									className="w-4 h-4 object-contain"
								/>
								Replenish a Product
							</p>
						</div>

						<div className="flex justify-between">
							<div className="flex justify-between text-sm text-foundation-purple-purple-400">
								<div className="flex gap-4">
									<p className="flex align-middle gap-2">
										Filter <IoFilterSharp color="#8133F1" size={24} />
									</p>
									<p className="flex align-middle gap-2">
										Sort <BsSortUp color="#8133F1" size={24} />
									</p>
								</div>
							</div>
							<div className="flex justify-between text-sm text-foundation-purple-purple-400">
								<div className="flex gap-4">
									<p className="flex align-middle gap-2">
										Showing all Columns{' '}
										<ChevronDown color="#8133F1" size={24} />
									</p>
									<p className="flex align-middle gap-2">
										Minimize Table <Minimize color="#8133F1" size={24} />
									</p>
								</div>
							</div>
						</div>
						<div className="scroll overflow-x-auto border-none">
							<table className="w-full text-wrap bg-white text-center text-sm">
								<thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm ">
									{table.getHeaderGroups().map((headerGroup) => (
										<tr key={headerGroup.id}>
											{headerGroup.headers.map((header) => (
												<th
													key={header.id}
													className="py-4 px-4 font-medium border-b border-foundation-grey-grey-200 "
												>
													{header.isPlaceholder
														? null
														: flexRender(
																header.column.columnDef.header,
																header.getContext()
														  )}
												</th>
											))}
										</tr>
									))}
								</thead>
								<tbody>
									{table.getRowModel().rows.map((row) => (
										<tr
											key={row.id}
											className="border-b border-foundation-grey-grey-300"
										>
											{row.getVisibleCells().map((cell) => (
												<td
													key={cell.id}
													className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700"
												>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
												</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</main>
				)}
				<div>
					{selectedTab === 'replenish-product' && (
						<ReplenishProductTable handleTabChange={handleTabChange} />
					)}
				</div>
			</div>
		</>
	);
};

export default InventoryTable;
