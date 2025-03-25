'use client';
import OverViewFilter from '@/components/finance/OverviewFilter';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsInfoCircle, BsSortUp } from 'react-icons/bs';
import { FaAngleDown } from "react-icons/fa6";
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { LuCable } from 'react-icons/lu';
import { PiResizeFill } from 'react-icons/pi';
import { dashboardLogo } from '../../../../../public';

const categories = [
	{ value: 'consumables', label: 'Consumables' },
	{ value: 'non-consumables', label: 'non-Consumables' },
];
interface ProductData {
	id: number;
	productName: string;
	description: string;
	category: string;
    uoM: string;
    quantity: string;
    price: string;
    discount: string;
	action?: string;
    icon?: string | StaticImageData;
}

const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];



const ProductTable: React.FC = () => {
	// for filter
	const [openFilter, setOpenFilter] = useState<string | null>(null);

	const handleToggle = (filterName: string) => {
		setOpenFilter(openFilter === filterName ? null : filterName);
	};

	const handleStoreSelect = (selectedOption: string) => {
		console.log('Selected Store:', selectedOption);
	};

	const [data, setData] = useState<ProductData[]>([
		{
			id: 1,
			productName: 'Invoicing',
			description: 'A super pack of instant noddles',
			category: `Consumables`,
			uoM: 'KG',
			quantity: '150',
			price: '150',
			discount: '10',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			productName: 'Receive Payment',
			description: 'A super pack of instant noddles',
			category: `Consumables`,
			uoM: 'KG',
			quantity: '150',
			price: '150',
			discount: '10',
			action: '',
			icon: dashboardLogo,
		},
		{
			id: 3,
			productName: 'Sale Reconcilation',
			description: 'A super pack of instant noddles',
			category: `Consumables`,
			uoM: 'KG',
			quantity: '150',
			price: '150',
			discount: '10',
			action: '',
			icon: dashboardLogo,
		},
	]);

	// handle select change
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

	const columnHelper = createColumnHelper<ProductData>();

	const columns = [
		columnHelper.accessor('productName', {
			header: 'Product Name',
			cell: (info) => (
				<div className="flex items-center">
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
		columnHelper.accessor('description', {
			header: 'Description',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('category', {
			header: 'category',
			cell: (info) => {
				const category = info.getValue();
				return (
					<select
						value={category}
						onChange={(e) => handleCategoryChange(e, info.row.original.id)}
            className='w-fit'
					>
						{categories.map((loc) => (
							<option key={loc.value} value={loc.value}>
								{loc.label}
							</option>
						))}
					</select>
				);
			},
		}),
		columnHelper.accessor('uoM', {
			header: () => (
      <div className="flex gap-2">
      <span>UoM</span>
        <BsInfoCircle className="text-foundation-grey-grey-800 mb-1" /> 
    </div>
  ),
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('quantity', {
			header: 'Quantity',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('price', {
			header: 'Price(USD)',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('discount', {
			header: 'Discount(%)',
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

			<div className="flex justify-between items-center">
				<h2 className="font-xl font-normal">Product({amount})</h2>

				{/* search input */}
				<div className="relative w-[50%] lg:w-[40%] mb-4 md:mb-0">
					<div className="relative w-full">
						<input
							type="text"
							name="search"
							placeholder="Search for a product"
							size={70}
							className={
								'block w-full rounded-[6px] border-0 h-[3rem] py-1 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none'
							}
						/>
						<span>
							<FiSearch className="text-[18px] absolute left-2 top-[.9rem] text-[#66686B]" />
						</span>
					</div>
				</div>

				<Link
					href="product-management/add-product"
					className="text-foundation-purple-purple-400 text-base"
				>
					+ Add a product
				</Link>
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
							Showing all Columns <FaAngleDown color="#8133F1" size={24} />
						</p>
						<p className="flex align-middle gap-2">
							Minimize Table <PiResizeFill color="#8133F1" size={24} />
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
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductTable;
