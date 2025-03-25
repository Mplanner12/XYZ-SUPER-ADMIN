import Image from "next/image";
import Chart from "react-apexcharts";


const TSLChart = () => {
    const options:any = {
        chart: {
          id: "basic-bar",
          width: 300,
          height: 300,
          toolbar: {
            show: false,
            offsetX: 0,
            offsetY: -30,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            }
          },
        },
        xaxis: {
          categories: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          style: {
            fontSize: "12px",
            fontFamily: "intern, sans-serif",
            fontWeight: 400,
          },
          offsetX: 0,
          offsetY: 0,
        },
        grid: {
          show: true,
          borderColor: '#BCBBBB',
          strokeDashArray: 2,
          position: 'back',
          xaxis: {
            lines: {
              show: true
            }
          },   
          yaxis: {
            lines: {
              show: true
            }
          },
        },
        yaxis: {
          type: "numeric",
          min: 0,
          tickAmount: 4,
          style: {
            fontSize: "12px",
            fontFamily: "inter, sans-serif",
            fontWeight: 400,
          },
          offsetX: 0,
          offsetY: 0,
        },
        stroke: {
          curve: "smooth", // line curve
          lineCap: 'round', //line cap
          width: 3, // line width
        },
        legend: {
          show: false,
        }
      };
    
      const series = [
        {
          name: "Total Revenue",
          data: [1, 3, 6, 3, 8, 9, 7,],
          color: "#FF3B30", //first line color
        },
        {
          name: "Total Expenses",
          data: [4, 3, 10 ,12, 15, 20],
          color:'#34C759',
        },
        {
          name: "Total Asset",
          data: [9, 7, 8 ,4, 5, 15],
          color:'#FFCC00',
        },
        {
          name: "Total Liability",
          data: [8, 7,  6,4, 5, 7],
          color:'#00C7BE',
        },
        {
          name: "Total Equity",
          data: [8, 7, 3 ,4, 5, 15],
          color:'#5856D6',
        },
      ];
      
    return (
        <>
            <div className="flex justify-between items-baseline">
                <div className="w-[46%]">
                    <div className="flex items-center mb-3">
                        <h2 className="text-[#434343] text-base font-normal mr-2">Transaction Level Chart</h2>
                        <Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
                    </div>
                    <p className="text-[#939292] text-sm">
                        A line chart showing all transactions trends
                        over time.
                    </p>
                </div>

                <div className="bg-[#fff] flex flex-wrap w-[38%] text-[13px] items-center text-[#374B58] gap-[7px]">
                    <div className='flex'>
                        <div>
                            <span className='bg-[#FF3B30] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Total Revenue</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#34C759] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Total Expenses</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#FFCC00] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Total Asset</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#00C7BE] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Total Liability</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#5856D6] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Total Equity</p>
                    </div>
                </div>
            </div>
            <div>
                <Chart options={options} series={series} type="line" height="290" />
            </div>
        </>
    )
}

export default TSLChart;