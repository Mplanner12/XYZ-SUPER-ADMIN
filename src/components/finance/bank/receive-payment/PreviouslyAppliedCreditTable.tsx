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
  dateDue: string;
  credit: string;
	customerJob: string;
	creditAmount: number;
	amountToPay: number;
  creditBalance: number;
}

const columnHelper = createColumnHelper<TableRow>();


const PreviouslyAppliedCreditTable = ({setDiscount}:any) => {
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
    columnHelper.accessor('dateDue',{
      header: "Date Due",
      cell: ({getValue}) => getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('credit', {
      header: 'Credit',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('customerJob', {
      header: 'Customer Job',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('creditAmount', {
      header: 'Credit Amount (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('creditAmount'))
        return acc
      },0)
    }),
    columnHelper.accessor('amountToPay', {
      id: 'amountToPay',
      header: 'Amount to Pay (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amountToPay'))
        return acc
      },0)
    }),
    columnHelper.accessor('creditBalance', {
      header: 'Credit Balance (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('creditBalance'))
        return acc
      },0)
    }),
  ];

	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      dateDue: '06/10/2024',
      credit: '0',
      customerJob:'Cook Brain:Kitchen',
      creditAmount: 112,
      amountToPay: 234,
      creditBalance: 340,
    },
    {
      id: 2,
      dateDue: '06/10/2024',
      credit: '0',
      customerJob:'Cook Brain:Kitchen',
      creditAmount: 112,
      amountToPay: 234,
      creditBalance: 340,
    },
    {
      id: 3,
      dateDue: '06/10/2024',
      credit: '0',
      customerJob:'Cook Brain:Kitchen',
      creditAmount: 112,
      amountToPay: 234,
      creditBalance: 340,
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
      <div className='flex flex-col md:flex-row gap-6 mt-6'>
        <div className='w-[88px]'>
          <Button fullWidth 
            onClick={handleMakeTransfer}
          >Done</Button>
        </div>
        <div className='w-[101px]'>
          <Button fullWidth variant='outlined'
            onClick={()=>setDiscount(false)}
          >Cancel</Button>
        </div>
        <button className='text-primary-normal'
          onClick={()=> setMakeTransfer(!makeTransfer)}
        >Help</button>
      </div>
		</div>
	);
};

const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const transferOptions = [
	{ value: '', label: 'Select transfer type' },
	{ value: 'Intra-Bank Transfer', label: 'Intra-Bank Transfer' },
	{ value: 'Inter-Bank Transfer', label: 'Inter-Bank Transfer' },
];
const classOptions = [
	{ value: '', label: 'Select transfer type' },
	{ value: 'Intra-Bank Transfer', label: 'Intra-Bank Transfer' },
	{ value: 'Inter-Bank Transfer', label: 'Inter-Bank Transfer' },
];
const transferFundOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Bank A' },
	{ value: 'B', label: 'Bank B' },
];
const receiveFundOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Bank A' },
	{ value: 'B', label: 'Bank B' },
];

export default PreviouslyAppliedCreditTable;
