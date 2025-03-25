import Chart from "react-apexcharts";

const BarChart = () => {
  const options:any = {
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
        distributed: true, // this line is mandatory to give each bar different color
        columnWidth: 15, // bar width
        borderRadius: 4,
        borderRadiusApplication: 'end',
      }
    },
    colors: ['#F94144', '#34C759', '#00C7BE', '#5856D6', '#AF52DE', '#FFCC00'],
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
        "XS",
        "S",
        "M",
        "M",
        "XL",
        "XXL",
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
      data: [10, 30 , 15, 20, 40, 60],
      // type: "line", //with this you can plot bar and chart line together
    },
  ];

  return (
    <Chart options={options} series={series} type="bar" />
  );
}

export default BarChart 