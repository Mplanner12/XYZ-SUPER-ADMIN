import React from "react";
import Chart from "react-apexcharts";

interface ScatterChartProps {
  seriesData: Array<{
    name: string;
    data: number[][];
    color: string;
  }>;
  xAxisTickAmount?: number;
  yAxisTickAmount?: number;
  showLegend?: boolean;
  width?: string;
  height?: number;
}

const ScatterChart: React.FC<ScatterChartProps> = ({
  seriesData,
  xAxisTickAmount = 10,
  yAxisTickAmount = 10,
  showLegend = false,
  width = 'auto',
  height = "300",
}) => {
  const options: any = {
    chart: {
      type: 'scatter',
      id: "basic-bar",
      width: width,
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
      tickAmount: xAxisTickAmount,
      labels: {
        formatter: function(val: any) {
          return parseFloat(val).toFixed(1);
        },
      },
    },
    yaxis: {
      tickAmount: yAxisTickAmount,
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
    <div className={`w-[${width}]`}>
      <Chart options={options} series={series} type="scatter" height={height} />
    </div>
  );
};

export default ScatterChart;
