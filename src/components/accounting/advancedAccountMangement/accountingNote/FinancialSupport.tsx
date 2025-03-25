import CustomCheckbox from '@/components/reusable/CustomCheckbox';
import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { PiExportBold } from 'react-icons/pi';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';


const FinancialSupportTab: React.FC = () => {
    // State to store individual entry data
    const [newEntry, setNewEntry] = useState({
        transactionCategory: false, // Checkbox state
        transactionName: '',
        transactionType: '',
        supportingDocument: '',
        required: '',
        attached: '',
        dateAttached: '',
        retentionStandardPeriod: '',
        retentionActualPeriod: '',
        attachedBy: '',
        auditor: '',
        auditorApproval: '',
    });

    // State to store all entries
    const [entries, setEntries] = useState<any[]>([]);

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle checkbox change for CustomCheckbox (expects boolean)
    const handleCheckboxChange = (isChecked: boolean) => {
        setNewEntry((prev) => ({
            ...prev,
            transactionCategory: isChecked, // Update the checkbox state
        }));
    };

    // Handle adding new entry
    const handleAddEntry = () => {
        setEntries((prevEntries) => [...prevEntries, newEntry]); // Add the current entry to entries
        // Clear the form after adding the entry
        setNewEntry({
            transactionCategory: false,
            transactionName: '',
            transactionType: '',
            supportingDocument: '',
            required: '',
            attached: '',
            dateAttached: '',
            retentionStandardPeriod: '',
            retentionActualPeriod: '',
            attachedBy: '',
            auditor: '',
            auditorApproval: '',
        });
    };

    // Table headers to be used dynamically
    const tableHeaders = [
        { key: 'transactionCategory', label: 'Transaction Category' }, // Checkbox
        { key: 'transactionName', label: 'Transaction Name' },
        { key: 'transactionType', label: 'Transaction Type' },
        { key: 'supportingDocument', label: 'Supporting Document Type' },
        { key: 'required', label: 'Required' },
        { key: 'attached', label: 'Attached' },
        { key: 'dateAttached', label: 'Date Attached' },
        { key: 'retentionStandardPeriod', label: 'Retention Standard Period' },
        { key: 'retentionActualPeriod', label: 'Retention Actual Period' },
        { key: 'attachedBy', label: 'Attached By' },
        { key: 'auditor', label: 'Auditor' },
        { key: 'auditorApproval', label: 'Auditor Approval' },
        // { key: 'actions', label: 'Actions' },
    ];

        
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
                <div className='flex justify-between'>
                    <p className='text-[16px] font-medium flex'>Financial support</p>
                    <div className='text-[#8133F1] text-[15px]'>
                        <div className='text-[#8133F1] flex gap-5'>
                            <button className='flex gap-1'>Export <PiExportBold size="17px" /></button>
                            <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                    </div>
                </div>

                <div className='text-[#8133F1] flex gap-5 items-center justify-between'>
                    <div className='flex gap-3'>
                        <button className='flex gap-1 text-[15px]'>Filter <ListFilterIcon size="20px" /></button>
                        <button className='flex gap-1 text-[15px]'>Sort <ArrowUpNarrowWideIcon size="20px" /></button>
                    </div>
                    <div className="relative w-[30%] lg:w-[30%] mb-4 md:mb-0">
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="search"
                                placeholder="Search for an item, account, or item type"
                                size={70}
                                className={"block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-9 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"}
                            />
                            <span>
                                <FiSearch className="text-[22px] absolute left-2 top-[.9rem] text-[#66686B]" />
                            </span>
                        </div>
                    </div>
                    <button className='flex gap-1 text-[15px]'>Show all columns <ChevronDownIcon size="17px" /></button>
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

                <div className='my-5'>
                    <div className='overflow-x-auto overflow-y-hidden scrollbar-hide'>
                        <table className="w-[280%] md:w-[128%] lg:w-[162%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    {tableHeaders.map((header) => (
                                        <td className="py-5 pl-5 gap-2 items-center" key={header.key}>
                                            {header.label}
                                        </td>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {entries.map((entry, index) => (
                                    <tr key={index} className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                        {tableHeaders.slice(0, 12).map((header) => (
                                            <td className={header.key === 'transactionCategory' ? 'pl-6 py-6 text-left' : ''} key={header.key}>
                                                {header.key === 'transactionCategory' ? (
                                                    <CustomCheckbox checked={entry.transactionCategory} onChange={() => { }} />
                                                ) : (
                                                    entry[header.key] || ''
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}

                                <tr className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                    {tableHeaders.slice(0, 12).map((header) => (
                                        <td className={header.key === 'transactionCategory' ? 'pl-6 py-6 text-left' : ''} key={header.key}>
                                            {header.key === 'transactionCategory' ? (
                                                <CustomCheckbox
                                                    checked={newEntry.transactionCategory}
                                                    onChange={handleCheckboxChange}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    name={header.key}
                                                    value={(newEntry as any)[header.key] || ''}
                                                    onChange={handleInputChange}
                                                    placeholder={`Enter ${header.label}`}
                                                    className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                />
                                            )}
                                        </td>
                                    ))}
                                </tr>

                                <tr className='bg-secondary'>
                                    <td className="text-[#8133F1] my-4 font-medium" colSpan={30}>
                                        <div className='flex items-center py-6 cursor-pointer' onClick={handleAddEntry}>
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

export default FinancialSupportTab;
