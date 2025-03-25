import dynamic from 'next/dynamic';
import React from 'react';


const PieChart = dynamic(() => import('@/components/Charts/Piechart/PieChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const DashboardPieChart: React.FC = () => {
  const seriesData = [44, 55, 34];

  return (
    <div className='bg-white rounded-xl shadow-md py-6 h-full w-full'>
      <div className="text-base text-neutral-700 px-4 mb-4">
        <p>Cash Flow</p>
        <p className="mt-2 text-xs text-[#939292]">Based on Location</p>
      </div>
      {/* border line */}
      <div className='border border-solid border-[#F0F0F0]' />
      {/* legend */}
      <div className='flex flex-wrap gap-4  px-4 mt-4 mb-6'>
        <div className='flex items-center gap-x-2'>
          <span className='block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] ' />
          <span className='text-[12px]'>product 1</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <span className='block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] ' />
          <span className='text-[12px]'>product 2</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <span className='block bg-[#9654F4] w-[12px] rounded-[50%] h-[12px] ' />
          <span className='text-[12px]'>product 3</span>
        </div>
        <div className='flex items-center gap-x-2'>
          <span className='block bg-[#8133F1] w-[12px] rounded-[50%] h-[12px] ' />
          <span className='text-[12px]'>product 4</span>
        </div>
      </div>
      <div className='w-full'>

          <PieChart
            series={seriesData}
            colors={['#8133F1', '#CEB0FA', '#6200EE']} 
            width="full"
            showLegend={false}
            strokeWidth={4}
          />
      </div>
    </div>
  );
}

export default DashboardPieChart;
