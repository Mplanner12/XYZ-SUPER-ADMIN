import React from 'react'
import { Database, CalendarClock, ChartSpline } from 'lucide-react';

const ReportAndChartTab:React.FC = () => {
  return (
    <main>
      <h2 className="text-xl md:text-2xl font-semibold mb-6">Reports & Charts Settings</h2>
      <div className='flex flex-col gap-5'>

      <div className='flex items-center gap-4'>
      <Database/>
        <div className='flex flex-col'>
            <p className='font-medium text-base md:text-lg'>Preferred Data Filters</p>
            <p className='text-[#434343] text-xs'>Select filters used on tables. </p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
      <CalendarClock/>
        <div className='flex flex-col'>
            <p className='font-medium text-base md:text-lg'>Time Interval</p>
            <p className='text-[#434343] text-xs'>Select the time interval when working with dates.</p>
        </div>
      </div>

      <div className='flex items-center gap-4'>
      <ChartSpline/>
        <div className='flex flex-col'>
            <p className='font-medium text-base md:text-lg'>Preferred Data Filters</p>
            <p className='text-[#434343] text-xs'>Select the Chart types you prefer.</p>
        </div>
      </div>
      </div>
    </main>
  )
}

export default ReportAndChartTab