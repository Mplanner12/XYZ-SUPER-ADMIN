import { FormControl, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';

// Sample data for options
const options = [
	{ label: 'Option 1', value: 'option1' },
	{ label: 'Option 2', value: 'option2' },
	{ label: 'Option 3', value: 'option3' },
];

const DynamicSelect = () => {
	const [selectedOption, setSelectedOption] = useState('');

	const handleChange = (event : any) => {
		setSelectedOption(event.target.value);
	};

	return (
		<FormControl variant="outlined" className="w-full">
			<Select
				value={selectedOption}
				onChange={handleChange}
				displayEmpty
				className={`bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
			>
				<MenuItem value="" disabled>
					Select an option
				</MenuItem>
				{options.map((option) => (
					<MenuItem key={option.value} value={option.value}>
						{option.label}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default DynamicSelect;
