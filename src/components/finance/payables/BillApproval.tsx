'use client'
import { MultilineTextField, TextField } from '@/components/reusable/TextField'
import { ChevronLeft, CircleCheck, Cog, ForwardIcon, PaintBucketIcon, PaperclipIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/reusable/Button'
import { SelectField } from '@/components/reusable/SelectField'
import BillApprovalTable from './BillApprovalTable'

const BillApproval = ({setActiveTab}:any) => {
  const {control} = useForm()
  const [file, setFile] = useState<File | null>(null)
  const [transactionLimit, setTransactionLimit] = useState(false)
  const [TransactionLimitType, setTransactionLimitType] = useState('') //the radio value
  const [financeManager, setFinanceManager] = useState(false)
  const [success, setSuccess] = useState(false)

  const handletransactionLimit = () =>{
    setTransactionLimit(false)
  }

  return (
    <main className='text-base'>
      <div className='flex flex-col md:flex-row md:justify-between gap-4 mt-6 mb-6'>
        <div>
          <h2 className='mb-2'><ChevronLeft className='inline' onClick={()=>setActiveTab(1)}/>Bill Approval</h2>
          <p className='text-gray1-100'>Receive bills from vendors.</p>
        </div>
        <div className='space-y-4'>
          <div className='text-[#8133F1] flex gap-5 items-center'>
            <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Print <PrinterIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Share <ForwardIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Customize <PaintBucketIcon size="16px" className='mt-1'/></button>
          </div>
          <div className='text-[#8133F1] flex gap-5 md:justify-end items-center'>
            <button className='flex gap-1'>Refresh <RotateCwIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Attach file <PaperclipIcon size="16px" className='mt-1'/></button>
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <h3>XYZ Corporation</h3>
        <SelectField
          name='location'
          label='Location'
          options={locationOptions}
          control={control}
        />
        <p className='mt-4'>Date: May 1, 2024</p>
        <TextField
          name='vendor'
          label='Prepared By'
          placeholder='John Doe'
          font='semibold'
          control={control}
        />

        <BillApprovalTable/>
        
        {!financeManager ? (
          <div className='space-y-4'>
            <h3 className='font-semibold text-gray1-100'>Supervisor Approval</h3>
            <div className='flex flex-col md:flex-row gap-x-4'>
              <TextField
                name='approvedBy'
                label='Approved By'
                placeholder='John Doe'
                font='semibold'
                variant='medium'
                control={control}
              />
              <TextField
                name='approvalDate'
                label='Approval Date'
                font='semibold'
                type='date'
                variant='medium'
                control={control}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-x-4'>
              <TextField
                name='transactionLimit'
                label='Transaction Limit (USD)'
                placeholder='20,000'
                font='semibold'
                variant='medium'
                control={control}
              />
              <SelectField
                name='transactionLimitType'
                label='Transaction Limit Type'
                options={transactionTypeOptions}
                font='semibold'
                variant='medium'
                control={control}
              />
              <button className='flex items-center gap-x-2 mt-4 text-primary-normal'
              onClick={()=>setTransactionLimit(true)}
              >
                <Cog className = 'text-primary-normal' />
                <p className=''>Transaction Limit Settings </p>
              </button>
            </div>
            <div className='flex flex-col md:flex-row gap-6 mt-6'>
              <div className='w-[197px]'>
                <Button fullWidth
                  onClick={()=> setFinanceManager(true)}
                >Approve Vendor Bill</Button>
              </div>
              <div className='w-[101px]'>
                <Button fullWidth variant='outlined'
              >Cancel</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            <h3 className='font-semibold text-gray1-100'>Finance Manager Approval</h3>
            <div className='flex flex-col md:flex-row gap-4 mb-4'>
              <TextField
                name='approvedBy'
                label='Approved By'
                placeholder='John Doe'
                font='semibold'
                variant='medium'
                control={control}
              />
              <TextField
                name='approvalDate'
                label='Approval Date'
                font='semibold'
                type='date'
                variant='medium'
                control={control}
              />
              <SelectField
                name='approvalStatus'
                label='Approval Status'
                options={approvalStatusOptions}
                font='semibold'
                variant='medium'
                control={control}
              />
            </div>
            <SelectField
              name='payFrom'
              label='Pay From'
              options={payFromOptions}
              font='semibold'
              variant='medium'
              control={control}
            />
            <div className='flex flex-col md:flex-row gap-6 mt-6'>
              <div className='w-[197px]'>
                <Button fullWidth
                  onClick={()=>setSuccess(!success)}
                >Approve Vendor Bill</Button>
              </div>
              <div className='w-[101px]'>
                <Button fullWidth variant='outlined'
              >Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {transactionLimit && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>setTransactionLimit(false)}
          />
          <h2 className='mb-[50px]'>Transaction Limit Settings</h2>
          <div className=''>
            <TextField 
              name='transactionLimit'
              label='Transaction Limit (USD)'
              placeholder='20,000'
              control={control}
            />
            <h3 className='mt-4 mb-2'>Select Transaction Limit Type</h3>
            <div className='flex items-center gap-x-4'>
              <input type="radio" onChange={() => setTransactionLimitType("Bill Amount")} />
              <p>Bill Amount ( Based on amount on Vendor bill)</p>
            </div>
            <div className='flex items-center gap-x-4'>
              <input type="radio" onChange={() => setTransactionLimitType("Bill Amount")} />
              <p>Payment Amount ( Based on Single payment amount)</p>
            </div>
            <div className='flex items-center gap-x-4'>
              <input type="radio" onChange={() => setTransactionLimitType('Bill Amount')} />
              <p>Contract Amount ( Based on contract amount with vendor)</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row gap-6 mt-6'>
            <div className='w-[340px]'>
              <Button fullWidth 
                onClick={handletransactionLimit}
              >Save Changes</Button>
            </div>
            <div className='w-[340px]'>
              <Button fullWidth variant='outlined'
                onClick={()=>setTransactionLimit(false)}
              >Cancel</Button>
            </div>
          </div>
        </div>
        </div>
      )}
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setActiveTab(3)
              setSuccess(!success)}
            }
          />
          <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
          <p>Vendor Bill Approved For Payment</p>
        </div>
        </div>
      )}
    </main>
  )
}
const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'hq', label: 'HQ' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const transactionTypeOptions = [
	{ value: '', label: 'Select transaction limit type' },
	{ value: 'Bill Amount', label: 'Bill Amount' },
	{ value: 'Bill Amount', label: 'Bill Amount' },
];
const approvalStatusOptions = [
	{ value: '', label: 'Select aproval status' },
	{ value: '', label: 'Approved' },
	{ value: '', label: 'Pending' },
];
const payFromOptions = [
	{ value: '', label: 'Select account' },
	{ value: '', label: '10100- Checking' },
	{ value: '', label: 'Pending' },
];
export default BillApproval