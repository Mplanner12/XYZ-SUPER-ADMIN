import React from "react";
import Select from "react-select";
import { Loader2 } from "lucide-react";


interface CustomInputProps {
  label?: string;
  type: "text" | "email" | "number" | "password" | "select" | "name" | "date";
  id: string;
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any,
  ) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  error?: string;
  showPasswordToggle?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  isSearchable?: boolean;
  onInputChange?: (inputValue: string) => void; // New prop for handling input change in searchable select
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  id,
  name,
  value,
  onChange,
  placeholder,
  options,
  error,
  showPasswordToggle,
  readOnly,
  isLoading,
  isSearchable,
  onInputChange,
}) => {
  return (
    <div className={`mb-3 ${error ? "has-error" : ""} w-full`}>
      {label && <label className="mb-2 capitalize inline-block text-[#434343] font-normal tracking-wider text-sm md:text-base" htmlFor={id}>{label}</label>}
      
      {type === "select" ? (
        isSearchable ? (
          <Select
            id={id}
            name={name}
            value={options?.find(option => option.value === value)} 
            onChange={(selectedOption: any) => onChange({ target: { name, value: selectedOption?.value } })} 
            options={options}
            isLoading={isLoading}
            placeholder={placeholder}
            classNamePrefix="react-select"
            onInputChange={onInputChange}
            isSearchable={true}
          />
        ) : (
          <div className="relative">
            <select
              id={id}
              name={name}
              value={value}
              onChange={onChange}
              className="block w-full px-3 py-4 capitalize rounded-md bg-gray-100 border border-[#CFCECE] focus:outline-none appearance-none pr-10"
              disabled={isLoading}
            >
              <option value="" disabled>
                {isLoading ? "Loading..." : placeholder}
              </option>
              {options && options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
        )
      ) : (
        <input
          id={id}
          name={name}
          type={type === "password" && showPasswordToggle ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className="block w-full px-3 py-4 rounded-md bg-gray-100 border border-[#CFCECE] focus:outline-none"
        />
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default CustomInput;