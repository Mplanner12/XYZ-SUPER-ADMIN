import { ChevronDown, ChevronUp } from 'lucide-react'; // Replace with your icon library
import React, { useEffect, useState } from 'react';

interface CustomDropDownProps {
	options: string[];
	label: string;
	iconColor?: string;
	styles?: string;
	stylesOption?: string;
	handleChange: (selectedOption: string) => void;
  initialValue?: string;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
	options,
	label,
	iconColor,
	styles,
	stylesOption,
	handleChange,
	initialValue,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<string | null>(initialValue || null);

  useEffect(() => {
		setSelectedOption(initialValue || null); // Update selectedOption when initialValue changes
	}, [initialValue]);

	const toggleDropdown = () => setIsOpen(!isOpen);

	const handleOptionSelect = (option: string) => {
		setSelectedOption(option);
		setIsOpen(false);
		handleChange(option);
	};

	return (
		<div className="relative inline-block">
			<div
				className={`flex items-center justify-between gap-1 cursor-pointer border-none overflow-auto no-scrollbar p-1 ${styles}`}
				onClick={toggleDropdown}
			>
				<span className="">{selectedOption ? selectedOption : label}</span>
				{isOpen ? (
					<ChevronUp size={18} color={iconColor} />
				) : (
					<ChevronDown size={18} color={iconColor} />
				)}
			</div>

			{isOpen && (
				<ul
					className={`absolute mt-2 rounded shadow-md bg-white z-50 overflow-y-auto w-fit ${stylesOption}`}
				>
					{options.map((option, index) => (
						<li
							key={index}
							className="p-3 hover:bg-foundation-grey-grey-300 text-foundation-black-black-400 cursor-pointer overflow-y-auto no-scrollbar"
							onClick={() => handleOptionSelect(option)}
						>
							{option}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default CustomDropDown;
