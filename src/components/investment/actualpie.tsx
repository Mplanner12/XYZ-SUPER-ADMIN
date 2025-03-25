import Chart from "react-apexcharts";

const actualPie = () => {
  const options:any = {
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
    labels: ['Stocks', 'Bonds', 'Cash'],
    colors:['#CEB0FA', '#B78AF7', '#9654F4'],
    stroke: {
      width: 0 //Remove White space between each slice
    },
    legend: {
      show: false,
    }
  };

  const series = [55, 35, 10];

  return (
    <Chart options={options} series={series} type="pie" />
  );
}
export default actualPie