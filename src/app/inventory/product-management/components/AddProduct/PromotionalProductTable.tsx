'use client';
import OverViewFilter from '@/components/finance/OverviewFilter';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { IoFilterSharp } from 'react-icons/io5';
import { LuCable } from 'react-icons/lu';
import { dashboardLogo } from '../../../../../../public';

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
		header: 'Category',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('uoM', {
		header: 'UoM',
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
		cell: (info) => info.getValue(),
	}),
];

const PromotionalProductTable: React.FC = () => {

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
			action: '.',
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
			action: '.',
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
			action: '.',
			icon: dashboardLogo,
		},
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const amount = 1000;

	return (
		<div className=" w-full mt-5 flex flex-col gap-4">
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

export default PromotionalProductTable;
