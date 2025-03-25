'use client';

import OverViewFilter from '@/components/finance/OverviewFilter';
import HeaderLayout from '@/components/MainLayouts/HeaderLayout';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useFormik } from 'formik';
import { ChevronDown, ForwardIcon, Minimize, PaintBucketIcon, PrinterIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BsSortUp } from 'react-icons/bs';
import { IoFilterSharp } from 'react-icons/io5';


interface InventoryTurnoverReportData {
	id: number;
	transactionId: string;
	productName: string;
	sourceLocation: string;
	quantityAvailable: string;
	quantityOrder: string;
	destinationLocation: string;
	transferDate: string;
}

const columnHelper = createColumnHelper<InventoryTurnoverReportData>();

// action button component
const generateTscTableOptions = [
	{
		label: 'View Details',
	},
	{ label: 'Edit' },
	{ label: 'Delete' },
];


const AuditTrail = () => {
	const [menu, setMenu] = useState('');
	const [selectedTab, setSelectedTab] = useState('inventory-product');

	// useState for modal component
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	// for filter
	const [openFilter, setOpenFilter] = useState<string | null>(null);

	const handleToggle = (filterName: string) => {
		setOpenFilter(openFilter === filterName ? null : filterName);
	};

	const handleStoreSelect = (selectedOption: string) => {
		console.log('Selected Store:', selectedOption);
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);
	const handleReplenishOrder = () => {
		// handle payment logic
		console.log('proceeding with payment');
	};

	// table data
	const [data, setData] = useState<InventoryTurnoverReportData[]>([
		{
			id: 1,
			transactionId: '39297',
			productName: 'Invoicing',
			sourceLocation: `Mushin warehouse`,
			quantityAvailable: '100',
			quantityOrder: '15',
			destinationLocation: '25000',
			transferDate: '06-23-2022',
		},
		{
			id: 3,
			transactionId: '39297',
			productName: 'Receive Payment',

			sourceLocation: `Mushin warehouse`,
			quantityAvailable: '100',
			quantityOrder: '150',
			destinationLocation: '10000',
			transferDate: '06-23-2022',
		},
		{
			id: 3,
			transactionId: '39297',
			productName: 'Sale Reconcilation',

			sourceLocation: `Mushin warehouse`,
			quantityAvailable: '100',
			quantityOrder: '150',
			destinationLocation: '25000',
			transferDate: '06-23-2022',
		},
	]);

	// handle location change
	const handleLocationChange = (
		e: React.ChangeEvent<HTMLSelectElement>,
		id: number
	) => {
		const newLocation = e.target.value;
		const updatedData = data.map((item) => {
			if (item.id === id) {
				return { ...item, location: newLocation };
			}
			return item;
		});
		setData(updatedData);
	};

	// Table header and body data
	const columns = [
		columnHelper.accessor('transactionId', {
			header: 'Transaction ID',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('productName', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('quantityAvailable', {
			header: 'Quantity Available',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('quantityOrder', {
			header: 'Quantity to Order',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('sourceLocation', {
			header: 'Source Location',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('destinationLocation', {
			header: 'Destination Location',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('transferDate', {
			header: 'Transfer Date',
			cell: (info) => info.getValue(),
		}),
	];

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const handleDateChange = (date: Date | null) => {
		if (date) {
			formik.setFieldValue('dateFrom', date);
		}
	};

	const formik = useFormik({
		initialValues: { dateFrom: new Date() },
		// validationSchema,
		onSubmit: (values: any) => {
			//   handleSubmit(values);
		},
	});

    const breadcrumbs = ['Admin Dashboard', 'Inventory Module'];

	return (
		<>
			<section className="">
				<HeaderLayout
					moduleName="Audit Trail"
					moduleLink="/inventory/overview"
					page="Audit Trial"
					pageLink="/inventory/audit-trial"
					breadcrumbs={breadcrumbs}
				/>

				<div className="px-4">
					<div className="bg-secondary px-4 py-4 rounded-2xl">
						<main className="py-4 ">
							<div className="flex justify-between items-center sm:pb-6 pb-4">
								<h2 className="text-xl font-normal">Audit Trail</h2>
							</div>

							<div className="flex justify-between items-center py-4">
								<div className="flex justify-between text-sm text-foundation-purple-purple-400">
									<div className="flex gap-4">
										<p className="flex align-middle gap-2">
											Filter <IoFilterSharp color="#8133F1" size={24} />
										</p>
										<p className="flex align-middle gap-2">
											Sort <BsSortUp color="#8133F1" size={24} />
										</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<p>Date Range</p>
									<div className="relative">
										<DatePicker
											selected={formik.values.dateFrom}
											dateFormat="dd/MM/yyyy"
											className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
											onChange={handleDateChange}
										/>
										<Image
											src="/calendar.png"
											className="absolute right-2 top-[.7rem]"
											width={18}
											height={18}
											alt="icon"
										/>
									</div>
									<p>to</p>
									<div className="relative">
										<DatePicker
											selected={formik.values.dateFrom}
											dateFormat="dd/MM/yyyy"
											className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
											onChange={handleDateChange}
										/>
										<Image
											src="/calendar.png"
											className="absolute right-2 top-[.7rem]"
											width={18}
											height={18}
											alt="icon"
										/>
									</div>
								</div>
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
														{flexRender(
															cell.column.columnDef.cell,
															cell.getContext()
														)}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</main>
					</div>
				</div>
			</section>
		</>
	);
};

export default AuditTrail;
