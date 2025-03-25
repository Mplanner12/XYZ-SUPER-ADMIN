import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import Image from 'next/image';
import { PiExportBold } from "react-icons/pi";


const FinancialRecordsTab: React.FC = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [newEntry, setNewEntry] = useState({
        assetID: '',
        assetClass: '',
        assetSubClass: '',
        assetDescription: '',
        acquisitionDate: '',
        location: '',
        assetCondition: '',
        maintainanceSchedule: '',
        lastMaintainanceSchedule: '',
        maintananceDueDate: '',
        responsiblePerson: '',
        usage: '',
        notes: ''
    });

    const [records, setRecords] = useState([
        {
            assetID: 'IR-45674',
            assetClass: 'Property',
            assetSubClass: 'IR-45674',
            assetDescription: 'Building',
            acquisitionDate: '22-04-2024',
            location: '1,600,000',
            assetCondition: '1,600,000',
            maintainanceSchedule: '1,600,000',
            lastMaintainanceSchedule: '1,600,000',
            maintananceDueDate: 'Straight Line',
            responsiblePerson: '20 years',
            usage: '',
            notes: ''
        }
    ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const addNewEntry = () => {
        setRecords([...records, newEntry]);
        setIsAdding(false);
        setNewEntry({
            assetID: '',
            assetClass: '',
            assetSubClass: '',
            assetDescription: '',
            acquisitionDate: '',
            location: '',
            assetCondition: '',
            maintainanceSchedule: '',
            lastMaintainanceSchedule: '',
            maintananceDueDate: '',
            responsiblePerson: '',
            usage: '',
            notes: ''
        });
    };

    return (
        <>
            <main>
                <div className='flex justify-between'>
                    <p className='text-[16px] font-medium flex'>Asset Non-Financial Records</p>
                    <div className='text-[#8133F1]'>
                        <div className='text-[#8133F1] flex gap-5 text-[15px] mb-3'>
                            <button className='flex gap-1'>Export <PiExportBold size="17px" /></button>
                            <button className='flex gap-1'>Print  <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                            <button className='flex gap-1'>Share  <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                        </div>
                        <button className='flex gap-1 text-[15px]'>Show all columns <ChevronDownIcon size="17px" /></button>
                    </div>
                </div>

                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="w-[280%] md:w-[128%] lg:w-[320%] text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0] border-b font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-6">Asset ID</td>
                                    <td className="py-5">Asset Class</td>
                                    <td className="py-5">Asset SubClass</td>
                                    <td className="py-5">Asset Description</td>
                                    <td className="py-5">Acquisition Date</td>
                                    <td className="py-5">Location</td>
                                    <td className="py-5">Asset Condition</td>
                                    <td className="py-5">Maintanance Schedule</td>
                                    <td className="py-5">Last Maintanance Date</td>
                                    <td className="py-5"> Maintanance Due Date</td>
                                    <td className="py-5">Responsible Person</td>
                                    <td className="py-5">Usage</td>
                                    <td className="py-5 pr-5">Notes</td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                {records.map((record, index) => (
                                    <tr key={index} className="border-[#eaecf0] hover:bg-gray-200 text-[14px] border-b text-[#545A5D]">
                                        <td className="py-6 pl-6">{record.assetID}</td>
                                        <td className="py-6">{record.assetClass}</td>
                                        <td className="py-6">{record.assetSubClass}</td>
                                        <td className="py-6">{record.assetDescription}</td>
                                        <td className="py-6">{record.acquisitionDate}</td>
                                        <td className="py-6">{record.location}</td>
                                        <td className="py-6">{record.assetCondition}</td>
                                        <td className="py-6">{record.maintainanceSchedule}</td>
                                        <td className="py-6">{record.lastMaintainanceSchedule}</td>
                                        <td className="py-6">{record.maintananceDueDate}</td>
                                        <td className="py-6">{record.responsiblePerson}</td>
                                        <td className="py-6">{record.usage}</td>
                                        <td className="py-6 pl-6">{record.notes}</td>
                                    </tr>
                                ))}


                                <tr className="bg-gray-100">
                                    {Object.keys(newEntry).map((key, index) => (
                                        <td key={index} className="py-4">
                                            <input
                                                type="text"
                                                name={key}
                                                value={(newEntry as any)[key]}
                                                onChange={handleInputChange}
                                                placeholder={`Enter ${key}`}
                                                className="block rounded-[6px] border-0 h-[2.4rem] w-[80%] py-1.5 pr-2 pl-2 text-[14px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                            />
                                        </td>
                                    ))}
                                </tr>

                                {/* Add Entry Button */}
                                <tr className="bg-secondary">
                                    <td className="text-[#8133F1] my-4 font-medium" colSpan={30}>
                                        <div className="flex items-center py-6 cursor-pointer" onClick={addNewEntry}>
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

export default FinancialRecordsTab;
