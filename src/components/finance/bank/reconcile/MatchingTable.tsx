"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { EllipsisVertical, Plus, Router } from 'lucide-react'
import { useRouter } from 'next/navigation';

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
// Helper function to determine cell background color
const getCellBackground = (columnId: string) => {
  const bankColumns = ['bankStatementDate', 'bankDescription', 'bankAmount'];
  const accountingColumns = ['accountingDate', 'accountDescription', 'accountingAmount'];
  
  if (bankColumns.includes(columnId)) {
      return 'bg-blue-50'; // Light blue for bank-related columns
  } else if (accountingColumns.includes(columnId)) {
      return 'bg-green-50'; // Light green for accounting-related columns
  }
  return ''; // Default background for other columns
};

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
		header: 'Bank Amount (CR)',
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
		header: 'Accounting Amount (CR)',
		cell: ({getValue}) => getValue(),
	}),
  columnHelper.accessor('status', {
		header: 'Status',
		cell: ({getValue}) => getValue(),
	}),
  columnHelper.accessor('id', {
    id: 'selection',
		header: 'Action',
		cell: ({getValue}) => <ActionMenu id={getValue()} />,
	}),
];

const ActionMenu: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter()
	return (
		<Menu as="div" className="relative text-center">
			<Menu.Button className=" border-none bg-white cursor-pointer">
				<EllipsisVertical />
			</Menu.Button>
			<Menu.Items className="absolute -right-3 origin-top-right z-10 bg-white border border-[#DFDEDE] rounded-md shadow-lg focus:outline-none">
				<div className="px-1 py-1 flex flex-col gap-2 text-center align-middle items-center justify-center w-[180px] divide-y divide-[#DFDEDE] ">
					<Menu.Item>
						{({ active }) => (
							<button
								className={`${
									active
										? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
										: 'text-foundation-grey-grey-800'
								} group flex rounded-md justify-center px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
								onClick={() => router.push('/finance/banking-management/make-payment')}
							>
								Make Payment
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
								onClick={() => router.push('/finance/banking-management/receive-payments')}
							>
								Receive Payment
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
								onClick={() => router.push('/finance/banking-management/make-deposit')}
							>
								Make Deposit
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
								onClick={() => router.push('/finance/receivables/generate-invoice')}
							>
								Create Invoice
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
								onClick={() => router.push('/finance/payables?menu=1')}
							>
								Generate Bill
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
								onClick={() => console.log(`Edit row ${id}`)}
							>
								Reverse Transaction
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
								onClick={() => console.log(`Edit row ${id}`)}
							>
								Credit Note
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
								onClick={() => console.log(`Edit row ${id}`)}
							>
								Debit Note
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
								onClick={() => console.log(`Edit row ${id}`)}
							>
								Ignore Action
							</button>
						)}
					</Menu.Item>
				</div>
			</Menu.Items>
		</Menu>
	);
};

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
    {
      id: 'RA0003',
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
					className={`w-full text-wrap bg-white text-center text-sm`}
				>
					<thead className="bg-foundation-grey-grey-300/25 border-b border-[#EAECF0] text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className={`py-6 px-4 font-medium ${getCellBackground(header.column.id)}`}
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
										className={`py-6 px-4 whitespace-break-spaces text-[#939292] ${getCellBackground(cell.column.id)}`}
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
