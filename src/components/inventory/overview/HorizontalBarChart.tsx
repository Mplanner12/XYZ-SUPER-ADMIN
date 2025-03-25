import Chart from 'react-apexcharts';

const HorizontalBarChart = () => {
	const options: any = {
		chart: {
			type: 'bar',
			id: 'basic-bar',
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
				},
			},
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				borderRadiusApplication: 'end',
				horizontal: true, //for horizontal bar chart
				barHeight: '70%', // bar width for horizontal bar chart
			},
		},
		grid: {
			show: true,
			borderColor: '#BCBBBB',
			strokeDashArray: 2,
			position: 'back',
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		xaxis: {
			categories: [
				'Mon',
				'Tues',
				'Wed',
				'Thurs',
				'Fri',
				'Sat',
				'Sun',
			],
			style: {
				fontSize: '12px',
				fontFamily: 'intern, sans-serif',
				fontWeight: 400,
			},
			offsetX: 0,
			offsetY: 0,
		},
		yaxis: {
			type: 'numeric',
			min: 0,
			tickAmount: 4,
			style: {
				fontSize: '12px',
				fontFamily: 'intern, sans-serif',
				fontWeight: 400,
			},
			offsetX: 0,
			offsetY: 0,
		},
		stroke: {
			curve: 'smooth',
			barCap: 'round',
		},
		legend: {
			show: false,
		},
	};

	const series = [
		{
			name: 'Account 1',
			data: [1, 3, 6, 3, 8, 9, 7],
			color: '#ff3b30',
			// type: "line", //with this you can plot bar and chart line together
		},
		{
			name: 'Account 2',
			data: [4, 3, 10, 12, 15, 20, 9],
			color: '#34c759',
			// type: "line",
		},
	];

	return <Chart options={options} series={series} type="bar" height="270" />;
};

export default HorizontalBarChart;
