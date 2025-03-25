"use client";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";

interface SelectDropDownProps {
  label: string;
  options: string[];
  onSelect: (selectedOption: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  textSize: number;
  menuWidth: number;
  zIndex: number;
  tableRef?: React.RefObject<HTMLDivElement>; // Optional table reference
  iconColor?: string;
  textColor?: string;
  maxHeight?: number;
  icons?: string[];
}

const CustomDropDown: React.FC<SelectDropDownProps> = ({
  label,
  options,
  onSelect,
  isOpen,
  onToggle,
  textSize,
  menuWidth,
  zIndex,
  tableRef,
  iconColor,
  textColor,
  icons,
  maxHeight = 200,
}) => {
  const [selectedOption, setSelectedOption] = useState<{text: string; icon: string} | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const handleSelect = (option: string, icon: string) => {
    setSelectedOption({text: option, icon});
    onSelect(option);
    onToggle();

    tableRef?.current?.style.setProperty("overflow", "auto");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(event.target as Node)
    ) {
      onToggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      // Calculate the dropdown position relative to the trigger
      const triggerRect = triggerRef.current?.getBoundingClientRect();
      if (triggerRect) {
        setDropdownPosition({
          top: triggerRect.bottom + window.scrollY,
          left: triggerRect.left + window.scrollX,
        });
      }

      // Disable table scrolling when the dropdown is open
      tableRef?.current?.style.setProperty("overflow", "hidden");
    } else {
      // Re-enable table scrolling when the dropdown is closed
      tableRef?.current?.style.setProperty("overflow", "auto");
    }

    return () => {
      tableRef?.current?.style.setProperty("overflow", "auto"); // Ensure scroll is restored
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, tableRef]);

  return (
    <>
      {/* Trigger element */}
      <div
        ref={triggerRef}
        className="flex items-center gap-1 cursor-pointer"
        style={{ fontSize: `${textSize}px`, color: textColor }}
        onClick={onToggle}
      >
        {selectedOption && (
          <Image
            src={selectedOption.icon}
            alt={selectedOption.text}
            width={24}
            height={24}
            className="mr-1"
          />
        )}
        <span>{selectedOption ? selectedOption.text : label}</span>
        {isOpen ? (
          <ChevronUp size={24} color={iconColor} />
        ) : (
          <ChevronDown size={24} color={iconColor} />
        )}
      </div>

      {/* Dropdown menu rendered via portal */}
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            className="absolute bg-white rounded-md shadow-lg overflow-y-auto"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${menuWidth}rem`,
              zIndex: zIndex,
              maxHeight: `${maxHeight}px`,
            }}
          >
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleSelect(option, icons ? icons[index] : "")}
                className="p-2 hover:bg-[#f7f7f7] cursor-pointer flex gap-1 items-center"
              >
                {icons && icons[index] && (
                  <Image
                    key={index}
                    src={icons[index]}
                    alt={option}
                    width={24}
                    height={24}
                    className="inline-block"
                  />
                )}
                {option}
              </div>
            ))}
          </div>,
          document.body // Render in body to avoid table overflow
        )}
    </>
  );
};

export default CustomDropDown;
