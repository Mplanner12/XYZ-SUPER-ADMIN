"use client"

import { Menu } from '@headlessui/react';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';
import { EllipsisVertical, MoreVertical, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation';

interface TableRow {
	id: number;
  financingType: string;
  instrumentName: string;
	status: string;
	issueDate: string;
	issueAmount: number;
  totalProceeds: string;
  currentValue: string;
	unrealizedGainLoss: number;
	interest: number;
  issuanceCosts: string;
  taxImpact: string;
  maturityDate: string;
  amountRepaid: string;
  realizedGainLoss: string;
  expectedTerm: string;
  currentTerm: number;
}

const columnHelper = createColumnHelper<TableRow>();


const FinancingManagementTable = ({isExpanded, setIsExpanded } : {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [success, setSuccess] = useState(false)
  const [openActionId, setOpenActionId] = useState<string | null>(null); 
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      financingType: 'common stock',
      instrumentName: 'Stock Issuance A',
      status:'active',
      issueDate: '01-15-2024',
      issueAmount: 234,
      totalProceeds: '$5,000',
      currentValue:'$100,000',
      unrealizedGainLoss: 100000,
      interest: 234,
      issuanceCosts: '200,000',
      taxImpact: '150,000',
      maturityDate: '03-01-2029',
      amountRepaid: '7,500,000',
      realizedGainLoss: '0',
      expectedTerm: 'Perpetual',
      currentTerm: 351,
    },
    {
      id: 2,
      financingType: 'common stock',
      instrumentName: 'Stock Issuance A',
      status:'active',
      issueDate: '01-15-2024',
      issueAmount: 234,
      totalProceeds: '$5,000',
      currentValue:'$100,000',
      unrealizedGainLoss: 100000,
      interest: 234,
      issuanceCosts: '200,000',
      taxImpact: '150,000',
      maturityDate: '03-01-2029',
      amountRepaid: '7,500,000',
      realizedGainLoss: '0',
      expectedTerm: 'Perpetual',
      currentTerm: 351,
    },
	]);

  const allColumns = [
    columnHelper.accessor('financingType',{
      id: 'financingType',
      header: "Financing Type",
      cell: ({getValue}) => getValue(),
      footer: 'Total'
    }),
    columnHelper.accessor('instrumentName', {
      id: 'instrumentName',
      header: 'Instrument Name',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('instrumentName'))
        return acc
      },0)
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: 'Status',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('issueDate', {
      id: 'issueDate',
      header: 'Issue Date',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('issueDate'))
        return acc
      },0)
    }),
    columnHelper.accessor('issueAmount', {
      id: 'issueAmount',
      header: 'Issue Amount (USD)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('issueAmount'))
        return acc
      },0)
    }),
    columnHelper.accessor('totalProceeds', {
      id: 'totalProceeds',
      header: 'Total Proceeds (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('currentValue', {
      id: 'currentValue',
      header: 'Current Value (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('unrealizedGainLoss', {
      id: 'unrealizedGainLoss',
      header: 'Unrealized Gain/Loss (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('interest', {
      id: 'interest',
      header: 'Interest/Dividend Paid  (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('issuanceCosts', {
      id: 'issuanceCosts',
      header: 'Issuance Costs (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('taxImpact', {
      id: 'taxImpact',
      header: 'Tax Impact(USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('maturityDate', {
      id: 'maturityDate',
      header: 'Maturity/Repurchase Date',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('amountRepaid', {
      id: 'amountRepaid',
      header: 'Amount Repaid/Repurchased (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('realizedGainLoss', {
      id: 'realizedGainLoss',
      header: 'Realized Gain/Loss (USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('expectedTerm', {
      id: 'expectedTerm',
      header: 'Expected Term (Days)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('currentTerm', {
      id: 'currentTerm',
      header: 'Current Term (Days)',
      cell: (info) => info.getValue(),
    }),
  ];
  // visible colums
  const columns = isExpanded
  ? allColumns
  : allColumns.filter(col => col.id !== 'unrealizedGainLoss' && col.id !== 'interest' 
    && col.id !== 'issuanceCosts' && col.id !== 'taxImpact' && col.id !== 'maturityDate' 
    && col.id !== 'amountRepaid' && col.id !== 'realizedGainLoss' && col.id !== 'expectedTerm'
    && col.id !== 'currentTerm'
  );

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

  const addNewRow = () => {
		const newRow: TableRow = {
			id: data.length + 1,
			financingType: 'common stock',
      instrumentName: 'Stock Issuance A',
      status:'active',
      issueDate: '01-15-2024',
      issueAmount: 234,
      totalProceeds: '$5,000',
      currentValue:'$100,000',
      unrealizedGainLoss: 100000,
      interest: 234,
      issuanceCosts: '200,000',
      taxImpact: '150,000',
      maturityDate: '03-01-2029',
      amountRepaid: '7,500,000',
      realizedGainLoss: '0',
      expectedTerm: 'Perpetual',
      currentTerm: 351,
		};
		setData([...data, newRow]);
	};

	return (
		<div className=" w-full">
			<div className="overflow-x-auto border border-[#EAECF0] rounded-xl">
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
                <th
                  key="action-header"
                  className="py-4 px-4 font-normal border-b border-[#EAECF0]"
                >
                  Action
                </th>
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
                <td className="py-4 px-4 text-foundation-grey-grey-700">
                  <div className="relative">
                    <MoreVertical
                      className="cursor-pointer text-gray-500" 
                      onClick={() => setOpenActionId(openActionId === row?.id ? null : row?.id)} 
                    />
                    {openActionId === row.id && (
                      <div  className="absolute right-0 mt-2 w-40 bg-white  text-left rounded shadow-md z-10">
                        <ul className="py-1">
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setOpenActionId(null)}
                          >
                            Edit
                          </li>
                          <li className="px-4 py-2 text-sm text-[#E00B2B] cursor-pointer"
                            onClick={() => setOpenActionId(null)}
                          >
                            Approve
                          </li>
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setOpenActionId(null)}
                          >
                            Issue
                          </li>
                          <li className="px-4 py-2 text-sm cursor-pointer"
                            onClick={() => setOpenActionId(null)}
                          >
                            Repurchase
                          </li>
                          <li className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                            onClick={() => setOpenActionId(null)}
                          >
                            Revalue
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
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
      <button className='mt-4 text-primary-normal' onClick={addNewRow}> <Plus className='inline' /> Add a new entry</button> 
		</div>
	);
};

export default FinancingManagementTable;
