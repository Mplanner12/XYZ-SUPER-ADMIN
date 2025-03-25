import Chart from 'react-apexcharts';

const InventoryLineChart = () => {
	const options: any = {
		chart: {
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
		xaxis: {
			categories: [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			],
			style: {
				fontSize: '12px',
				fontFamily: 'intern, sans-serif',
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
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		yaxis: {
			type: 'numeric',
			min: 0,
			tickAmount: 4,
			style: {
				fontSize: '12px',
				fontFamily: 'inter, sans-serif',
				fontWeight: 400,
			},
			offsetX: 0,
			offsetY: 0,
		},
		stroke: {
			curve: 'smooth', // line curve
			lineCap: 'round', //line cap
			width: 3, // line width
		},
		legend: {
			show: false,
		},
	};

	const series = [
		{
			name: 'Total Revenue',
			data: [1, 3, 6, 3, 8, 9, 7],
			color: '#B78AF7', //first line color
			// type: "line", //with this you can plot bar and chart line together
		},
		{
			name: 'Expenses',
			data: [4, 3, 10, 12, 15, 20],
			color: '#E00B2B',
			// type: "line",
		},
		{
			name: 'Profits',
			data: [8, 7, 8, 4, 5, 15],
			color: '#00A814',
			// type: "line",
		},
	];

	return <Chart options={options} series={series} type="line" height="320" />;
};
export default InventoryLineChart;
