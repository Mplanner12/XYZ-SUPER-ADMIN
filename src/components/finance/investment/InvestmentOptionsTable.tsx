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
import { string } from 'zod';

interface TableRow {
	id: number;
  providerName: string;
  investmentType: string;
  investmentVehicle:string;
	riskLevel: string;
  returnPotential	: string;
	liquidty: string;
  fees: string;
  contact: string;
  website :string;
}

const columnHelper = createColumnHelper<TableRow>();

const InvestmentOptionTable = ({isExpanded, setIsExpanded } : {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const router = useRouter()

  const allColumns = [
    columnHelper.accessor('providerName',{
      id:'providerName',
      header: "providerName",
      cell: ({getValue}) => getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('investmentType', {
      id:'investmentType',
      header: 'Investment Type',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('investmentVehicle', {
      id:'investmentVehicle',
      header: 'Investment Vehicle	',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('riskLevel', {
      id:'riskLevel',
      header: 'Risk Level',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('returnPotential', {
      id: 'returnPotential',
      header: 'Return Potential',
      cell: ({getValue}) => getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('totalCost');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('liquidty', {
      id:'liquidty',
      header: 'Liquidty',
      cell: (info) => info.getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('currentValue');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('fees', {
      id:'fees',
      header: 'Fees',
      cell: (info) => info.getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('unrealizedGainLoss');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('contact', {
      id:'contact',
      header: 'Contact',
      cell: (info) => info.getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('returns');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('website', {
      id:'website',
      header: 'Website',
      cell: (info) => info.getValue(),
      footer: ({table}) => {
        const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
          const value = row.getValue('expenses');
          if (typeof value === 'string') {
            const numericValue = value.replace(/,/g, '');
            return acc + (Number(numericValue) || 0);
          }
          return acc;
        }, 0);
        
        return `$${sum.toLocaleString()}`;
      }
    }),
    columnHelper.accessor('id', {
      id: 'id',
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
                      // onClick={() => {router.push('/finance/investment/new-investment?approval=true')}}
                    >
                      Contact
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
                      onClick={() => {router.push('/finance/investment/investment-transactions?transactionType=Buy')}}
                    >
                      Buy
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
                      onClick={() => {router.push('/finance/investment/investment-transactions?transactionType=Sell')}}
                    >
                      Sell
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
                      onClick={() => {router.push('/finance/investment/investment-transactions?transactionType=Valuation')}}
                    >
                      Value
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
                      onClick={() => {router.push('/finance/investment/manage-portfolio')}}
                    >
                      Rebalance Portfolio
                    </button>
                  )}
                </Menu.Item> */}
              </div>
            </Menu.Items>
          </Menu>
        )
      },
    }),
  ];

  // visible colums
  const columns = isExpanded
  ? allColumns
  : allColumns.filter(col => col.id !== 'disposalDate' && col.id !== 'disposalUnit' 
  );

	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      providerName: 'T & T',
      investmentType: 'stock',
      investmentVehicle:'Individual Stocks',
      riskLevel: 'High',
      returnPotential	: 'High',
      liquidty: 'High',
      fees: 'Brokerage Fees Fund fees',
      contact: 'Individual or Network	',
      website: 'Website or Contact Information',
    },
    {
      id: 2,
      providerName: 'T & T',
      investmentType: 'stock',
      investmentVehicle:'Individual Stocks',
      riskLevel: 'High',
      returnPotential	: 'High',
      liquidty: 'High',
      fees: 'Brokerage Fees Fund fees',
      contact: 'Individual or Network	',
      website: 'Website or Contact Information',
    },
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className=" w-full">
			<div className="overflow-x-scroll  border border-[#EAECF0] rounded-xl">
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
					<tbody className='divide-y divide-[#EAECF0]  bg-white '>
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
const listOptions = [
	{ value: '', label: 'Select transfer type' },
	{ value: 'Intra-Bank Transfer', label: 'Bank A' },
	{ value: 'Inter-Bank Transfer', label: 'Bank B' },
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

export default InvestmentOptionTable;
