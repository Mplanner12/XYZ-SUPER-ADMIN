'use client'
import ExpensesTable from '@/components/finance/payables/recordBill/ExpensesTable';
import FixedAssetTable from '@/components/finance/payables/recordBill/FixedAssetTable';
import InventoryTable from '@/components/finance/payables/recordBill/InventoryTable';
import InvestmentTable from '@/components/finance/payables/recordBill/InvestmentTable';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { Button } from '@/components/reusable/Button';
import EmptyState from '@/components/reusable/EmptyState';
import { SelectField } from '@/components/reusable/SelectField';
import { TextField } from '@/components/reusable/TextField';
import { ArrowUpNarrowWideIcon, Bird, ChevronDownIcon, ForwardIcon, ListFilterIcon, PaintBucket, Paperclip, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon, TriangleAlert } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateTransaction } from '../../hooks/mutate';
import { Expenses } from '@/components/finance/payables/recordBill/ExpensesTable';
import { Inventory } from '@/components/finance/payables/recordBill/InventoryTable';
import { FixedAsset } from '@/components/finance/payables/recordBill/FixedAssetTable';
import { Investment } from '@/components/finance/payables/recordBill/InvestmentTable';
import moment from 'moment';
import SelectDropdown from '@/components/reusable/SelectDropDown';
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query';
import PayBillsTable from '@/components/finance/payables/PayBillsTable';
import MakeDepositTable, { Deposit } from '@/components/finance/bank/MakeDepositTable';
import { ListNames } from '@/constants/lists';

const MakePaymentPage = () => { 
  const [menu, setMenu] = useState('Expenses')
  const [makePayment, setMakePayment] = useState(false)
  const [currency, setCurrency] = useState('')
  const [payFrom, setPayFrom] = useState('')
  const [location, setLocation] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [payeeAccount, setPayeeAccount] = useState('')
  const [recipientAccount, setRecipientAccount] = useState('')


  const {control, getValues} = useForm()
  const router = useRouter()

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  
  // getting table data
  const [tableData, setTableData] = useState<Deposit[]>([]);
  const handleTableDataUpdate = useCallback((data: Deposit[]) => {
    setTableData(data);
  }, []);

  // getting table data
  const [ExpensesTableData, setExpensesTableData] = useState<Expenses[]>([]);
  const [InventoryTableData, setInventoryTableData] = useState<Inventory[]>([])
  const [FixedAssetTableData, setFixedAssetTableData] = useState<FixedAsset[]>([])
  const [InvestmentTableData, setInvestmentTableData] = useState<Investment []>([])

  const handleTableDataUpdat = useCallback((data: Expenses[]) => {
    setExpensesTableData(data);
  }, []);
  const handleInventoryTableDataUpdate = useCallback((data: Inventory[]) => {
    setInventoryTableData(data);
  }, []);
  const handleFixedAssetTableDataUpdate = useCallback((data: FixedAsset[]) => {
    setFixedAssetTableData(data);
  }, []);
  const handleInvestmentTableDataUpdate = useCallback((data: Investment []) => {
    setInvestmentTableData(data);
  }, []);

  // API CALL
  const {data:allLists} = useGetAccountingList()
  const salesLocationsId = allLists?.find((list:any)=> list?.name === ListNames?.salesLocations)?.ID
  const cashAndBankId = allLists?.find((list:any)=> list?.name === ListNames?.cashAndBank)?.ID
  const customerId = allLists?.find((list:any)=> list?.name === ListNames?.customer)?.ID
  const currencyId = allLists?.find((list:any)=> list?.name === ListNames?.currency)?.ID
  const paymentMethodId = allLists?.find((list:any)=> list?.name === ListNames?.paymentMethod)?.ID
  const {data:locationOptions} = useGetAccountingListItemById({id: salesLocationsId})
  const {data:cashBankOptions} = useGetAccountingListItemById({ id: cashAndBankId})
  const {data:customerList} = useGetAccountingListItemById({ id: customerId})
  const {data:currencyList} = useGetAccountingListItemById({ id: currencyId})
  const {data:paymentMethodList} = useGetAccountingListItemById({ id: paymentMethodId})

  const {mutate:createTransactionMutate, isPending} = useCreateTransaction() 

  const handleMakePost = () =>{
    
  }
  const handleMakePayment = () =>{
    createTransactionMutate({
      "transaction_type": 0,
      "location": location,
      "payee_account": payeeAccount,
      "cheque_no": getValues('no'),
      "date": getValues('date'),
      "recipient_account": recipientAccount,
      "amount_paid": Number(getValues('amount')),
      "amount_in_words": getValues('amountInWords'),
      "address": getValues('address'),
      "description": getValues('description'),

      "transaction_details": 'tableData',

      "cashback_account": getValues('cashBackAccount'),
      "cashback_amount": Number(getValues('cashBackAmount')),
      "cashback_description": getValues('cashBackDescription'),
      "net_cash_deposited": Number(getValues('netCashDeposited')),

      "amount_due": 0,
      
      "applied_amount": 0,
      
      "credit_applied": 0,
      "customer_balance": 0,
      "discount_applied": 0,
      "original_amount": 0,
      "paid_by": "string",
      "payment_method": 0,
      "payment_type": 0,
      "recipient": "string",
      "status": 0,
      "transfer_class": "string",
      "transfer_type": 0,
      "under_payment": 0,
      "updated_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
      "created_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    })
    setMakePayment(!makePayment)
  }

  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Bank Management"
        pageLink='/finance/banking-management'
        breadcrumbs={breadcrumbs}
      />
      <main className='bg-secondary rounded-[16px] py-6 px-6 mt-4 mx-6'>
        <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
          <div>
            <h2 className='mb-2'>Make Payment </h2>
            <p className='text-gray1-100'>Make payment to anyone from preferred account.</p>
          </div>
          <div>
            <div className='text-primary-normal flex gap-5 justify-between mb-4'>
              <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
              <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
              <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
              <button className='flex gap-1'>Customize <PaintBucket size="16px"/></button>
            </div>
            <div className='flex gap-x-5 text-primary-normal'>
              <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
              <button className='flex gap-1'>Attach file <Paperclip size="16px"/></button>
            </div>
          </div>
        </div>
        <div className='mb-6'>
          <div className='flex gap-4 my-4'>
            <SelectDropdown
              placeholder="Select"
              label="Location"
              options={locationOptions?.data}
              value={location}
              onChange={(value) => setLocation(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <SelectDropdown
              placeholder="Select"
              label="Currency"
              options={currencyList?.data}
              value={currency}
              onChange={(value) => setCurrency(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <div className='flex justify-between items-center w-[340px] h-[50px] bg-[#F0F0F0] rounded-[8px] px-4 mt-7'>
              <p>Exchange rate</p>
              <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-2'>
                <p>$ 1</p>
              </div>
              <Image src='/exchange.svg' alt='exchange rate' width={24} height={24}/>
              <div className='bg-white border border-[#939292] rounded-[4px] px-4 py-2'>
                <p>£ 0.8</p>
              </div>
            </div>
          </div>
          <div className='flex gap-4 my-4'>
            <SelectDropdown
              placeholder="Select"
              label="Pay From"
              options={cashBankOptions?.data}
              value={payFrom}
              onChange={(value) => setPayFrom(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <TextField
              name='endingBalance'
              label='Ending Balance (GBP)'
              placeholder='46,969.10'
              control={control}
            />
            <SelectDropdown
              placeholder="Select"
              label="Payment Method"
              options={paymentMethodList?.data}
              value={paymentMethod}
              onChange={(value) => setPaymentMethod(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
          </div>
          <div className='flex gap-4 my-4'>
            <TextField
              name='date'
              label='Date'
              type='date'
              control={control}
            />
            <TextField
              name='description'
              label='Description'
              placeholder='Payment for Timberloft Lumber'
              variant='long'
              control={control}
            />
            <TextField
              name='paymentId'
              label='Payment ID'
              placeholder='491'
              control={control}
            />
          </div>
        </div>

        <div className='mt-6'>
          <MakeDepositTable
            onDataUpdate={handleTableDataUpdate} 
            customerList = {customerList?.data}
            paymentMethodList = {paymentMethodList?.data}
            currency = {currency}
            allLists = {allLists}
          />

          <p className='font-bold text-right'>Total Amount: 0.00</p>
          
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth 
                onClick={handleMakePost}
              >Post</Button>
            </div>
            <div className='w-[269px]'>
              <Button fullWidth variant='outlined'
                onClick={handleMakePayment}
              >Make Payment & Create New</Button>
            </div>
            <button className='text-primary-normal'
            >Cancel</button>
          </div>
        </div>
      </main>
      {makePayment && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px]">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>setMakePayment(!makePayment)}
          />
          <TriangleAlert size={48} className='text-error mx-auto mb-6'/>
          <p className='max-w-[500px] text-[18px] text-center leading-[29px] mb-4'>Some Bills are unpaid with this vendor. Use the Pay Bills feature
          to get the bills payment correctly</p>
          <div className='flex flex-col md:flex-row justify-center gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth 
                onClick={()=> router.push('/finance/banking-management/pay-bills')}
              >Go to Pay Bills</Button>
            </div>
            <div className='w-[240px]'>
              <Button fullWidth variant='outlined'
                onClick={()=> setMakePayment(!makePayment)}
              >Continue Making Payment</Button>
            </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}
const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'hq', label: 'HQ' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const payOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Bank A' },
	{ value: 'B', label: 'Bank B' },
];
const paymentTypeOptions = [
	{ value: '', label: 'Select' },
	{ value: 'credit', label: 'credit' },
	{ value: 'bills', label: 'Bills' },
];
const makePaymentOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Bayshor Water Lmt' },
	{ value: 'B', label: 'Francisco' },
];

const menuBar = [
  {
    name: "Expenses",
    cost: '£ 45,000.00',
    id: 1
  },
  {
    name: "Inventory",
    cost: '£ 11,425.00',
    id: 2
  },
  {
    name: "Fixed Asset",
    cost: '£ 295,000.00',
    id: 3
  },
  {
    name: "Investment",
    cost: '£ 0.00',
    id: 4
  },
]
const expenses = [
  {
    id: 1,
    investment: 'Furniture and Fittings',
    description: 'Executive Table',
  },
  {
    id: 1,
    investment: 'Furniture and Fittings',
    description: 'Executive Table',
  },
]
export default MakePaymentPage