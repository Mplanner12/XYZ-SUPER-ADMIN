'use client'
import EmptyState from '@/components/reusable/EmptyState'
import { SelectField } from '@/components/reusable/SelectField'
import { TextField } from '@/components/reusable/TextField'
import { Bird, ChevronLeft, ForwardIcon, PaintBucket, Paperclip, PrinterIcon, RotateCwIcon, SquareArrowOutUpRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import ExpensesTable from './recordBill/ExpensesTable'
import InventoryTable from './recordBill/InventoryTable'
import FixedAssetTable from './recordBill/FixedAssetTable'
import InvestmentTable from './recordBill/InvestmentTable'

const BillDetails = ({setBillDetails}:any) => {
  const [menu, setMenu] = useState('Expenses')
  const {control} = useForm()

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

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-between gap-4 my-6'>
        <div>
          <h2 className='mb-2'><ChevronLeft className ='inline' onClick={()=>{
            setBillDetails(false)
            }}/> Bill Details</h2>
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
          <TextField
            name='preparedBy'
            label='Prepared By'
            font='semibold'
            placeholder='John Doe'
            control={control}
          />
          <SelectField
            name='vendor'
            label='Vendor'
            options={vendorOptions}
            control={control}
          />
        </div>
      </div>
      {/* Tabs*/}
      <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar mb-6">
        {tabs.map(({name, cost, id}:any) => (
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
        //           <p>Customer & Job</p>
        //         </th>
        //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
        //           <p>Amount</p>
        //         </th>
        //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
        //           <p>Description</p>
        //         </th>
        //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
        //           <p>Account</p>
        //         </th>
        //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
        //           <p>BIllable</p>
        //         </th>
        //         <th className="py-2 px-4 font-semibold text-nowrap text-left">
        //           <p>list</p>
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
        //               className="text-primary-normal p-1 rounded-lg"
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

export default BillDetails