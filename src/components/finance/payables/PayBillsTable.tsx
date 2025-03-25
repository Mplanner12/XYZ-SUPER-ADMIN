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
  dateDue: string;
  vendor: string;
	refNo: string;
	discountDate: string;
	amountDue: number;
  discountsUsed: number;
  creditsUsed: number;
  amountToPay: number;
}

const columnHelper = createColumnHelper<TableRow>();


const PayBillsTable = () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      dateDue: '06/10/2024',
      vendor: 'Vendor A',
      refNo:'REF-67890',
      discountDate: '',
      amountDue: 234,
      discountsUsed: 234,
      creditsUsed: 234,
      amountToPay: 234,
    },
    {
      id: 2,
      dateDue: '06/10/2024',
      vendor: 'Vendor B',
      refNo:'REF-67890',
      discountDate: '',
      amountDue: 234,
      discountsUsed: 234,
      creditsUsed: 234,
      amountToPay: 234,
    },
	]);

  const columns = [
    columnHelper.display({
      header: "Select",
      cell: () => <input type='checkbox'/>,
    }),
    columnHelper.accessor('dateDue',{
      header: "Date Due",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('vendor', {
      header: 'Vendor',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('refNo', {
      header: 'Ref. No',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('discountDate', {
      header: 'Discount Date',
      cell: (info) => info.getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('amountDue', {
      header: 'Amount Due',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amountDue'))
        return acc
      },0)
    }),
    columnHelper.accessor('discountsUsed', {
      header: 'Discounts Used',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('discountsUsed'))
        return acc
      },0)
    }),
    columnHelper.accessor('creditsUsed', {
      header: 'Credits Used',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('creditsUsed'))
        return acc
      },0)
    }),
    columnHelper.accessor('amountToPay', {
      header: 'Amount to Pay',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amountToPay'))
        return acc
      },0)
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

export default PayBillsTable;
