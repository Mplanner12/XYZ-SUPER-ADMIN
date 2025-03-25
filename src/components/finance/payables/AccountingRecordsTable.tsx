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
	id: number;
	date: string;
	effectDate: string;
	des: string;
	amount: string;
  status: string;
}

const columnHelper = createColumnHelper<TableRow>();

const columns = [
	columnHelper.display({
    id: 'selection',
    header: "Select",
		cell: () => <input type='checkbox'/>,
	}),
	columnHelper.accessor('date', {
		header: 'Date',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('effectDate', {
		header: 'Customer Name',
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('des', {
		header: 'Description',
		cell: (info) => info.getValue(),
    footer:  'Total',
	}),
  columnHelper.accessor('amount', {
    id: 'amount',
		header: 'Amount (CR) (USD)',
		cell: (info) => info.getValue(),
    footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
      acc+= Number(val.getValue('amount'))
      return acc
    },0)
	}),
  columnHelper.accessor('status', {
		header: 'Status',
		cell: (info) => info.getValue(),
	}),
  columnHelper.accessor('id', {
    id: 'selection',
		header: 'Action',
		cell: ({getValue}) => <ActionMenu id={getValue()} />,
	}),
];

const ActionMenu: React.FC<{ id: number }> = ({ id }) => {
	return (
		<Menu as="div" className="relative text-center">
			<Menu.Button className=" border-none bg-white cursor-pointer">
				<EllipsisVertical />
			</Menu.Button>
			<Menu.Items className="absolute -right-3 origin-top-right z-10 bg-white border border-[#DFDEDE] rounded-md shadow-lg focus:outline-none">
				<div className="px-1 py-1 flex flex-col gap-2 text-center align-middle items-center justify-center w-[250px] divide-y divide-[#DFDEDE] ">
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
								Verify Corresponding  Bank Deposit
							</button>
						)}
					</Menu.Item>
				</div>
			</Menu.Items>
		</Menu>
	);
};

const AccountingRecordsTable = () => {
	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      date: '01-05-2023',
      effectDate: '01-05-2023',
      des: 'hfhdhv',
      amount: '234',
      status: 'hfhgh',
    },
    {
      id: 2,
      date: '01-05-2023',
      effectDate: '01-05-2023',
      des: 'hfhdhv',
      amount: '234',
      status: 'hfhgh',
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

export default AccountingRecordsTable;
