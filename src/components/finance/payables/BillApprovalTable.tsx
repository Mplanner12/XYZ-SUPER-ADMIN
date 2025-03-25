"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, EllipsisVertical, ListFilterIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';

interface TableRow {
	id: number;
  billNo: string;
  vendor: string;
  billDate: string;
  dueDate: string;
  amount: number;
  description: string;
  location: string;
  receivedBy: string;
}

const columnHelper = createColumnHelper<TableRow>();


const BillApprovalTable = () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      billNo: 'Bill-2001',
      vendor: 'Vendor ABC',
      billDate: '01-05-2023',
      dueDate: '01-05-2023',
      amount: 2000,
      description: 'Consulting Services',
      location: 'NYC',
      receivedBy: 'Jane Smith',
    },
    {
      id: 2,
      billNo: 'Bill-2002',
      vendor: 'Vendor xyz',
      billDate: '01-05-2023',
      dueDate: '01-05-2023',
      amount: 4000,
      description: 'Consulting Services',
      location: 'NYC',
      receivedBy: 'John Doe',
    },
	]);

  const columns = [
    columnHelper.accessor('billNo',{
      header: "Bill No",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('vendor', {
      header: 'Vendor Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('billDate', {
      header: 'Bill Date',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('dueDate', {
      header: 'Due Date',
      cell: (info) => info.getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('amount', {
      header: 'Amount (USD)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amount'))
        return acc
      },0)
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('location', {
      header: 'Location',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('receivedBy', {
      header: 'Received By',
      cell: (info) => info.getValue(),
    }),
  ];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className=" w-full">
      <div className='flex gap-5 text-[#8133F1] mb-4'>
        <button className='flex items-center gap-1 text-[#434343]'>Filter <ListFilterIcon size="16px"/></button>
        <button className='flex items-center gap-1'>Cal & Gas Electric<ChevronDownIcon size="16px"/></button>
        <button className='flex items-center gap-1 text-[#434343]'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
        <button className='flex items-center gap-1'>vendor <ChevronDownIcon size="16px"/></button>
      </div>
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
					<tbody className='divide-y divide-[#EAECF0] bg-white '>
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
      <p className='text-primary-normal mt-4'>Clear Selection</p>
		</div>
	);
};

export default BillApprovalTable;
