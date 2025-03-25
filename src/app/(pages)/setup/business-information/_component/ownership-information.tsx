'use client';

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa6';

interface TableRow {
	id: number;
	shareholders: string;
	noOfShares: string;
	valueOfShares: string;
	outstandingAmount: string;
}

const columnHelper = createColumnHelper<TableRow>();

const columns = [
	columnHelper.accessor('shareholders', {
		header: 'Shareholder name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('noOfShares', {
		header: 'Number of Shares in fiscal years',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('valueOfShares', {
		header: 'Book Value of Original Shares',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('outstandingAmount', {
		header: 'Dividend Outstanding Amount',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('id', {
		header: 'Actions',
		cell: (info) => <ActionMenu id={info.getValue()} />,
	}),
];

const ActionMenu: React.FC<{ id: number }> = ({ id }) => {
	return (
		<Menu as="div" className="relative text-center">
			<Menu.Button className=" border-none bg-white cursor-pointer">
				<BsThreeDotsVertical />
			</Menu.Button>
			<Menu.Items className="absolute right-0 mt-2 origin-top-right z-[999] bg-foundation-grey-grey-700 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
				<div className="px-1 py-1 flex flex-col gap-2 text-center align-middle items-center justify-center w-full">
					<Menu.Item>
						{({ active }) => (
							<button
								className={`${
									active
										? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
										: 'text-foundation-grey-grey-800'
								} group flex rounded-md justify-center px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
								onClick={() => console.log(`Edit row ${id}`)}
							>
								Edit
							</button>
						)}
					</Menu.Item>
					<Menu.Item>
						{({ active }) => (
							<button
								className={`${
									active
										? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
										: 'text-foundation-grey-grey-800'
								} group flex rounded-md justify-center px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
								onClick={() => console.log(`Delete row ${id}`)}
							>
								Delete
							</button>
						)}
					</Menu.Item>
				</div>
			</Menu.Items>
		</Menu>
	);
};

const OwnershipInfo: React.FC = () => {
	const [data, setData] = useState<TableRow[]>([
		{
			id: 1,
			shareholders: 'Enter a Shareholder name',
			noOfShares: 'Enter no of shares',
			valueOfShares: 'Enter Book Values',
			outstandingAmount: 'Enter Dividend amount',
		},
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const addNewRow = () => {
		const newRow: TableRow = {
			id: data.length + 1,
			shareholders: '',
			noOfShares: '',
			valueOfShares: '',
			outstandingAmount: '',
		};
		setData([...data, newRow]);
	};

	return (
		<div className="max-w-full py-4">
			<div className="scroll overflow-x-auto border-2 border-solid border-foundation-grey-grey-300 rounded-xl">
				<table
					style={{ borderSpacing: 0 }}
					className="w-full bg-white text-center border border-gray-300 text-sm"
				>
					<thead className="bg-foundation-grey-grey-300/25 text-foundation-grey-grey-800 whitespace-nowrap text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-4 px-4 font-normal border-b border-foundation-grey-grey-900 "
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
								className="border-b border-solid border-gray-200"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="py-4 px-4 text-foundation-grey-grey-700"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
				<button
					onClick={addNewRow}
					className="mt-4 border-none bg-white align-middle items-center flex justify-end w-full text-base text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300 cursor-pointer gap-1 mb-3 px-6"
				>
					<FaPlus />
					Add Row
				</button>
			</div>
		</div>
	);
};

export default OwnershipInfo;
