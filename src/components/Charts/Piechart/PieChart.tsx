import React from "react";
import Chart from "react-apexcharts";

// Define the props interface
interface PieChartProps {
  series: number[];
  colors?: string[];
  width?: string;
  height?: string;
  showLegend?: boolean;
  strokeWidth?: number;
}

const PieChart: React.FC<PieChartProps> = ({
  series,
  colors = ['#CEB0FA', '#B78AF7', '#9654F4'],
  width = 'auto',
  height = '300',
  showLegend = false,
  strokeWidth = 0,
}) => {
  const options: any = {
    chart: {
      id: "basic-pie",
      width: width,
      height: height,
    },
    colors: colors,
    stroke: {
      width: strokeWidth,
    },
    legend: {
      show: showLegend,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: any) {
        return val.toFixed(1) + "%";
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: false,
      },
      offsetX: 0,
      offsetY: 10,
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -20,
        },
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
  };

  return <Chart options={options} series={series} type="pie" height={height}/>;
};

export default PieChart;
