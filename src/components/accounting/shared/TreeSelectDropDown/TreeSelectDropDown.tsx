"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

interface Option {
  label: string;
  value: string;
  children?: Option[]; // Nested options for submenus
}

interface TreeSelectDropDownProps {
  label: string;
  options: Option[];
  onSelect: (selectedOption: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  textSize: number;
  menuWidth: number;
}

const TreeSelectDropDown: React.FC<TreeSelectDropDownProps> = ({
  label,
  options,
  onSelect,
  isOpen,
  onToggle,
  textSize,
  menuWidth
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: Option) => {
    setSelectedOption(option.label);
    onSelect(option.value);
    onToggle(); // Close the dropdown after selection
  };

  const handleSubMenuToggle = (optionValue: string) => {
    setOpenSubMenu(openSubMenu === optionValue ? null : optionValue);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      onToggle();
    }
  };

  // Effect to handle clicks outside the dropdown
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      setOpenSubMenu(null);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative z-10 gap-6 inline-block">
      <div
        className="flex items-center gap-[6px] cursor-pointer"
        style={{ fontSize: `${textSize}px`, color: '#8133F1' }}
        onClick={onToggle}
      >
        <span>{selectedOption ? selectedOption : label}</span>
        {isOpen ? (
          <ChevronUp size={24} className="text-[#8133F1}"/>
        ) : (
          <ChevronDown size={24} className="text-[#8133F1}"/>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full mt-2 bg-white rounded-md shadow-lg z-10"
          style={{ width: `${menuWidth}rem` }}
        >
          {options?.map((option, index) => (
            <div key={index} className="relative">
              <div
                className="px-4 py-2 hover:bg-[#f7f7f7] cursor-pointer text-[14px] flex justify-between items-center"
                onClick={() => {
                  if (option.children) {
                    handleSubMenuToggle(option.value);
                  } else {
                    handleSelect(option);
                  }
                }}
              >
                {option.label}
                {option.children && <ChevronRight size={18} className="text-[#8133F1]"/>}
              </div>

              {/* Submenu */}
              {option.children && openSubMenu === option.value && (
                <div className="absolute top-0 left-full mt-0 ml-1 w-[9rem] bg-white rounded-md shadow-lg z-10">
                  {option.children.map((subOption, subIndex) => (
                    <div
                      key={subIndex}
                      className="px-4 py-2 hover:bg-[#f7f7f7] cursor-pointer text-[14px]"
                      onClick={() => handleSelect(subOption)}
                    >
                      {subOption.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeSelectDropDown;