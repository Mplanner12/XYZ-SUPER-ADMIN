'use client'
import { Button } from '@/components/reusable/Button'
import { TextField } from '@/components/reusable/TextField'
import { ChevronLeft, CircleCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ReceiptsTable from '../bank/reconcile/ReceiptsTable'
import Image from 'next/image'
import BankStatementTable from './BankStatementTable'
import AccountingRecordsTable from './AccountingRecordsTable'
import MatchingTable from './MatchingTable'

const ReconcileBill = ({setActiveTab}:any) => {
  const [success, setSuccess] = useState(false)
  const [viewReconcillation, setViewReconcillation] = useState(false)
  const [saveChanges, setSaveChanges] = useState(false)
  const {control} = useForm()

  const handleMatch = () => {
    setSuccess(!success)
  }

  const handleSaveChanges = () => {
    setSaveChanges(!saveChanges)
  }
  return (
    <main className='text-base'>
      <div className='flex items-center gap-x-2 mt-6 mb-6'>
        <ChevronLeft className='text-primary-normal' onClick={()=>''} />
        <h2>Bank Reconciliation For Vendor A</h2>
      </div>
      <p className='text-[20px] font-medium'>XYZ Corporation</p>
      {/* form */}
      <div className='mt-6'>
        <div className='flex flex-col md:flex-row  gap-x-6 mb-4'>
          <p className='text-base'>Location: <span className='font-medium'>HQ</span></p>
          <p className='text-base'>Currency: <span className='font-medium'>USD</span></p>
        </div>
        <TextField
          name='prepared'
          label='Prepared By'
          font='semibold'
          placeholder = 'Enter your name'
          control ={control}
        />
        <p className='mt-4 text-base'>Date: May 31, 2024</p>
        <div className='mt-4'>
        {viewReconcillation  ? (
          <div className='flex flex-col md:flex-row gap-6 mb-4'>
            <div>
              <p className='text-base font-semibold mb-2'>Closing Balance (GBP)</p>
              <p className='text-[#727171] mb-2'> Balance at Last Date Reconciled: May 31, 2024 </p>
              <TextField
                name='closing'
                placeholder = '70,000.00'
                coloredBg
                control ={control}
              />
            </div>
            <div>
              <p className='text-base font-semibold mb-2'>Opening Balance (GBP)</p>
              <p className='text-[#727171] mb-2'>Opening balance at Current Date: June 31, 2024 </p>
              <TextField
                name='opening'
                placeholder = '10,000.00'
                coloredBg
                control ={control}
              />
            </div>
          </div> 
          ) : (
            <div>
              <p className='text-base font-semibold mb-2'>Net Balance (GBP)</p>
              <p className='text-[#727171] mb-2'>Net balance at Current Date: June 31, 2024 </p>
              <TextField
                name='net'
                placeholder = '+30,000.00'
                coloredBg
                control ={control}
              />
            </div>
          )}
        </div>
      </div>

      <div className='mt-5'>
        <div className='mb-4'>
          <h3 className='text-[20px] fornt-semibold mb-2 '>Bank Statement Payments (DR)</h3>
          <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
        </div>
        {/* table */}
        <BankStatementTable />

        {/* Accounting Recoding Receipt */}
        <div className='mt-6'>
          <div className='mb-4'>
            <h3 className='text-[20px] fornt-semibold mb-2 '>Accounting Records Receipts (DR)</h3>
            <p className='text-[16px] text-[#727171]'>Use the selection tool to match accounts for reconciliation.</p>
          </div>
          <AccountingRecordsTable />
          {viewReconcillation || (
            <div className='flex flex-col md:flex-row gap-6 mt-6'>
              <div className='w-[340px]'>
                <Button fullWidth 
                  onClick={handleMatch}
                >Match Selected Transaction</Button>
              </div>
              <div className='w-[340px]'>
                <Button fullWidth variant='outlined'>Cancel</Button>
              </div>
            </div>
          ) }
        </div>

        {/* Matching and Reconciliation Table */}
        { viewReconcillation  && (
          <div className='mt-6'>
            <div className='mb-4'>
              <h3 className='text-[20px] fornt-semibold mb-2 '>Matching and Reconciliation Table</h3>
              <p className='text-[16px] text-[#727171]'>This table shows reconciled transactions based on your selection.</p>
            </div>
            <MatchingTable />
            <div className='flex flex-col md:flex-row gap-6 mt-6'>
              <div className='w-[340px]'>
                <Button fullWidth 
                  onClick={handleSaveChanges}
                >Save Changes</Button>
              </div>
              <div className='w-[340px]'>
                <Button fullWidth variant='outlined'>Cancel</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-[#fafafa] z-50 overflow-y-scroll no-scrollbar px-[50px] py-[100px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setSuccess(!success)}
            />
            <div className="text-center">
              <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
              <p className='text-[20px] mb-6'>Transaction Matching is successful</p>
              <Button fullWidth 
                onClick={()=>{
                  setViewReconcillation(true)
                  setSuccess(!success)
                }}
              >View Reconciliation Table</Button>
            </div>
          </div>
        </div>
      )}
      {saveChanges && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
          <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
            <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
              onClick={()=>setSaveChanges(!saveChanges)}
            />
            <div className="text-center">
              <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
              <p className='text-[20px] mb-6'>Changes Saved</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
const bankOptions= [
  { value: '', label: 'Select bank'},
  { value: '1', label: 'Bank A'},
  { value: '2', label: 'Bank B'},
  { value: '4', label: 'Bank C'},
];
const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
export default ReconcileBill