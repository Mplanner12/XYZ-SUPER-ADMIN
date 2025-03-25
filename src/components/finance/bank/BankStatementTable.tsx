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
import { useRouter } from 'next/navigation';

interface TableRow {
	id: number;
  transactionDate: string;
  referenceId: string;
  name: string;
	description: string;
	amountDr: number;
  amountCr: number;
  balance: number;
}

const columnHelper = createColumnHelper<TableRow>();

const columns = [
	columnHelper.accessor('transactionDate',{
    header: "Transaction Date",
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('referenceId', {
		header: 'Reference ID',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('name', {
		header: 'Name',
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('description', {
		header: 'Description',
		cell: ({getValue}) => getValue(),
    footer: 'Total'
	}),
	columnHelper.accessor('amountDr', {
		header: 'Amount (DR)(USD)',
		cell: (info) => info.getValue(),
    footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
      acc+= Number(val.getValue('amountDr'))
      return acc
    },0)
	}),
  columnHelper.accessor('amountCr', {
		header: 'Amount (CR)(USD)',
		cell: (info) => info.getValue(),
    footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
      acc+= Number(val.getValue('amountCr'))
      return acc
    },0)
	}),
  columnHelper.accessor('balance', {
		header: 'Balance (USD)',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('id', {
    id: 'selection',
		header: 'Action',
		cell: ({getValue}) => <ActionMenu id={getValue()} />,
	}),
];

const ActionMenu: React.FC<{ id: number }> = ({ id }) => {
  const router = useRouter()
	return (
		<Menu as="div" className="relative text-center">
			<Menu.Button className=" border-none bg-white cursor-pointer">
				<EllipsisVertical />
			</Menu.Button>
			<Menu.Items className="absolute -right-3 origin-top-right z-10 bg-white border border-[#DFDEDE] rounded-md shadow-lg focus:outline-none">
				<div className="px-1 py-1 flex flex-col gap-2 text-center align-middle items-center justify-center w-[120px] divide-y divide-[#DFDEDE] ">
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
								View Details
							</button>
						)}
					</Menu.Item>
				</div>
			</Menu.Items>
		</Menu>
	);
};

const BankStatementTable = () => {
	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      transactionDate: '01-05-2023',
      referenceId: 'PAYA001',
      name: 'A inc Limited',
      description: 'Opening Balance',
      amountDr: 2000,
      amountCr: 1000,
      balance: 321000,
    },
    {
      id: 2,
      transactionDate: 'Bank',
      referenceId: 'PAYA002',
      name: 'A inc Limited',
      description: 'Opening Balance',
      amountDr: 2000,
      amountCr: 1000,
      balance: 321000,
    },
    {
      id: 3,
      transactionDate: 'Bank',
      referenceId: 'PAYA002',
      name: 'A inc Limited',
      description: 'Opening Balance',
      amountDr: 234,
      amountCr: 1000,
      balance: 321000,
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
										className="py-6 px-4 font-medium"
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
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => {
              return (
                <tr key={footerGroup.id} className='border-t border-[#EAECF0] '>
                  {footerGroup.headers.map((footer) => {
                    return (
                      <td key={footer.id} className='py-6 px-4'>
                        {footer.isPlaceholder
                          ? null
                          : flexRender(
                              footer.column.columnDef.footer,
                              footer.getContext()
                            )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tfoot>
				</table>
			</div>
		</div>
	);
};

export default BankStatementTable;
