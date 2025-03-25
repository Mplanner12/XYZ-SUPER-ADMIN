"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { EllipsisVertical, Plus } from 'lucide-react'

interface TableRow {
	id: string;
	bankStatementDate: string;
	bankDescription: string;
	bankAmount: number;
	accountingDate: string;
  accountDescription: string;
  accountingAmount: string;
  status: string;
}

const columnHelper = createColumnHelper<TableRow>();

const columns = [
	columnHelper.accessor('id',{
    header: 'Reconciliation ID',
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('bankStatementDate', {
		header: 'Bank Statement Date',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('bankDescription', {
		header: 'Bank Description',
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('bankAmount', {
		header: 'Bank Amount (CR) (USD)',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('accountingDate', {
		header: 'Accounting Date',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('accountDescription', {
		header: 'Accounting Description',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('accountingAmount', {
		header: 'Accounting Amount (CR) (USD)',
		cell: ({getValue}) => getValue(),
	}),
  columnHelper.accessor('status', {
		header: 'Status',
		cell: ({getValue}) => getValue(),
	}),
];


const MatchingTable = () => {
	const [data, setData] = useState<TableRow[]>([
		{
      id: 'RA0001',
      bankStatementDate: '01-05-2023',
      bankDescription: 'Customer Payment A',
      bankAmount: 1000,
      accountingDate: '01-05-2023',
      accountDescription: 'hfhfhf',
      accountingAmount: '1,500',
      status: 'Reconciled',
    },
    {
      id: 'RA0002',
      bankStatementDate: '01-05-2023',
      bankDescription: 'Customer Payment A',
      bankAmount: 1000,
      accountingDate: '01-05-2023',
      accountDescription: 'hfhfhf',
      accountingAmount: '1,500',
      status: 'Reconciled',
    },
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className=" w-full">
			<div className="overflow-x-scroll no-scrollbar border border-[#EAECF0] rounded-xl">
				<table
					style={{ borderSpacing: 0 }}
					className="w-full text-wrap bg-white text-center text-sm"
				>
					<thead className="bg-foundation-grey-grey-300/25 border-b border-[#EAECF0] text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-6 px-4 font-medium text-nowrap"
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
					<tbody className='divide-y divide-[#EAECF0]  bg-white '>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="py-6 px-4 whitespace-break-spaces text-[#939292]"
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

export default MatchingTable;
