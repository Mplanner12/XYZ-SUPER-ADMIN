'use client';

import BusinessLocationModal from '@/app/(pages)/setup/_setupComponets/setup-BusinessLocationModal';
import InventoryLocationModal from '@/components/inventory/InventoryLocationModal';
import LocationModal from '@/components/inventory/LocationModal';
import TableDropDown from '@/components/inventory/TableDropDown/TableDropDown';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Map } from 'lucide-react';
import React, { useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { FaAngleDown, FaAngleRight } from 'react-icons/fa6';
import { IoFilterSharp } from 'react-icons/io5';

interface WarehouseLocationData {
	id: number;
	warehouseName: string;
	address: string;
	postalCode: string;
	location: string;
	capacity: number;
	storageZones: string;
	action: string;
	path?: string;
}

const generateTscTableOptions = [
	{ label: 'Edit' },
	{ label: 'Delete' },
];

const columnHelper = createColumnHelper<WarehouseLocationData>();

const columns = [
	columnHelper.accessor('warehouseName', {
		header: 'Warehouse Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('address', {
		header: 'Address',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('postalCode', {
		header: 'Postal Code',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('location', {
		header: 'Location on Map',
		cell: (info) => (
			<div className="text-foundation-purple-purple-400">{info.getValue()}</div>
		),
	}),
	columnHelper.accessor('capacity', {
		header: 'Capacity (M³)',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('storageZones', {
		header: 'Storage Zones',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('action', {
		header: 'Action',
		cell: (info) => (
			<div className="flex justify-center">
				<TableDropDown options={generateTscTableOptions} />
				{info.getValue()}
			</div>
		),
	}),
];

const WarehouseLocationFullTable: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

  const handleModal = () => {
		// handle payment logic
		console.log('proceeding with payment');
	};

  const [rows, setRows] = useState<WarehouseLocationData[]>([
		{
			id: 1,
			warehouseName: 'Mushin Store',
			address: 'Industrial Crescent, 100253, Mushin, Lagos State Nigeria',
			postalCode: '100101',
			storageZones: '1600',
			capacity: 8000,
			location: `Latitude 37.7749° N, Longitude 122.4194° W`,
			action: '',
		},
		{
			id: 2,
			warehouseName: 'lekki store',
			address: 'Industrial Crescent, 100253, Mushin, Lagos State Nigeria',
			capacity: 8000,
			postalCode: '100101',
			storageZones: '1600',
			location: `Latitude 37.7749° N, Longitude 122.4194° W`,
			action: '',
		},
		{
			id: 3,
			warehouseName: 'lekki store',
			address: 'Industrial Crescent, 100253, Mushin, Lagos State Nigeria',
			postalCode: '100101',
			storageZones: '1600',
			capacity: 8000,
			location: `Latitude 37.7749° N, Longitude 122.4194° W`,
			action: '',
		},
	]);

  const handleAction = (id: number) => {
    // Implement action logic here
    console.log(`Action for row ${id}`);
  };

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const amount = 1000;

  return (
		<div className="w-full mt-5 flex flex-col gap-4">
			<div className="flex justify-between text-foundation-purple-purple-400 text-sm items-center">
				<h2 className="text-2xl font-normal text-foundation-black-black-400">
					Warehouse Locations
				</h2>
				<p onClick={openModal} className="cursor-pointer">
					+ Add More Locations
				</p>
			</div>
			<div className="flex justify-between text-sm text-foundation-purple-purple-400">
				<div className="flex gap-4">
					<p className="flex align-middle gap-2">
						Filter <IoFilterSharp color="#8133F1" size={24} />
					</p>
					<p className="flex align-middle gap-2">
						Sort <BsSortUp color="#8133F1" size={24} />
					</p>
				</div>
				<p className="flex items-center gap-2 cursor-pointer">
					Showing all columns <FaAngleDown color="#8133F1" size={16} />
				</p>
			</div>
			<div className="scroll overflow-x-auto border-none">
				<table className="w-full text-wrap bg-white text-center text-sm">
					<thead className="bg-foundation-grey-grey-300/25 text-foundation-black-black-400 text-sm ">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th
										key={header.id}
										className="py-4 px-4 font-medium border-b border-foundation-grey-grey-200 "
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
								className="border-b border-foundation-grey-grey-300"
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

			{/* modal component */}
			<LocationModal isOpen={isModalOpen} onClose={closeModal}>
				<div className="flex flex-col justify-center items-center gap-y-2 py-4 overflow-y-auto no-scroll w-full">
					<p className="text-xl font-medium text-center">Add A New Location</p>

					<div className="w-[60%]">
						<InventoryLocationModal />
					</div>

					<div className=" w-[60%] mt-2 px-2" onClick={handleModal}>
						<label
							htmlFor=""
							className="w-full h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px] flex-col"
						>
							Location on Map
							<div className="mt-2 w-full rounded-md border border-solid py-3 px-3 font-normal shadow-sm outline-none border-foundation-grey-grey-600 text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 flex justify-between items-center">
								<p>Select location on map</p>
								<Map size="16" color="#8133f1" />
							</div>
						</label>
					</div>
				</div>
			</LocationModal>
		</div>
		// <div className="flex justify-between text-foundation-purple-purple-400 text-sm items-center">
		//   <h2 className="text-2xl font-normal text-foundation-black-black-400">
		//     Warehouse Locations
		//   </h2>
		//   <p>+ Add More Locations</p>
		// </div>
		// <div className="flex justify-between text-sm text-foundation-purple-purple-400">
		//   <div className="flex gap-4">
		//     <p className="flex align-middle gap-2">
		//       Filter <IoFilterSharp color="#8133F1" size={24} />
		//     </p>
		//     <p className="flex align-middle gap-2">
		//       Sort <BsSortUp color="#8133F1" size={24} />
		//     </p>
		//   </div>
		//   <p className="flex items-center gap-2 cursor-pointer">
		//     See all <FaAngleRight color="#8133F1" size={16} />
		//   </p>
		// </div>
	);
}

export default WarehouseLocationFullTable