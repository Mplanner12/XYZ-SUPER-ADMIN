'use client'
import React, { useState } from 'react'
import {ForwardIcon, PaintBucket, Paperclip, PaperclipIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon, X } from 'lucide-react'
import { MultilineTextField, TextField } from '@/components/reusable/TextField'
import { useForm } from 'react-hook-form'
import BillCreationTable from '@/components/finance/payables/BillCreationTable'
import { Button } from '@/components/reusable/Button'
import Image from 'next/image'

const VendorBillFormPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [warningMessage, setWarningMessage] = useState<string>('')
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
    <div className="bg-primary-normal py-10 px-6">
      <div className="relative w-[95%] max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll px-[50px] py-[50px] ">
        <div className='flex flex-col md:flex-row md:justify-between gap-4mb-6'>
          <div>
            <h2 className='mb-2'>Vendor&apos;s Bill Form</h2>
            <p className='text-gray1-100'>Create A Bill for Company XYZ</p>
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
                onClick={()=>''}
              >Create Bill</Button>
            </div>
            <button className='text-primary-normal'
            >Cancel</button>
          </div>
        </section>
      </div>
      <Image src='/xyz.svg'  alt='close' width={108} height={40} className='mt-10 '
        onClick={()=>''}
      />
    </div>
  )
}

export default VendorBillFormPage