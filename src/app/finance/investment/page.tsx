'use client'

import React from 'react';
import { useState, useEffect } from 'react';
import FinanceHeader from '@/components/finance/FinanceHeader'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import { useRouter } from 'next/navigation';
import { ArrowUpNarrowWideIcon, BookmarkPlusIcon, ChartCandlestickIcon, ChevronDownIcon, Ellipsis, EllipsisVertical, ForwardIcon, ListFilterIcon, Maximize2, MaximizeIcon, MessageSquareIcon, Minimize2, MinimizeIcon, PaintBucketIcon, PlusIcon, PrinterIcon, Rabbit, RotateCwIcon, Search, SquareArrowOutUpRightIcon } from 'lucide-react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InvestmentTable from '@/components/finance/investment/InvestmentTable';
import { useInvestments } from '../hooks/query';
import { TableRow } from '@/components/finance/investment/InvestmentTable';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import Image from 'next/image';
import EmptyState from '@/components/reusable/EmptyState';


const InvestmentPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<number>(0);
  const [action, setAction] = useState<boolean>(false)
  const [size, setSize] = useState<any>('medium')
  // API CALL
  const {data:investment, isPending} = useInvestments()
  // tablle
  const [data, setData] = useState<TableRow[]>([
		{
      id: 1,
      investmentType: 'Stock',
      investmentName: 'Stock A',
      purchaseDate: '01-01-2024',
      purchaseUnit: '200',
      totalCost: '100,000',
      currentValue: '120,000',
      unrealizedGainLoss: '20,000',
      returns: '30,000',
      expenses: '500',
      taxes: '750',
      disposalDate: '-',
      disposalUnit: '-',
      disposalProceeds: '-',
      realizedGainLoss: '0',
      expectedInvestmentDays: '180',
      actualInvestmentDays: '87',
    },
    {
      id: 2,
      investmentType: 'Bond',
      investmentName: 'Bond A',
      purchaseDate: '02-15-2024',
      purchaseUnit: '1000',
      totalCost: '100,000',
      currentValue: '120,000',
      unrealizedGainLoss: '20,000',
      returns: '30,000',
      expenses: '500',
      taxes: '750',
      disposalDate: '-',
      disposalUnit: '-',
      disposalProceeds: '-',
      realizedGainLoss: '0',
      expectedInvestmentDays: '180',
      actualInvestmentDays: '87',
    },
	]);

  const toggle = () => {
    if (size === 'medium') {
      setSize('small')
    }
    else if (size === 'small') {
      setSize('medium')
    }
  }

  const show = (): void => {
    action ? setAction(false) : setAction(true)
  };

  const tabs = [
    "Investment Management ",
    "Investment Options",
    "Manage Portfolio",
    "Investment Transactions",
    // "Audit Log"
  ];


  useEffect(() => {
    // if (activeTab === 4) {
    //   router.push('/finance/investment/audit-log')
    // }
    if (activeTab === 1) {
      router.push('/finance/investment/investment-options')
    }
    if (activeTab === 2) {
      router.push('/finance/investment/manage-portfolio')
    }
    if (activeTab === 3) {
      router.push('/finance/investment/investment-transactions')
    }

}
,[activeTab])// eslint-disable-line react-hooks/exhaustive-deps

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];

  const ResponsiveDatePickers = () => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[
            'DatePicker',
            'MobileDatePicker',
            'DesktopDatePicker',
            'StaticDatePicker',
          ]}
        >
          {/* <DemoItem label=""> */}
          <DatePicker
            sx={{
                border: "0px solid #CACACA",
                padding: "0px",
                '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
                '& fieldset': {
                    borderColor: '#CACACA',
                },
                '&:hover fieldset': {
                    borderColor: '#CACACA',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#CACACA', // Remove border on focus
                },
                '& input': {
                    color: '#03191B99', // Set text color
                    height: "12px"
                },
                },
            }}
                className="rounded p-0 focus:outline-none"
            />
          {/* </DemoItem> */}
        </DemoContainer>
      </LocalizationProvider>
    );
  }
  
  return (
    <div className='h-[100vh] overflow-scroll'>
      {isPending && <LoadingOverlay/>}
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Investment Management"
        pageLink='/finance/investment'
        breadcrumbs={breadcrumbs}
      />

      <div className='bg-secondary rounded-[16px] py-6 px-3 mt-4 sm:mx-6'>
          <div className='bg-[#8133F1] p-3 flex justify-between md:w-4/5 rounded-xl'>
            {tabs.map((tab, index) => (
                <p
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-2 md:px-4 py-2 rounded-[8px] transition-colors duration-300 cursor-pointer text-nowrap  ${
                    activeTab === index
                      ? "bg-white text-[#8133F1]"
                      : "text-white"
                  }`}
                >
                  {tab}
                </p>
              ))}
          </div>

        {activeTab === 0 && <>
          <div className='flex flex-wrap items-center justify-between my-3'>
            <p className='text-xl font-medium'>Investment Management</p>
            <div className='text-[#8133F1] flex flex-wrap gap-5 justify-between'>
                <button className='flex gap-1'>Download <SquareArrowOutUpRightIcon size="16px"/></button>
                <button className='flex gap-1'>Print <PrinterIcon size="16px"/></button>
                <button className='flex gap-1'>Share <ForwardIcon size="16px"/></button>
                <button className='flex gap-1'>Customize <PaintBucketIcon size="16px"/></button>
              </div>
          </div>

          <div className='flex justify-between'>
              <div className='bg-white w-1/2 md:w-[300px] h-12 rounded overflow-hidden flex items-center border border-[#CFCECE]'>
                <label htmlFor='search' className='flex items-center gap-2 px-4'>
                <Search color='#A1A1AA' />
                </label>
                <input type="text" id='search' className='h-full w-full bg-white outline-none pr-3 text-sm' placeholder='Search' />
              </div>
              <div className='text-[#8133F1] w-1/2 flex flex-wrap gap-5 justify-end'>
                <button className='flex gap-1'>Refresh <RotateCwIcon size="16px"/></button>
                <button className='flex gap-1'>Comment <MessageSquareIcon size="16px"/></button>
                <button className='flex gap-1' onClick={() => {router.push('/finance/investment/new-investment')}}> Add New Investment <BookmarkPlusIcon size="16px"/></button>
              </div>
          </div>

          <div className='flex justify-end mb-5'>
              <div className='text-[#8133F1] flex flex-wrap gap-5 justify-between'>
                <button className='flex gap-1'
                  onClick={()=>router.push('/finance/investment/manage-portfolio')}
                >Manage Portfolio <ChartCandlestickIcon size="16px"/></button>
              </div>
          </div>

          <div className='flex items-center gap-2'>
              <p>Date Range</p>
              <ResponsiveDatePickers />
              <span>to</span>
              <ResponsiveDatePickers />
          </div>

          <div className='flex justify-between my-3'>
            <div className='text-[#8133F1] flex gap-2'>
                <button className='flex gap-1'>Filter <ListFilterIcon size="16px"/></button>
                <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="16px"/></button>
                <button className='flex gap-1'><span className='text-black'>Total By</span> Select Column <ChevronDownIcon size="16px"/></button>
            </div>

            <div className='text-[#8133F1] flex gap-2'>
              {/* <button className='flex gap-1'> Showing all Columns <ChevronDownIcon size="16px"/></button> */}
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
          </div>

          <div>
            {investment?.length === 0 ? (
              <EmptyState
                img={
                  <Rabbit
                    size={150}
                    className="text-primary-normal p-1 rounded-lg"
                  />
                }
                title={`No Record Found`}
                text={`Oops! It seems that there is no record`}
              />
            ) : 
              <InvestmentTable 
                isExpanded = {isExpanded} 
                setIsExpanded = {setIsExpanded }
                data={data}
                setData={setData}
              />
            }
          </div>
          </>}
      </div>
    </div>
  )
}

export default InvestmentPage 