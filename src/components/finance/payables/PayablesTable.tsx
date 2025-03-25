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
import {TextField } from '@/components/reusable/TextField';
import { SelectField } from '@/components/reusable/SelectField';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { Button } from '@/components/reusable/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

interface TableRow {
	id: number;
  date: string;
  billNo: string;
	description: string;
	amount: number;
	outstanding: number;
  status: string;
  vendorName: string;
}

const columnHelper = createColumnHelper<TableRow>();

interface PayablesTableProps {
  data: TableRow[];
  setBillReceipt: (value: boolean) => void;
  setActiveTab: (value: number) => void;
}


const PayablesTable: React.FC<PayablesTableProps> = ({data, setBillReceipt, setActiveTab}) => {
  const [makeTransfer, setMakeTransfer] = useState(false)
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const {control} = useForm()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const columns = [
    columnHelper.display({
      header: "Select",
      cell: () => <input type='checkbox'/>,
    }),
    columnHelper.accessor('date',{
      header: "Date",
      cell: ({getValue}) => getValue(),
      
    }),
    columnHelper.accessor('billNo', {
      header: 'Bill No',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('description', {
      header: 'Description',
      cell: ({getValue}) => getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amount'))
        return acc
      },0)
    }),
    columnHelper.accessor('outstanding', {
      header: 'Outstanding Days/Aging',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('vendorName', {
      header: 'Vendor Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('id', {
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
                      onClick={() => setActiveTab(2)}
                    >
                      Approve
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
                      onClick={() => setActiveTab(3)}
                    >
                      Make Payment
                    </button>
                  )}
                </Menu.Item>
                {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
                          : 'text-foundation-grey-grey-800'
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => setActiveTab(5)}
                    >
                      Reconcile Bill
                    </button>
                  )}
                </Menu.Item> */}
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
                          : 'text-foundation-grey-grey-800'
                      } group flex rounded-md px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => setBillReceipt(true)}
                    >
                      Record Expenditure
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

	// const [data, setData] = useState<TableRow[]>([
	// 	{
  //     id: 1,
  //     date: '01-05-2023',
  //     billNo: 'Bill-A10001',
  //     description:'Vendor Payment AB',
  //     amount: 7500,
  //     outstanding: 32,
  //     status: 'Pending',
  //     vendorName: 'AB  Limited',
  //   },
  //   {
  //     id: 2,
  //     date: '01-05-2023',
  //     billNo: 'Bill-A10001',
  //     description:'Vendor Payment AB',
  //     amount: 7500,
  //     outstanding: 32,
  //     status: 'Pending',
  //     vendorName: 'AB  Limited',
  //   },
  //   {
  //     id: 3,
  //     date: '01-05-2023',
  //     billNo: 'Bill-A10001',
  //     description:'Vendor Payment AB',
  //     amount: 7500,
  //     outstanding: 32,
  //     status: 'Pending',
  //     vendorName: 'AB  Limited',
  //   },
	// ]);

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



export default PayablesTable;
