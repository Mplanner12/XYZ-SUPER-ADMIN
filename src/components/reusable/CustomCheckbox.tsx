import React, { useEffect, useState } from "react";

interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
  updatedState?: (day: string, isChecked: boolean) => void;
  color?: string;
  parentType?: string; 
}

const CustomCheckbox: React.FC<CheckboxProps> = ({ label, checked, updatedState, onChange, color }) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked || false);

  useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (updatedState) {
      updatedState(label || "", newCheckedState);
    }
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" className="hidden" checked={isChecked} onChange={handleCheckboxChange} />
      <div className="w-5 h-5 border-purple border-[2px] border-[#8133F1] rounded-[3px] mr-2 flex items-center justify-center transition-colors">
        <svg
          className={`w-24 h-24 text-white ${isChecked ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className={`text-[${color}] text-[14px]`}>{label}</p>
    </label>
  );
};

export default CustomCheckbox;