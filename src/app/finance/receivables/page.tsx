"use client"

import FinanceHeader from '@/components/finance/FinanceHeader'
import { ArrowDown01, ArrowDownNarrowWide, ArrowUpNarrowWideIcon, Bird, Calculator, CalculatorIcon, ChevronDownIcon, ChevronsUpDown, Ellipsis, EllipsisVertical, EllipsisVerticalIcon, ForwardIcon, ListFilterIcon, ListTodoIcon, MessageSquareIcon, PaintBucketIcon, PrinterIcon, RotateCw, RotateCwIcon, ScrollTextIcon, Search, ShareIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import React, { useEffect, useMemo } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import Dropdown from '@/components/reusable/DropDown';
import { TextField } from '@/components/reusable/TextField';
import { dateFilterOptions } from '@/data/dropDownOption';
import { useForm } from 'react-hook-form';
import { useEnums, useInvoices } from '../hooks/query';
import EmptyState from '@/components/reusable/EmptyState';
import { DateTime } from '@/components/reusable/DateTime';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';

const ReceivablesPage = () => {
  const [more, setMore] = useState<number | null>(null) //more is invoiceId
  const [activeTab, setActiveTab] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false)
  const [dateFilter, setDateFilter] = useState('')
  
  const router = useRouter()
  const {control} = useForm()
  const show = (): void => {
    action ? setAction(false) : setAction(true)
  };
  // API CALL
  const {data:invoices, isPending} = useInvoices({
    id: ''
  })
  const {data:enums} = useEnums()
  

  // Calculate total amount_due
  const totalAmountDue = useMemo(() => {
    return invoices?.reduce((total:number, invoice:any) => total + (invoice.amount_due || 0), 0) || 0;
  }, [invoices]);

  useEffect(() => {

    if (activeTab === 1) {
      router.push('/finance/receivables/generate-invoice')
    }
    if (activeTab === 3) {
      router.push('/finance/receivables/receive-payments')
    }
    if (activeTab === 2) {
      router.push('/finance/receivables/credit-control')
    }

  }

  ,[activeTab]) // eslint-disable-line react-hooks/exhaustive-deps

  const tabs = [
    "Receivables Management",
    "Create Invoice",
    "Receivable Credit Control",
    "Receive Payments"
  ];
  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  
  return (
    <div className='h-[100vh] overflow-scroll'>
      {isPending && <LoadingOverlay/> }
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Receivables Management"
        pageLink='/finance/receivables'
        breadcrumbs={breadcrumbs}
      />
      <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4 sm:mx-6'>
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

          { activeTab === 0 && 
          <main>
            <div className='flex flex-wrap justify-between my-3'>
              <p className='text-xl font-medium'>Receivables Management </p>
              <div className='text-[#8133F1] flex flex-wrap gap-5 justify-between'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
                <button className='flex gap-1'>Customize <PaintBucketIcon size="16px"/></button>
              </div>
            </div>

            <div className='flex flex-wrap justify-between gap-4 mb-4 md:mb-0'>
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

            <div className='flex md:justify-end mb-3'>
              <div className='text-[#8133F1] flex gap-3 justify-between'>
                <button className='flex items-center gap-1 text-left' onClick={() => {router.push('/finance/receivables/create-invoice')}}>Create Invoice <ScrollTextIcon size="16px"/></button>
                <button className='flex items-center gap-1 text-left' onClick={() => {router.push('/finance/receivables/create-estimate')}}>Create Estimate <CalculatorIcon size="16px"/></button>
                <button className='flex items-center gap-1 text-left' onClick={() => {router.push('/finance/receivables/create-sales')}}>Create Sales Order <ListTodoIcon size="16px"/></button>
              </div>
            </div>


            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
              <div className='text-[#8133F1] flex gap-5 justify-between'>
                <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
                <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
                <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
              </div>
              <div className='flex flex-wrap gap-2'>
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
              {/* Receivable Table */}
              <div className="w-full mx-auto overflow-x-auto no-scrollbar">
                {invoices?.length > 0 ? (
                  <table className="min-w-full bg-white border border-[#EAECF0]">
                    <thead className="font-semibold border border-[#EAECF0] shadow-sm">
                      <tr className="bg-[#FAFAFA] text-sm text-[#575757] ">
                        <th className="py-6 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Date</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Customer Name</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Invoice No</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Description</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Amount (USD)</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Outstanding Days/Aging</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Credit limit Balance</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Status	</p>
                            <ArrowDownNarrowWide className='text-[#989898]'
                              // onClick={()=> setOrdering('createdAt')}
                            />
                          </div>
                        </th>
                        <th className="py-2 px-4 font-semibold text-nowrap text-left">
                          <div className="flex gap-2 text-left items-center text-nowrap">
                            <p>Action</p>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white text-sm divide-y divide-[#EAECF0]">
                      {invoices?.map((invoice:any, index:any) => (
                        <tr
                          key={index}
                          className={`${index % 2 === 0 ? "bg-white" : "bg-white"}`}
                        >
                          <td className="px-4 py-6 whitespace-nowrap text-left">
                            <DateTime dateString = {invoice?.date} />
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.customer}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.invoice_no}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            No data
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.amount_due?.toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            {invoice?.outstanding_days}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            No data
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap first-letter:uppercase lowercase">
                            {enums && invoice ? (
                              enums?.find((item:any) => item.id === invoice.payment_status)?.name || 'Unknown Status'
                            ) : (
                              <span className="text-gray-400">Loading...</span>
                            )}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="relative w-fit h-full flex justify-center items-center border border-borderColor rounded-[8px] px-2 py-2">
                              <EllipsisVertical className="cursor-pointer h-full" size={20}
                                onClick={() =>{
                                  more === invoice?.id ? setMore(null) : setMore(invoice?.id)
                                }}
                              />
                              {more === invoice?.id && (
                                <div className="flex flex-col gap-y-4 justify-center z-20 p-4 absolute top-10 -right-8 w-fit h-fit rounded-[8px] border border-[#CFCECE] bg-[#F5F5F5]">
                                  <button className='flex gap-3 items-center' onClick={() => {router.push('/finance/receivables/generate-invoice?invoiceDelivery=true')}}>Invoice Delivery</button>
                                  <button className='flex gap-3 items-center' onClick={() => {router.push('/finance/receivables/generate-invoice?openPaymentReminder=true')}}>Send Payment Reminder</button>
                                  <button className='flex gap-3 items-center' onClick={() => {router.push('/finance/receivables/receive-payments')}}>Receive Payments</button>
                                  {/* <button className='flex gap-3 items-center' onClick={() => {router.push('/finance/receivables/generate-invoice')}}>Generate Invoice</button> */}
                                  {/* <button className='flex gap-3 items-center'>Reconcile Now</button>
                                  <button className='flex gap-3 items-center' onClick={() => {router.push('/finance/audit')}}>View Audit Log</button> */}
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className='border-t border-[#EAECF0]'>
                        <td className='text-left py-6 px-4'></td>
                        <td className='text-left py-6 px-4'></td>
                        <td className='text-left py-6 px-4'>Total</td>
                        <td className='text-left py-6 px-4'>{totalAmountDue.toLocaleString()} USD</td>
                        <td className='text-left py-6 px-4'></td>
                        <td className='text-left py-6 px-4'></td>
                        <td className='text-left py-6 px-4'></td>
                      </tr>
                    </tfoot>
                  </table>
                ) : (
                  <EmptyState
                    img={
                      <Bird
                        size={150}
                        className="text-primary-normal p-1 rounded-lg"
                      />
                    }
                    title={`No Record Found`}
                    text={`Oops! It seems that there is no record`}
                  />
                )}
              </div>
            </div>
          </main>
          }
      </div>
    </div>
  )
}

export default ReceivablesPage 