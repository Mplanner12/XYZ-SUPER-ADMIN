'use client';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import React, { useState } from 'react';

interface RecentUpdate {
	id: number;
	allTypes: string;
	company: string;
	location: string;
	lastModified: string;
    icon?: string;
    path?: string;
}

const columnHelper = createColumnHelper<RecentUpdate>();

const columns = [
	columnHelper.accessor('allTypes', {
		header: 'All Types',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('company', {
		header: 'Company',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('location', {
		header: 'Location',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('lastModified', {
		header: 'Last Modification',
		cell: (info) => info.getValue(),
	}),
];

const RecentUpdate: React.FC = () => {
	const [data, setData] = useState<RecentUpdate[]>([
		{
			id: 1,
			allTypes: 'Invoicing',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N, \nLongitude 122.4194\u00B0 W`,
			lastModified: '2023-03-31',
		},
		{
			id: 3,
			allTypes: 'Receive Payment',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N,
            Longitude 122.4194\u00B0 W`,
			lastModified: '2023-03-31',
		},
		{
			id: 3,
			allTypes: 'Sale Reconcilation',
			company: 'GFAMS',
			location: `Latitude 37.7749\u00B0 N,
            Longitude 122.4194\u00B0 W`,
			lastModified: '2023-03-31',
		},
	]);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});


	return (
		<div className=" w-full 2md:mt-5 mt-2">
			<div className="scroll overflow-x-auto border-2 border-solid border-foundation-grey-grey-300 rounded-xl">
				<table
					
					className="w-full text-wrap bg-white text-center border border-gray-300 text-sm"
				>
					<thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-4 px-4 font-medium border-b border-foundation-grey-grey-900 "
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="border-b border-solid border-gray-200"
							>
								{row.getVisibleCells().map((cell) => (
									<td
										key={cell.id}
										className="py-4 px-4 whitespace-break-spaces text-foundation-grey-grey-700"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default RecentUpdate;
