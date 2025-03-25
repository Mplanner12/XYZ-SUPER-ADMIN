import React from 'react';
import './styles.css';

interface Option {
	value: string;
	label: string;
}

interface SelectComponentProps {
	id: string;
	label: string;
	options: Option[];
	error?: string;
}

const SelectComponent: React.FC<SelectComponentProps> = ({
	id,
	label,
	options,
	error,
}) => {

	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
			>
				{label}
			</label>
			<div className="mt-[2px] custom-select-wrapper">
				<select
					id={id}
					className={`block w-full rounded-[4px] border border-solid py-3 px-3 text-foundation-grey-grey-600 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 bg-white`}
				>
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							className="text-foundation-grey-grey-800"
						>
							{option.label}
						</option>
					))}
				</select>
				{error && <p className="mt-2 text-sm text-red-400">{error}</p>}
			</div>
		</div>
	);
};

export default SelectComponent;
