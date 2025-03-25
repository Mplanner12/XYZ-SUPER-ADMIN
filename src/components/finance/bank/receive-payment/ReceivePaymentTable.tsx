"use client"
// NOT IN USE
import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface TableRow {
	id: number;
  date: string;
  job: string;
	number: string;
  originalAmount: number;
	amountDue: number;
	payment: number;
}

const columnHelper = createColumnHelper<TableRow>();


const ReceivePaymentTable = () => {
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
    columnHelper.accessor('job', {
      header: 'Job',
      size: 1000,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('number', {
      header: 'Number',
      cell: ({getValue}) => getValue(),
      footer: 'Totals',
    }),
    columnHelper.accessor('originalAmount', {
      header: 'Original Amount (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('originalAmount'))
        return acc
      },0)
    }),
    columnHelper.accessor('amountDue', {
      header: 'Amount Due (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('amountDue'))
        return acc
      },0)
    }),
    columnHelper.accessor('payment', {
      header: 'Payment (GBP)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('payment'))
        return acc
      },0)
    }),
  ];

	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      date: '06/10/2024',
      job: 'Kitchen',
      number: '2455',
      originalAmount: 32,
      amountDue: 454,
      payment: 345,
    },
    {
      id: 2,
      date: '06/10/2024',
      job: 'Kitchen',
      number: '2455',
      originalAmount: 32,
      amountDue: 454,
      payment: 345,
    },
    {
      id: 3,
      date: '06/10/2024',
      job: 'Kitchen',
      number: '2455',
      originalAmount: 32,
      amountDue: 454,
      payment: 345,
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
										className="py-6 px-4 font-medium text-nowrap"
                    style={{width: header.getSize()}}
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
										className="py-6 px-4 text-[#939292] text-nowrap"
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

export default ReceivePaymentTable;
