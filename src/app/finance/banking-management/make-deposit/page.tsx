'use client'
import MakeDepositTable, { Deposit }  from '@/components/finance/bank/MakeDepositTable';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import { Button } from '@/components/reusable/Button';
import { TextField } from '@/components/reusable/TextField';
import { ForwardIcon, PaintBucket, Paperclip, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateTransaction } from '../../hooks/mutate';
import moment from 'moment';
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query';
import SelectDropdown from '@/components/reusable/SelectDropDown';
import Image from 'next/image'
import { ListNames } from '@/constants/lists';


const MakeDepositPage = () => {
  const [location, setLocation] = useState('')
  const [currency, setCurrency] = useState('')
  const [cashBank, setCashBank] = useState('')
  const [cashBack, setCashBack] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [customer, setCustomer] = useState('')
  const [recipientAccount, setRecipientAccount] = useState('')
  const {control, getValues} = useForm()

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  // getting table data
  const [tableData, setTableData] = useState<Deposit[]>([]);
  const handleTableDataUpdate = useCallback((data: Deposit[]) => {
    setTableData(data);
  }, []);

  // CONSOLE
  // console.log(location)
  // console.log(tableData)

  //API CALL
  const {data:allLists} = useGetAccountingList()
  const salesLocationsId = allLists?.find((list:any)=> list?.name === ListNames?.salesLocations)?.ID
  const {data:locationOptions} = useGetAccountingListItemById({id: salesLocationsId})
  const cashAndBankId = allLists?.find((list:any)=> list?.name === ListNames?.cashAndBank)?.ID
  const customerId = allLists?.find((list:any)=> list?.name === ListNames?.customer)?.ID
  const currencyId = allLists?.find((list:any)=> list?.name === ListNames?.currency)?.ID
  const paymentMethodId = allLists?.find((list:any)=> list?.name === ListNames?.paymentMethod)?.ID

  const {data:cashBankOptions} = useGetAccountingListItemById({ id: cashAndBankId})
  const {data:customerList} = useGetAccountingListItemById({ id: customerId})
  const {data:currencyList} = useGetAccountingListItemById({ id: currencyId})
  const {data:paymentMethodList} = useGetAccountingListItemById({ id: paymentMethodId})

  const {mutate:createTransactionMutate, isPending} = useCreateTransaction() 

  const handleMakeDeposit = () => {
    createTransactionMutate({
      "transaction_type": 0,
      "location": {
        id: '95',
        name: location
      },
      "currency": {
        id: '113',
        name: currency
      },
      "recipient_account": {
        id: '67',
        name: cashBank
      },
      "date": getValues('date'),
      "description": getValues('description'),
      "transaction_details": tableData,

      "cashback_account": {
        id: '67',
        name: cashBack
      },
      "cashback_amount": Number(getValues('cashBackAmount')),
      "cashback_description": getValues('cashBackDescription'),
      "net_cash_deposited": Number(getValues('netCashDeposited')),

      "amount_due": 0,
      "amount_paid": 0,
      "applied_amount": 0,
      
      "credit_applied": 0,
      "customer_balance": 0,
      "discount_applied": 0,
      "original_amount": 0,
      "paid_by": "string",
      "payee_account": "string",
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
            <h2 className='mb-2'>Make Deposit </h2>
            <p className='#939292'>Deposit money into a bank account</p>
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
              label="Deposit Funds To"
              options={cashBankOptions?.data}
              value={cashBank}
              onChange={(value) => setCashBank(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <TextField 
              name='date'
              label='Date'
              type='date'
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
              name='description'
              label='Description'
              placeholder='description'
              variant='long'
              control={control}
            />
            <TextField 
              name='depositId'
              label='Deposit ID'
              placeholder='deposit id'
              variant='long'
              control={control}
            />
          </div>
        </div>
        {/* Table *************************************************************************************************/}
        <MakeDepositTable 
          onDataUpdate={handleTableDataUpdate} 
          customerList = {customerList?.data}
          paymentMethodList = {paymentMethodList?.data}
          currency = {currency}
          allLists = {allLists}
        />
        
        <div className='mt-6'>
          <p className='text-gray1-100 text-base mb-4'>Select an account to receive cashbacks from this deposit
          and cash back amount.</p>
          <div className='flex gap-4 mb-4'>
            <SelectDropdown
              placeholder="Select"
              label="Cash Back Account"
              options={cashBankOptions?.data}
              value={cashBack}
              onChange={(value) => setCashBack(value)}
              className="w-[340px] text-base"
              buttonClassName="bg-white"
              labelClassName="font-medium"
            />
            <TextField 
              name='cashBackDescription'
              label='Description'
              placeholder='Cash Back Description'
              control={control}
            />
          </div>
          <div className='flex gap-4 my-4'>
            <TextField 
              name='cashBackAmount'
              label={`Cash Back Amount (${currency})`}
              placeholder='500'
              control={control}
            />
            <TextField 
              name='netCashDeposited'
              label={`Net Cash Deposited (${currency})`}
              placeholder='6,000'
              control={control}
            />
          </div>
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[157px]'>
              <Button fullWidth 
                onClick={handleMakeDeposit}
                disabled = {isPending ? true : false}
              >
                {isPending ? 'LOADING...' : 'Make Deposit'}
              </Button>
            </div>
            <div className='w-[261px]'>
              <Button fullWidth variant='outlined'>Make Deposit & Create New</Button>
            </div>
            <button className='text-primary-normal'
            >Cancel</button>
          </div>
        </div>

      </main>
    </div>
  )
}

export default MakeDepositPage