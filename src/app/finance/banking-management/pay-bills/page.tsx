'use client'
import PayBillsTable from '@/components/finance/bank/PayBillsTable'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import { Button } from '@/components/reusable/Button'
import { SelectField } from '@/components/reusable/SelectField'
import { TextField } from '@/components/reusable/TextField'
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ForwardIcon, ListFilterIcon, PaintBucket, Paperclip, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const PayBillsPage = () => {
  const {control} = useForm()
  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  const handleMakePayment = () => {

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
        <section>
          <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
            <div>
              <h2 className='mb-2'>Pay Bills</h2>
              <p className='#939292'>Pay vendors from preferred bank accounts</p>
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
          <div className='space-y-4 mb-6'>
            <SelectField
              name='location'
              label='Location'
              options={locationOptions}
              control={control}
            />
              <SelectField
                name='vendorName'
                label='Vendor Name'
                options={vendorOptions}
                control={control}
              />
          </div>
          <div>
            <h3 className='text-base font-semibold'>Select Bills to Pay </h3>
            <div className='flex items-center gap-x-2 text-base'>
              <input type="radio" />
              <label className='text-gray1-100'>Due or on Before</label>
              <TextField
                name='paydate'
                type='date'
                control={control}
              />
            </div>
            <div className='flex items-center gap-x-2 text-base'>
              <input type="radio" />
              <label className='text-gray1-100'>All Bills</label>
            </div>
          </div>
        </section>
        <section className='mt-6'>
          <div className='flex gap-5 text-[#8133F1] mb-4'>
            <button className='flex gap-1 text-[#434343]'>Filter <ListFilterIcon size="16px"/></button>
            <button className='flex gap-1'>Cal & Gas Electric<ChevronDownIcon size="16px"/></button>
            <button className='flex gap-1 text-[#434343]'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
            <button className='flex gap-1'>vendor <ChevronDownIcon size="16px"/></button>
          </div>
          {/* Pay Bills Table */}
          <PayBillsTable/>
        </section>
        <section className='text-base mt-6'>
          <p className='font-semibold mb-4'>Discount & Credit Information for Selected Bill</p>
          
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6'>
            <div className='space-y-2'>
              <p>Vendor: <span className='font-semibold'>Cal Gas & Electric</span></p>
              <p>Bill Ref. No.: <span className='font-semibold'>1303</span></p>
              <div className='w-[145px]'>
                <Button fullWidth  variant='outlined'>Go to Bills</Button>
              </div>
            </div>
            <div className='space-y-2'>
              <p>Terms: <span className='font-semibold'>Net 15</span></p>
              <p>Suggested Discount: <span className='font-semibold'>Net 15</span></p>
              <div className='w-[145px]'>
                <Button fullWidth  variant='outlined'>Set Discount</Button>
              </div>
            </div>
            <div className='space-y-2'>
              <p>NO. Of Credit: <span className='font-semibold'>0</span></p>
              <p>Total Credit Available: <span className='font-semibold'>0</span></p>
              <div className='w-[145px]'>
                <Button fullWidth variant='outlined'>Set credit</Button>
              </div>
            </div>
          </div>

          <div className='mt-6'>
            <p className='font-semibold mb-3'>Payment</p>
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-x-4'>
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
                <div className='flex items-center gap-x-2'>
                  <input type="radio" />
                  <label>To be Printed</label>
                </div>
                <div className='flex items-center gap-x-2'>
                  <input type="radio" />
                  <label>Assign Check Number</label>
                </div>
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
            </div>
            <div className='flex flex-row items-center gap-6 mt-6'>
              <div className='w-[240px]'>
                <Button fullWidth 
                  onClick={handleMakePayment}
                >Pay for Selected Vendors</Button>
              </div>
              <div className='w-fit'>
                <button className='text-primary-normal'
                >Cancel</button>
              </div>
            </div>
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
const vendorOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Cal Gas & Electric' },
	{ value: 'B', label: 'Oil & Gas ltd.' },
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
export default PayBillsPage