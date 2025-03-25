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
import { FaCheckCircle } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { LuCable } from 'react-icons/lu';
import { dashboardLogo } from '../../../../public';
import ModalComponent from '../ModalComponent';
import TableDropDown from '../TableDropDown/TableDropDown';

interface ReturnGoodsData {
	id: number;
	productName: string;
	category: string;
	inventoryQuantity: string;
	reorderQuantity: string;
	stockThreshold: string;
	stockValue: string;
	restockDate: string;
	action?: string;
	icon?: string | StaticImageData;
}

const columnHelper = createColumnHelper<ReturnGoodsData>();

// action button component
const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];

interface ReturnGoodsProps {
	handleTabChange: (tab: string) => void;
}

const ReturnGoods: React.FC<ReturnGoodsProps> = ({
	handleTabChange,
}) => {
	const [menu, setMenu] = useState('');
	const [selectedTab, setSelectedTab] = useState('returned-goods');

	// useState for modal component
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const handleReturnGoods = () => {
		// handle payment logic
		console.log('proceeding with payment');
	};

	// table data
	const [data, setData] = useState<ReturnGoodsData[]>([
		{
			id: 1,
			productName: 'Invoicing',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			reorderQuantity: '15',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '.',
			icon: dashboardLogo,
		},
		{
			id: 2,
			productName: 'Receive Payment',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			reorderQuantity: '150',
			stockValue: '10000',
			restockDate: '06-23-2022',
			action: '.',
			icon: dashboardLogo,
		},
		{
			id: 3,
			productName: 'Sale Reconcilation',

			category: `Consumables`,
			inventoryQuantity: '100',
			stockThreshold: '150',
			reorderQuantity: '150',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '.',
			icon: dashboardLogo,
		},
	]);

	// handle location change
	const handleCategoryChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		id: number
	) => {
		const newLocation = e.target.value;
		const updatedData = data.map((item) => {
			if (item.id === id) {
				return { ...item, location: newLocation };
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
				<div className="flex items-center">
					<TableDropDown options={generateTscTableOptions} />
					{info.getValue()}
				</div>
			),
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const amount = 1000;

	return (
		<>
			<section className="pb-4">
				<h2
					className="text-xl font-normal items-center py-4 cursor-pointer flex gap-3"
					onClick={() => handleTabChange('returned-goods')}
				>
					<FaChevronLeft color="#8133F1" size={14} /> Returned Goods
				</h2>

				<main>
					<div className="flex flex-col gap-2 items-start sm:pb-6 pb-4">
						<h2 className="text-sm font-normal">Select a Supplier name</h2>

						{/* search input */}
						<div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
							<div className="relative w-full">
								<select className="block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 px-2 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none">
									<option value="">Select Supplier</option>
									<option value="Consumables">MArtha</option>
									<option value="Non-Consumables">Steve</option>
								</select>
							</div>
						</div>

						<h2 className="text-sm font-normal">Product and return details</h2>
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

					{/* modal component */}
					<ModalComponent isOpen={isModalOpen} onClose={closeModal}>
						<div className="flex flex-col justify-center items-center gap-y-6 py-10">
							<FaCheckCircle color="#00A814" size={60} />
							<p className="text-base text-center">
								New Product has been added <br /> successfully
							</p>
							<button
								type="button"
								className="rounded-xl sm:w-[50%] w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
								onClick={handleReturnGoods}
							>
								Proceed to Payment
							</button>
						</div>
					</ModalComponent>
				</main>

                <div className='py-4 sm:mt-9 mt-4'>
                    <button
                        onClick={openModal}
                        className={` rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer sm:w-[40%] w-full`}
                    >
                        Submit
                    </button>
                </div>
			</section>
		</>
	);
};

export default ReturnGoods;
