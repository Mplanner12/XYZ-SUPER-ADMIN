import React, { useState, useEffect, useRef } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export interface SortOption {
  label: string;
  subOptions?: SortOption[];
}

interface TreeSelectDropDownProps {
  onSelect: (option: string) => void;
  isVisible: boolean;
  onClose: () => void;
  options: SortOption[]; // Prop for sort options
  positioning: number
}

const COASortDropdown: React.FC<TreeSelectDropDownProps> = ({
  onSelect,
  isVisible,
  onClose,
  options, // Destructure the new options prop
  positioning,
}) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [selectedSubOptions, setSelectedSubOptions] = useState<{ [key: string]: string | null }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (label: string) => {
    console.log(`Toggling menu: ${label}`);
    setOpenMenu(openMenu === label ? null : label);
  };

  const handleSubOptionSelect = (parentOption: string, subOption: string) => {
    setSelectedSubOptions((prev) => ({
      ...prev,
      [parentOption]: subOption, // Ensure only one item is selected in each sub-options group
    }));
    onSelect(subOption); // Trigger the onSelect prop function when option changes
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  // Reset the open submenu when dropdown closes
  useEffect(() => {
    if (!isVisible) {
      setOpenMenu(null);
    }
  }, [isVisible]);
  

  const isChecked = (parentOption: string, subOption: string) =>
    selectedSubOptions[parentOption] === subOption;

  if (!isVisible) return null;

  return (
    <div
      ref={dropdownRef}
      style={{right: `${positioning}px`}}
      className={`absolute right-[${positioning}px] mt-2 w-64 bg-white rounded-lg shadow-lg z-50`}
    >
      <div className="p-2">
        {options?.map((option) => (
          <div key={option.label} className="relative mb-2">
            {/* Main sort option */}
            <div
              className="flex justify-between items-center hover:bg-[#f7f7f7] p-2 cursor-pointer hover:bg-gray-100 rounded"
              onClick={() => toggleMenu(option.label)}
            >
              <span className="font-medium text-[14px] text-gray-700">{option.label}</span>
              {option.subOptions && <FaChevronRight className="text-gray-500" />}
            </div>

            {/* Child options only show when the parent option is clicked */}
            {openMenu === option.label && option.subOptions && (
              <div className="absolute top-0 left-full mt-0 ml-3 w-[73%] bg-white rounded-md shadow-lg z-10">
                {option?.subOptions?.map((subOption) => (
                  <div
                    key={subOption.label}
                    className="cursor-pointer py-1 px-2 text-gray-700 hover:bg-[#f7f7f7] rounded"
                  >
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isChecked(option.label, subOption.label)}
                        onChange={() =>
                          handleSubOptionSelect(option.label, subOption.label)
                        }
                      />
                      <div className="w-5 h-5 border-purple border-[2px] border-[#8133F1] rounded-[3px] mr-2 flex items-center justify-center transition-colors">
                        <svg
                          className={`w-24 h-24 text-white ${
                            isChecked(option.label, subOption.label)
                              ? 'opacity-100 scale-100'
                              : 'opacity-0 scale-0'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      {subOption.label}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default COASortDropdown;