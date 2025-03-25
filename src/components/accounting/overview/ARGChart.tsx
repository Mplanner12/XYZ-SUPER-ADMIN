import Image from "next/image";
import Chart from "react-apexcharts";


const ARGChart = () => {
    const options: any = {
        chart: {
            id: "basic-pie",
            width: "100%",
            height: "100%",
        },
        colors: ['#8133F1', '#CEB0FA', '#6200EE', '#290064'],
        stroke: {
            width: 2,
        },
        legend: {
            show: false,
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -25, 
                },
            }
        },
    };

    const series = [44, 55, 34, 25];

    return (
        <>
            <div className="mb-2">
                <div className="">
                    <div className="flex items-center mb-1">
                        <h2 className="text-[#434343] text-base font-normal mr-5">Accounts Receivable Aging</h2>
                        <Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
                    </div>
                    <p className="text-[#939292] text-sm">
                        Based on Location
                    </p>
                </div>
            </div>
            <div className="bg-[#fff] pt-5 mb-5 flex border-t-2 border-secondary flex-wrap text-[13px] items-center text-[#374B58] gap-[7px]">
                <div className='flex'>
                    <div>
                        <span className='bg-[#B78AF7] mr-2 inline-block rounded-3xl p-[3px]'></span>
                    </div>
                    <p>Current</p>
                </div>
                <div className='flex'>
                    <div>
                        <span className='bg-[#9654F4] mr-2 inline-block rounded-3xl p-[3px]'></span>
                    </div>
                    <p>1-31 days</p>
                </div>
                <div className='flex'>
                    <div>
                        <span className='bg-[#8133F1] mr-2 inline-block rounded-3xl p-[3px]'></span>
                    </div>
                    <p>30-60 days</p>
                </div>
                <div className='flex'>
                    <div>
                        <span className='bg-[#8133F1] mr-2 inline-block rounded-3xl p-[3px]'></span>
                    </div>
                    <p>past Due</p>
                </div>
            </div>
            <div>
                <Chart options={options} series={series} type="pie" height="320"/>
            </div>
        </>
    )
}

export default ARGChart;