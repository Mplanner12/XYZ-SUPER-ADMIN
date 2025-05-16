import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdCheckCircleOutline } from "react-icons/md";

interface Option {
  listItem: string;
}

interface Section {
  title: string;
  options: Option[];
}

interface CustomComboboxProps {
  sections: Section[];
  className?: string;
  name: string;
  handleDropdownChange?: (option: Option, selectName: string) => void;
  selectedValue?: string | null;
  placeholder?: string;
  selectedLevel?: string;
  from?: string;
  isDisabled?: boolean; // Add this line
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function CustomCombobox({
  sections,
  className,
  handleDropdownChange,
  name,
  selectedValue,
  placeholder,
  selectedLevel,
  from,
  isDisabled = false, // Add this line
}: CustomComboboxProps) {
  const [selected, setSelected] = useState<Option | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredSections = sections.map((section) => ({
    ...section,
    options: section.options.filter((option) => {
      const listItem = option?.listItem || ""; // Ensure listItem is a string
      return listItem.toLowerCase().includes(searchTerm.toLowerCase());
    }),
  }));

  const handleChange = (selectedOption: Option | null) => {
    setSelected(selectedOption);
    if (handleDropdownChange) {
      handleDropdownChange(selectedOption!, name);
    }
  };

  useEffect(() => {
    const foundOption = sections
      .flatMap((section) => section.options)
      .find((option) => option.listItem === selectedValue);
    setSelected(foundOption || null);
  }, [sections, selectedValue]);

  return (
    <div className="">
      <Listbox value={selected} onChange={handleChange} disabled={isDisabled}> {/* Add disabled prop */}
        <div className="relative">
          <Listbox.Button
            className={`${from === "schedule" ? "h-10" : "h-[2.9rem]"} text-[#242424] flex items-center cursor-pointer rounded-md bg-white py-3 pl-4 pr-4 text-left focus:border-0 ring-1 ring-[#E9EAF0] w-[100%] focus:ring-2 ring-inset focus:ring-inset focus:ring-[#8133F1] border-0 text-[14px] ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Modify button class
            disabled={isDisabled} // Disable button if isDisabled is true
          >
            {selected ? (
              <span className="block truncate text-black">
                {selected?.listItem ?? selectedLevel}
              </span>
            ) : (
              <span className="block truncate text-gray-500">
                {selectedLevel || placeholder}
              </span>
            )}
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <IoChevronDownOutline
                className={classNames("relative", "h-5 w-5 text-[#8133F1]")}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-blue-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              <div className="p-2 relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search..."
                  className="w-full p-2 border border-[#E9EAF0] pl-8 focus:border-0 ring-1 ring-[#E9EAF0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8133F1]"
                  disabled={isDisabled} // Disable input field if isDisabled is true
                />
                <span>
                  <FiSearch className="text-[22px] absolute left-3 top-[.9rem] text-[#66686B]" />
                </span>
              </div>
              {filteredSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  {section.options.length > 0 && (
                    <>
                      <div className="px-4 py-2 font-semibold text-[#727171] bg-gray-100">
                        {section.title}
                      </div>
                      {section.options.map((option, optionIdx) => (
                        <Listbox.Option
                          key={optionIdx}
                          className={({ active }) =>
                            classNames(
                              "relative cursor-default select-none py-2 pr-1 pl-3 flex items-center",
                              className === "calendar-filter" ||
                                className === "review-filter"
                                ? "text-[#242424]"
                                : "text-[#242424]",
                              active ? "bg-[#F5F5F5] text-[#242424]" : ""
                            )
                          }
                          value={option}
                          disabled={isDisabled} // Disable option if isDisabled is true
                        >
                          {({ selected }) => (
                            <>
                              <input
                                type="radio"
                                checked={selected}
                                readOnly
                                className="mr-2 accent-primary-normal"
                                disabled={isDisabled} // Disable radio button if isDisabled is true
                              />
                              <span
                                className={`block truncate ${selected ? "font-medium" : "font-normal"
                                  }`}
                              >
                                {option?.listItem}
                              </span>
                              {selected && (
                                <span
                                  className={classNames(
                                    "relative",
                                    "absolute inset-y-0 left-0 flex items-center pl-3 text-[#242424]"
                                  )}
                                >
                                  <MdCheckCircleOutline className="hidden ui-selected:block" />
                                </span>
                              )}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </>
                  )}
                </div>
              ))}
              {filteredSections.every(
                (section) => section.options.length === 0
              ) && (
                <div className="px-4 py-2 text-gray-500">No options found</div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
