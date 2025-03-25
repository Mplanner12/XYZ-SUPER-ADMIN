import React, { lazy, Suspense } from 'react';
import Image from 'next/image';
import download from '@/assets/icons/box-arrow-top-right.svg';
import dynamic from 'next/dynamic';
import { cn } from "@/lib/utils";



const ScatterChart = dynamic(() => import('@/components/Charts/ScatterChart/ScatterChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

const DashboardScatterChart: React.FC = () => {
    const seriesData = [
        {
            name: "Location 1",
            data: [[16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]],
            color: "#CEB0FA",
        },
        {
            name: "Location 2",
            data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]],
            color: '#B78AF7',
        },
        {
            name: "Location 3",
            data: [[21.7, 3], [23.6, 13.5], [24.6, 23], [29.9, 3], [21.7, 20], [23, 50], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]],
            color: '#9654F4',
        },
    ];

    return (
        <div className='bg-white rounded-xl shadow-md py-6 w-full h-full'>
            <div className='flex justify-between gap-x-4 px-4 mb-4'>
                <div className="text-base text-neutral-700">
                    <p>Sales Volume vs Customer Demographics</p>
                </div>
                <Image loading="lazy" src={download} alt="" 
                    className="object-contain shrink-0 w-5 aspect-square" 
                />
            </div>
            {/* border line */}
            <div className='border border-solid border-[#F0F0F0]' />
            {/* legend */}
            <div className='flex flex-wrap gap-4  px-4 mt-4'>
                <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#CEB0FA] w-[12px] rounded-[50%] h-[12px] ' /> 
                    <span className='text-[12px]'>Group 1</span>
                </div> 
                <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#B78AF7] w-[12px] rounded-[50%] h-[12px] ' /> 
                    <span className='text-[12px]'>Group 2</span>
                </div> 
                <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#9654F4] w-[12px] rounded-[50%] h-[12px] ' /> 
                    <span className='text-[12px]'>Group 3</span>
                </div> 
                <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#8133F1] w-[12px] rounded-[50%] h-[12px] ' /> 
                    <span className='text-[12px]'>Group 4</span>
                </div> 
                <div className='flex items-center gap-x-2'>
                    <span className='block bg-[#6200EE] w-[12px] rounded-[50%] h-[12px] ' /> 
                    <span className='text-[12px]'>Group 5</span>
                </div> 
            </div>

                <ScatterChart 
                    seriesData={seriesData}
                    xAxisTickAmount={10}
                    yAxisTickAmount={10}
                    showLegend={false}
                    width="full"
                />
        </div>
    );
}

export default DashboardScatterChart;
