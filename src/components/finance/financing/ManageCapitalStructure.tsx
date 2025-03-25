'use client'
import { TextField } from '@/components/reusable/TextField'
import { ChartNoAxesCombined, RotateCw } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import RebalanceActions from './RebalanceActions'
import dynamic from 'next/dynamic'

const PieChart = dynamic(() => import('@/components/Charts/Piechart/PieChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const ManageCapitalStructure = () => {
  const [rebalance, setRebalance] = useState(false)
  const {control} = useForm() 
  return (
    <div className='text-base mt-6'>
      {!rebalance ? (
        <>
          <h2 className='mb-2'>Manage Capital Structure</h2>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <p> Current Asset Allocation Abc Limited - Fiscal Year End: December 31, 2024</p>
            <div className='flex items-center gap-x-2'>
              <p className='text-primary-normal'>Date</p>
              <TextField
                name='date'
                type='date'
                variant='short'
                control={control}
              />
            </div>
          </div>
          {/* chart */}
          <div className='grid md:grid-cols-3 gap-5 mt-4'>
            <div className='flex flex-col justify-between  bg-white rounded-[16px] p-5 '>
              <ChartNoAxesCombined className='text-primary-normal' />
              <h3>Total Capital Value</h3>
              <h1 className='text-[#727171]'>$ 3,850,000</h1>
              <p className='text-[#00A814] text-[24px]'>+1535.56(+6.89%)</p>
            </div>

            <div className=' bg-white rounded-[16px] py-5 '>
              <div className='px-5'>
                <p className='text-sm font-semibold'>Current Allocation</p>
                <p className='text-xs text-gray1-100'>Based on current financing</p>
              </div>
              {/* border */}
              <div className='border-b border-[#FAFAFA] my-4'/>
              <div className='px-5'>
                <div className='flex items-center gap-4 mb-4'>
                  <div className='flex items-center gap-x-2 text-xs '>
                    {/* circle */}
                    <div className='w-[9px] h-[9px] bg-[#CEB0FA] rounded-full '/>
                    <div>
                      <p className='font-semibold'>Equity</p>
                      <p>$2,850,000</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2 text-xs '>
                    {/* circle */}
                    <div className='w-[9px] h-[9px] bg-[#B78AF7] rounded-full '/>
                    <div>
                      <p className='font-semibold'>Debt</p>
                      <p>$2,850,000</p>
                    </div>
                  </div>
                </div>
                {/* Pie Chart */}
                <PieChart 
                  series={currentAllocation}
                />
              </div>
            </div>

            <div className='bg-white rounded-[16px] py-5 '>
              <div className='px-5'>
                <p className='text-sm font-semibold'>Target Allocation</p>
                <p className='text-xs text-gray1-100'>Based on current financing</p>
              </div>
              {/* border */}
              <div className='border-b border-[#FAFAFA] my-4'/>
              <div className='px-5'>
                <div className='flex items-center gap-4 mb-4'> 
                  <div className='flex items-center gap-x-2 text-xs '>
                    {/* circle */}
                    <div className='w-[9px] h-[9px] bg-[#CEB0FA] rounded-full '/>
                    <div>
                      <p className='font-semibold'>Equity</p>
                      <p>$2,850,000</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-x-2 text-xs '>
                    {/* circle */}
                    <div className='w-[9px] h-[9px] bg-[#B78AF7] rounded-full '/>
                    <div>
                      <p className='font-semibold'>Debt</p>
                      <p>$2,850,000</p>
                    </div>
                  </div>
                </div>
                {/* pie chart */}
                <PieChart 
                  series={targetAllocation}
                />
              </div>
            </div>
          </div>
          <button className='block mx-auto text-center text-primary-normal my-6'
            onClick={()=>setRebalance(!rebalance)}
          >
            <RotateCw className='inline-block mr-2'/> Rebalance to Target Allocation
          </button>

          {/* Table */}
          {/* <div className="w-full mx-auto overflow-x-auto no-scrollbar">
            <table className="min-w-full bg-white border border-[#EAECF0]">
              <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                  <th className="py-6 px-4 font-semibold text-nowrap text-left">
                    <p>Risk Impact Analysis</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>Stress Test Results</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>Override Recommendation</p>
                  </th>
                  <th className="py-2 px-4 font-semibold text-nowrap text-left">
                    <p>CFO’s Recommendation</p>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                {capitals?.map((item:any, index:any) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                  >
                    <td className="px-4 py-6  text-left">
                      Adjusting capital structure to optimize cost of capital and maintain financial flexibility.
                    </td>
                    <td className="px-4 py-4 ">
                      Interest coverage ratio remains above 8x under 200bps interest rate increase.
                      Debt-to-EBITDA ratio stays below 3x in 20% revenue decline scenario
                    </td>
                    <td className="px-4 py-4 ">
                      <input type="text" placeholder='Enter Value' className='outline-none placeholder:text-primary-normal'/>
                      
                    </td>
                    <td className="px-4 py-4 ">
                      Rebalance as per system recommendation to achieve optimal capital structure
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </>

      ) : (
        <RebalanceActions />
      )}
      
    </div>
  )
}

const currentAllocation = [44, 34];
const targetAllocation = [44, 55,];

const capitals = [
  {id:1}
]

export default ManageCapitalStructure