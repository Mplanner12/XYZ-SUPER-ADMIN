"use client"
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

interface InventoryData {
	id: number;
	orderId: string;
	productName: string;
	location: string;
	quantityAvailable: string;
	quantityOrder: string;
	status: string;
	stockValue: string;
	restockDate: string;
	action?: string;
	icon?: string | StaticImageData;
}

const columnHelper = createColumnHelper<InventoryData>();

// action button component
const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];

interface ReplenishProductProps {
	handleTabChange: (tab: string) => void;
}

const ReplenishProductTable: React.FC<ReplenishProductProps> = ({handleTabChange}) => {
	const [menu, setMenu] = useState('');
	const [selectedTab, setSelectedTab] = useState('inventory-product');

    // useState for modal component
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
    const handleReplenishOrder = () => {
        // handle payment logic
        console.log('proceeding with payment');
    };

	// table data
	const [data, setData] = useState<InventoryData[]>([
		{
			id: 1,
			orderId: '39297',
			productName: 'Invoicing',
			location: `Consumables`,
			quantityAvailable: '100',
			status: 'Pending',
			quantityOrder: '15',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			orderId: '39297',
			productName: 'Receive Payment',

			location: `Consumables`,
			quantityAvailable: '100',
			status: 'Pending',
			quantityOrder: '150',
			stockValue: '10000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			orderId: '39297',
			productName: 'Sale Reconcilation',

			location: `Consumables`,
			quantityAvailable: '100',
			status: 'Approved',
			quantityOrder: '150',
			stockValue: '25000',
			restockDate: '06-23-2022',
			action: '',
			icon: dashboardLogo,
		},
	]);

	// handle location change
	const handleLocationChange = (
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
		columnHelper.accessor('orderId', {
			header: 'Order ID',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('productName', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('location', {
			header: 'Location',
			cell: (info) => {
				const location = info.getValue();
				return (
					<select
						value={location}
						onChange={(e) => handleLocationChange(e, info.row.original.id)}
					>
						<option value="">Select location</option>
						<option value="Consumables">Mushin Warehouse</option>
						<option value="Non-Consumables">Ajao</option>
					</select>
				);
			},
		}),
		columnHelper.accessor('status', {
			header: 'Status',
			cell: (info) => {
				const status = info.getValue();
				let bgColor = '';
				if (status === 'Pending') {
					bgColor = 'blue';
				} else if (status === 'Approved') {
					bgColor = 'green';
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
		columnHelper.accessor('quantityAvailable', {
			header: 'Quantity Available',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('quantityOrder', {
			header: 'Quantity to Order',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('stockValue', {
			header: 'Replenishment Order',
			cell: (info) => {
				const location = info.getValue();
				return (
					<select
						value={location}
						onChange={(e) => handleLocationChange(e, info.row.original.id)}
					>
						<option value="purchase-order">Purchase Order</option>
						<option value="transfer-order">Transfer Order</option>
					</select>
				);
			},
		}),
		columnHelper.accessor('restockDate', {
			header: 'Restocked Date',
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
					onClick={() => handleTabChange('inventory-product')}
				>
					<FaChevronLeft color="#8133F1" size={14} /> Replenish A Product
				</h2>

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
							<div className="">
								<p className="flex item-center gap-2">
									Expand Table <Minimize color="#8133F1" size={24} />
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
								onClick={handleReplenishOrder}
							>
								Proceed to Payment
							</button>
						</div>
					</ModalComponent>
				</main>
			</section>
		</>
	);
}

export default ReplenishProductTable