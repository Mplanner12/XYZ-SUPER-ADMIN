import clsx from "clsx";
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface Option {
	value: string;
	label: string;
}

interface ISelectField extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  options: Option[];
  coloredBg?: boolean;
  font?: string;
  helperText?: string;
  disabled?: boolean;
  variant?: "short" | "medium" | "long" | "xlong";
}

export const SelectField = ({
  label,
  options,
  variant = "long",
  coloredBg = false,
  font = 'normal',
  ...props
}: UseControllerProps & ISelectField) => {
  const { field, fieldState } = useController(props);

  return (
    <div
      className={clsx("", {
        "w-full": variant == "xlong",
        "w-[300px] md:w-[340px]": variant == "long",
        "w-[300px] md:w-[280px]": variant == "medium",
        "w-[111px] md:w-[172px]": variant == "short",
      })}
    >
      <label
        htmlFor={props.name}
        className={`block text-[#434343] text-base font-${font} mb-[6px] leading-tight`}
      >
        {label}
      </label>
      <div className="relative">
      <select
        // field: { onChange, onBlur, value, name, ref },
        {...field}
        {...props}
        className={clsx("inline-flex justify-start items-center gap-2 w-full h-[48px] px-2 rounded-[8px] text-[#0B0A0A] text-base font-normal leading-normal appearance-none outline-none focus:bg-white disabled:opacity-50 disabled:hover:cursor-not-allowed",
          {
            "bg-[#F0F0F0] border-none": coloredBg === true,
            'bg-white border border-[#CFCECE]' : coloredBg === false,
          }
        )}
      >
        {options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-7 h-7 text-primary-normal "
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
      </span>
      </div>

      <p
        className={clsx("text-xs mt-[4px]", {
          "text-[#DA1E28]": fieldState.invalid,
        })}
      >
        {fieldState.error?.message}
      </p>
      <p className="text-[#939292] text-xs font-normal">
        {props.helperText}
      </p>
    </div>
  );
};

