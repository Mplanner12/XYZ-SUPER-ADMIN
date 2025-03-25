'use client';

import OverViewFilter from '@/components/finance/OverviewFilter';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ForwardIcon, Minimize, PaintBucketIcon, PrinterIcon, SquareArrowOutUpRightIcon } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BsSortUp } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { IoFilterSharp } from 'react-icons/io5';
import { LuCable } from 'react-icons/lu';
import { RiExpandDiagonalLine } from 'react-icons/ri';
import { dashboardLogo } from '../../../../public';
import ModalComponent from '../ModalComponent';

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

interface ReplenishProductProps {
	handleTabChange: (tab: string) => void;
}

const InventoryTurnoverReport = () => {
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

	const amount = 1000;

	return (
		<>
			<section className="pb-4 pt-6">
				<main>
					<div className="flex justify-between items-center sm:pb-6 pb-4">
						<h2 className="text-xl font-normal">Inventory Summary Report</h2>
					</div>

					<div className="text-[#8133F1] flex gap-5 justify-between sm:w-[50%] w-full pb-3">
						<button className="flex gap-1">
							Download Report
							<SquareArrowOutUpRightIcon size="16px" />
						</button>
						<button className="flex gap-1">
							Print Report
							<PrinterIcon size="16px" />
						</button>
						<button className="flex gap-1">
							Share Report
							<ForwardIcon size="16px" />
						</button>
						<button className="flex gap-1">
							Customize Report
							<PaintBucketIcon size="16px" />
						</button>
					</div>

					<div className="flex justify-between">
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
						<div className="flex justify-between text-sm text-foundation-purple-purple-400">
							<div className="flex gap-4">
								<p className="flex item-center gap-2">
									Expand Table{' '}
									<RiExpandDiagonalLine color="#8133F1" size={24} />
								</p>
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

					{/* modal component */}
					<ModalComponent isOpen={isModalOpen} onClose={closeModal}>
						<div className="flex flex-col justify-center items-center gap-y-6 py-10">
							<FaCheckCircle color="#00A814" size={60} />
							<p className="text-base text-center">
								New Product has been added <br /> successfully
							</p>
							<button
								type="button"
								className="rounded-xl sm:w-[50%] w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
								onClick={handleReplenishOrder}
							>
								Proceed to Payment
							</button>
						</div>
					</ModalComponent>
				</main>
			</section>
		</>
	);
};

export default InventoryTurnoverReport;
