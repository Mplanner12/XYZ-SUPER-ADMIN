import React, { lazy, Suspense } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";



const LineChart = dynamic(() => import('@/components/Charts/LineChart/LineChart'), {
    loading: () => <p>Loading...</p>,
    ssr: false
  });

const DashboardLineChart: React.FC = () => {
    const categories = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const seriesData = [
        {
            name: "Total Revenue",
            data: [1, 3, 6, 3, 8, 9, 7],
            color: "#B78AF7",
        },
        {
            name: "Expenses",
            data: [4, 3, 10, 12, 15, 20],
            color: '#28a745',
        },
        {
            name: "Profits",
            data: [8, 7, 8, 4, 5, 15],
            color: '#FF7F50',
        },
    ];

    return (
        <div className="shadow-md w-full h-full  rounded-xl p-4 bg-white">
            <div className="flex justify-between items-baseline mb-5">
                <div className="">
                    <div className="flex items-center mb-3">
                        <h2 className="text-[#434343] text-base font-normal mr-2">Sales Trends Chart</h2>
                        <Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
                    </div>
                    <p className="text-[#939292] text-sm">
                        A line Chart showing trends in sales
                    </p>
                </div>

                <div className="bg-[#fff] flex flex-wrap  text-[13px] items-center text-[#374B58] gap-[7px]">
                    <div className='flex'>
                        <div>
                            <span className='bg-[#B78AF7] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Product 1</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#9654F4] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Product 2</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#8133F1] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Product 4</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#7e2af4] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Product 5</p>
                    </div>
                </div>
            </div>
                <LineChart
                    categories={categories}
                    seriesData={seriesData}
                    yAxisMin={0}
                    yAxisTickAmount={4}
                    showGridLines={true}
                    showLegend={false}
                />
        </div>
    );
};

export default DashboardLineChart;
