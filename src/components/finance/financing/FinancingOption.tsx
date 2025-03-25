import { ArrowUpNarrowWideIcon, CalculatorIcon, ChevronDownIcon, ForwardIcon, ListFilterIcon, Maximize2, MessageSquareIcon, PaintBucketIcon, PrinterIcon, RotateCw, RotateCwIcon, ScrollTextIcon, Search, ShareIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React, { useState } from 'react'
import LoanProviderTable from './LoadProviderTable';
import EquityProviderTable from './EquityProviderTable';

const FinancingOption = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    "Loan Provider Options",
    "Equity Provider Options",
  ];

  return (
    <main className='mt-4'>
      {/* Menu */}
      <div className='bg-[#8133F1] p-3 flex gap-y-2 flex-wrap sm:flex-nowrap w-fit rounded-xl'>
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => {
              setActiveTab(index)
            }}
            className={`w-fit px-4 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer inline-flex items-center ${
              activeTab === index
                ? "bg-white text-[#8133F1]"
                : "text-white"
            }`}
          >
            {tab}
          </p>
        ))}
      </div>

      {/* contents */}
      {activeTab === 0  && (
        <main>
          <div className='mb-4'>
            <div className='flex justify-between mt-6 mb-4'>
              <h2 className=''>Loan Provider Options</h2>
              <div className='text-[#8133F1] flex gap-5 justify-between'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
              </div>
            </div>
            <div className='bg-white w-[300px] h-[48px] rounded overflow-hidden flex items-center border border-[#CFCECE]'>
              <label htmlFor='search' className='flex items-center gap-2 px-4'>
              <Search color='#A1A1AA' />
              </label>
              <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
            </div>
            <div className='flex justify-between mt-5'>
              <div className='text-[#8133F1] flex gap-5 justify-between'>
                <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
                <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
                <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
              </div>

              <div className='text-[#8133F1] flex gap-5 justify-between'>
                <button className='flex gap-1' onClick={()=>setActiveTab(1)}>Showing all Columns <ChevronDownIcon size="16px"/></button>
                <button className='flex gap-1'>Expand Table  <Maximize2 size="16px"/></button>
              </div>
            </div>
          </div>
          {/* Table */}
          <LoanProviderTable />
        </main>
      )}

      {activeTab === 1 && (
        <main>
        <div className='mb-4'>
          <div className='flex justify-between mt-6 mb-4'>
            <h2 className=''>Equity Provider Options</h2>
            <div className='text-[#8133F1] flex gap-5 justify-between'>
              <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
              <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
              <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
            </div>
          </div>
          <div className='bg-white w-[300px] h-[48px] rounded overflow-hidden flex items-center border border-[#CFCECE]'>
            <label htmlFor='search' className='flex items-center gap-2 px-4'>
            <Search color='#A1A1AA' />
            </label>
            <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
          </div>
          <div className='flex justify-between mt-5'>
            <div className='text-[#8133F1] flex gap-5 justify-between'>
              <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
              <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
              <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
            </div>

            <div className='text-[#8133F1] flex gap-5 justify-between'>
              <button className='flex gap-1' onClick={()=>setActiveTab(1)}>Showing all Columns <ChevronDownIcon size="16px"/></button>
              <button className='flex gap-1'>Expand Table  <Maximize2 size="16px"/></button>
            </div>
          </div>
        </div>
        {/* Table */}
        <EquityProviderTable />
      </main>
      )}
    </main>
  )
}

export default FinancingOption