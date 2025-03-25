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

export interface TableRow {
	id: number;
  investmentType: string;
  investmentName: string;
  purchaseDate:string;
	purchaseUnit: string;
  totalCost: string;
	currentValue: string;
  unrealizedGainLoss: string;
  returns: string;
  expenses :string;
	taxes: string;
  disposalDate: string;
  disposalUnit: string;
  disposalProceeds: string;
  realizedGainLoss: string;
  expectedInvestmentDays: string;
  actualInvestmentDays: string;
}

const columnHelper = createColumnHelper<TableRow>();

const InvestmentTable = ({isExpanded, setIsExpanded, data, setData } : {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  setData: React.Dispatch<React.SetStateAction<TableRow[]>>;
}) => {
  const router = useRouter()

  const allColumns = [
    columnHelper.accessor('investmentType',{
      id:'investmentType',
      header: "Investment Type",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('investmentName', {
      id:'investmentName',
      header: 'Investment Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('purchaseDate', {
      id:'purchaseDate',
      header: 'Purchase Date',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('purchaseUnit', {
      id:'purchaseUnit',
      header: 'Purchase Unit',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('totalCost', {
      id: 'totalCost',
      header: 'Total Cost (USD)',
      cell: ({getValue}) => getValue(),
      // footer: ({table}) => {
      //   const sum = table.getFilteredRowModel().rows.reduce((acc, row) => {
      //     const value = row.getValue('totalCost');
      //     if (typeof value === 'string') {
      //       const numericValue = value.replace(/,/g, '');
      //       return acc + (Number(numericValue) || 0);
      //     }
      //     return acc;
      //   }, 0);
        
      //   return `$${sum.toLocaleString()}`;
      // }
    }),
    columnHelper.accessor('currentValue', {
      id:'currentValue',
      header: 'Current Value (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('unrealizedGainLoss', {
      id:'unrealizedGainLoss',
      header: 'Unrealized Gain/Loss (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('returns', {
      id:'returns',
      header: 'Returns (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('expenses', {
      id:'expenses',
      header: 'Expenses(USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('taxes', {
      id: 'taxes',
      header: 'Taxes (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('disposalDate', {
      id:'disposalDate',
      header: 'Disposal Date',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('disposalUnit', {
      id:'disposalUnit',
      header: 'Disposal Unit',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('disposalProceeds', {
      id:'disposalProceeds',
      header: 'Disposal Proceeds (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('realizedGainLoss', {
      id:'realizedGainLoss',
      header: 'Realized Gain/Loss (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('expectedInvestmentDays', {
      id:'expectedInvestmentDays',
      header: 'Expected Investment Days',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('actualInvestmentDays', {
      id:'actualInvestmentDays',
      header: 'Actual Investment Days',
      cell: (info) => info.getValue(),
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
                      onClick={() => {router.push('/finance/investment/new-investment?approval=true')}}
                    >
                      Approve Investment
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
                      onClick={() => {router.push('/finance/investment/new-investment')}}
                    >
                      Buy
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
                </Menu.Item>
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
    && col.id !== 'disposalProceeds' && col.id !== 'realizedGainLoss'
    && col.id !== 'expectedInvestmentDays' && col.id !== 'actualInvestmentDays'
  );

	// const [data, setData] = useState<TableRow[]>([
	// 	{
  //     id: 1,
  //     investmentType: 'Stock',
  //     investmentName: 'Stock A',
  //     purchaseDate: '01-01-2024',
  //     purchaseUnit: '200',
  //     totalCost: '100,000',
  //     currentValue: '120,000',
  //     unrealizedGainLoss: '20,000',
  //     returns: '30,000',
  //     expenses: '500',
  //     taxes: '750',
  //     disposalDate: '-',
  //     disposalUnit: '-',
  //     disposalProceeds: '-',
  //     realizedGainLoss: '0',
  //     expectedInvestmentDays: '180',
  //     actualInvestmentDays: '87',
  //   },
  //   {
  //     id: 2,
  //     investmentType: 'Bond',
  //     investmentName: 'Bond A',
  //     purchaseDate: '02-15-2024',
  //     purchaseUnit: '1000',
  //     totalCost: '100,000',
  //     currentValue: '120,000',
  //     unrealizedGainLoss: '20,000',
  //     returns: '30,000',
  //     expenses: '500',
  //     taxes: '750',
  //     disposalDate: '-',
  //     disposalUnit: '-',
  //     disposalProceeds: '-',
  //     realizedGainLoss: '0',
  //     expectedInvestmentDays: '180',
  //     actualInvestmentDays: '87',
  //   },
	// ]);

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

export default InvestmentTable;
