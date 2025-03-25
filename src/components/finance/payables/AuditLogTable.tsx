"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { ArrowUpNarrowWideIcon, EllipsisVertical, ListFilterIcon, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { TextField } from '@/components/reusable/TextField';
import { useForm } from 'react-hook-form';

interface TableRow {
	id: number;
  logId: string;
  userId: string;
	action: string;
	description: string;
	date: string;
  time: string;
  status: string;
}

const columnHelper = createColumnHelper<TableRow>();


const AuditLogTable = () => {
  const [success, setSuccess] = useState(false)
  const {control} = useForm()
  const router = useRouter()

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      logId: '2345',
      userId: 'John Smith',
      action:'Receive vendor bills',
      description: 'Receive a $2,000 bill from Vendor ABC for services rendered on 2024-05-01.',
      time: '11:39 AM',
      date: '06-22-2022',
      status: 'Done',
    },
    {
      id: 2,
      logId: '2345',
      userId: 'John Smith',
      action:'Receive vendor bills',
      description: 'Receive a $2,000 bill from Vendor ABC for services rendered on 2024-05-01.',
      time: '11:39 AM',
      date: '06-22-2022',
      status: 'Done',
    },
	]);

  const columns = [
    columnHelper.accessor('logId',{
      header: "LogID",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('userId', {
      header: 'UserID',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('action', {
      header: 'action',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('time', {
      header: 'Time',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'status',
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
      <div className='flex flex-col md:flex-row md:justify-between gap-4  mb-4'>
        <div className='text-[#8133F1] flex items-center gap-5'>
          <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
          <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
        </div>
        <div className='flex items-center gap-x-3'>
          <div className='flex flex-col sm:flex-row gap-x-3'>
            <p className='text-primary-normal'>Date Range</p>
            <TextField
              name='from'
              type='date'
              variant='short'
              control={control}
            />
          </div>
          <div className='flex flex-col sm:flex-row gap-x-3'>
            <p className='text-primary-normal'>to</p>
            <TextField
              name='to'
              type='date'
              variant='short'
              control={control}
            />
          </div>
        </div>
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
										className="py-6 px-4 font-medium text-left"
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
										className="py-6 px-4 whitespace-break-spaces text-[#939292] text-left"
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

export default AuditLogTable;
