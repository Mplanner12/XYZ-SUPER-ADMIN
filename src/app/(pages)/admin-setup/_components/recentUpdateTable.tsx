"use client"

import React, { useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

type AppPath = '/';

interface RecentUpdate {
	id: number;
	allTypes: string;
	company: string;
	location: string;
	lastModified: string;
	icon?: React.ReactNode;
	path?: AppPath;
}

const RecentUpdateTable: React.FC = () => {
	const [rows, setRows] = useState<RecentUpdate[]>([
		{
			id: 1,
			allTypes: 'Invoicing',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N,    \nLongitude 122.4194\u00B0 W`,
			icon: <FaExternalLinkAlt />,
			lastModified: '2023-03-31',
		},
		{
			id: 2,
			allTypes: 'Receive Payment',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N,    \nLongitude 122.4194\u00B0 W`,
			icon: <FaExternalLinkAlt />,
			lastModified: '2023-03-31',
		},
		{
			id: 3,
			allTypes: 'Sale Reconcilation',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N,    \nLongitude 122.4194\u00B0 W`,
			lastModified: '2023-03-31',
		},
	]);

	const handleAction = (id: number) => {
		// Implement action logic here
		console.log(`Action for row ${id}`);
	};

	return (
		<div className="w-full md:mt-5 mt-2 mb-5">
			<div className="lg:w-[980px] w-full scrollbar-thin scrollbar-track-primary scrollbar-thumb-plain scrollbar-thumb-current border border-solid border-foundation-grey-grey-300 rounded-2xl">
				<div className="overflow-x-auto">
					<table
						style={{ borderSpacing: 0 }}
						className="w-full text-sm rounded-2xl text-left"
					>
						<thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm w-full border-b-foundation-grey-grey-300 text-left">
							<tr>
								<th className="py-4 px-4 font-medium">All Types</th>
								<th className="py-4 px-4 font-medium">Company</th>
								<th className="py-4 px-4 font-medium">Location</th>
								<th className="py-4 px-4 font-medium">
									Last Modified
								</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((row, index) => (
								<tr
									key={row.id}
									className={`${
										index === rows.length - 1 ? 'border-b-none' : 'border-b'
									} border-b-foundation-grey-grey-300 hover:bg-gray-100`}
								>
									<td className=" whitespace-break-spaces py-4 px-4 text-foundation-grey-grey-700 text-left">
										<span className=' flex gap-1'>
											{' '}
											{row.allTypes}
											{row.icon}
										</span>
									</td>
									<td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700 text-left">
										{row.company}
									</td>
									<td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700 text-left">
										{row.location}
									</td>
									<td className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700">
										{row.lastModified}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default RecentUpdateTable;
