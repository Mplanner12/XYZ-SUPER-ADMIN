import { useState } from 'react';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import { PiExportBold } from 'react-icons/pi';
import SelectDropDown from '../../shared/SelectDropDown/SelectDropDown';
import { FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';


interface Role {
    ifrs: string;
    primaryApplication: string;
    bestPractices: string;
    applicableEntities: string;
    relevant: string;
    companyPolicies: string;
    transactionCategory: boolean
}

const AccountingStandardsTab: React.FC = () => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [roles, setRoles] = useState<Role[]>([
        {
            transactionCategory: false,
            ifrs: 'IFRS1',
            primaryApplication: 'First-time Adoption of International Financial Reporting Standards',
            bestPractices: 'Develop a transition plan, assess the impact of adopting IFRS, and disclose relevant information.',
            applicableEntities: 'All entities adopting IFRS',
            relevant: 'No longer applicable',
            companyPolicies: '[Company Name] will adopt IFRS as of [Date] and apply the retrospective approach. Transition adjustments will be recognized as an opening balance of retained earnings.',
        },
    ]);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handlePolicySelect = (selectedOption: string) => {
        console.log('Selected Location:', selectedOption);
    };

    // Handle checkbox change for CustomCheckbox (expects boolean)
    const handleCheckboxChange = (isChecked: boolean) => {
        setNewEntry((prev) => ({
            ...prev,
            transactionCategory: isChecked, // Update the checkbox state
        }));
    };

    const [newEntry, setNewEntry] = useState<Role>({
        ifrs: '',
        primaryApplication: '',
        bestPractices: '',
        applicableEntities: '',
        relevant: '',
        companyPolicies: '',
        transactionCategory: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    // Function to add a new role (entry) to the table
    const addNewEntry = () => {
        setRoles([...roles, newEntry]); // Add the new entry to the roles array
        setNewEntry({  // Clear the form after submission
            ifrs: '',
            primaryApplication: '',
            bestPractices: '',
            applicableEntities: '',
            relevant: '',
            companyPolicies: '',
            transactionCategory: false,
        });
    };
    
    const handleDateChange = (date: Date | null) => {
        if (date) {
            formik.setFieldValue('dateFrom', date);
        }
    };

    const formik = useFormik({
        initialValues: { dateFrom: new Date() },
        // validationSchema,
        onSubmit: (values: any) => {
            //   handleSubmit(values);
        },
    });

    return (
        <>
            <main>
                <div className="flex justify-between">
                    <div>
                        <SelectDropDown
                            textSize={16}
                            textColor="#242424"
                            zIndex={10}
                            menuWidth={10}
                            label="IAS standards"
                            options={['IFRS Standards', 'IAS standards']}
                            onSelect={handlePolicySelect}
                            isOpen={openFilter === 'department'}
                            onToggle={() => handleToggle('department')}
                        />
                    </div>

                    <div className="text-[#8133F1] text-[15px]">
                        <div className="text-[#8133F1] flex gap-5">
                            <button className="flex gap-1">
                                Export <PiExportBold size="17px" />
                            </button>
                            <button className="flex gap-1">
                                Print <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" />
                            </button>
                            <button className="flex gap-1">
                                Share <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-[#8133F1] flex gap-5 items-center justify-between">
                    <div className="flex gap-3">
                        <button className="flex gap-1 text-[15px]">
                            Filter <ListFilterIcon size="20px" />
                        </button>
                        <button className="flex gap-1 text-[15px]">
                            Sort <ArrowUpNarrowWideIcon size="20px" />
                        </button>
                    </div>
                    <div className="relative w-[30%] lg:w-[30%] mb-4 md:mb-0">
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for an item, account, or item type"
                                size={70}
                                className="block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                            />
                            <span>
                                <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                            </span>
                        </div>
                    </div>
                    <button className="flex gap-1 text-[15px]">
                        Show all columns <ChevronDownIcon size="17px" />
                    </button>
                </div>

                <div className='flex items-center mt-4 gap-2'>
                    <p>Date Range</p>
                    <div className='relative'>
                        <DatePicker
                            selected={formik.values.dateFrom}
                            dateFormat="dd/MM/yyyy"
                            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                            onChange={handleDateChange}
                        />
                        <Image
                            src='/calendar.png'
                            className="absolute right-2 top-[.7rem]"
                            width={18}
                            height={18}
                            alt="icon"
                        />
                    </div>
                    <p>to</p>
                    <div className='relative'>
                        <DatePicker
                            selected={formik.values.dateFrom}
                            dateFormat="dd/MM/yyyy"
                            className="rounded-[6px] bg-white w-full border-0 bg-inherit h-[2.9rem] py-1.5 px-2 text-[14px] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2  outline-none focus:ring-inset focus:ring-[#8133F1]"
                            onChange={handleDateChange}
                        />
                        <Image
                            src='/calendar.png'
                            className="absolute right-2 top-[.7rem]"
                            width={18}
                            height={18}
                            alt="icon"
                        />
                    </div>
                </div>
                
                <div className="my-5">
                    <div className="overflow-x-auto scrollbar-hide">
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-[100%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 w-[11%] pl-5 gap-2 items-center"></td>
                                    <td className="py-5 w-[11%] pl-5 gap-2 items-center">IFRS</td>
                                    <td className="py-5 gap-2 items-center">Primary Application</td>
                                    <td className="py-5 gap-2 items-center">Best Practices</td>
                                    <td className="py-5 gap-2 items-center">Applicable Entities</td>
                                    <td className="py-5 pl-5 gap-2 items-center">Relevant</td>
                                    <td className="py-5 gap-2 items-center">Company Policies</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {roles.map((role, index) => (
                                    <tr
                                        key={index}
                                        className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]"
                                    >
                                        <td className="py-4 pl-5">
                                            <CustomCheckbox checked={newEntry.transactionCategory} onChange={() => { }} />
                                        </td>
                                        <td className="py-6 pl-5 flex gap-2 items-center">{role.ifrs}</td>
                                        <td className="py-6 text-left">{role.primaryApplication}</td>
                                        <td className="py-6 text-left">{role.bestPractices}</td>
                                        <td className="py-6 text-left">{role.applicableEntities}</td>
                                        <td className="py-6 pl-5 flex gap-2 items-center">{role.relevant}</td>
                                        <td className="py-6 text-left">{role.companyPolicies}</td>
                                    </tr>
                                ))}

                                {/* Add New Entry Row */}
                                <tr className="bg-gray-100">
                                    <td className="py-4 pl-5">
                                        <CustomCheckbox checked={newEntry.transactionCategory} onChange={handleCheckboxChange} />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="ifrs"
                                            value={newEntry.ifrs}
                                            onChange={handleInputChange}
                                            placeholder="Enter IFRS"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="primaryApplication"
                                            value={newEntry.primaryApplication}
                                            onChange={handleInputChange}
                                            placeholder="Enter Primary Application"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="bestPractices"
                                            value={newEntry.bestPractices}
                                            onChange={handleInputChange}
                                            placeholder="Enter Best Practices"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="applicableEntities"
                                            value={newEntry.applicableEntities}
                                            onChange={handleInputChange}
                                            placeholder="Enter Applicable Entities"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="relevant"
                                            value={newEntry.relevant}
                                            onChange={handleInputChange}
                                            placeholder="Enter Relevant"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                    <td className="py-4 pr-5">
                                        <input
                                            type="text"
                                            name="companyPolicies"
                                            value={newEntry.companyPolicies}
                                            onChange={handleInputChange}
                                            placeholder="Enter Company Policies"
                                            className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                        />
                                    </td>
                                </tr>

                                <tr className="bg-secondary">
                                    <td className="text-[#8133F1] my-4 font-medium" colSpan={30}>
                                        <div className="flex items-center py-6 cursor-pointer w-[16%]" onClick={addNewEntry}>
                                            <Image className="mr-2" src="/plus.png" width={23} height={23} alt="icon" /> Add a new entry
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
};

export default AccountingStandardsTab;