'use client';
import OverViewFilter from '@/components/finance/OverviewFilter';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaAngleRight } from 'react-icons/fa6';

interface ProductData {
	id: number;
	from: string;
	to: string;
	status: string;
	date: string;
	qty: string;
}

const columnHelper = createColumnHelper<ProductData>();

const columns = [
	columnHelper.accessor('from', {
		header: 'From',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('to', {
		header: 'To',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('status', {
		header: 'Status',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('date', {
		header: 'Date',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('qty', {
		header: 'Qty',
		cell: (info) => info.getValue(),
	}),
];

const InventoryTransferTable: React.FC = () => {
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
			from: 'Main Warehouse',
			to: `Mushin Warehouse`,
			status: 'pending',
			date: '06-23-2022',
			qty: '150',
		},
		{
			id: 3,
			from: 'Main Warehouse',
			to: `Mushin Warehouse`,
			status: 'completed',
			date: '06-23-2022',
			qty: '2000',
		},
		{
			id: 3,
			from: 'Main Warehouse',
			to: `Mushin Warehouse`,
			status: 'in-progress',
			date: '06-23-2022',
			qty: '250',
		},
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});


	return (
		<div className="bg-white rounded-[20px] shadow-custom py-4 w-full">
			<div className=" w-full py-4 px-4 flex flex-col gap-4">
				<div className="flex justify-between items-center">
					<h2 className="text-base font-normal text-foundation-black-black-400">Recent Inventory Transfer</h2>
					<Link
						href="#"
						className="text-foundation-purple-purple-400 text-base flex gap-3 items-center"
					>
						See all <FaAngleRight />
					</Link>
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
			</div>
		</div>
	);
};

export default InventoryTransferTable;
