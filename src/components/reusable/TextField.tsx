import clsx from "clsx";
import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  coloredBg?: boolean;
  font?: string;
  helperText?: string;
  disabled?: boolean;
  variant?: "xshort"  | "short" | "medium" | "long" | "xlong" | "2long";
}

interface IMultilineTextField
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  rows?: number;
  font?: string;
  error?: boolean;
  coloredBg?: boolean;
  helperText?: string;
  variant?: "short" | "medium" | "long" | "xlong";
}

export const TextField = ({
  label,
  variant = "long",
  coloredBg = false,
  font = 'normal',
  ...props
}: UseControllerProps & ITextField) => {
  const { field, fieldState } = useController(props);

  return (
    <div
      className={clsx("", {
        "w-[300px] md:w-[680px]": variant == "2long",
        "w-full": variant == "xlong",
        "w-[300px] md:w-[340px]": variant == "long",
        "w-[300px] md:w-[250px]": variant == "medium",
        "w-[111px] md:w-[170px]": variant == "short",
        "w-[100px] md:w-[110px]": variant == "xshort",
      })}
    >
      <label
        htmlFor={props.name}
        className={`block text-[#434343] text-base font-${font} mb-[8px] leading-tight`}
      >
        {label}
      </label>

      <input
        // field: { onChange, onBlur, value, name, ref },
        {...field}
        {...props}
        className={clsx("block w-full h-[50px] px-2 rounded-[8px] text-[#0B0A0A] text-base font-normal leading-normal appearance-none outline-none focus:bg-white disabled:opacity-50 disabled:hover:cursor-not-allowed",
          {
            "bg-[#F0F0F0] border border-[#F0F0F0]" : coloredBg === true,
            'bg-white border border-[#CFCECE]': coloredBg === false,
          }
        )}
        onWheel={(event) => event.currentTarget.blur()}
      />

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

// Text Area
export const MultilineTextField = ({
  label,
  rows = 5, 
  font = 'normal',
  variant ='long',
  coloredBg = false,
  ...props
}: UseControllerProps & IMultilineTextField) => {
  const { field, fieldState } = useController(props);

  return (
    <div className={clsx("", {
      "w-full": variant == "xlong",
      "w-[300px] md:w-[340px]": variant == "long",
      "w-[300px] md:w-[250px]": variant == "medium",
      "w-[111px] md:w-[170px]": variant == "short",
    })}>
      <p className={`block text-sm mb-[6px] font-${font} capitalize`}>{label}</p>
      <textarea
        // field: { onChange, onBlur, value, name, ref },
        {...field}
        {...props}
        rows={rows}
        className={clsx("block w-full rounded-[8px] appearance-none outline-none bg-transparent focus:bg-white border border-neutral-200 text-[#0B0A0A] mb-2 py-2 px-4",
          {
            "bg-[#F0F0F0] border border-[#F0F0F0]" : coloredBg === true,
            'bg-white border border-[#CFCECE]': coloredBg === false,
          }
        )}
      ></textarea>
      <p
        className={clsx("text-xs mt-[6px]", {
          "text-[#DA1E28]": fieldState.invalid,
        })}
      >
        {fieldState.error?.message}
      </p>
    </div>
  );
};
