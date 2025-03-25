"use client"
import React from "react";
import Chart from "react-apexcharts";

// Define the props interface
interface HorizontalChartProps {
  categories: string[];
  seriesData: { name: string; data: number[]; color?: string }[];
  width?: string;
  height?: string;
  showToolbar?: boolean;
  barHeight?: string;
}

const HorizontalChart: React.FC<HorizontalChartProps> = ({
  categories,
  seriesData,
  width = 'auto',
  height = '300',
  showToolbar = false,
  barHeight = '70%',
}) => {
  const options: any = {
    chart: {
      type: 'bar',
      id: "basic-bar",
      width: width,
      height: height,
      toolbar: {
        show: showToolbar,
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
        horizontal: true,
        barHeight: barHeight,
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
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "intern, sans-serif",
          fontWeight: 400,
        },
      },
      offsetX: 0,
      offsetY: 0,
    },
    yaxis: {
      type: "numeric",
      min: 0,
      tickAmount: 4,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "intern, sans-serif",
          fontWeight: 400,
        },
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

  const series = seriesData.map((seriesItem) => ({
    name: seriesItem.name,
    data: seriesItem.data,
    color: seriesItem.color || "#CEB0FA",
  }));

  return (
    <div style={{ width:"100%" }}>
      <Chart options={options} series={series} type="bar" height={height} />
    </div>
  );
};

export default HorizontalChart;
