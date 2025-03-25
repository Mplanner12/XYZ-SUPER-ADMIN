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
import SelectDropdown from '@/components/reusable/SelectDropDown';

interface TableRow {
	id: number;
  accountType: string;
  accountName: string;
  status:string
	balance: string;
  exchangeRate:number,
	cashAndBank: number;
  lastReconciledDate: string;
  lastReconciledBalance: string;
  autoReconciledTransactions :number
	unreconciledTrans: number;
  unreconciledTotal: string;
}

const columnHelper = createColumnHelper<TableRow>();


const BankManagementTable = ({isExpanded, setIsExpanded, makeTransfer, setMakeTransfer, setActiveTab, 
  locationOptions, location, setLocation,receivingAccount, setReceivingAccount, employee, setEmployee,
  employeeList, transferFundFrom, setTransferFundFrom, cashBankOptions, } : {
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>
  makeTransfer: boolean; transferFundFrom:any; setTransferFundFrom:any; cashBankOptions:[];
  setMakeTransfer: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  locationOptions:[]; location: any; setLocation:any;receivingAccount:any; setReceivingAccount:any;
   employee:any; setEmployee:any; employeeList:[];
}) => {

  const [success, setSuccess] = useState(false)
  const {control} = useForm()
  const router = useRouter()

  const handleMakeTransfer = () =>{
    setSuccess(!success)
  }

  const allColumns = [
    columnHelper.accessor('accountType',{
      id:'accountType',
      header: "Account Type",
      cell: ({getValue}) => getValue(),
      footer: 'Total Cash Position'
    }),
    columnHelper.accessor('accountName', {
      id:'accountName',
      header: 'Account Name',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('status', {
      id:'status',
      header: 'Status',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('balance', {
      id:'balance',
      header: 'Current Balance',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('exchangeRate', {
      id:'exchangeRate',
      header: 'Exchange Rate',
      cell: ({getValue}) => getValue(),
    }),
    columnHelper.accessor('cashAndBank', {
      id:'cashAndBank',
      header: 'Cash & Bank Position (USD)',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('cashAndBank'))
        return acc
      },0)
    }),
    columnHelper.accessor('lastReconciledDate', {
      id:'lastReconciledDate',
      header: 'Last Reconciled Date',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('cashAndBank'))
        return acc
      },0)
    }),
    columnHelper.accessor('lastReconciledBalance', {
      id:'lastReconciledBalance',
      header: 'Last Reconciled Balance',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('cashAndBank'))
        return acc
      },0)
    }),
    columnHelper.accessor('autoReconciledTransactions', {
      id:'autoReconciledTransactions',
      header: 'Auto Reconciled Transactions',
      cell: (info) => info.getValue(),
      footer: ({table}) => table.getFilteredRowModel().rows.reduce((acc, val)=>{
        acc+= Number(val.getValue('cashAndBank'))
        return acc
      },0)
    }),
    columnHelper.accessor('unreconciledTrans', {
      id: 'unreconciledTrans',
      header: 'Unreconciled Transactions',
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('unreconciledTotal', {
      id:'unreconciledTotal',
      header: 'Unreconciled Total Amount',
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
                {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? 'bg-foundation-grey-grey-300 text-foundation-grey-grey-800'
                          : 'text-foundation-grey-grey-800'
                      } group flex rounded-md  px-2 py-2 text-sm w-full ring-0 outline-none border-none`}
                      onClick={() => router.push(`/finance/banking-management/reconcile`)}
                    >
                      Reconcile Now
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
                      onClick={() => router.push('/finance/banking-management/bank-statement')}
                    >
                      View Details
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
  : allColumns.filter(col => col.id !== 'status' && col.id !== 'exchangeRate' 
    && col.id !== 'lastReconciledDate' && col.id !== 'lastReconciledBalance'
    && col.id !== 'autoReconciledTransactions'
  );

	const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      accountType: 'Bank',
      accountName: 'Bank A',
      status: 'Active',
      balance:'$100,000',
      exchangeRate: 1,
      cashAndBank: 100000,
      lastReconciledDate: '31-05-2023',
      lastReconciledBalance: '$70,000',
      autoReconciledTransactions: 50,
      unreconciledTrans: 234,
      unreconciledTotal: '$5,000',
    },
    {
      id: 2,
      accountType: 'Bank',
      accountName: 'Bank B',
      status: 'Liened',
      balance:'$100,000',
      exchangeRate: 1,
      cashAndBank: 100000,
      lastReconciledDate: '31-05-2023',
      lastReconciledBalance: '$70,000',
      autoReconciledTransactions: 50,
      unreconciledTrans: 234,
      unreconciledTotal: '$5,000',
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
      {makeTransfer && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <h2 className='mb-2'>Make Transfer </h2>
          <p className='text-[#939292] mb-4'>Transfer money between accounts</p>
          <div className='flex justify-between gap-4 mb-4'>
            <SelectDropdown
              placeholder="Select"
              label="Location"
              options={locationOptions}
              value={location}
              onChange={(value) => setLocation(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <SelectField
              name='type'
              label='Transfer Type'
              options={transferOptions}
              control={control}
            />
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <TextField 
              name='date'
              label='Date'
              type='date'
              control={control}
            />
            <SelectDropdown
              placeholder="Select"
              label="Authorized By"
              options={employeeList}
              value={employee}
              onChange={(value) => setEmployee(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <div>
              <SelectDropdown
                placeholder="Select"
                label="Transfer Funds From"
                options={cashBankOptions}
                value={transferFundFrom}
                onChange={(value) => setTransferFundFrom(value)}
                className="w-[340px] text-base"
                buttonClassName="bg-white"
                labelClassName="font-medium"
              />
              <p>Account Currency is Dollars (USD)</p>
            </div>
            <TextField
              name='type'
              label='Ending Balance (GBP)'
              placeholder='46,969.10'
              coloredBg
              control={control}
            />
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <div>
              <SelectDropdown
                placeholder="Select"
                label="Receiving Account"
                options={cashBankOptions}
                value={receivingAccount}
                onChange={(value) => setReceivingAccount(value)}
                className="w-[340px] text-base"
                buttonClassName="bg-white"
                labelClassName="font-medium"
              />
              <p>Account Currency is Pounds (£)</p>
            </div>
            <div className='flex justify-between items-center w-[340px] h-[48px] bg-[#F0F0F0] px-4 mt-6'>
              <p>Exchange rate</p>
              <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-3'>
                <p>$ 1</p>
              </div>
              <Image src='/exchange.svg' alt='exchange rate' width={24} height={24}/>
              <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-3'>
                <p>£ 0.8</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <TextField
              name='amount'
              label='Amount to be Transferred (USD)'
              placeholder='Enter Amount'
              control={control}
            />
            <TextField
              name='amount'
              label='Description'
              placeholder='Enter Transaction Description'
              control={control}
            />
          </div>
          
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth 
                onClick={handleMakeTransfer}
              >Make Transfer</Button>
            </div>
            <div className='w-[340px]'>
              <Button fullWidth variant='outlined'>Make Transfer & Create New</Button>
            </div>
            <button className='text-primary-normal'
              onClick={()=> {setMakeTransfer(!makeTransfer); setActiveTab(0)}}
            >Cancel</button>
          </div>
        </div>
        </div>
      )}
		</div>
	);
};


const transferOptions = [
	{ value: '', label: 'Select transfer type' },
	{ value: 'IntraBank Transfer', label: 'IntraBank Transfer' },
	{ value: 'InterBank Transfer', label: 'InterBank Transfer' },
];

export default BankManagementTable;
