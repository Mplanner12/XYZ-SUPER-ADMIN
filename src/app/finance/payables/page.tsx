"use client"
import { ArrowUpNarrowWideIcon, Calculator, CalculatorIcon, ChevronDownIcon, Ellipsis, ForwardIcon, ListFilterIcon, ListTodoIcon, MessageSquareIcon, PaintBucketIcon, PrinterIcon, RotateCw, RotateCwIcon, ScrollTextIcon, Search, ShareIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React from 'react'
import { useState } from 'react';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import PayablesTable from '@/components/finance/payables/PayablesTable';
import BillCreation from '@/components/finance/payables/BillCreation';
import BillApproval from '@/components/finance/payables/BillApproval';
import BillReceipt from '@/components/finance/payables/BillReceipt';
import BillDetails from '@/components/finance/payables/BillDetails';
import PayBills from '@/components/finance/payables/PayBills';
import RecordBill from '@/components/finance/payables/RecordBill';
import ReconcileBill from '@/components/finance/payables/ReconcileBill';
import { useRouter, useSearchParams } from 'next/navigation';
import Dropdown from '@/components/reusable/DropDown';
import { TextField } from '@/components/reusable/TextField';
import { useForm } from 'react-hook-form';
import { dateFilterOptions } from '@/data/dropDownOption';
import { useBills } from '../hooks/query';


const PayablesPage = () => {
  const searchParams = useSearchParams();
  const initialMenu = Number(searchParams.get('menu'));
  const [activeTab, setActiveTab] = useState<number>(initialMenu ? initialMenu : 0);
  const [billReceipt, setBillReceipt] = useState(false)
  const [billDetails, setBillDetails] = useState(false)
  const [action, setAction] = useState<boolean>(false)
  const [dateFilter, setDateFilter] = useState('')
  const router = useRouter()
  const {control} = useForm()
 //API CALL
 const {data:bills, isPending} = useBills() 

 const tableData = [
  {
    id: 1,
    date: '01-05-2023',
    billNo: 'Bill-A10001',
    description: 'Vendor Payment AB',
    amount: 7500,
    outstanding: 32,
    status: 'Pending',
    vendorName: 'AB Limited',
  },
  // ... more data items
];

  const show = (): void => {
    action ? setAction(false) : setAction(true)
  };

  const tabs = [
    "Payables Management",
    "Bill Creation",
    "Approval",
    "Pay Bill",
    // 'Record Bill',
    // 'Reconcile Bill'
  ];

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Payables Management"
        pageLink='/finance/payables'
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
                  setBillReceipt(false)
                  setBillDetails(false)
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
              {!billReceipt ? (
                <div>
                  <div className='flex flex-col md:flex-row md:justify-between gap-4 mt-6 mb-4'>
                    <h2 className=''>Payables Management</h2>
                    <div className='text-[#8133F1] flex flex-wrap gap-4'>
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
                    <div className='text-[#8133F1] flex justify-between flex-wrap gap-4'>
                      <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
                      <button className='flex gap-1'>Comment <MessageSquareIcon size="16px"/></button>
                      <button className='flex gap-1' onClick={()=>setActiveTab(1)}>Create Bill <ScrollTextIcon size="16px"/></button>
                      <button className='flex gap-1' onClick={ () => router.push('/finance/payables/create-purchase-order')}>Create Purchase Order <CalculatorIcon size="16px"/></button>
                    </div>
                  </div>

                  <div className='flex justify-between items-center flex-wrap gap-4 mt-5'>
                    <div className='text-[#8133F1] flex gap-5 justify-between'>
                      <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
                      <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
                      <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
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
                  <div className='my-5'>
                    {/* tables */}
                    <PayablesTable data={tableData} setBillReceipt= {setBillReceipt} setActiveTab = {setActiveTab}/>
                  </div>
                </div>
              ) : billDetails ? (
                <BillDetails setBillDetails={setBillDetails} />
              ) : (
                '' // '' formal bill receipt
              )} 
            </main>
          )}

          {activeTab === 1 && (
            // <BillReceipt setBillReceipt= {setBillReceipt} setBillDetails = {setBillDetails} />
            <BillCreation setActiveTab = {setActiveTab} />
          )}

          {activeTab === 2 && (
            <BillApproval setActiveTab = {setActiveTab} />
          )}

          {activeTab === 3 && (
            <PayBills setActiveTab = {setActiveTab} />
          )}

          {activeTab === 4 && (
            <RecordBill setActiveTab = {setActiveTab} />
          )}

          {activeTab === 5 && (
            <ReconcileBill setActiveTab = {setActiveTab} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PayablesPage 