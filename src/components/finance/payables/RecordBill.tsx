'use client'
import { Button } from '@/components/reusable/Button'
import EmptyState from '@/components/reusable/EmptyState'
import { SelectField } from '@/components/reusable/SelectField'
import { TextField } from '@/components/reusable/TextField'
import { Bird, ChevronLeft, CircleCheck, ForwardIcon, PaintBucketIcon, PaperclipIcon, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ExpensesTable from './recordBill/ExpensesTable'
import InventoryTable from './recordBill/InventoryTable'
import FixedAssetTable from './recordBill/FixedAssetTable'
import InvestmentTable from './recordBill/InvestmentTable'

const RecordBill = ({setActiveTab}:any) => {
  const [menu, setMenu] = useState('Expenses')
  const [success, setSuccess] = useState(false)
  const [paymentType, setPaymentType] = useState('credit');
  const {control} = useForm()

  return (
    <main className='text-base'>
      <div className='flex flex-col md:flex-row md:justify-between gap-4 mt-6 mb-6'>
        <div>
          { paymentType === 'credit' ? 
            <h2 className='mb-2'><ChevronLeft className ='inline' onClick={()=>''}/>Record Payment</h2> : 
            <h2 className='mb-2'><ChevronLeft className ='inline' onClick={()=>''}/>Record Bill</h2>
          }
          <p className='text-gray1-100'>Raise other bills without approval</p>
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
      <div className='flex flex-col md:flex-row md:items-center gap-2 mb-4'>
        <p className='font-semibold'>Select Payment to Record </p>
        <div className='flex gap-x-3'>
          <p> <input type='radio' name='bill' value="credit"
            checked={paymentType === 'credit'}
            onChange={() => setPaymentType('credit')}
          /> Credit</p>
          <p> <input type='radio' name='bill' value="bills"
            checked={paymentType === 'bills'}
            onChange={() => setPaymentType('bills')}
          /> Bills</p>
        </div>
      </div>
      <SelectField
        name='location'
        label='Location'
        options={locationOptions}
        control={control}
      />
      {paymentType === 'credit' ? (
        //display when select Credit
        <div className='bg-white rounded-[16px] px-6 py-8 mt-8'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4'>
            <TextField
              name='date'
              label='Date'
              type='date'
              control={control}
            />
            <TextField
              name='number'
              label='NO.'
              placeholder='491'
              variant='short'
              control={control}
            />
          </div>
          <div className='flex flex-col sm:flex-row sm:items-center gap-4 mb-4'>
            <SelectField
              name='vendor'
              label='Vendor'
              options={vendorOptions}
              control={control}
            />
            <TextField
              name='number'
              label='Credit Amount(GBP)'
              placeholder='11,425.00'
              control={control}
            />
          </div>
          
          <div className='space-y-4 max-w-[700px]'>
            <TextField
              name='amountInWords'
              label='Amount In words'
              placeholder='Eleven Thousand Four Hundred & Twenty Five Dollars'
              variant='xlong'
              control={control}
            />
            <TextField
              name='description'
              label='Description'
              placeholder='Payment for Timberloft Lumber'
              variant='xlong'
              control={control}
            />
          </div>
        </div> 
      ) : (
        //display whne bills is selected 
        <div className='bg-white rounded-[16px] px-6 py-8 mt-8'>
          <TextField
            name='number'
            label='NO.'
            placeholder='491'
            variant='short'
            control={control}
          />
          <div className='flex gap-4 my-4'>
            <TextField
              name='date'
              label='Date'
              type='date'
              control={control}
            />
            <SelectField
              name='paymentType'
              label='Payment Type'
              options={paymentTypeOptions}
              control={control}
            />
            
          </div>
          <div className='flex gap-4 my-4'>
            <SelectField
              name='paymentTo'
              label='Make Payment to'
              options={makePaymentOptions}
              control={control}
            />
            <TextField
              name='amount'
              label='Amount(GBP)'
              placeholder='46,969.10'
              control={control}
            />
          </div>
          <div className='space-y-4 max-w-[700px]'>
            <TextField
              name='amountInWords'
              label='Amount In words'
              placeholder='Eleven Thousand Four Hundred & Twenty Five Dollars'
              variant='xlong'
              control={control}
            />
            <TextField
              name='address'
              label='Address'
              placeholder='Bayshore Water 456 Old Bayshore Road Bayshore CA 94326.'
              variant='xlong'
              control={control}
            />
            <TextField
              name='description'
              label='Description'
              placeholder='Payment for Timberloft Lumber'
              variant='xlong'
              control={control}
            />
          </div>
        </div>
      )}
      <section className='mt-6'>
        {/* Menu */}
        <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar mb-6">
          {tabs?.map(({name, cost, id}:any) => (
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
              {name} {cost}
            </p>
          ))}
        </div>

        {/* Contents */}
        {menu === 'Expenses' ? (
          // Expenses Table Contents
          <ExpensesTable/>
          // <div className="w-full mx-auto overflow-x-auto no-scrollbar">
          //   <table className="min-w-full bg-white border border-[#EAECF0]">
          //     <thead className="font-semibold border border-[#EAECF0] shadow-sm">
          //       <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
          //         <th className="py-6 px-4 font-semibold text-nowrap text-left">
          //           <p>Account</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Amount</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Description</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Customer & Job</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>BIllable</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>List</p>
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
          //       {expenses?.length > 0 ?  expenses?.map((item:any, index:any) => (
          //         <tr
          //           key={index}
          //           className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
          //         >
          //           <td className="px-4 py-6 whitespace-nowrap text-left">
          //             63900-Rent
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             45,000
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             Annual Rent
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             John Smith: Remodel
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             <div className="flex justify-center ">
          //               <input type='checkbox' />
          //             </div>
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             New Construction
          //           </td>
          //         </tr>
          //       )) : (
          //         <div className='w-full'>
          //         <EmptyState
          //           img={
          //             <Bird
          //               size={150}
          //               className="text-[#C29E57] bg-orange-50 p-1 rounded-lg"
          //             />
          //           }
          //           title={`No Record Found`}
          //           text={`Oops! It seems that there is no record`}
          //         />
          //         </div>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
        ) : menu === 'Inventory' ? (
          // Inventory Table Contents
          <InventoryTable/>
          // <div className="w-full mx-auto overflow-x-auto no-scrollbar">
          //   <table className="min-w-full bg-white border border-[#EAECF0]">
          //     <thead className="font-semibold border border-[#EAECF0] shadow-sm">
          //       <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
          //         <th className="py-6 px-4 font-semibold text-nowrap text-left">
          //           <p>Inventory</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Description</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Qty</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>UoM</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Cost(GBP)</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Amount</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Customer & Job</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>BIllable</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>List</p>
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
          //       {expenses?.length > 0 ?  expenses?.map((item:any, index:any) => (
          //         <tr
          //           key={index}
          //           className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
          //         >
          //           <td className="px-4 py-6 whitespace-nowrap text-left">
          //             Lumber Tim
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             Trim Lumber
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             20
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             4750
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap `}>
          //             95,000
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap`}>
          //             John Smith: Remodel
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             <div className="flex justify-center ">
          //               <input type='checkbox' />
          //             </div>
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             New Construction
          //           </td>
          //         </tr>
          //       )) : (
          //         <div className='w-full'>
          //         <EmptyState
          //           img={
          //             <Bird
          //               size={150}
          //               className="text-[#C29E57] bg-orange-50 p-1 rounded-lg"
          //             />
          //           }
          //           title={`No Record Found`}
          //           text={`Oops! It seems that there is no record`}
          //         />
          //         </div>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
        ) : menu === 'Fixed Asset' ? (
          // Fixed Asset Table Contents
          <FixedAssetTable/>
          // <div className="w-full mx-auto overflow-x-auto no-scrollbar">
          //   <table className="min-w-full bg-white border border-[#EAECF0]">
          //     <thead className="font-semibold border border-[#EAECF0] shadow-sm">
          //       <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
          //         <th className="py-6 px-4 font-semibold text-nowrap text-left">
          //           <p>Fixed Asset</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Description</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Qty</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>UoM</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Cost(GBP)</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Amount</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Customer & Job</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>BIllable</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>List</p>
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
          //       {expenses?.length > 0 ?  expenses?.map((item:any, index:any) => (
          //         <tr
          //           key={index}
          //           className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
          //         >
          //           <td className="px-4 py-6 whitespace-nowrap text-left">
          //             Lumber Tim
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             Trim Lumber
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             20
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             4750
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap `}>
          //             95,000
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap`}>
          //             John Smith: Remodel
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             <div className="flex justify-center ">
          //               <input type='checkbox' />
          //             </div>
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             New Construction
          //           </td>
          //         </tr>
          //       )) : (
          //         <div className='w-full'>
          //         <EmptyState
          //           img={
          //             <Bird
          //               size={150}
          //               className="text-[#C29E57] bg-orange-50 p-1 rounded-lg"
          //             />
          //           }
          //           title={`No Record Found`}
          //           text={`Oops! It seems that there is no record`}
          //         />
          //         </div>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
        ) : (
          // Investment Table Contents
          <InvestmentTable/>
          // <div className="w-full mx-auto overflow-x-auto no-scrollbar">
          //   <table className="min-w-full bg-white border border-[#EAECF0]">
          //     <thead className="font-semibold border border-[#EAECF0] shadow-sm">
          //       <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
          //         <th className="py-6 px-4 font-semibold text-nowrap text-left">
          //           <p>Investment</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Description</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Qty</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>UoM</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Cost(GBP)</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Amount</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>Customer & Job</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>BIllable</p>
          //         </th>
          //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
          //           <p>List</p>
          //         </th>
          //       </tr>
          //     </thead>
          //     <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
          //       {expenses?.length > 0 ?  expenses?.map((item:any, index:any) => (
          //         <tr
          //           key={index}
          //           className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
          //         >
          //           <td className="px-4 py-6 whitespace-nowrap text-left">
          //             {item?.investment}
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             {item?.description}
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             20
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             4750
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap `}>
          //             95,000
          //           </td>
          //           <td className={`px-5 py-4 whitespace-nowrap`}>
          //             John Smith: Remodel
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             <div className="flex justify-center ">
          //               <input type='checkbox' />
          //             </div>
          //           </td>
          //           <td className="px-4 py-4 whitespace-nowrap">
          //             New Construction
          //           </td>
          //         </tr>
          //       )) : (
          //         <div className='w-full'>
          //         <EmptyState
          //           img={
          //             <Bird
          //               size={150}
          //               className="text-[#C29E57] bg-orange-50 p-1 rounded-lg"
          //             />
          //           }
          //           title={`No Record Found`}
          //           text={`Oops! It seems that there is no record`}
          //         />
          //         </div>
          //       )}
          //     </tbody>
          //   </table>
          // </div>
        )}
        <div className='flex flex-col md:flex-row gap-6 mt-6'>
          <div className='w-[157px]'>
            <Button fullWidth 
              onClick={()=>setSuccess(!success)}
            >Record Payment</Button>
          </div>
          <div className='w-[269px]'>
            <Button fullWidth variant='outlined'>Record Payment & Create New</Button>
          </div>
          <button className='text-primary-normal'
          >Cancel</button>
        </div>
      </section>
      {success && (
        <div className="flex items-center animate-jump fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-[#3a3a3a]/30 backdrop-blur-[8px] py-8">
        <div className="relative w-fit max-h-[95%] mx-auto rounded-[16px] bg-white z-50 overflow-y-scroll no-scrollbar px-[50px] py-[50px] ">
          <Image src='/close-white-bg.svg'  alt='close' width={48} height={48} className='absolute top-0 right-0'
            onClick={()=>{
              setActiveTab(5)
              setSuccess(!success)}
            }
          />
          <CircleCheck size={58} fill='#00A814' className="text-white mx-auto mb-4"/>
          <p>Payment recording is successful</p>
        </div>
        </div>
      )}
    </main>
  )
}
const locationOptions = [
	{ value: '', label: 'Select location' },
	{ value: 'lagos', label: 'Lagos' },
	{ value: 'abuja', label: 'Abuja' },
];
const vendorOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Cal Gas & Electric' },
	{ value: 'B', label: 'Oil & Gas ltd.' },
];
const paymentTypeOptions = [
	{ value: '', label: 'Select' },
	{ value: 'credit', label: 'credit' },
	{ value: 'bills', label: 'Bills' },
];
const makePaymentOptions = [
	{ value: '', label: 'Select' },
	{ value: 'A', label: 'Bayshor Water Lmt' },
	{ value: 'B', label: 'Francisco' },
];

const tabs= [
  {
    name: "Expenses",
    cost: '£ 45,000.00',
    id: 1
  },
  {
    name: "Inventory",
    cost: '£ 11,425.00',
    id: 2
  },
  {
    name: "Fixed Asset",
    cost: '£ 295,000.00',
    id: 3
  },
  {
    name: "Investment",
    cost: '£ 0.00',
    id: 4
  },
]
const expenses = [
  {
    id: 1,
    investment: 'Furniture and Fittings',
    description: 'Executive Table',
  },
  {
    id: 1,
    investment: 'Furniture and Fittings',
    description: 'Executive Table',
  },
]
export default RecordBill