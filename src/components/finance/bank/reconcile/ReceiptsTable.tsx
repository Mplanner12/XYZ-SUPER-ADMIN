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
	customerName: string;
	des: string;
	amount: string;
  referenceId: string;
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
	columnHelper.accessor('customerName', {
		header: 'Name',
		cell: ({getValue}) => getValue(),
	}),
	columnHelper.accessor('des', {
		header: 'Description',
		cell: (info) => info.getValue(),
    footer:  'Total',
	}),
  columnHelper.accessor('amount', {
    id: 'amount',
		header: 'Amount (CR)',
		cell: (info) => info.getValue(),
    footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
      acc+= Number(val.getValue('amount'))
      return acc
    },0)
	}),
  columnHelper.accessor('referenceId', {
		header: 'reference ID',
		cell: (info) => info.getValue(),
	}),
];

const ReceiptsTable = () => {
	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      date: '01-05-2023',
      customerName: 'A Inc Limited',
      des: 'hfhdhv',
      amount: '234',
      referenceId: 'hfhgh',
    },
    {
      id: 2,
      date: '01-05-2023',
      customerName: 'B enterprises',
      des: 'hfhdhv',
      amount: '234',
      referenceId: 'hfhgh',
    },
    {
      id: 3,
      date: '01-05-2023',
      customerName: 'B enterprises',
      des: 'hfhdhv',
      amount: '234',
      referenceId: 'hfhgh',
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

export default ReceiptsTable;
