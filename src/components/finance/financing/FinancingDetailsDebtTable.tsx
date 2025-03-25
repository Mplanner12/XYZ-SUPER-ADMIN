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
  investmentName: string;
  investmentType: string;
	issueDate: string;
	currency: string;
	faceValue: string;
  InterestRate: string;
  repaymentTerm: number;
	repaymentFrequency: string;
	moratorium: string;
  otherCharges: string;
  investmentDescription: string;
  chargesFrequency: string;
  repaymentSchedule: string;
  collateral: string;
  guarantors: string;
	legalStructure: string;
	jurisdiction: string;
  regulatoryCompliance: string;
  debtDescription: string;
  eligibility: string;
  supportingDocument: string;
}

const columnHelper = createColumnHelper<TableRow>();


const FinancingDetailsDebtTable= () => {
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      investmentName: 'common stock',
      investmentType: 'Stock Issuance A',
      issueDate: '01-15-2024',
      currency: '234',
      faceValue: '$5,000',
      InterestRate:'100,000',
      repaymentTerm: 10,
      repaymentFrequency: 'Corporation',
      moratorium: 'United State',
      otherCharges: 'Quarterly',
      investmentDescription: 'Small business equity financing',
      chargesFrequency: 'Small business with at',
      repaymentSchedule: 'Legal agreements, Financial statements',
      collateral:'100,000',
      guarantors: '',
      legalStructure: 'Corporation',
      jurisdiction: 'United State',
      regulatoryCompliance: 'Quarterly',
      debtDescription: 'Small business equity financing',
      eligibility: 'Small business with at',
      supportingDocument: 'Legal agreements, Financial statements',
    },
    {
      id: 2,
      investmentName: 'common stock',
      investmentType: 'Stock Issuance A',
      issueDate: '01-15-2024',
      currency: '234',
      faceValue: '$5,000',
      InterestRate:'100,000',
      repaymentTerm: 10,
      repaymentFrequency: 'Corporation',
      moratorium: 'United State',
      otherCharges: 'Quarterly',
      investmentDescription: 'Small business equity financing',
      chargesFrequency: 'Small business with at',
      repaymentSchedule: 'Legal agreements, Financial statements',
      collateral:'100,000',
      guarantors: '',
      legalStructure: 'Corporation',
      jurisdiction: 'United State',
      regulatoryCompliance: 'Quarterly',
      debtDescription: 'Small business equity financing',
      eligibility: 'Small business with at',
      supportingDocument: 'Legal agreements, Financial statements',
    },
	]);

  const columns = [
    columnHelper.accessor('investmentName',{
      header: "Investment Name",
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('investmentType', {
      header: 'Investment Type',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('issueDate', {
      header: 'Issue Date',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('currency', {
      header: 'Currency',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('faceValue', {
      header: 'Face Value/Loan Amount(USD)',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('InterestRate', {
      header: 'Interest Rate',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('repaymentTerm', {
      header: 'Repayment Frequency',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('repaymentFrequency', {
      header: 'Repayment Frequency',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('moratorium', {
      header: 'Moratorium',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('otherCharges', {
      header: 'Other Charges',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('investmentDescription', {
      header: 'Investment Description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('chargesFrequency', {
      header: 'Charges Frequency',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('repaymentSchedule', {
      header: 'Repayment Schedule',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('collateral', {
      header: 'Collateral',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('guarantors', {
      header: 'Guarantors',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('legalStructure', {
      header: 'Legal Structure',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('jurisdiction', {
      header: 'Jurisdiction',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('regulatoryCompliance', {
      header: 'Regulatory Compliance',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('debtDescription', {
      header: 'Debt Description',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('eligibility', {
      header: 'Eligibility',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('supportingDocument', {
      header: 'Supporting Document',
      cell: (info) => info.getValue(),
    }),
  ];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

  const addNewRow = () => {
		const newRow: TableRow = {
			id: data.length + 1,
			investmentName: 'common stock',
      investmentType: 'Stock Issuance A',
      issueDate: '01-15-2024',
      currency: '234',
      faceValue: '$5,000',
      InterestRate:'100,000',
      repaymentTerm: 10,
      repaymentFrequency: 'Corporation',
      moratorium: 'United State',
      otherCharges: 'Quarterly',
      investmentDescription: 'Small business equity financing',
      chargesFrequency: 'Small business with at',
      repaymentSchedule: 'Legal agreements, Financial statements',
      collateral:'100,000',
      guarantors: '',
      legalStructure: 'Corporation',
      jurisdiction: 'United State',
      regulatoryCompliance: 'Quarterly',
      debtDescription: 'Small business equity financing',
      eligibility: 'Small business with at',
      supportingDocument: 'Legal agreements, Financial statements',
		};
		setData([...data, newRow]);
	};

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
				</table>
			</div>
      <button className='mt-4 text-primary-normal' onClick={addNewRow}> <Plus className='inline' /> Add a new</button> 
		</div>
	);
};

export default FinancingDetailsDebtTable;
