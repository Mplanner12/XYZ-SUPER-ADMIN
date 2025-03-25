import { Loader2 } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import './styles.css';

interface Option {
	value: string;
	label: string;
}

interface SelectElementProps {
	id: string;
	label: string;
	value?: string;
	options: Option[];
	required?: boolean;
	registerName: string;
	error?: string;
	isLoading?: boolean;
	placeholder?: string;
	isSearchable?: boolean;
	onInputChange?: (inputValue: string) => void;
}

const SelectElement: React.FC<SelectElementProps> = ({
	id,
	value,
	label,
	options,
	required,
	registerName,
	error,
	placeholder,
	isLoading,
	isSearchable,
	onInputChange,
}) => {
	const { register } = useFormContext();

	return (
		<div className="w-full">
			<label
				htmlFor={id}
				className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
			>
				{label}
				{required && (
					<span>
						<FaAsterisk size={6} color="red" opacity={0.7} className="mb-1" />
					</span>
				)}
			</label>
			<div className="mt-[2px] custom-select-wrapper">
				<select
					id={id}
					value={value}
					{...register(registerName)}
					className={`block w-full rounded-[4px] border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600  focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 bg-white`}
					disabled={isLoading}
				>
					<option value="" disabled>
						{isLoading ? 'Loading...' : placeholder}
					</option>
					{options &&
						options.map((option) => (
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
				<span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
					{isLoading ? (
						<Loader2 className="w-5 h-5 text-primary-normal animate-spin" />
					) : (
						<svg
							className="w-7 h-7 text-primary-normal"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M6 9l4 4 4-4" />
						</svg>
					)}
				</span>
			</div>
		</div>
	);
};

export default SelectElement;
