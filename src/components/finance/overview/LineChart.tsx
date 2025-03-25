import React from "react";
import Chart from "react-apexcharts";

interface LineChartProps {
  categories: string[];
  seriesData: Array<{
    name: string;
    data: number[];
    color: string;
  }>;
  height?: string;
  yAxisMin?: number;
  yAxisTickAmount?: number;
  showGridLines?: boolean;
  showLegend?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({
  height = 'auto',
  categories,
  seriesData,
  yAxisMin = 0,
  yAxisTickAmount = 4,
  showGridLines = true,
  showLegend = false,
}) => {
  const options: any = {
    chart: {
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
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inter, sans-serif",
          fontWeight: 400,
        },
      },
      offsetX: 0,
      offsetY: 0,
    },
    grid: {
      show: showGridLines,
      borderColor: '#BCBBBB',
      strokeDashArray: 2,
      position: 'back',
      xaxis: {
        lines: {
          show: showGridLines,
        }
      },   
      yaxis: {
        lines: {
          show: showGridLines,
        }
      },
    },
    yaxis: {
      type: "numeric",
      min: yAxisMin,
      tickAmount: yAxisTickAmount,
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "inter, sans-serif",
          fontWeight: 400,
        },
      },
      offsetX: 0,
      offsetY: 0,
    },
    stroke: {
      curve: "smooth",
      lineCap: 'round',
      width: 3,
    },
    legend: {
      show: showLegend,
    }
  };

  const series = seriesData.map((series) => ({
    name: series.name,
    data: series.data,
    color: series.color,
  }));

  return (
    <Chart options={options} series={series} type="line" height={height}/>
  );
};

export default LineChart;
