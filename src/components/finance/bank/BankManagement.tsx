'use client'
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ForwardIcon, ListFilterIcon, Maximize2, MessageSquareIcon, Minimize2, PaintBucketIcon, PrinterIcon, RotateCwIcon, Search, SquareArrowOutUpRightIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import BankManagementTable from './BankManagementTable'
import { useRouter } from 'next/navigation'
import { useGetAccountingList, useGetAccountingListItemById } from '@/app/accounting/hooks/query'
import { ListNames } from '@/constants/lists'

const BankManagement = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [makeTransfer, setMakeTransfer] = useState(false)
  const [location, setLocation] = useState('')
  const [receivingAccount, setReceivingAccount] = useState('')
  const [employee, setEmployee] = useState('')
  const [transferFundFrom, setTransferFundFrom] = useState('')
  const [activeTab, setActiveTab] = useState<number>(0);
  const router = useRouter()

  //API CALL
  const {data:allLists} = useGetAccountingList()
  const salesLocationsId = allLists?.find((list:any)=> list?.name === ListNames?.salesLocations)?.ID
  const cashAndBankId = allLists?.find((list:any)=> list?.name === ListNames?.cashAndBank)?.ID
  const employeeListId = allLists?.find((list:any)=> list?.name === ListNames?.employee)?.ID
  const {data:locationOptions} = useGetAccountingListItemById({id: salesLocationsId})
  const {data:cashBankOptions} = useGetAccountingListItemById({ id: cashAndBankId})
  const {data:employeeList} = useGetAccountingListItemById({ id: employeeListId})

  useEffect(() => {
    if (activeTab === 1) {
      router.push('/finance/banking-management/make-deposit')
    }
    if (activeTab === 2) {
      router.push('/finance/banking-management/make-payment')
    }
    if (activeTab === 3) {
      router.push('/finance/banking-management/receive-payments')
    }
    if (activeTab === 4) {
      setMakeTransfer(true)
    }
    if (activeTab === 5) {
      router.push('/finance/banking-management/reconcile')
    }
  }

  ,[activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  const tabs = [
    "Bank Management",
    "Make Deposit",
    "Make Payment",
    "Receive Payments",
    "Make Transfer",
    "Reconcile",
  ];
  return (
    <div>
      <div className='bg-[#8133F1] p-3 flex gap-y-2 flex-wrap sm:flex-nowrap w-fit rounded-xl'>
        {tabs.map((tab, index) => (
          <p
            key={index}
            onClick={() => setActiveTab(index)}
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
      <div className='flex justify-between my-4'>
        <h2>Bank Management</h2>
        <div className='text-[#8133F1] flex gap-5 justify-between'>
          <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
          <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
          <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
          <button className='flex gap-1'>Customize <PaintBucketIcon size="16px"/></button>
        </div>
      </div>
      {/* Search */}
      <div className='flex justify-between md:items-center gap-x-4 mb-4'>
        <div className='bg-white w-[300px] h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]'>
          <label htmlFor='search' className='flex items-center gap-2 px-4'>
          <Search color='#A1A1AA' />
          </label>
          <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
        </div>
        <div className='text-[#8133F1] flex gap-5 justify-between'>
          <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
          <button className='flex gap-1'>Comment <MessageSquareIcon size="16px"/></button> 
        </div>
      </div>
      {/* Sort */}
      <div className='flex justify-between mb-4'>
        <div className='text-[#8133F1] flex gap-5 justify-between'>
          <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
          <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
          <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
        </div>

        <div className='text-[#8133F1]'>
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
      {/* Bank Management Table */}
      <BankManagementTable  
        isExpanded = {isExpanded} 
        setIsExpanded = {setIsExpanded }
        makeTransfer = {makeTransfer}
        setMakeTransfer = {setMakeTransfer}
        setActiveTab ={setActiveTab}
        locationOptions = {locationOptions?.data}
        location ={location}
        setLocation ={setLocation}
        receivingAccount ={receivingAccount}
        setReceivingAccount = {setReceivingAccount}
        employeeList= {employeeList?.data}
        employee = {employee}
        setEmployee={setEmployee}
        cashBankOptions={cashBankOptions?.data}
        transferFundFrom={transferFundFrom}
        setTransferFundFrom ={setTransferFundFrom}
      />
      
    </div>
  )
}

export default BankManagement