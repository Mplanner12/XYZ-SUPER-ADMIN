import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import cn from 'classnames';


interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: any;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
  listClassName?: string;
  itemClassName?: string;
}

const SelectDropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  labelClassName,
  buttonClassName,
  listClassName,
  itemClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedName, setSelectedName] = useState('')

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleOptionSelect = (selectedValue: string) => {
    if (onChange) {
      onChange(selectedValue);
    }
    setIsOpen(false);
  };

  // const selectedOption = options?.find((option:any) => option.customer_list_name === value);
  const buttonText = selectedName ? `${selectedName}` : placeholder ;

  return (
    <div className={cn('relative text-base', className)} ref={dropdownRef}>
      <label
        className={cn('block mb-1', labelClassName)}
      >{label}</label>
      <button
        type="button"
        className={cn(
          'flex items-center justify-between w-full border border-[#CFCECE] rounded-[8px] px-4 py-3',
          buttonClassName
        )}
        onClick={toggleDropdown}
      >
        <span className="truncate">{buttonText}</span>
        {isOpen ? (
          <ChevronUp size={20} className="text-primary-normal" />
        ) : (
          <ChevronDown size={20} className="text-primary-normal" />
        )}
        
      </button>
      {isOpen && (
        <ul
          className={cn(
            'absolute z-20 w-full max-h-[300px] overflow-auto mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
            listClassName
          )}
        >
          {options?.map((item: any) => {
            const nameKey = Object.keys(item).find(key => key.endsWith("_name"));
            return(
              <li
              key={nameKey ? item[nameKey] : null}
              className={cn(
                'px-4 py-2 cursor-pointer hover:bg-gray-100',
                itemClassName
              )}
              onClick={() => {
                handleOptionSelect(nameKey ? item[nameKey] : null)
                setSelectedName(nameKey ? item[nameKey] : null)
              }}
            >
              {nameKey ? item[nameKey] : null}
            </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectDropdown;