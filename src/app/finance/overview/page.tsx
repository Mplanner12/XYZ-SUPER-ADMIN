'use client'
import FinanceHeader from '@/components/finance/FinanceHeader'
import Card from '@/components/finance/overview/Card'
import { ChevronDown,} from 'lucide-react'
import React, { useState } from 'react'
import arrowR from '@/assets/icons/box-arrow-top-right.svg'
import bankNotes from '@/assets/icons/bank-notes.svg'
import RecentActivities from '@/components/finance/overview/RecentActivities'
import dynamic from 'next/dynamic';
import download from '@/assets/icons/box-arrow-top-right.svg'
import Image from 'next/image'
import HeaderLayout from '@/components/MainLayouts/HeaderLayout'
import OverViewFilter from '@/components/finance/OverviewFilter'
import { useForm } from 'react-hook-form'
import { TextField } from '@/components/reusable/TextField'
import Dropdown from '@/components/reusable/DropDown'
import { dateFilterOptions } from '@/data/dropDownOption'
import { useRouter } from 'next/navigation'
import { useEnum, useEnums } from '../hooks/query'

const HorizontalBarChart = dynamic(() => import('@/components/finance/overview/HorizontalBarChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const LineChart = dynamic(() => import('@/components/finance/overview/LineChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const ScatterChart = dynamic(() => import('@/components/finance/overview/ScatterChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});


const OverviewPage = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  // const [menu, setMenu] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const {control} = useForm()
  const router = useRouter()
  // API CALL
  const {data} = useEnums()

  const handleToggle = (filterName: string) => {
      setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleLocationSelect = (selectedOption: string) => {
      console.log("Selected Location:", selectedOption);
  };

  const handleCurrencySelect = (selectedOption: string) => {
      console.log("Selected Category:", selectedOption);
  };

  const categories = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const seriesData = [
      {
          name: "Total RevenuePayables",
          data: [1, 3, 6, 3, 8, 9, 7],
          color: "#FFCC00",
      },
      {
          name: "Expenses",
          data: [4, 3, 10, 12, 15, 20],
          color: '#5856D6',
      },
      {
          name: "Profits",
          data: [8, 7, 8, 4, 5, 15],
          color: '#34C759',
      },
    ];

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  
  return (
    <div className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Overview"
        pageLink='/finance/overview'
        breadcrumbs={breadcrumbs}
      />
      <div className='sm:px-6 pt-4'>
        {/* filter */}
        <div className="flex items-center flex-wrap gap-4 px-3 sm:px-0">
          <OverViewFilter
            label="Filter By Location"
            options={["Location 1", "Location 2", "Location 3"]}
            onSelect={handleLocationSelect}
            isOpen={openFilter === "location"}
            onToggle={() => handleToggle("location")}
          />
          <div className='flex flex-wrap gap-4'>
            <div className='flex items-center gap-2'>
              <p className='text-primary-normal'>Filter by Date</p>
              <Dropdown 
                placeholder='All'
                options={dateFilterOptions}
                value={dateFilter}
                onChange={(value) => setDateFilter(value)}
                className="w-[140px] text-base "
                buttonClassName='bg-white'
              />
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-primary-normal'>From</p>
              <TextField
                name='dateFrom'
                type='date'
                variant='short'
                control={control}
              />
            </div>
            <div className='flex items-center gap-2'>
              <p className='text-primary-normal'>To</p>
              <TextField
                name='dateTo'
                type='date'
                variant='short'
                control={control}
              />
            </div>
          </div>
        </div>
        <main className='bg-secondary rounded-[16px] py-6 px-3 mt-4'>
          {/* Cards */}
          <div className='flex flex-wrap grow shrink gap-3 justify-between items-start'>
            <Card
              icon={bankNotes}
              rightIcon={arrowR}
              text='Total Cash Position'
              amount='$ 100,000'
              url='/finance/banking-management?menu=Bank Management'
              // setMenu={setMenu}
            />
            <Card
              icon={bankNotes}
              rightIcon={arrowR}
              text='Total Receivables'
              amount='$ 100,000'
              url='/finance/receivables'
            />
            <Card
              icon={bankNotes}
              rightIcon={arrowR}
              text='Total Payables'
              amount='$ 100,000'
              url='/finance/payables'
            />
            <Card
              icon={bankNotes}
              rightIcon={arrowR}
              text='Total Amount Financed'
              amount='$ 100,000'
              url='/finance/financing'
            />
          </div>
          <section className="mt-6 w-full">
            {/* Line and scattered chart */}
            <div className="flex justify-between flex-wrap gap-5 items-baseline mb-4">
              {/* line chart */}
              <div className='bg-white shadow-custom mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6'>
                <div className="flex justify-between gap-x-4 px-4 mb-4">
                  <div>
                    <div className="flex gap-2 items-end self-start text-base text-neutral-700">
                      <p>Transaction Level Chart</p>
                      <Image loading="lazy" src={download} alt="" 
                        className="h-auto object-contain shrink-0 w-5 aspect-square" />
                    </div>
                    <p className="mt-2 text-xs text-[#939292]">
                      A line chart showing all transactions trends <br /> over time.
                    </p>
                  </div>
                  <div className='flex flex-wrap gap-x-4 w-[100px] sm:w-[180px]'>
                    <div className='flex items-center gap-x-2 h-fit'>
                      <span className='block bg-[#FFCC00] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Total RevenuePayables</span>
                    </div> 
                    <div className='flex items-center gap-x-2 h-fit'>
                      <span className='block bg-[#5856D6] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Expenses</span>
                    </div> 
                    <div className='flex items-center gap-x-2 h-fit'>
                      <span className='block bg-[#34C759] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Profits</span>
                    </div> 
                  </div>
                </div> 
                {/* border line */}
                <div className='border border-solid border-[#F0F0F0]'/>
                <div className=''>
                  <LineChart 
                    categories={categories}
                    seriesData={seriesData}
                    height='350px'
                  
                  />
                </div>
              </div>
              <div className='bg-white w-full md:w-[33%] shadow-custom rounded-2xl py-6'>
                <div className='flex justify-between gap-x-4 px-4 mb-4'>
                  <div className="text-base text-neutral-700">
                    <p>Debt-to-Equity Ratio</p>
                    <p className="mt-2 text-xs text-[#939292]">Based on Location</p> 
                  </div>
                  <Image loading="lazy" src={download} alt="" 
                    className="object-contain shrink-0 w-5 aspect-square cursor-pointer" 
                    onClick={()=> router.push('/finance/financing?menu=3')} 
                  />
                </div>
                {/* border line */}
                <div className='border border-solid border-[#F0F0F0]'/>
                {/* legend */}
                <div className='flex flex-wrap gap-4 w-[300px] sm:w-[350px] px-4 mt-4'>
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[12px]'>Location 1</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[12px]'>Location 2</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#9654F4;] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[12px]'>Location 3</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#8133F1] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[12px]'>Location 4</span>
                  </div> 
                  <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#6200EE] w-[12px] rounded-[50%] h-[12px] '/> 
                    <span className='text-[12px]'>Location 5</span>
                  </div> 
                </div>
                <div className=''>
                  <ScatterChart />
                </div>
              </div>
            </div>
            {/* Barchart and Recent activity */}
            <div className="flex justify-between items-start flex-wrap gap-5 w-full mt-6">
              {/* Horizontal Bar Chart */}
              <div className='bg-white mb-5 md:mb-0 w-full md:w-[65%] rounded-2xl py-6'>
                <div className="flex justify-between items-start gap-x-4 px-4 mb-4">
                  <div>
                    <div className="flex gap-2 text-base text-neutral-700">
                      <p>Profit Margin Chart</p>
                      <Image loading="lazy" src={download} alt="" 
                        className="h-auto object-contain shrink-0 w-5 aspect-square cursor-pointer"
                        onClick={()=>router.push('/finance/investment')}
                      />
                    </div>
                    <p className="mt-2 text-xs text-[#939292]">
                      A bar chart showing profit margin over time
                    </p>
                  </div>
                  <div className='flex flex-wrap gap-x-4 w-[180px]'>
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#FF3B30] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Account 1</span>
                    </div> 
                    <div className='flex items-center gap-x-2'>
                      <span className='block bg-[#34C759] w-[12px] rounded-[50%] h-[12px] '/> 
                      <span className='text-[12px]'>Account 2</span>
                    </div>
                  </div>
                </div> 
                {/* border line */}
                <div className='border border-solid border-[#F0F0F0]'/>
                <div className="">
                  <HorizontalBarChart />
                </div>
              </div>
              <RecentActivities />
            </div>
          </section>
        </main>
       
      </div>
    </div>
  )
}

export default OverviewPage 