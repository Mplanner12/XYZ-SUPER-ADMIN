'use client'
import { SelectField } from '@/components/reusable/SelectField'
import { MultilineTextField, TextField } from '@/components/reusable/TextField'
import { CalculatorIcon, ChevronLeft, CircleCheck, ForwardIcon, PaintBucket, Paperclip, PaperclipIcon, PrinterIcon, RotateCwIcon, ScrollTextIcon, SquareArrowOutUpRightIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import BillReceiptTable from './BillReceiptTable'
import { Button } from '@/components/reusable/Button'
import BillCreationTable from './BillCreationTable'
import { useRouter } from 'next/navigation'

const BillReceipt = ({setBillReceipt, setBillDetails }:any) => {
  const [files, setFiles] = useState<File[]>([])
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [supplierBillForm, setsupplierBillForm] = useState(false)
  const {control} = useForm()
  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files as FileList;
    if (fileList && fileList.length > 0) {
      const newFiles: File[] = [];
      const duplicateFiles: string[] = [];

      Array.from(fileList).forEach(newFile => {
        if (files.some(existingFile => 
          existingFile.name === newFile.name && existingFile.size === newFile.size
        )) {
          duplicateFiles.push(newFile.name);
        } else {
          newFiles.push(newFile);
        }
      });

      if (duplicateFiles.length > 0) {
        setWarningMessage(`This file already exist: ${duplicateFiles.join(', ')}`);
        setTimeout(() => setWarningMessage(''), 5000); // Clear warning after 5 seconds
      }

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    }
  }

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }
  return (
    <div className='mt-6'>
      <div className='flex flex-col md:flex-row justify-between gap-4 mb-6'>
        <div>
          <h2 className='mb-2'><ChevronLeft className ='inline' onClick={()=>{
            setBillReceipt(false)
            }}/> Bill Receipt</h2>
          <p className='text-gray1-100'>Receive bills from vendors.</p>
        </div>
        <div className='space-y-4'>
          <div className='text-primary-normal flex gap-5 justify-end'>
            <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
            <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
            <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
          </div>
          <div className='flex justify-end gap-x-5 text-primary-normal'>
            <button className='flex gap-1'>Customize <PaintBucket size="16px"/></button>
            <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
            <button className='flex gap-1'>Attach file <Paperclip size="16px"/></button>
          </div>
          <div className='flex justify-end gap-x-5 text-primary-normal'>
          <button className='flex gap-1' onClick={()=>''}>Create Bill<ScrollTextIcon size="16px"/></button>
          <button className='flex gap-1' onClick={ () => router.push('/finance/payables/create-purchase-order')}>Create Purchase Order <CalculatorIcon size="16px"/></button>
            <button className='flex gap-1'>Send Vendor Bill form <Image src='/arrow-right-short.svg' alt='arrow' width={18} height={18} className='' /></button>
          </div>
        </div>
      </div>
      <div className='max-w-[700px] mb-6'>
        <h3 className='mb-6'>XYZ Corporation</h3>
        <SelectField
          name='location'
          label='Location'
          options={locationOptions}
          control={control}
        />
        <p className='mt-4'>Date: May 1, 2024</p>
        <div className='flex gap-4 my-4'>
          <SelectField
            name='vendor'
            label='Vendor'
            options={vendorOptions}
            control={control}
          />
          <TextField
            name='preparedBy'
            label='Prepared By'
            font='semibold'
            placeholder='John Doe'
            control={control}
          />
        </div>
      </div>
      {/* Bill Receipt Table */}
      <BillReceiptTable  setBillDetails = {setBillDetails }/>
      {/* attachment */}
      <div className='flex flex-col md:flex-row gap-x-4 mt-8'>
        <p className='font-semibold'>Attachment</p>
        <label htmlFor='file'>
          <input id='file' type="file" className='hidden' 
            multiple
            onChange={handleFileChange}
          />
          <div className='flex gap-1 text-[#8133F1]'>Attach file <PaperclipIcon size="16px" className='mt-1'/></div>
        </label>
      </div>
      {/* warning message for upload of multiple file */}
      {warningMessage && (
        <div className=' w-fit mt-2 text-red-600 bg-red-100 p-2 rounded'>
          {warningMessage}
        </div>
      )}
      {/* list of attachment value with close button on each of them*/}
      <div className='flex flex-wrap gap-2 mt-4'>
        {files.map((file, index) => (
          <div key={index} className='flex items-center bg-[#F0F0F0] rounded-[8px] px-3 py-2'>
            <span className='text-sm'>{file.name}</span>
            <button 
              onClick={() => removeFile(file)}
              className='ml-2 text-primary-normal hover:text-red-500'
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>
      <div className='my-4'>
        <TextField
          name='comment'
          label='Comments'
          placeholder='John Doe'
          variant='xlong'
          control={control}
        />
      </div>
      {/* Button */}
      <div className='flex flex-col md:flex-row gap-6 mt-6'>
        <div className='w-[187px]'>
          <Button fullWidth
            onClick={()=> ''} 
          >Record Vendor Bill</Button>
        </div>
        <button className='text-primary-normal'
        >Cancel</button>
      </div>

      { supplierBillForm && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-[95%] max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>setsupplierBillForm(false)}
          />
          <div className='flex flex-col md:flex-row md:justify-between gap-4mb-6'>
            <div>
              <h2 className='mb-2'>Bill Receipt Form</h2>
              <p className='text-gray1-100'>Bill From Vendor XYZ</p>
            </div>
            <div className='space-y-4'>
              <div className='text-[#8133F1] flex gap-5 items-center'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px" className='mt-1'/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px" className='mt-1'/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px" className='mt-1'/></button>
              </div>
              <div className='text-[#8133F1] flex gap-5 md:justify-end items-center'>
                <button className='flex gap-1'>Refresh <RotateCwIcon size="16px" className='mt-1'/></button>
                <button className='flex gap-1'>Attach file <PaperclipIcon size="16px" className='mt-1'/></button>
              </div>
            </div>
          </div>
          <section>
            <h3 className='text-gray1-100 mb-3'>XYZ Corporation</h3>
            <p className='mb-3'>Date: May 31, 2024</p>
            <TextField
              name='vendor'
              label='Vendor'
              placeholder='Enter Vendor Name'
              control={control}
            />
            <div className='flex flex-col md:flex-row gap-x-4'>
              <div className='flex justify-between items-center gap-x-3 w-[272px] h-fit'>
                <p className='font-semibold'>Bill Date</p>
                <TextField
                  name='billDate'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex items-center gap-x-3 h-fit'>
                <p className='font-semibold'>Vendor</p>
                <TextField
                  name='vendorName'
                  placeholder='Vendor xyx'
                  variant='short'
                  control={control}
                />
              </div>
              <MultilineTextField
                name='vendor'
                rows={2}
                variant='short'
                placeholder='431 Hampshire Blvd East Bayshore'
                control={control}
              />
            </div>
            <div className='flex flex-col md:flex-row gap-x-4'>
              <div className='flex justify-between items-center gap-x-3 w-[272px] h-fit'>
                <p className='font-semibold'>BillNo</p>
                <TextField
                  name='billNo'
                  variant='short'
                  placeholder='BO-1001'
                  control={control}
                />
              </div>
              <div className='flex items-center gap-x-3 h-fit'>
                <p className='font-semibold'>Ship To</p>
                <TextField
                  name='vendorName'
                  placeholder='Customer XYZ'
                  variant='short'
                  control={control}
                />
              </div>
              <MultilineTextField
                name='vendor'
                rows={2}
                placeholder='910 Grapeville Ave East Bayshore'
                variant='short'
                control={control}
              />
            </div>
            {/* second use of this button */}
            <BillCreationTable /> 
            <div className='flex flex-col md:flex-row md:justify-between mt-5'>
              <div className='space-y-4'>
                <TextField
                  name='vendorMessage'
                  label='Vendor Message'
                  placeholder='Customer XYZ'
                  variant='medium'
                  control={control}
                />
                <TextField
                  name='vendorName'
                  label='Description'
                  placeholder='Customer XYZ'
                  variant='medium'
                  control={control}
                />
              </div>
              <div className='flex flex-col md:flex-row md:justify-between gap-x-8 h-fit md:mr-10'>
                <div className='space-y-4'>
                  <p>Sub Total</p>
                  <p>VAT</p>
                  <p>Total</p>
                </div>
                <div className='space-y-4'>
                  <p>1600.00</p>
                  <p>120.00</p>
                  <p>1,800.00</p>
                </div>
              </div>
            </div>
            {/* attachment */}
            <div className='flex flex-col md:flex-row gap-x-4 mt-4'>
              <p className='font-semibold'>Attachment</p>
              <label htmlFor='file'>
                <input id='file' type="file" className='hidden' 
                  multiple
                  onChange={handleFileChange}
                />
                <div className='flex gap-1 text-[#8133F1]'>Attach file <PaperclipIcon size="16px" className='mt-1'/></div>
              </label>
            </div>
            {warningMessage && (
              <div className=' w-fit mt-2 text-red-600 bg-red-100 p-2 rounded'>
                {warningMessage}
              </div>
            )}
            {/* list of attachment value with close button on each of them*/}
            <div className='flex flex-wrap gap-2 mt-4'>
              {files.map((file, index) => (
                <div key={index} className='flex items-center bg-[#F0F0F0] rounded-[8px] px-3 py-2'>
                  <span className='text-sm'>{file.name}</span>
                  <button 
                    onClick={() => removeFile(file)}
                    className='ml-2 text-primary-normal hover:text-red-500'
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>
            {/* Button */}
            <div className='flex flex-col md:flex-row gap-6 mt-6'>
              <div className='w-[125px]'>
                <Button fullWidth
                  onClick={()=>setsupplierBillForm(false)}
                >Create Bill</Button>
              </div>
              <button className='text-primary-normal'
              >Cancel</button>
            </div>
          </section>
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
const vendorOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Vendor ABC' },
	{ value: 'B', label: 'Vendor A' },
];

export default BillReceipt