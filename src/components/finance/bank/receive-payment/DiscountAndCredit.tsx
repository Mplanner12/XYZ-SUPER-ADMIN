'use client'
import React, { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Image from 'next/image';
import { SelectField } from '@/components/reusable/SelectField';
import { useForm } from 'react-hook-form';
import { TextField } from '@/components/reusable/TextField';
import { Button } from '@/components/reusable/Button';
import PreviouslyAppliedCreditTable from './PreviouslyAppliedCreditTable';
import AvailableCreditTable from './AvailableCreditTable';
import { X } from 'lucide-react';

const DiscountAndCredit = ({
  discount, setDiscount
} : {
  discount:boolean; 
  setDiscount: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const [menu, setMenu] = useState('Discount')
  const {control} = useForm()
  return (
    <>
      {discount && (
        <div className="flex justify-center items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className='relative mb-10 max-h-[88%]'>
          <button className=" bg-white h-10 absolute z-50 -top-10 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
            onClick={()=>setDiscount(!discount)}
          >
            <X className='text-primary-normal' />
          </button>
          <div className="relative w-fit h-[560px] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] pt-[30px] pb-6">
            <section className="">
              <h2 className='mb-4'>Discounts & Credits</h2>
              <p className='text-[18px] font-semibold'>Invoice</p>
              <div className='flex flex-col md:flex-row md:justify-between gap-x-16 gap-y-4'>
                <div className='flex justify-between gap-x-4'>
                  <div className='text-base text-gray1-100'>
                    <p>Customer Job</p>
                    <p>Number</p>
                    <p>Date</p>
                    <p>Original Amount (GBP)</p>
                  </div>
                  <div className='text-base text-right'>
                    <p>Cook, Brian: Kitchen</p>
                    <p>1066</p>
                    <p>10/18/2024</p>
                    <p>3.100.00</p>
                  </div>
                </div>
                <div className='flex justify-between gap-x-4'>
                  <div className='text-base text-gray1-100'>
                    <p>Amount Due(GBP)</p>
                    <p>Discount Used(GBP)</p>
                    <p>Credit Used(GBP)</p>
                    <p>Balance Due</p>
                  </div>
                  <div className='text-base text-right'>
                    <p>700.00</p>
                    <p>500.00</p>
                    <p>0.00</p>
                    <p>200.00</p>
                  </div>
                </div>
              </div>
            </section>
            <section className='mt-6'>
              {/* Menu */}
              <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-2 no-scrollbar">
                {menuBar?.map(({name, id}:any) => (
                  <p
                    key={id}
                    className={`flex justify-between items-center text-[16px] text-primary-normal px-[8px] py-[5px] cursor-pointer transition flex-shrink-0 ${
                      menu === name ? "bg-primary-normal rounded-[8px] text-white" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setMenu(name);
                    }}
                  >
                    {name} 
                  </p>
                ))}
              </div>
              {/* Contents */}
              {menu === 'Discount' ? (
                // Discount Contents
                <div className='text-base text-gray1-100 mt-6'>
                  <p className='mb-4'>Discount Date</p>
                  <div className=''>
                    <div className='flex items-center justify-between gap-x-4 mb-4'>
                      <p>Terms</p>
                      <p>Net 30</p>
                    </div>
                    <div className='flex items-center justify-between gap-x-4 mb-4'>
                      <p>Suggested Discount (GBP)</p>
                      <p>0.00</p>
                    </div>
                    <div className='flex items-center justify-between gap-x-4'>
                      <p className='w-[220px]'>Amount Discount (GBP)</p>
                      <TextField
                        name='amount'
                        placeholder='500.00'
                        control= {control}
                      />
                    </div>
                    <div className='flex items-center justify-between gap-x-4'>
                      <p className='w-[220px]'>Discount Account</p>
                      <TextField
                        name='account'
                        placeholder='40100 - Construction Income'
                        control= {control}
                      />
                    </div>
                    <div className='flex items-center justify-between gap-x-4'>
                      <p className='w-[220px]'>Discount Class (GBP) </p>
                      <SelectField
                        name='discountClass'
                        options={discountClassOptions}
                        control= {control}
                      />
                    </div>
                  </div>
                  <div className='flex flex-col md:flex-row items-center gap-6 mt-6'>
                    <div className='w-[88px]'>
                      <Button fullWidth
                      >Done</Button>
                    </div>
                    <div className='w-[101px]'>
                      <Button variant='outlined' fullWidth
                        onClick={()=>setDiscount(!discount)}
                      >Cancel</Button>
                    </div>
                    <button className='text-primary-normal'>Help</button>
                  </div>

                </div>
              ) : (
                // Credits Contents
                <div className='text-base text-gray1-100 mt-6'>
                  <p className='mb-4'>Available Credits</p>
                  <AvailableCreditTable/>

                  {/* Previously Applied Credit Table */}
                  <div className='mt-6'>
                    <p className='mb-4'>Previously Applied Credit</p>
                    <PreviouslyAppliedCreditTable setDiscount = {setDiscount}/>
                  </div>
                  
                </div>
              )}
            </section>
          </div>
        </div>
        </div>
      )}
    </>
  )
}
const menuBar = [
  {
    name: "Discount",
    id: 1
  },
  {
    name: "Credits",
    id: 2
  },
]
const discountClassOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Remodel' },
	{ value: 'B', label: 'Cash' },
];
export default DiscountAndCredit