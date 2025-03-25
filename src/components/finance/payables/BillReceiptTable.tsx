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
  billNo: string;
  billTitle: string;
	billDate: string;
	dueDate: string;
	amount: number;
  description: string;
  location: string;
  receivedBy: string;
}

const columnHelper = createColumnHelper<TableRow>();


const BillReceiptTable = ({setBillDetails}:any) => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      billNo: 'Bill-2001',
      billTitle: 'Consulting Bill',
      billDate:'01-05-2023',
      dueDate: '01-05-2023',
      amount: 234,
      description: 'Consulting Services',
      location: 'NYC',
      receivedBy: 'Jane Smith',
    },
    {
      id: 2,
      billNo: 'Bill-2001',
      billTitle: 'Consulting Bill',
      billDate:'01-05-2023',
      dueDate: '01-05-2023',
      amount: 234,
      description: 'Consulting Services',
      location: 'NYC',
      receivedBy: 'Jane Smith',
    },
	]);

  const columns = [
    columnHelper.display({
      header: "Select",
      cell: () => <input type='checkbox'/>,
    }),
    columnHelper.accessor('billNo',{
      header: "Bill No",
      cell: ({getValue}) => getValue(),
      footer: 'Add Bills'
    }),
    columnHelper.accessor('billTitle', {
      header: 'Bill Title',
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
    columnHelper.accessor('id', {
      id: 'selection',
      header: 'Action',
      cell: ({row}) => {
        const bank = row.original
        
        return (
          <Menu as="div" className="relative text-center">
            <Menu.Button className=" border-none bg-white cursor-pointer">
              <EllipsisVertical />
            </Menu.Button>
            <Menu.Items className="absolute -right-3 origin-top-right z-10 bg-white border border-[#DFDEDE] rounded-md shadow-lg focus:outline-none">
              <div className="px-1 py-1 w-[180px] divide-y divide-[#DFDEDE] ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
                          : 'text-foundation-grey-grey-800'
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => setBillDetails(true)}
                    >
                      Add New Entry
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
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => setBillDetails(true)}
                    >
                      Create Bill
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
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => ''}
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
                          ? 'bg-foundation-grey-grey-300 text-error'
                          : 'text-error'
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => ''}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        )
      },
    }),
  ];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className=" w-full">
      <div className='mb-4'>
        <p className='w-fit ml-auto text-primary-normal'>Approve Selection</p>
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
		</div>
	);
};

export default BillReceiptTable;
