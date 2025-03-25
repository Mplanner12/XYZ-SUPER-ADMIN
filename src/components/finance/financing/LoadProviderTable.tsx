"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { EllipsisVertical, Plus, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface TableRow {
	id: number;
  providerName: string;
  providerIndustry: string;
	loanType: string;
	interestRate: number;
	eligibility: number;
  providerCountry: string;
  contact: any;
  applicationLink: string;
}

const columnHelper = createColumnHelper<TableRow>();


const LoanProviderTable = () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      providerName: 'Bank',
      providerIndustry: 'Bank A',
      loanType:'$100,000',
      interestRate: 100000,
      eligibility: 234,
      providerCountry: '$5,000',
      contact: {
        img: '/setuplogo.svg',
        url: 'http://googgle.com/',
      },
      applicationLink: 'Website',
    },
    {
      id: 2,
      providerName: 'Cash',
      providerIndustry: 'Bank B',
      loanType: '$300,000',
      interestRate: 100000,
      eligibility: 234,
      providerCountry: '$3,000',
      contact: {
        img: '/argchart.svg',
        url: 'http://goog.com/',
      },
      applicationLink: 'Website',
    },
	]);

  const columns = [
    columnHelper.accessor('providerName',{
      header: "Provider Name",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('providerIndustry', {
      header: 'Provider Industry',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('loanType', {
      header: 'Type Of Loan',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('interestRate', {
      header: 'Interest Rate',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('eligibility', {
      header: 'Eligibility',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('providerCountry', {
      header: 'Provider Country',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('contact', {
      header: 'Contact',
      size: 300,
      cell: ({getValue}) => <div className='flex items-center gap-2 text-primary-normal'>
        <Image src={getValue().img} alt={getValue().url} width={30} height={30} />
        <Link href={getValue().url} target='_blank'>Open Link</Link>
        <Image src='/open-in-new.svg' alt={getValue().url} width={30} height={30} />
      </div>,
    }),
    columnHelper.accessor('applicationLink', {
      header: 'Application Link',
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
										className="py-6 px-4 whitespace-break-spaces text-[#939292] text-nowrap"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default LoanProviderTable;
