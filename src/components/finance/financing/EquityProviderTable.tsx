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
  investorName: string;
  investorType: string;
	investmentFocus: string;
	investmentStage: string;
	minimumInvestment: string;
  geographicFocus: string;
  contact: string;
  website: string;
}

const columnHelper = createColumnHelper<TableRow>();


const EquityProviderTable= () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      investorName: 'AMG',
      investorType: 'Angel investor',
      investmentFocus:'Early Start-ups',
      investmentStage: 'Seed, Series A',
      minimumInvestment: '$25,000-$1 Million',
      geographicFocus: 'Local or regional',
      contact: 'Individual or network',
      website: ''
    },
    {
      id: 2,
      investorName: 'AMG',
      investorType: 'Angel investor',
      investmentFocus:'Early Start-ups',
      investmentStage: 'Seed, Series A B C',
      minimumInvestment: '$25,000-$1 Million',
      geographicFocus: 'Local or regional',
      contact: '',
      website: ''
    },
	]);

  const columns = [
    columnHelper.accessor('investorName',{
      header: "Investor Name",
      cell: ({getValue}) => getValue(),
      
    }),
    columnHelper.accessor('investorType', {
      header: 'Investor TYpe',
      cell: (info) => info.getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('investmentFocus', {
      header: 'Investment Focus',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('investmentStage', {
      header: 'Investment Stage',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('minimumInvestment', {
      header: 'Minimum Investment',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('geographicFocus', {
      header: 'Geographic Focus',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('contact', {
      header: 'Contact',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('cashAndBank'))
        return acc
      },0)
    }),
    columnHelper.accessor('website', {
      header: 'Website',
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

export default EquityProviderTable;
