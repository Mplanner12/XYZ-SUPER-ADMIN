'use client'
import { Button } from '@/components/reusable/Button'
import { ArrowRight, ChevronLeft, EllipsisVertical, Info, Pencil, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import ApprovalTable from '../investment/manage-portfolio/ApprovalTable'
import AdditionalDetailTable from '../investment/manage-portfolio/AdditionalDetailTable'

const RebalanceActions = () => {
  const [more, setMore] = useState<number | null>(null) //more is Id
  const [rebalances, setRebalances] = useState([
    {
      id: 1,
      step: 'Initial Review by Portfolio Manager',
      name: 'Ahmed Sule',
      status: 'approved',
    },
    {
      id: 2,
      step: 'Final Approval by Investment Committee',
      name: 'Sadiq Lamido',
      status: 'approved',
    },
  ]);
  // editing
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const handleStatusChange = (id:number, newStatus:string) => {
    setRebalances(prevLoans =>
      prevLoans.map(loan =>
        loan.id === id ? { ...loan, status: newStatus } : loan
      )
    );
  };
  const handleEdit = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };
  const handleSave = (id: number) => {
    setRebalances(prevRebalances =>
      prevRebalances.map(item =>
        item.id === id ? { ...item, targetValue: editValue } : item
      )
    );
    setEditingId(null);
  };

  return (
    <div>
      <h2 className='mb-2'><ChevronLeft className='inline text-primary-normal ' /> Rebalance Actions</h2>
      <p className='mb-6'>Rebalance your portfolio allocations</p>
      <h3>Buy/Sell Instructions Table</h3>
      {/* Table */}
      <div className="w-full mx-auto overflow-x-auto no-scrollbar">
        <table className="min-w-full bg-white border border-[#EAECF0]">
          <thead className="font-semibold border border-[#EAECF0] shadow-sm">
            <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
              <th className="py-6 px-4 font-semibold text-nowrap text-left">
                <p>Investment</p>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Current Value (USD)</p>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Target Value (USD)</p>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Difference (USD)</p>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Actions Required</p>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Actions</p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
            {rebalances?.map((item:any, index:any) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
              >
                <td className="px-4 py-6  text-left">
                  <p>Long-term Debt</p>
                </td>
                <td className="px-4 py-4 ">
                  1,000,000
                </td>
                <td className="px-4 py-4 text-nowrap">
                  {editingId === item.id ? (
                    <div className="flex items-center">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border border-borderColor rounded outline-none px-2 py-1 mr-2"
                      />
                      <button onClick={() => handleSave(item.id)} className="text-primary-normal">
                        Save
                      </button>
                    </div>
                  ) : (
                    <p>
                      {item.targetValue || '1,155,000'}
                      <Pencil
                        size={18}
                        className='inline text-primary-normal ml-2 cursor-pointer'
                        onClick={() => handleEdit(item.id, item.targetValue || '1,155,000')}
                      />
                    </p>
                  )}  
                </td>
                <td className="px-4 py-4 ">
                  -50,000
                </td>
                <td className="px-4 py-4 ">
                  <p>Buy $155,000 worth of debt</p>
                </td>
                <td className="px-4 py-4 text-nowrap">
                  <p className='text-[#E00B2B]'><ArrowRight size={18} className='inline'/> issue</p>
                </td>
                {/* #00A814 - green color for Repurchase*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cost of Capital */}
      <h3 className=' mt-6 mb-2'>Cost of Capital</h3>
      {/* Table */}
      <div className="w-full mx-auto overflow-x-auto no-scrollbar">
        <table className="min-w-full bg-white border border-[#EAECF0]">
          <thead className="font-semibold border border-[#EAECF0] shadow-sm">
            <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
              <th className="py-6 px-4 font-semibold text-left">
                <p className='w-[150px]'>Computation Calculation</p>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <div className='w-[150px] flex items-center gap-x-1'>
                  <p className=''>Stock - CAPM Method</p>
                  <p><Info size={18} className='#575757' /></p>
                </div>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <div className='w-[150px] flex items-center  gap-x-1'>
                  <p>Stock-Dividend Growth Method</p>
                  <p><Info size={18} className='#575757' /></p>
                </div>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <div className='flex items-center  gap-x-1'>
                  <p>Debt</p>
                  <p><Info size={18} className='#575757' /></p>
                </div>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <p className='w-[150px]'>WACC (Weight of ost capital)</p>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <p className='w-[150px]'>Debt to Equity Ratio</p>
              </th>
              <th className="py-2 px-4 font-semibold text-left">
                <div className='flex items-center gap-x-1'>
                  <p className='w-[150px]'>Interest Coverage Ratio</p>
                  <p><Info size={18} className='#575757' /></p>
                </div>
              </th>
              <th className="py-2 px-4 font-semibold text-nowrap text-left">
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
            {rebalances?.map((item:any, index:any) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
              >
                <td className="px-4 py-6  text-left">
                  <p>Cost</p>
                </td>
                <td className="px-4 py-4 ">
                  1,000,000
                </td>
                <td className="px-4 py-4 text-nowrap">
                  <p>9.2%</p> 
                </td>
                <td className="px-4 py-4 ">
                  <p>7.2%</p>
                </td>
                <td className="px-4 py-4 ">
                  <p>3.2%</p>
                </td>
                <td className="px-4 py-4 text-nowrap">
                  <p>35%</p>
                </td>
                <td className="px-4 py-4 ">
                  <p>35%</p>
                </td>
                <td className="px-4 py-4 ">
                  <div className="relative w-fit h-full flex justify-center items-center rounded-[8px]">
                    <EllipsisVertical className="cursor-pointer h-full" size={20}
                      onClick={() =>{
                        more === item?.id ? setMore(null) : setMore(item?.id)
                      }}
                    />
                    {more === item?.id && (
                      <div className="flex flex-col gap-y-4 justify-center z-20 p-4 absolute top-10 -right-8 w-fit h-fit rounded-[8px] border border-[#CFCECE] bg-[#F5F5F5]">
                        <p className="cursor-pointer text-nowrap">
                          Insert
                        </p>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* additional details */}
      <h3 className=' mt-6 mb-2'>Additional Details</h3>
      {/* Table */}
      <AdditionalDetailTable />
      <button className='text-primary-normal mt-3'><Plus className='inline mr-2' /> Add a new entry</button>

       {/* Approval */}
       <h3 className=' mt-6 mb-2'>Approval</h3>
      {/* Table */}
      <ApprovalTable />
      <div className='flex items-center gap-4 mt-4'>
        <Button variant='outlined' >
          Cancel
        </Button>
        <Button>
          Submit
        </Button>
      </div>
    </div>
  )
}


export default RebalanceActions