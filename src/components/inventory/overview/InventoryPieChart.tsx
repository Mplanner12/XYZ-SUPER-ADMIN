import Image from 'next/image';
import Chart from 'react-apexcharts';

const PieChart = () => {
	const options: any = {
		chart: {
			id: 'basic-pie',
			width: '100%',
			height: '100%',
		},
		colors: ['#8133F1', '#290064', '#6200EE', '#CEB0FA'],
		stroke: {
			width: 2,
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

	const series = [44, 55, 34, 25 ];

	return (
		<>
			<div className="mb-2">
				<div className="">
					<div className="flex items-center mb-1">
						<h2 className="text-[#434343] text-base font-normal mr-5">
							Inventory Distribution
						</h2>
						<Image src="/open-in-new.svg" width={25} height={25} alt="icons" />
					</div>
					<p className="text-[#939292] text-sm">Based on Location</p>
				</div>
			</div>
			<div className="bg-[#fff] pt-5 mb-5 flex border-t-2 border-secondary flex-wrap text-[13px] items-center text-[#374B58] gap-[7px]">
				<div className="flex">
					<div>
						<span className="bg-[#8133F1] mr-2 inline-block rounded-3xl p-[3px]"></span>
					</div>
					<p>Product 1</p>
				</div>
				<div className="flex">
					<div>
						<span className="bg-[#290064] mr-2 inline-block rounded-3xl p-[3px]"></span>
					</div>
					<p>Product 2</p>
				</div>
				<div className="flex">
					<div>
						<span className="bg-[#6200EE] mr-2 inline-block rounded-3xl p-[3px]"></span>
					</div>
					<p>Product 3</p>
				</div>
				<div className="flex">
					<div>
						<span className="bg-[#CEB0FA] mr-2 inline-block rounded-3xl p-[3px]"></span>
					</div>
					<p>Product 4</p>
				</div>
			</div>
			<div>
				<Chart options={options} series={series} type="pie" height="300" />
			</div>
		</>
	);
};

export default PieChart;
