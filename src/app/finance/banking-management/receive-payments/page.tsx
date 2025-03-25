'use client'
import DiscountAndCredit from '@/components/finance/bank/receive-payment/DiscountAndCredit';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { Button } from '@/components/reusable/Button';
import { TextField } from '@/components/reusable/TextField';
import { CircleDivide, CopyX, CreditCard, Dock, ForwardIcon, NotepadText, PaintBucket, Paperclip, PrinterIcon, ReceiptText, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useCreateTransaction } from '../../hooks/mutate';
import { useCustomers, useEnum, useEnums} from '../../hooks/query';
import moment from 'moment';
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query';
import SelectDropdown from '@/components/reusable/SelectDropDown';
import MakeDepositTable, { Deposit } from '@/components/finance/bank/MakeDepositTable';
import Image from 'next/image';
import { ListNames } from '@/constants/lists';

const ReceivePaymentPage = () => {
  const [customer, setCustomer] = useState('') // customer Id
  const [payment, setPayment] = useState('') // payment id
  const [paidBy, setPaidBy] = useState('')
  const [location, setLocation] = useState('')
  const [currency, setCurrency] = useState('')
  const [payTo, setPayTo] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const {control, getValues} = useForm()
  const [discount, setDiscount] = useState(false)
  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  // getting table data
  const [tableData, setTableData] = useState<Deposit[]>([]);
  const handleTableDataUpdate = useCallback((data: Deposit[]) => {
    setTableData(data);
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

  const {mutate:createTransactionMutate, isPending } = useCreateTransaction() 
  const {data:customers, isPending:customerIsPending} = useCustomers({
    customer_id: '1',
  })

  const selectedCustomer = customers?.find((customerObject:any)=> customerObject?.id == customer)

  const receivePayment = () => {
    createTransactionMutate({
      "location": "string",
      "customer_balance": selectedCustomer?.credit,
      "payment_method": payment,
      "payment_type": 0,
      "cheque_no": getValues('chequeNo'),
      "date": getValues('date'),
      "paid_by": paidBy,
      "amount_due": 0,
      "applied_amount": 0,
      "amount_paid": getValues('amountPaid'),
      "original_amount": 0,
      "under_payment": 0,
      "description": getValues('description'),
      
      "address": "string",
      
      "amount_in_words": "string",
      
      
      "cashback_account": "string",
      "cashback_amount": 0,
      "cashback_description": "string",
      
      "credit_applied": 0,
      
      "discount_applied": 0,
      
      "net_cash_deposited": 0,
      
     
      "payee_account": "string",
      
      "recipient": "string",
      "recipient_account": "string",
      "status": 0,
      "transaction_details": null,
      "transaction_type": 0,
      "transfer_class": "string",
      "transfer_type": 0,
      
      "updated_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS'),
      "created_at": moment(new Date()).format('YYYY-MM-DD HH:MM:SS')
    })
  }

  return (
    <div className='h-[100vh] overflow-scroll'>
      <DiscountAndCredit discount = {discount} setDiscount = {setDiscount}/>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Bank Management"
        pageLink='/finance/banking-management'
        breadcrumbs={breadcrumbs}
      />
      <main className='bg-secondary rounded-[16px] py-6 px-6 mt-4 mx-6'>
        <section>
          <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
            <div>
              <h2 className='mb-2'>Receive Payments</h2>
              <p className='#939292'>Receive payments from everyone.</p>
            </div>
            <div>
              <div className='flex justify-between gap-5 text-primary-normal mb-4'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
                <button className='flex gap-1'>Customize <PaintBucket size="16px"/></button>
                <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
                <button className='flex gap-1'>Attach file <Paperclip size="16px"/></button>
              </div>
              <div className='flex justify-end gap-x-5 text-primary-normal mb-4'>
                <button className='flex gap-1'>View Customer/Invoice <ReceiptText size="16px"/></button>
                <button className='flex gap-1'>Unapply Payments <CopyX size="16px"/></button>
                <button className='flex gap-1'
                  onClick={()=>setDiscount(true)}
                >Discounts & Credits <CircleDivide size="16px"/></button>
              </div>
              <div className='flex justify-end gap-x-5 text-primary-normal'>
                <button className='flex gap-1'>Add Credit Card Processing<CreditCard size="16px"/></button>
                <button className='flex gap-1'>Record Bounced Checks <Dock size="16px"/></button>
              </div>
            </div>
          </div>
          <div className='space-y-4 mb-6'>
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
                label="Pay To"
                options={cashBankOptions?.data}
                value={payTo}
                onChange={(value) => setPayTo(value)}
                className="w-[340px] text-base"
                buttonClassName="bg-white"
                labelClassName="font-medium"
              />
              <TextField
                name='endingBalance'
                label='Ending Balance'
                placeholder='46,969.10'
                value={selectedCustomer?.credit}
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
                name='receiptId'
                label='Receipt ID'
                placeholder='334'
                control={control}
              />
            </div>
            
          </div>
        </section>
        {/* TABLE********************************************************************************************** */}
        <MakeDepositTable 
          onDataUpdate={handleTableDataUpdate} 
          customerList = {customerList?.data}
          paymentMethodList = {paymentMethodList?.data}
          currency = {currency}
          allLists = {allLists}
        />

        <p className='font-bold text-right'>Total Amount: 0.00</p>

        {/* <section className='bg-white rounded-[24px] text-base px-6 py-8 mt-6'>
          <div className='flex flex-col md:flex-row md:justify-between gap-x-4'>
            <div className='space-y-4'>
              <p className='font-semibold'>Amount for Selected Invoice</p>
              <div className='flex justify-between gap-x-4'>
                <p className='text-gray1-100'>Amount Due</p>
                <p className='font-semibold'>66,075</p>
              </div>
              <div className='flex justify-between gap-x-4'>
                <p className='text-gray1-100'>Applied</p>
                <p className='font-semibold'>66,075</p>
              </div>
              <div className='flex justify-between gap-x-4'>
                <button className='text-left text-primary-normal w-[141px]'
                  onClick={()=>setDiscount(true)}
                >Discount & Credits Applied</button>
                <p className='font-semibold'>66,075</p>
              </div>
            </div>
            <div>
              <p className='mb-2'>Underpayment</p>
              <TextField
                name='amountToPay'
                label='Amount to Pay (GBP)'
                placeholder='2,418.00'
                coloredBg
                control={control}
              />
              <div className='flex items-center gap-x-2 text-base'>
                <input type="radio" />
                <label className='text-gray1-100'>Mark as an underpayment</label>
              </div>
              <div className='flex items-center gap-x-2 text-base mb-4'>
                <input type="radio" />
                <label className='text-gray1-100'>Mark as extra amount</label>
              </div>
              <div>
                <Button variant='outlined'>View Customer Information</Button>
              </div>
            </div>
          </div>
        </section> */}
        <section className='mt-6'>
          <div className='flex flex-col md:flex-row items-center gap-6 mt-6'>
            <div className='w-[179px]'>
              <Button fullWidth
                onClick={receivePayment}
              >
                Receive Payment
              </Button>
            </div>
            <div className='w-[287px]'>
              <Button variant='outlined' fullWidth
              >Receive Payment & Create New</Button>
            </div>
            <button className='text-primary-normal'>Cancel</button>
          </div>
        </section>
      </main>
    </div>
  )
}

const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'hq', label: 'HQ' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const customerNameOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'John Smith' },
	{ value: 'B', label: 'Samuel Leo' },
];
const paymentOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Check' },
	{ value: 'B', label: 'Cash' },
];

export default ReceivePaymentPage