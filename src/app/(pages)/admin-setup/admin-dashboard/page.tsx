import React from 'react';
import DashboardComponent from '../_components/dashboardComponent';

export default function AdminDashboard() {
	return (
		<section className="w-full text-foundation-black-black-400 flex flex-col items-start justify-start leading-[normal] [row-gap:5px] flex-wrap bg-foundation-grey-grey-50 rounded-2xl px-4 py-4">
			<div className="flex flex-col gap-2 mt-0 md:mt-2">
				<h2 className=" font-medium text-[20px] m-0">Modules</h2>
				<p className="font-normal text-base text-foundation-grey-grey-800">
					Select a module to get started
				</p>
			</div>
			<DashboardComponent />
		</section>
	);
}
