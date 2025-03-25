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
  accountType: string;
  accountName: string;
	balance: string;
	cashAndBank: number;
	unreconciledTrans: number;
  unreconciledTotal: string;
}

const columnHelper = createColumnHelper<TableRow>();


const TestTable = () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      accountType: 'Bank',
      accountName: 'Bank A',
      balance:'$100,000',
      cashAndBank: 100000,
      unreconciledTrans: 234,
      unreconciledTotal: '$5,000',
    },
    {
      id: 2,
      accountType: 'Cash',
      accountName: 'Bank B',
      balance: '$300,000',
      cashAndBank: 100000,
      unreconciledTrans: 234,
      unreconciledTotal: '$3,000',
    },
	]);

  const columns = [
    columnHelper.display({
      header: "Select",
      cell: () => <input type='checkbox'/>,
    }),
    columnHelper.accessor('accountType',{
      header: "Account Type",
      cell: ({getValue}) => getValue(),
      footer: 'Total Cash Position'
    }),
    columnHelper.accessor('accountName', {
      header: 'Account Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('balance', {
      header: 'Current Balance (USD)',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('cashAndBank', {
      header: 'Cash & Bank Position (USD)',
      cell: (info) => info.getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('cashAndBank');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('unreconciledTrans', {
      header: 'Unreconciled Transactions',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('unreconciledTotal', {
      header: 'Unreconciled Total Amount',
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
                      } group flex rounded-md  px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => router.push(`/finance/banking-management/${bank?.id}`)}
                    >
                      Reconcile Now
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
                      onClick={() => console.log(`Edit row ${bank?.id}`)}
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
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => {
                        console.log(`Edit row ${bank?.id}`)}}
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
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => console.log(`Edit row ${bank?.id}`)}
                    >
                      Receive Payment
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
		</div>
	);
};

export default TestTable;
