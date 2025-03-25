'use client'
import FinanceHeader from '@/components/finance/FinanceHeader'
import Card from '@/components/finance/overview/Card'
import React, { useState } from 'react'
import arrowR from '@/assets/icons/box-arrow-top-right.svg'
import bankNotes from '@/assets/icons/bank-notes.svg'
import dynamic from 'next/dynamic'
import download from '@/assets/icons/box-arrow-top-right.svg'
import Image from 'next/image'
import CashCard from '@/components/finance/bank/CashCard'
import BankManagement from '@/components/finance/bank/BankManagement'
import OverViewFilter from '@/components/finance/OverviewFilter'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import Dropdown from '@/components/reusable/DropDown'
import { TextField } from '@/components/reusable/TextField'
import { useForm } from 'react-hook-form'
import { dateFilterOptions } from '@/data/dropDownOption'
import { useSearchParams } from 'next/navigation';

const LineChart = dynamic(() => import('@/components/Charts/LineChart/LineChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
const BarChart = dynamic(() => import('@/components/finance/bank/BarChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});
const PieChart = dynamic(() => import('@/components/finance/bank/PieChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const BankingManagementOverviewPage = () => {
  const searchParams = useSearchParams();
  const initialMenu = searchParams.get('menu');
  const [menu, setMenu] = useState(initialMenu ? initialMenu : 'Overview')
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('')
  const {control} = useForm()

  const handleToggle = (filterName: string) => {
      setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleLocationSelect = (selectedOption: string) => { 
      console.log("Selected Location:", selectedOption);
  };

  const handleCurrencySelect = (selectedOption: string) => {
      console.log("Selected Category:", selectedOption);
  };

  const categories = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', "Saturday", "Sunday",];
  const seriesMainData = [
    {
      name: "Payables",
      data: [1, 3, 6, 3, 8, 9, 7],
      color: "#FF3B30",
    },
    {
        name: "Receivables",
        data: [4, 3, 10, 12, 15, 20],
        color: '#34C759',
    },
    {
        name: "Investment",
        data: [8, 7, 8, 4, 5, 15],
        color: '#FFCC00',
    },
  ];
	const seriesData = [
    {
      name: "Product 1",
      data: [1, 3, 6, 3, 8, 9, 7,], 
      color: "#00C7BE", //first line color
    },
    {
      name: "Product 2",
      data: [4, 3, 10 ,12, 15, 20],
      color:'#FF3B30',
    },
    {
      name: "Product 3",
      data: [8, 7, 8 ,4, 5, 15],
      color:'#AF52DE',
    },
    {
      name: "Product 4",
      data: [6, 3, 6, 9, 8, 19, 17,],
      color: "#FFCC00", //first line color
    },
    {
      name: "Product 5",
      data: [2, 5, 10 , 13 , 18, 20],
      color:'#34C759',
    },
    {
      name: "Product 6",
      data: [10, 7, 8 , 9 , 5, 15],
      color:'#2D9CDB',
    },
  ];

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
          moduleName="Finance Module"
          moduleLink='/finance/overview'
          page="Bank Management"
          pageLink='/finance/banking-management'
          breadcrumbs={breadcrumbs}
      />
      <main className='bg-secondary rounded-[16px] py-6 px-3 mt-4 sm:mx-6'>
        {/* Menu  and filter*/}
        <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
          {/* Menu */}
          <div className="border border-solid border-primary-normal rounded-[8px] w-fit flex text-xs md:text-sm lg:text-base gap-4 no-scrollbar">
            {menuBar?.map(({name, id}:any) => (
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
                {name} 
              </p>
            ))}
          </div>
          {menu === 'Overview' && ( 
            // Filters
            <div className="md:gap-8 gap-4 flex-wrap flex">
              <OverViewFilter
                label="Filter By Location"
                options={["Location 1", "Location 2", "Location 3"]}
                onSelect={handleLocationSelect}
                isOpen={openFilter === "location"}
                onToggle={() => handleToggle("location")}
              />
              <OverViewFilter
                label="USD"
                options={["USD", "Naira", "Ruby"]}
                onSelect={handleCurrencySelect}
                isOpen={openFilter === "category"}
                onToggle={() => handleToggle("category")}
              />
            </div>
          )}
        </div>
        
        {/* Contents */}
        {menu === 'Overview' ? (
          // Overview Contents
          <>
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
            {/* Cards */}
            <div className='flex flex-wrap grow shrink gap-3 justify-between items-start'>
              <Card
                icon={bankNotes}
                rightIcon={arrowR}
                text='Total Cash Inflows'
                amount='$ 100,000'
                setMenu={setMenu}
              />
              <Card
                icon={bankNotes}
                rightIcon={arrowR}
                text='Total Cash Outflows'
                amount='$ 100,000'
                setMenu={setMenu}
              />
              <Card
                icon={bankNotes}
                rightIcon={arrowR}
                text='Net Cash Flow'
                amount='$ 100,000'
                setMenu={setMenu}
              />
              <Card
                icon={bankNotes}
                rightIcon={arrowR}
                text='Ending Cash Balance'
                amount='$ 100,000'
                setMenu={setMenu}
              />
            </div>
            <section className='mt-6 w-full'>
              {/* Line chart and pie chart */}
              <div className="flex justify-between flex-wrap gap-5 w-full">
                {/* line chart */}
                <div className='bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6'>
                  <div className="flex justify-between gap-x-4 px-4 mb-4">
                    <div>
                      <div className="flex gap-2 items-end self-start text-base text-neutral-700">
                        <p>Cash Flow Trends</p>
                        <Image loading="lazy" src={download} alt="" 
                          className="h-auto object-contain shrink-0 w-5 aspect-square" />
                      </div>
                      <p className="mt-2 text-xs text-[#939292]">
                        A line chart showing all cash flow trends over time.
                      </p>
                    </div>
                    <div className='flex flex-wrap gap-x-4 w-[180px]'>
                      <div className='flex items-center gap-x-2'>
                        <span className='block bg-error w-[12px] rounded-[50%] h-[12px] '/> 
                        <span className='text-[12px]'>Payables</span>
                      </div> 
                      <div className='flex items-center gap-x-2'>
                        <span className='block bg-[#00A814] w-[12px] rounded-[50%] h-[12px] '/> 
                        <span className='text-[12px]'>Receivables</span>
                      </div> 
                      <div className='flex items-center gap-x-2'>
                        <span className='block bg-[#FFCC00] w-[12px] rounded-[50%] h-[12px] '/> 
                        <span className='text-[12px]'>Investment</span>
                      </div> 
                    </div>
                  </div> 
                  {/* border line */}
                  <div className='border border-solid border-[#F0F0F0]'/>
                  <div className=''>
                    <LineChart
                      categories={categories}
                      seriesData={seriesMainData}
                      height='270px'
                    />
                  </div>
                </div>
                {/* pie Chart */}
                <div className='bg-white w-full md:w-[33%] shadow-custom rounded-2xl py-6'>
                  <div className="text-base text-neutral-700 px-4 mb-4">
                    <p>Cash Flow</p>
                    <p className="mt-2 text-xs text-[#939292]">Based on Location</p> 
                  </div>
                  {/* border line */}
                  <div className='border border-solid border-[#F0F0F0]'/>
                  {/* legend */}
                  <div className='flex flex-wrap gap-4 w-[350px] px-4 mt-4 mb-6'>
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Operating Activities</span>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Investing Activities</span>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#9654F4;] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Financing Activities</span>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#8133F1] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Location 4</span>
                    </div>
                  </div>
                  <div className=''>
                    <PieChart />
                  </div>
                </div>
              </div>
            </section>
            {/* cards, line and barchart */}
            <section className='flex gap-4 mt-6 w-full'>
              {/* Cards */}
              <div className='flex justify-between flex-wrap gap-2 min-w-[300px] w-[33%]'>
                {cashs.map((cash, index)=>(
                  <React.Fragment key={index}>
                    <CashCard
                      icon={cash?.icon}
                      text={cash?.text}
                      title={cash?.title}
                    />
                  </React.Fragment>
                ))}
              </div>
              {/* line chart */}
              <div className='min-w-[300px] w-[33%] bg-white rounded-2xl shadow-sm py-6'>
                <div className="flex justify-between gap-x-4 px-4 mb-4">
                  <div>
                    <p className='text-base text-neutral-700'>Actual vs. Forecasted Cash Flows</p>
                    <p className="mt-2 text-[25px] font-semibold text-[#727171]">
                      5.987,34
                    </p>
                  </div>
                </div> 
                {/* border line */}
                <div className='border border-solid border-[#F0F0F0]'/>
                <div className=''>
                  <LineChart
                    categories={categories}
                    seriesData={seriesData}
                  />
                </div>
                <div className='flex flex-wrap gap-4 w-[270px] px-2'>
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#00C7BE] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 1</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#FF3B30] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 2</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#AF52DE] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 3</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#FFCC00] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 4</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#34C759] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 5</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#2D9CDB] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>Product 6</span>
                  </div> 
                </div>
              </div>
              {/* Bar chart */}
              <div className='min-w-[300px] w-[33%] bg-white rounded-2xl shadow-sm py-6'>
                <div className="flex justify-between gap-x-4 px-4 mb-4">
                  <div>
                    <p className='text-base text-neutral-700'>Actual vs. Forecasted Cash Flows</p>
                    <p className="mt-2 text-[25px] font-semibold text-[#727171]">
                      5.987,34
                    </p>
                  </div>
                  
                </div> 
                {/* border line */}
                <div className='border border-solid border-[#F0F0F0]'/>
                <div className=''>
                  <BarChart  />
                </div>
                <div className='flex flex-wrap gap-4 w-[270px] px-2'>
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-error w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 1</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#34C759] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 2</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#00C7BE] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 3</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#5856D6] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 4</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#AF52DE] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 5</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#FFCC00] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[10px]'>product 6</span>
                  </div> 
                </div>
              </div>

            </section>
          </>
        ) : (
          <BankManagement/>
        )}
      </main>
    </div>
  )
}

const menuBar = [
  {
    name: "Overview",
    id: 1
  },
  {
    name: "Bank Management",
    id: 2
  },
]

const cashs = [
  {
    title: '45 days',
    text: 'Cash Conversion Cycle (CCC)',
    icon: bankNotes
  },
  {
    title: '$70,000',
    text: 'Free Cash Flow ',
    icon: bankNotes
  },
  {
    title: '12.5%',
    text: 'Cash Flow Health Score',
    icon: bankNotes
  },
  {
    title: '85% Healthy',
    text: 'Cash Flow Health Score',
    icon: bankNotes
  },
]

export default BankingManagementOverviewPage