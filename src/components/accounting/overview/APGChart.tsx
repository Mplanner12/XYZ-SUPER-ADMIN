import Image from "next/image";
import Chart from "react-apexcharts";


const APGChart = () => {
    const options: any = {
        chart: {
            type: 'bar',
            id: "basic-bar",
            width: '100%',
            height: 'auto',
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
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true, //for horizontal bar chart
                barHeight: '70%', // bar width for horizontal bar chart
            }
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
        xaxis: {
            categories: [
                "Mon",
                "Tue",
                "Wed",
                "Thur",
                "Fri",
                "Sat",
                "Sun",
            ],
            style: {
                fontSize: "12px",
                fontFamily: "intern, sans-serif",
                fontWeight: 400,
            },
            offsetX: 0,
            offsetY: 0,
        },
        yaxis: {
            type: "numeric",
            min: 0,
            tickAmount: 4,
            style: {
                fontSize: "12px",
                fontFamily: "intern, sans-serif",
                fontWeight: 400,
            },
            offsetX: 0,
            offsetY: 0,
        },
        stroke: {
            curve: "smooth",
            barCap: 'round',
        },
        legend: {
            show: false,
        }
    };

    const series = [
        {
            name: "Account 1",
            data: [1, 3, 6, 3, 8, 9, 7],
            color: "#FF3B30",
            // type: "line", //with this you can plot bar and chart line together
        },
        {
            name: "Account 2",
            data: [4, 3, 10, 12, 15, 20, 9],
            color: '#34C759',
            // type: "line",
        },
    ];

    return (
        <>
            <div className="flex justify-between">
                <div className="">
                    <div className="flex items-center mb-1">
                        <h2 className="text-[#434343] text-base font-normal mr-5">Accounts Payable Aging</h2>
                        <Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
                    </div>
                    <p className="text-[#939292]  text-sm">
                        A bar chart showing accounts payable aging
                        overtime
                    </p>
                </div>

                <div className="bg-[#fff] flex border-t-2 border-secondary flex-wrap text-[13px] items-center text-[#374B58] gap-[7px]">
                    <div className='flex'>
                        <div>
                            <span className='bg-[#FF3B30] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Account 1</p>
                    </div>
                    <div className='flex'>
                        <div>
                            <span className='bg-[#34C759] mr-2 inline-block rounded-3xl p-[3px]'></span>
                        </div>
                        <p>Account 2</p>
                    </div>
                </div>
            </div>

            <div>
                <Chart options={options} series={series} type="bar" height="250"/>
            </div>
        </>
    )
}

export default APGChart;