// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {
//     IconButton,
//     Menu,
//     MenuItem,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
// } from '@mui/material';
// import React, { useState } from 'react';

// type RowData = {
// 	id: number;
// 	name: string;
// 	value: string;
// 	description: string;
// };

// const initialData: RowData[] = [
// 	{ id: 1, name: 'Row 1', value: 'Value 1', description: 'Description 1' },
// 	{ id: 2, name: 'Row 2', value: 'Value 2', description: 'Description 2' },
// 	{ id: 3, name: 'Row 3', value: 'Value 3', description: 'Description 3' },
// ];

// const SetupTable: React.FC = () => {
// 	const [data, setData] = useState(initialData);
// 	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
// 	const [selectedRow, setSelectedRow] = useState<null | number>(null);

// 	const handleClick = (
// 		event: React.MouseEvent<HTMLButtonElement>,
// 		id: number
// 	) => {
// 		setAnchorEl(event.currentTarget);
// 		setSelectedRow(id);
// 	};

// 	const handleClose = () => {
// 		setAnchorEl(null);
// 		setSelectedRow(null);
// 	};

// 	const handleDelete = () => {
// 		if (selectedRow !== null) {
// 			setData(data.filter((row) => row.id !== selectedRow));
// 		}
// 		handleClose();
// 	};

// 	const handleEdit = () => {
// 		console.log('Edit row:', selectedRow);
// 		handleClose();
// 	};

// 	const handleOther = () => {
// 		console.log('Other action for row:', selectedRow);
// 		handleClose();
// 	};

// 	return (
// 		<TableContainer>
// 			<Table className='border border-solid border-foundation-grey-grey-300 rounded-lg text-[12px]'>
// 				<TableHead className='bg-foundation-grey-grey-200 text-[12px]'>
// 					<TableRow>
// 						<TableCell className='text-sm'>Name</TableCell>
// 						<TableCell>Value</TableCell>
// 						<TableCell>Description</TableCell>
// 						<TableCell>Actions</TableCell>
// 					</TableRow>
// 				</TableHead>
// 				<TableBody>
// 					{data.map((row) => (
// 						<TableRow key={row.id}>
// 							<TableCell>{row.name}</TableCell>
// 							<TableCell>{row.value}</TableCell>
// 							<TableCell>{row.description}</TableCell>
// 							<TableCell>
// 								<IconButton onClick={(e) => handleClick(e, row.id)}>
// 									<MoreVertIcon />
// 								</IconButton>
// 								<Menu
// 									anchorEl={anchorEl}
// 									open={Boolean(anchorEl) && selectedRow === row.id}
// 									onClose={handleClose}
// 								>
// 									<MenuItem onClick={handleEdit}>Edit</MenuItem>
// 									<MenuItem onClick={handleDelete}>Delete</MenuItem>
// 									<MenuItem onClick={handleOther}>Other</MenuItem>
// 								</Menu>
// 							</TableCell>
// 						</TableRow>
// 					))}
// 				</TableBody>
// 			</Table>
// 		</TableContainer>
// 	);
// };

// export default SetupTable;


// components/TableWithActions.tsx

// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import {
//     Box,
//     FormControl,
//     IconButton,
//     InputLabel,
//     Menu, MenuItem,
//     Select,
//     MenuItem as SelectMenuItem,
//     Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//     TableSortLabel,
//     TextField
// } from '@mui/material';
// import React, { useState } from 'react';
// // import { TableRowProps, Order } from '../types';
// import { SelectChangeEvent } from '@mui/material/Select'; // Import SelectChangeEvent

// export interface TableRowProps {
// 	id: number;
// 	name: string;
// 	value: string;
// 	description: string;
// }

// export type Order = 'asc' | 'desc';

// const initialData: TableRowProps[] = [
//   { id: 1, name: 'Row 1', value: 'Value 1', description: 'Description 1' },
//   { id: 2, name: 'Row 2', value: 'Value 2', description: 'Description 2' },
//   { id: 3, name: 'Row 3', value: 'Value 3', description: 'Description 3' },
// ];

// const TableWithActions: React.FC = () => {
//   const [data, setData] = useState(initialData);
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const [selectedRow, setSelectedRow] = useState<null | number>(null);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filter, setFilter] = useState('');
//   const [order, setOrder] = useState<Order>('asc');
//   const [orderBy, setOrderBy] = useState<keyof TableRowProps>('name');

//   const handleRequestSort = (property: keyof TableRowProps) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleFilterChange = (event: SelectChangeEvent<string>) => { // Use SelectChangeEvent
//     setFilter(event.target.value as string);
//   };

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
//     setAnchorEl(event.currentTarget);
//     setSelectedRow(id);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setSelectedRow(null);
//   };

//   const handleDelete = () => {
//     if (selectedRow !== null) {
//       setData(data.filter(row => row.id !== selectedRow));
//     }
//     handleClose();
//   };

//   const handleEdit = () => {
//     console.log('Edit row:', selectedRow);
//     handleClose();
//   };

//   const handleOther = () => {
//     console.log('Other action for row:', selectedRow);
//     handleClose();
//   };

//   const filteredData = data.filter(row =>
//     row.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     (filter === '' || row.description.toLowerCase().includes(filter.toLowerCase()))
//   );

//   const sortedData = filteredData.sort((a, b) => {
//     if (orderBy === 'name') {
//       return (order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
//     } else if (orderBy === 'value') {
//       return (order === 'asc' ? a.value.localeCompare(b.value) : b.value.localeCompare(a.value));
//     } else {
//       return (order === 'asc' ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description));
//     }
//   });

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between" mb={2}>
//         <TextField
//           label="Search"
//           variant="outlined"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//         <FormControl variant="outlined" className='w-full'>
//           <InputLabel>Filter</InputLabel>
//           <Select
//             value={filter}
//             onChange={handleFilterChange}
//             label="Filter"
//           >
//             <SelectMenuItem value="">None</SelectMenuItem>
//             <SelectMenuItem value="description 1">Description 1</SelectMenuItem>
//             <SelectMenuItem value="description 2">Description 2</SelectMenuItem>
//             <SelectMenuItem value="description 3">Description 3</SelectMenuItem>
//           </Select>
//         </FormControl>
//       </Box>
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === 'name'}
//                   direction={orderBy === 'name' ? order : 'asc'}
//                   onClick={() => handleRequestSort('name')}
//                 >
//                   Name
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === 'value'}
//                   direction={orderBy === 'value' ? order : 'asc'}
//                   onClick={() => handleRequestSort('value')}
//                 >
//                   Value
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>
//                 <TableSortLabel
//                   active={orderBy === 'description'}
//                   direction={orderBy === 'description' ? order : 'asc'}
//                   onClick={() => handleRequestSort('description')}
//                 >
//                   Description
//                 </TableSortLabel>
//               </TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {sortedData.map((row) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.name}</TableCell>
//                 <TableCell>{row.value}</TableCell>
//                 <TableCell>{row.description}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={(e) => handleClick(e, row.id)}>
//                     <MoreVertIcon />
//                   </IconButton>
//                   <Menu
//                     anchorEl={anchorEl}
//                     open={Boolean(anchorEl) && selectedRow === row.id}
//                     onClose={handleClose}
//                   >
//                     <MenuItem onClick={handleEdit}>Edit</MenuItem>
//                     <MenuItem onClick={handleDelete}>Delete</MenuItem>
//                     <MenuItem onClick={handleOther}>Other</MenuItem>
//                   </Menu>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default TableWithActions;


import { Menu, Transition } from '@headlessui/react';
import { orderBy } from 'lodash';
import React, { useMemo, useState } from 'react';
import {
    BsFilter,
    BsSearch,
    BsSortDown,
    BsSortUp,
    BsThreeDotsVertical,
} from 'react-icons/bs';

interface TableData {
	id: number;
	col1: string;
	col2: string;
	col3: string;
	col4: string;
}

const initialTableData: TableData[] = [
	{ id: 1, col1: 'Apple', col2: 'Fruit', col3: 'Red', col4: '100' },
	{ id: 2, col1: 'Banana', col2: 'Fruit', col3: 'Yellow', col4: '200' },
	{ id: 3, col1: 'Carrot', col2: 'Vegetable', col3: 'Orange', col4: '50' },
];

const SetupTable: React.FC = () => {
	const [tableData, setTableData] = useState<TableData[]>(initialTableData);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortColumn, setSortColumn] = useState<keyof TableData>('id');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
	const [filterColumn, setFilterColumn] = useState<keyof TableData | ''>('');
	const [filterTerm, setFilterTerm] = useState('');

	const handleEdit = (id: number) => {
		console.log(`Edit item ${id}`);
	};

	const handleDelete = (id: number) => {
		console.log(`Delete item ${id}`);
	};

	const handleOther = (id: number) => {
		console.log(`Other action for item ${id}`);
	};

	const handleSort = (column: keyof TableData) => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortDirection('asc');
		}
	};

	const handleFilter = () => {
		if (filterColumn && filterTerm) {
			const filteredData = initialTableData.filter((item) =>
				String(item[filterColumn])
					.toLowerCase()
					.includes(filterTerm.toLowerCase())
			);
			setTableData(filteredData);
		} else {
			setTableData(initialTableData);
		}
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const filteredAndSortedData = useMemo(() => {
		let processedData = [...tableData];

		if (searchTerm) {
			processedData = processedData.filter((item) =>
				Object.values(item).some((val) =>
					String(val).toLowerCase().includes(searchTerm.toLowerCase())
				)
			);
		}

		return orderBy(processedData, [sortColumn], [sortDirection]);
	}, [tableData, searchTerm, sortColumn, sortDirection]);

	return (
		<div>
			<div className="mb-4 flex items-center space-x-4">
				<div className="flex-1">
					<div className="relative">
						<input
							type="text"
							placeholder="Search..."
							className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={searchTerm}
							onChange={handleSearch}
						/>
						<BsSearch className="absolute left-3 top-3 text-gray-400" />
					</div>
				</div>
				<div className="flex items-center space-x-2">
					<select
						className="border rounded-lg px-2 py-1"
						value={filterColumn}
						onChange={(e) => setFilterColumn(e.target.value as keyof TableData)}
					>
						<option value="">Select column</option>
						<option value="col1">Column 1</option>
						<option value="col2">Column 2</option>
						<option value="col3">Column 3</option>
						<option value="col4">Column 4</option>
					</select>
					<input
						type="text"
						placeholder="Filter value"
						className="border rounded-lg px-2 py-1"
						value={filterTerm}
						onChange={(e) => setFilterTerm(e.target.value)}
					/>
					<button
						className="bg-blue-500 text-white px-3 py-1 rounded-lg flex items-center"
						onClick={handleFilter}
					>
						<BsFilter className="mr-1" /> Filter
					</button>
				</div>
			</div>
			<table className="min-w-full divide-y divide-gray-200">
				<thead className="bg-gray-50">
					<tr>
						{['col1', 'col2', 'col3', 'col4'].map((col) => (
							<th
								key={col}
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
								onClick={() => handleSort(col as keyof TableData)}
							>
								<div className="flex items-center">
									{`Column ${col.slice(-1)}`}
									{sortColumn === col &&
										(sortDirection === 'asc' ? (
											<BsSortUp className="ml-1" />
										) : (
											<BsSortDown className="ml-1" />
										))}
								</div>
							</th>
						))}
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{filteredAndSortedData.map((row: any) => (
						<tr key={row.id}>
							<td className="px-6 py-4 whitespace-nowrap">{row.col1}</td>
							<td className="px-6 py-4 whitespace-nowrap">{row.col2}</td>
							<td className="px-6 py-4 whitespace-nowrap">{row.col3}</td>
							<td className="px-6 py-4 whitespace-nowrap">{row.col4}</td>
							<td className="px-6 py-4 whitespace-nowrap">
								<Menu as="div" className="relative inline-block text-left">
									<div>
										<Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
											<BsThreeDotsVertical
												className="h-5 w-5"
												aria-hidden="true"
											/>
										</Menu.Button>
									</div>
									<Transition
										as={React.Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => handleEdit(row.id)}
															className={`${
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700'
															} block px-4 py-2 text-sm w-full text-left`}
														>
															Edit
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => handleDelete(row.id)}
															className={`${
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700'
															} block px-4 py-2 text-sm w-full text-left`}
														>
															Delete
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => handleOther(row.id)}
															className={`${
																active
																	? 'bg-gray-100 text-gray-900'
																	: 'text-gray-700'
															} block px-4 py-2 text-sm w-full text-left`}
														>
															Other
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default SetupTable;