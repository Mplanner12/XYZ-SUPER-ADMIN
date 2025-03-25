'use client'
import { MultilineTextField, TextField } from '@/components/reusable/TextField'
import { ForwardIcon, MessageSquareIcon, PaintBucketIcon, PaperclipIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import BillCreationTable from './BillCreationTable'
import { Button } from '@/components/reusable/Button'
import Dropdown from '@/components/reusable/DropDown'
import { customerOptions } from '@/data/dropDownOption'

const BillCreation = ({setActiveTab}:any) => {
  const [files, setFiles] = useState<File[]>([])
  const [warningMessage, setWarningMessage] = useState<string>('')
  const [sendVendorBillForm, setSendVendorBillForm] = useState(false)
  const [customer, setCustomer] = useState('')
  const [billTo, setBillTo] = useState('')
  const [shipTo, setShipTo] = useState('')
  const {control} = useForm()

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
    <main className='text-base'>
      <div className='flex justify-between mt-6 mb-4'>
        <div>
          <h2 className='mb-2'>Bill Creation</h2>
          <p className='text-gray1-100'>Create bill & entry by vendors</p>
        </div>
        <div className='space-y-4'>
          <div className='text-[#8133F1] flex justify-end items-center gap-5 '>
            <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Print <PrinterIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Share <ForwardIcon size="16px" className='mt-1'/></button>
          </div>
          <div className='text-[#8133F1] flex gap-5 justify-end items-center'>
            <button className='flex gap-1'>Customize<PaintBucketIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Refresh <RotateCwIcon size="16px" className='mt-1'/></button>
            <button className='flex gap-1'>Attach file <PaperclipIcon size="16px" className='mt-1'/></button>
          </div>
          <div className='text-[#8133F1] flex gap-5 justify-end items-center'>
            <button className='flex gap-1' onClick={()=> setSendVendorBillForm(true)}>Send Vendor Bill form <Image src='/arrow-right-short.svg' alt='arrow' width={18} height={18} className='mt-1' /></button>
          </div>
        </div>
      </div>

      <div className='space-y-4'>
        <h3>XYZ Corporation</h3>
        <p>Date: May 1, 2024</p>
        <Dropdown
          placeholder="Select Vendor"
          label='Vendor'
          options={customerOptions}
          value={customer}
          onChange={(value) => setCustomer(value)}
          className="max-w-[340px] text-base"
          buttonClassName="bg-white"
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
            <Dropdown
              placeholder="Select Vendor"
              options={customerOptions}
              value={customer}
              onChange={(value) => setCustomer(value)}
              className="w-[170px] text-base"
              buttonClassName="bg-white"
            />
          </div>
          <MultilineTextField
            name='vendor'
            rows={2}
            variant='short'
            placeholder='431 Hampshire Blvd East Bayshore CA 94327'
            control={control}
          />
        </div>
        <div className='flex flex-col md:flex-row gap-x-4'>
          <div className='flex justify-between items-center gap-x-3 w-[272px] h-fit'>
            <p className='font-semibold'>Bill No</p>
            <Dropdown
              placeholder="Select Customer"
              options={customerOptions}
              value={billTo}
              onChange={(value) => setBillTo(value)}
              className="w-[170px] text-base"
              buttonClassName="bg-white"
            />
          </div>
          <div className='flex items-center gap-x-3 h-fit'>
            <p className='font-semibold'>Ship To</p>
            <Dropdown
              placeholder="Select Customer"
              options={customerOptions}
              value={shipTo}
              onChange={(value) => setShipTo(value)}
              className="w-[170px] text-base"
              buttonClassName="bg-white"
            />
          </div>
          <MultilineTextField
            name='vendor'
            rows={2}
            placeholder='910 Grapeville Ave East Bayshore CA 94327'
            variant='short'
            control={control}
          />
        </div>
        <BillCreationTable/>
        <div className='flex flex-col md:flex-row md:justify-between'>
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
        <div className='flex flex-col md:flex-row gap-x-4'>
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
              onClick={()=> setActiveTab(2)} 
            >Create Bill</Button>
          </div>
          <button className='text-primary-normal'
          >Cancel</button>
        </div>
      </div>
      { sendVendorBillForm && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>setSendVendorBillForm(false)}
          />
          <h2 className='mb-6'>Send Vendor Bill Form</h2>
          <h3 className='text-gray1-100 mb-3'>XYZ Corporation</h3>
          <p className='mb-3'>Date: May 31, 2024</p>
          <p className='mb-3'>Invoice No: 1001</p>
          <div className='max-w-[690px] space-y-4'>
            <div className='flex gap-4'>
              <TextField
                name='preparedBy'
                label='Prepared By'
                font='semibold'
                placeholder='John Doe'
                control={control}
              />
              <TextField
                name='vendorEmail'
                label='Vendor Email'
                font='semibold'
                placeholder='ismith@samplename.com'
                control={control}
              />
            </div>
            <TextField
              name='subject'
              label='Subject'
              font='semibold'
              placeholder='Bill Form for  XYZ Corporation'
              variant='xlong'
              control={control}
            />
            <MultilineTextField
              name='message'
              label='Message'
              font='semibold'
              placeholder='Dear Vendor ABC, Kindly use the link below to create a bill for your payment'
              variant='xlong'
              control={control}
            />
          </div>
          {/* attachment */}
          <div className='mt-8'>
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
          <div className='flex flex-col md:flex-row md:items-center gap-4 mb-4'>
            <div className='flex gap-x-2'>
              <input type='checkbox' />
              <p className='text-primary-normal'>Enable Auto-Send</p>
            </div>
            <div className='flex items-center gap-x-2'>
              <p>Date</p>
              <TextField
                name='date'
                type='date'
                variant='short'
                control={control}
              />
            </div>
            <div className='flex items-center gap-x-2'>
              <p>Time</p>
              <TextField
                name='date'
                type='time'
                variant='short'
                control={control}
              />
            </div>
          </div>
          <div className='w-[340px]'>
            <Button fullWidth
             onClick={()=> ''}
            >Send Bill Form </Button>
          </div>
        </div>
        </div>
      )}
    </main>
  )
}

export default BillCreation