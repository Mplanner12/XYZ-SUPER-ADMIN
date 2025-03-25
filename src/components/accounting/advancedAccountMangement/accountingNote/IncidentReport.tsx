import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';
import { PiExportBold } from 'react-icons/pi';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from 'formik';


const IncidentReportTab: React.FC = () => {
    const [incidents, setIncidents] = useState<any[]>([
        {
            id: 1,
            reportNo: 'IR-45674',
            date: '22-04-2024',
            reportedBy: 'Emily Chan',
            department: 'Finance',
            description: 'Company will adopt IFRS and apply retrospective approach.',
            actionTaken: 'Action Taken Sample',
            lessonLearned: 'Lesson Learned Sample',
            recommendation: 'Recommendation Sample',
        },
    ]);

    const [newEntry, setNewEntry] = useState({
        reportNo: '',
        date: '',
        reportedBy: '',
        department: '',
        description: '',
        actionTaken: '',
        lessonLearned: '',
        recommendation: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewEntry({ ...newEntry, [name]: value });
    };

    const addNewEntry = () => {
        setIncidents([...incidents, { ...newEntry, id: incidents.length + 1 }]);
        setNewEntry({
            reportNo: '',
            date: '',
            reportedBy: '',
            department: '',
            description: '',
            actionTaken: '',
            lessonLearned: '',
            recommendation: '',
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
                    <p className="text-[16px] font-medium flex">Incident Report and Notes Log</p>
                    <div className="text-[#8133F1] text-[15px]">
                        <div className="text-[#8133F1] flex gap-5">
                            <button className="flex gap-1">Export <PiExportBold size="17px" /></button>
                            <button className="flex gap-1">Print <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className="flex gap-1">Share <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                    </div>
                </div>

                <div className="text-[#8133F1] flex gap-5 items-center justify-between">
                    <div className="flex gap-3">
                        <button className="flex gap-1 text-[15px]">Filter <ListFilterIcon size="20px" /></button>
                        <button className="flex gap-1 text-[15px]">Sort <ArrowUpNarrowWideIcon size="20px" /></button>
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
                    <button className="flex gap-1 text-[15px]">Show all columns <ChevronDownIcon size="17px" /></button>
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
                        <table className="w-[200%] md:w-[128%] lg:w-[150%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 gap-2 items-center">S/N</td>
                                    <td className="py-5 gap-2 items-center">Incident Report No.</td>
                                    <td className="py-5 gap-2 items-center">Date</td>
                                    <td className="py-5 gap-2 items-center">Reported By</td>
                                    <td className="py-5 gap-2 items-center">Department</td>
                                    <td className="py-5 gap-2 items-center">Brief description</td>
                                    <td className="py-5 gap-2 items-center">Actions Taken</td>
                                    <td className="py-5 gap-2 items-center">Lesson Learned</td>
                                    <td className="py-5 gap-2 items-center">Recommendation</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {incidents.map((incident, index) => (
                                    <tr key={incident.id} className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                        <td className="py-6 pl-5 flex gap-2 items-center">{index + 1}</td>
                                        <td className="py-6 text-left">{incident.reportNo}</td>
                                        <td className="py-6 text-left">{incident.date}</td>
                                        <td className="py-6 text-left">{incident.reportedBy}</td>
                                        <td className="py-6 text-left">{incident.department}</td>
                                        <td className="py-6 text-left">{incident.description}</td>
                                        <td className="py-6 text-left">{incident.actionTaken}</td>
                                        <td className="py-6 text-left">{incident.lessonLearned}</td>
                                        <td className="py-6 text-left">{incident.recommendation}</td>
                                    </tr>
                                ))}

                                {/* Add New Entry Row */}
                                <tr className="bg-gray-100">
                                    <td className="py-4 pl-5">{incidents.length + 1}</td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="reportNo"
                                            value={newEntry.reportNo}
                                            onChange={handleInputChange}
                                            placeholder="Enter report no"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="date"
                                            value={newEntry.date}
                                            onChange={handleInputChange}
                                            placeholder="Enter date"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="reportedBy"
                                            value={newEntry.reportedBy}
                                            onChange={handleInputChange}
                                            placeholder="Enter reported by"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="department"
                                            value={newEntry.department}
                                            onChange={handleInputChange}
                                            placeholder="Enter department"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="description"
                                            value={newEntry.description}
                                            onChange={handleInputChange}
                                            placeholder="Enter description"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="actionTaken"
                                            value={newEntry.actionTaken}
                                            onChange={handleInputChange}
                                            placeholder="Enter action taken"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="lessonLearned"
                                            value={newEntry.lessonLearned}
                                            onChange={handleInputChange}
                                            placeholder="Enter lesson learned"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                    <td className="py-4">
                                        <input
                                            type="text"
                                            name="recommendation"
                                            value={newEntry.recommendation}
                                            onChange={handleInputChange}
                                            placeholder="Enter recommendation"
                                             className={
                                                    "block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                        />
                                    </td>
                                </tr>

                                {/* Submit Button */}
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

export default IncidentReportTab;