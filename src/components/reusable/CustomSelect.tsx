import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";

interface Option {
  listItem: string;
  value?: string;
}

interface CustomSelectype {
  options: Option[];
  className?: string;
  name: string;
  handleDropdownChange?: (option: Option, selectName: string) => void;
  selectedValue?: string | null;
  placeholder?: string;
  selectedLevel?: string;
  from?: string;
  isDisabled?: boolean;
  enableEffect?: boolean;
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CustomSelect({
  options,
  className,
  handleDropdownChange,
  name,
  selectedValue,
  placeholder,
  selectedLevel,
  from,
  isDisabled,
  enableEffect
}: CustomSelectype) {

  const [selected, setSelected] = useState<Option | null>(() =>
    options?.find((option) => option.value === selectedValue) || null
  );

  const handleChange = (selectedOption: Option | null) => {
    setSelected(selectedOption);
    if (selectedOption && handleDropdownChange) {
      handleDropdownChange(selectedOption, name);
    }
  };

  useEffect(() => {
    if (enableEffect && selectedValue) {
      const foundOption = options.find((option) => option.value === selectedValue);
      if (foundOption !== selected) {  // Only update if necessary
        setSelected(foundOption || null);
      }
    }
  }, [enableEffect, selectedValue]);

  return (
    <div>
      <Listbox value={selected} onChange={handleChange} disabled={isDisabled}>
        <div className="relative">
          <Listbox.Button
            className={`${from === "schedule" ? "h-10" : "h-[2.9rem]"} text-[#242424] flex items-center cursor-pointer rounded-md bg-white py-3 pl-4 pr-4 text-left focus:border-0 ring-1 ring-[#CFCECE] w-full focus:ring-2 ring-inset focus:ring-[#8133F1] border-0 text-[14px] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {selected ? (
              <span className="block truncate text-black capitalize">{selected.listItem}</span>
            ) : (
              <span className={`${selectedLevel || selected ? "text-black":"text-gray-500"} block truncate  capitalize`}>{selectedLevel ? selectedLevel : selectedLevel === 'null' ? placeholder : placeholder}</span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IoChevronDownOutline className="relative h-5 w-5 text-[#8133F1]" aria-hidden="true" />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full capitalize overflow-auto rounded-md bg-white py-1 text-blue-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options?.map((option, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pr-1 pl-3",
                      className === "calendar-filter" || className === "review-filter"
                        ? "text-[#66686B]"
                        : "text-blue-800",
                      active ? "bg-[#F5F5F5] text-[#66686B]" : "",
                      isDisabled ? "opacity-50 cursor-not-allowed" : ""
                    )
                  }
                  value={option}
                  disabled={isDisabled}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                        {option.listItem}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#242424]">
                          <MdCheckCircleOutline className="hidden ui-selected:block" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
