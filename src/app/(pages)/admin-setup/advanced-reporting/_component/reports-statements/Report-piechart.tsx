import React from "react";
import Image from "next/image";
import Chart from "react-apexcharts";

const ReportPieChart = () => {

  const options: any = {
    chart: {
      id: "basic-pie",
      width: "100%",
      height: "100%",
    },
    colors: ["#FFCC00", "#30B0C7", "#6200EE", "#CEB0FA", "#9654F4", "#290064"],
    stroke: {
      width: 0,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -25,
        },
      },
    },
  };

  const series = [20, 15, 11, 12, 10, 12];

  return (
    <div>
      <div className="bg-[#fff] p-5 rounded-[20px] w-full h-full shadow-custom">
        <div className="mb-2">
          <div className="">
            <div className="flex items-center mb-1">
              <h2 className="text-[#434343] text-base font-normal mr-5">
                Inventory Statement
              </h2>
              <Image
                src="/open-in-new.svg"
                width={25}
                height={25}
                alt="icons"
              />
            </div>
            <p className="text-[#939292] text-sm">Based on Location</p>
          </div>
        </div>
        <div className="bg-[#fff] pt-5 mb-5 flex border-t-2 border-secondary flex-wrap text-[13px] items-center text-[#374B58] gap-[7px]">
          <div className="flex">
            <div>
              <span className="bg-[#6200EE] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Revenue</p>
          </div>
          <div className="flex">
            <div>
              <span className="bg-[#290064] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Cost of Goods Sold</p>
          </div>
          <div className="flex">
            <div>
              <span className="bg-[#6200EE] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Operating Expenses</p>
          </div>
          <div className="flex">
            <div>
              <span className="bg-[#CEB0FA] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Other Income</p>
          </div>
          <div className="flex">
            <div>
              <span className="bg-[#FFCC00] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Income Tax Expense</p>
          </div>
          <div className="flex">
            <div>
              <span className="bg-[#30B0C7] mr-2 inline-block rounded-3xl p-[3px]"></span>
            </div>
            <p>Other Comprehensive Income</p>
          </div>
        </div>
        <div>
          <Chart options={options} series={series} type="pie" height="400" />
        </div>
      </div>
    </div>
  );
};

export default ReportPieChart;
