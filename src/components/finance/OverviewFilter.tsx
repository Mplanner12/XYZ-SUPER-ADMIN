"use client";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OverViewFilterProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const OverViewFilter: React.FC<OverViewFilterProps> = ({
  label,
  options,
  onSelect,
  isOpen,
  onToggle,
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option);
    onToggle(); 
  };

  return (
    <div className="relative z-10 gap-6 inline-block">
      <div
        className="flex items-center gap-1 cursor-pointer text-primary-normal"
        onClick={onToggle}
      >
        <span>{selectedOption ? selectedOption : label}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-primary-normal" />
        ) : (
          <ChevronDown size={20} className="text-primary-normal" />
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OverViewFilter;
