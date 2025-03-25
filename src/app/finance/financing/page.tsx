'use client'
import { ArrowUpNarrowWideIcon, CalculatorIcon, ChevronDownIcon, ForwardIcon, ListFilterIcon, Maximize2, MessageSquareIcon, Minimize2, PaintBucketIcon, PrinterIcon, RotateCw, RotateCwIcon, ScrollTextIcon, Search, ShareIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import FinancingManagementTable from '@/components/finance/financing/FinancingManagementTable';
import FinancingOption from '@/components/finance/financing/FinancingOption';
import NewEquityDebpt from '@/components/finance/financing/NewEquityDebpt';
import ManageCapitalStructure from '@/components/finance/financing/ManageCapitalStructure';
import FinancingTransactions from '@/components/finance/financing/FinancingTransactions';
import Dropdown from '@/components/reusable/DropDown';
import { TextField } from '@/components/reusable/TextField';
import { useForm } from 'react-hook-form';
import { dateFilterOptions } from '@/data/dropDownOption';
import { useSearchParams } from 'next/navigation';

const FinancingPage = () => {
  const searchParams = useSearchParams();
  const initialindex = searchParams.get('menu');
  const [activeTab, setActiveTab] = useState<number>(initialindex ? Number(initialindex) : 0);
  const [action, setAction] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState(false);
  const [dateFilter, setDateFilter] = useState('')
  const {control} = useForm()
  const show = (): void => {
    action ? setAction(false) : setAction(true)
  };

  const tabs = [
    "Financing Management",
    "Financing Options",
    "New Equity/Debt",
    "Manage Capital Structure",
    'Financing Transactions',
  ];

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Financing Management"
        pageLink='/finance/financing'
        breadcrumbs={breadcrumbs}
      />
      <div className=' sm:p-6 pt-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
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
          { activeTab === 0 && (
            <main>
              <div>
                <div className='flex justify-between mt-6 mb-4'>
                  <h2 className=''>Financing Management</h2>
                  <div className='text-[#8133F1] flex gap-5 justify-between'>
                    <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                    <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                    <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
                    <button className='flex gap-1'>Customize <PaintBucketIcon size="16px"/></button>
                  </div>
                </div>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
                  <div className='bg-white w-[300px] h-[48px] rounded overflow-hidden flex items-center border border-[#CFCECE]'>
                    <label htmlFor='search' className='flex items-center gap-2 px-4'>
                    <Search color='#A1A1AA' />
                    </label>
                    <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
                  </div>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    <div className='flex items-center gap-2'>
                      <p className='font-bold'>Date</p>
                      <Dropdown 
                        placeholder='Select Location'
                        options={dateFilterOptions}
                        value={dateFilter}
                        onChange={(value) => setDateFilter(value)}
                        className="w-[140px] text-base"
                        buttonClassName='bg-white'
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='font-bold'>From</p>
                      <TextField
                        name='dateFrom'
                        type='date'
                        variant='short'
                        control={control}
                      />
                    </div>
                    <div className='flex items-center gap-2'>
                      <p className='font-bold'>To</p>
                      <TextField
                        name='dateTo'
                        type='date'
                        variant='short'
                        control={control}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex justify-between mt-5'>
                  <div className='text-[#8133F1] flex gap-5 justify-between'>
                    <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
                    <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
                    <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
                  </div>

                  <div className='text-[#8133F1] flex gap-5 justify-between'>
                    <button className='flex gap-1' onClick={()=>setIsExpanded(true)}>Showing all Columns <ChevronDownIcon size="16px"/></button>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <div className='flex gap-1'>
                          Minimize Table  <Minimize2 size="16px"/>
                        </div>
                      ): (
                        <div className='flex gap-1'>
                          Expand Table <Maximize2 size="16px"/>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
                <div className='my-5'>
                  {/* tables */}
                  <FinancingManagementTable 
                    isExpanded = {isExpanded} 
                    setIsExpanded = {setIsExpanded }
                  />
                </div>
              </div>
            </main>
          )}

          {activeTab === 1 && (
            <FinancingOption />
          )}

          {activeTab === 2 && (
            <NewEquityDebpt />
          )}

          {activeTab === 3 && (
            <ManageCapitalStructure />
          )}

          {activeTab === 4 && (
            <FinancingTransactions />
          )}
        </div>
      </div>
    </div>
  )
}

export default FinancingPage 