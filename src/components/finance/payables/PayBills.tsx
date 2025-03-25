'use client'
import { SelectField } from '@/components/reusable/SelectField'
import { TextField } from '@/components/reusable/TextField'
import { CircleCheck, ForwardIcon, PaintBucketIcon, PaperclipIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import PayBillsTable from './PayBillsTable'
import { Button } from '@/components/reusable/Button'
import Image from 'next/image'

const PayBills = ({setActiveTab}:any) => {
  const [success, setSuccess] = useState(false)
  const {control} = useForm()

  return (
    <main className='text-base'>
      <div className='flex flex-col md:flex-row md:justify-between gap-4 mt-6 mb-6'>
        <div>
          <h2 className='mb-2'>Pay Bills</h2>
          <p className='text-gray1-100'>Pay for approved bills from vendors.</p>
        </div>
        <div className='space-y-4'>
          <div className='text-[#8133F1] flex items-center flex-wrap sm:flex-nowrap gap-5'>
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
      <div className='max-w-[700px] mb-6'>
        <SelectField
          name='location'
          label='Location'
          options={locationOptions}
          control={control}
        />
        <p className='my-4'>Date: May 1, 2024</p>
        <TextField
          name='preparedBy'
          label='Prepared By'
          font='semibold'
          placeholder='John Doe'
          control={control}
        />
        <div className='mt-6'>
          <p className='font-semibold'>Select Bills to Pay </p>
          <div className='flex flex-col md:flex-row items-center gap-x-2'>
            <div className='flex items-center gap-x-2'>
              <input type="radio" />
              <p className='text-gray1-100'>Due or on Before</p>
            </div>
            <TextField
              name='payDate'
              type='date'
              control={control}
            />
          </div>
          <div className='flex items-center gap-x-2'>
              <input type="radio" />
              <p className='text-gray1-100'>All Bills</p>
            </div>
        </div>
      </div>

      {/* Pay Bills Table */}
      <PayBillsTable />

      <section className='text-base mt-6'>
        <p className='font-semibold mb-4'>Discount & Credit Information for Selected Bill</p>
        
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6'>
          <div className='space-y-2'>
            <p>Vendor: <span className='font-semibold'>Cal Gas & Electric</span></p>
            <p>Bill Ref. No.: <span className='font-semibold'>1303</span></p>
            <div className='w-[124px]'>
              <Button fullWidth variant='outlined'>Go to Bills</Button>
            </div>
          </div>
          <div className='space-y-2'>
            <p>Terms: <span className='font-semibold'>Net 15</span></p>
            <p>Suggested Discount: <span className='font-semibold'>Net 15</span></p>
            <div className='w-[155px]'>
              <Button fullWidth  variant='outlined'>Claim Discount</Button>
            </div>
          </div>
          <div className='space-y-2'>
            <p>NO. Of Credit: <span className='font-semibold'>0</span></p>
            <p>Total Credit Available: <span className='font-semibold'>0</span></p>
            <div className='w-[152px]'>
              <Button fullWidth variant='outlined'>Claim credit</Button>
            </div>
          </div>
        </div>

        <div className='mt-6'>
          <p className='font-semibold mb-3'>Payment</p>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <TextField
              name='date'
              label='Date'
              type='date'
              variant='medium'
              control={control}
            />
            <div>
              <SelectField
                name='method'
                label='Method'
                options={paymentMethodOptions}
                variant='medium'
                control={control}
              />
            </div>
            <div className='space-y-4'>
              <SelectField
                name='payFrom'
                label='Pay From'
                options={accountOptions}
                variant='medium'
                control={control}
              />
              <TextField
                name='endingBalance'
                label='Ending Balance (GBP)'
                placeholder='46,969.10'
                variant='medium'
                coloredBg
                control={control}
              />
            </div>
            <div className='mt-4 sm:mt-0'>
            <TextField
              name='process by'
              label='Processed By'
              placeholder='John Doe'
              variant='medium'
              font='semibold'
              control={control}
            />
            </div>
          </div>
          <div className='flex flex-row items-center gap-6 mt-6'>
            <div className='w-[180px]'>
              <Button fullWidth 
                onClick={()=> setSuccess(!success)}
              >Process Payment</Button>
            </div>
            <div className='w-fit'>
              <button className='text-primary-normal'
              >Cancel</button>
            </div>
          </div>
        </div>
      </section>
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setActiveTab(4)
              setSuccess(!success)}
            }
          />
          <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
          <p>Payment processing is successful</p>
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
const paymentMethodOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Cheque' },
	{ value: 'B', label: 'Cash' },
];
const accountOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: '3098980098' },
	{ value: 'B', label: '4678857804' },
];

export default PayBills