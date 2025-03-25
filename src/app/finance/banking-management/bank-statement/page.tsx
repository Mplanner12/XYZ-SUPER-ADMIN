'use client'
import BankStatementTable from '@/components/finance/bank/BankStatementTable';
import FinanceHeader from '@/components/finance/FinanceHeader'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { SelectField } from '@/components/reusable/SelectField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ChevronLeft, CircleCheck, ForwardIcon, PaintBucketIcon, PrinterIcon, RotateCwIcon, Router, Search, SquareArrowOutUpRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { TextField } from '@/components/reusable/TextField';
import Image from 'next/image';
import { Button } from '@/components/reusable/Button';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/reusable/DropDown';
import { bankOptions } from '@/data/dropDownOption';
import SelectDropdown from '@/components/reusable/SelectDropDown';
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query';

const BankStatementPage = () => {
  const [makeTransfer, setMakeTransfer] = useState(false)
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  const [success, setSuccess] = useState(false)
  const [bank, setBank] = useState('')
  const router = useRouter()
  const {control} = useForm()
  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  //API CALL
  const {data:allLists} = useGetAccountingList()
  const {data:locationOptions} = useGetAccountingListItemById({id: '95'})
  const {data:cashBankOptions} = useGetAccountingListItemById({ id: '67'})

  const handleMakeTransfer = () =>{
    setSuccess(!success)
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
      <main className='bg-secondary rounded-[16px] px-6 pt-4 pb-[100px] mt-6 mx-6'>
        <div className='flex items-center gap-x-2 mb-6'>
          <ChevronLeft className='text-primary-normal' onClick={()=> router.back()} />
          <h2>Bank Statement</h2>
        </div>
        {/* detials and actions */}
        <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
          {/* details */}
          <div className='text-base'>
            <div className='flex items-center gap-2 mb-1'>
              <p className='mt-1'>Bank Name:</p>
              <SelectDropdown
                placeholder="Select Bank Name"
                options={cashBankOptions?.data}
                value={bank}
                onChange={(value) => setBank(value)}
                className="w-[180px] text-base"
                buttonClassName='!px-0 border-none font-semibold'
                labelClassName="font-medium"
              />
            </div>
            <div className='flex gap-4 mb-1'>
              <p>Account Number:  <span className='font-semibold'>2315260100</span></p>
              <p className='mb-1'>Currency: <span className='font-medium'>USD </span></p>
            </div>
            <div className='flex gap-4 mb-1'>
              <div className='flex items-center gap-2'>
                <p className='font-semibold'>Date</p>
                <TextField 
                  name='date'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex items-center gap-2'>
                <p className='font-semibold'>From</p>
                <TextField 
                  name='date'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex items-center gap-2'>
                <p className='font-semibold'>To</p>
                <TextField 
                  name='date'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
            </div>
            <p className='mb-1'>Date: May 31, 2024</p>
            <div className='flex gap-4 mb-1'>
              <p >Opening Balance: <span className='font-medium'>$320,000</span></p>
              <p>Closing Balance: <span className='font-medium'>$325,500</span></p>
            </div>
            <div className='flex gap-4 mb-1'>
              <p>Total Debit Transaction: <span className='font-medium'>$320,000</span></p>
              <p>Total Credit Transaction: <span className='font-medium'>$325,500</span></p>
            </div>
            <div className='flex gap-4'>
              <p>Intra-Bank Transfers: <span className='font-medium'>$120,000</span></p>
              <p>Inter-Bank Transfer: <span className='font-medium'>$25,500</span></p>
            </div>
          </div>
          {/* actions */}
          <div className='flex flex-col justify-between gap-4'>
            <div>
              <div className='text-primary-normal flex justify-end gap-5 mb-4'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
              </div>
              <div className='flex justify-end gap-x-5 text-primary-normal'>
                <button className='flex gap-1'>Customize <PaintBucketIcon size="16px"/></button>
                <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
              </div>
            </div>
            {/* Search */}
            <div className='bg-white w-[250px] h-12 rounded overflow-hidden flex items-center border border-[#CFCECE] ml-auto'>
              <label htmlFor='search' className='flex items-center gap-2 px-4'>
              <Search color='#A1A1AA' />
              </label>
              <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
            </div>
          </div>
        </div>
        <BankStatementTable />
      </main>
      {makeTransfer && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <h2 className='mb-2'>Make Transfer </h2>
          <p className='text-[#939292] mb-4'>Transfer money between accounts</p>
          <div className='flex justify-between gap-4 mb-4'>
            <SelectField
              name='location'
              label='Location'
              options={locationOptions}
              control={control}
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
            <SelectField
              name='type'
              label='Transfer Type'
              options={classOptions}
              control={control}
            />
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <SelectField
              name='transferFund'
              label='Transfer Funds From'
              options={transferFundOptions}
              helperText='Account Currency is Dollars (USD)'
              control={control}
            />
            <TextField
              name='type'
              label='Ending Balance (GBP)'
              placeholder='46,969.10'
              coloredBg
              control={control}
            />
          </div>
          <div className='flex justify-between gap-4 mb-4'>
            <SelectField
              name='receiveFund'
              label='Receiving Account'
              options={receiveFundOptions}
              helperText='Account Currency is Pounds (£)'
              control={control}
            />
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
          <div className='mb-4'>
            <TextField
              name='amount'
              label='Amount to be Transferred (USD)'
              placeholder='Enter Amount'
              control={control}
            />
          </div>
          <TextField
            name='amount'
            label='Description'
            placeholder='Enter Transaction Description'
            variant='xlong'
            control={control}
          />
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
              onClick={()=> setMakeTransfer(!makeTransfer)}
            >Cancel</button>
          </div>
        </div>
      </div>
      )}
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[100px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setSuccess(!success)}
            />
            <div className="text-center">
              <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
              <p className='text-[20px] mb-6'>Transfer is successful.  </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

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
const classOptions = [
	{ value: '', label: 'Select transfer type' },
	{ value: 'Intra-Bank Transfer', label: 'Intra-Bank Transfer' },
	{ value: 'Inter-Bank Transfer', label: 'Inter-Bank Transfer' },
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
export default BankStatementPage