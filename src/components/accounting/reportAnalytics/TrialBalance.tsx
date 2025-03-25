import { ArrowUpNarrowWideIcon, ChevronDownIcon, ListFilterIcon } from 'lucide-react';
import Image from "next/image";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from '../shared/SelectDropDown/SelectDropDown';
import TreeSelectDropDown from '../shared/TreeSelectDropDown/TreeSelectDropDown';



const TrialBalance: React.FC = () => {
    const [openFilter, setOpenFilter] = useState<string | null>(null);

    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleLocationSelect = (selectedOption: string) => {
        console.log("Selected Location:", selectedOption);
    };

    const handleSalesRepSelect = (selectedOption: string) => {
        console.log("Selected Sales Rep:", selectedOption);
    };

    const handleReportSelect = (selectedOption: string) => {
        console.log("Selected Sales Rep:", selectedOption);
    };

    const [isOpen, setIsOpen] = useState(false);

    const options = [
        {
            label: "Group",
            value: "group",
            children: [
                { label: "Sales", value: "sales" },
                { label: "Marketing", value: "Marketing" },
                { label: "Admin", value: "Admin" },
                { label: "Warehouse", value: "Warehouse" },
            ]
        },
        {
            label: "Location",
            value: "location",
            children: [
                { label: "NYC", value: "NYC" },
                { label: "HQ", value: "HQ" },
                { label: "Baltimore", value: "Baltimore" },
                { label: "Cleveland", value: "Cleveland" },
            ]
        },
        {
            label: "List",
            value: "List",
            children: [
                { label: "Product Lines", value: "Product Lines" },
                { label: "Modelling", value: "Modelling" },
                { label: "Fabrication", value: "Fabrication" },
                { label: "Ordering", value: "Ordering" },
            ]
        },
        {
            label: "Segment",
            value: "segment",
            children: [
                { label: "Georgraphic", value: "Georgraphic" },
                { label: "Product", value: "Product" },
                { label: "Services", value: "Services" },
            ]
        },
        {
            label: "Job",
            value: "Job",
            children: [
                { label: "Rebranding", value: "Rebranding" },
                { label: "Web Design", value: "Web Design" },
                { label: "SEO Optimization", value: "SEO Optimization" },
            ]
        }
    ];

    const handleSelect = (selectedOption: string) => {
        console.log("Selected:", selectedOption);
    };

    return (
        <>
            <main>
                <div className='flex justify-between my-3'>
                    <div className='mb-3'>
                        <p className='text-xl font-medium mb-3'>Trial Balance</p>
                        <p className='text-[14px] mb-3'>As of May 31, 2024</p>
                        <p className='text-[17px] font-medium mb-2'>XYZ Corporation</p>
                        <div className="flex gap-2 mb-2">
                            <p className='text-[14px]'>Location: <span className='font-medium'>HQ</span></p>
                            <p className='text-[14px]'>Currency: <span className='font-medium'>USD</span> </p>
                        </div>
                    </div>
                </div>

                <div className="flex mb-5 gap-4">
                    <SelectDropDown
                        textSize={16}
                        textColor="#8133F1"
                        menuWidth={10}
                        zIndex={10}
                        label="Select Department"
                        options={["Sales", "Marketing", "Admin", "Ware House"]}
                        onSelect={handleLocationSelect}
                        isOpen={openFilter === "department"}
                        onToggle={() => handleToggle("department")}
                    />

                    <TreeSelectDropDown
                        label="Select Criteria Option"
                        options={options}
                        onSelect={handleSelect}
                        isOpen={isOpen}
                        onToggle={() => setIsOpen(!isOpen)}
                        textSize={16}
                        menuWidth={12}
                    />

                    <SelectDropDown
                        textSize={16}
                        textColor="#8133F1"
                        menuWidth={10}
                        zIndex={10}
                        label="Select Period Option"
                        options={["Month", "Quater", "Year"]}
                        onSelect={handleSalesRepSelect}
                        isOpen={openFilter === "period"}
                        onToggle={() => handleToggle("period")}
                    />

                    <SelectDropDown
                        textSize={16}
                        textColor="#8133F1"
                        menuWidth={10}
                        zIndex={10}
                        label="Select Report Type"
                        options={["Standard", "Comparison",]}
                        onSelect={handleReportSelect}
                        isOpen={openFilter === "report"}
                        onToggle={() => handleToggle("report")}
                    />
                </div>

                <div className='text-[#8133F1] text-[16px] flex gap-4 mb-5'>
                    <button className='flex gap-1'>Download Report <Image className="ml-2" src="/download.png" width={20} height={20} alt="icon" /></button>
                    <button className='flex gap-1'>Print Report <Image className="ml-2" src="/print.png" width={18} height={18} alt="icon" /></button>
                    <button className='flex gap-1'>Share Report <Image className="ml-2" src="/share.png" width={18} height={18} alt="icon" /></button>
                    <button className='flex gap-1'>Customize Report <Image className="ml-2" src="/customize.png" width={18} height={18} alt="icon" /></button>
                </div>

                <div className='text-[#8133F1] text-[16px] flex gap-3'>
                    <button className='flex gap-1'>Filter <ListFilterIcon size="18px" /></button>
                    <button className='flex gap-1'>Sort <ArrowUpNarrowWideIcon size="18px" /></button>
                </div>

                <div className='my-5'>
                    <div className='overflow-x-auto scrollbar-hide'>
                        <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                                    <td className="py-5 pl-5 gap-2 items-center">
                                        Account Code
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Account Name
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Debit(USD)
                                    </td>
                                    <td className="py-5 gap-2 items-center">
                                        Credit(USD)
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full bg-white">
                                <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        <div className="flex items-center gap-1">
                                            Revenue  <ChevronDownIcon size="17px" />
                                        </div>
                                    </td>
                                    <td className="py-6  text-left ">

                                    </td>
                                    <td className="py-6  text-left ">

                                    </td>
                                    <td className="py-6  text-left ">

                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        400101
                                    </td>
                                    <td className="py-6  text-left ">
                                        Sales Revenue
                                    </td>
                                    <td className="py-6  text-left ">
                                        500
                                    </td>
                                    <td className="py-6  text-left ">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">

                                    </td>
                                    <td className="py-6  text-left ">
                                        Total Current Asset
                                    </td>
                                    <td className="py-6 text-left ">
                                        500
                                    </td>
                                    <td className="py-6 text-left ">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">
                                        400101
                                    </td>
                                    <td className="py-6 text-left ">
                                        Sales Revenue
                                    </td>
                                    <td className="py-6 text-left ">
                                        500
                                    </td>
                                    <td className="py-6 text-left ">
                                        1000
                                    </td>
                                </tr>
                                <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]  text-[#545A5D]">
                                    <td className="py-6 pl-5 text-left ">

                                    </td>
                                    <td className="py-6 text-left ">
                                        Total
                                    </td>
                                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
                                        500
                                    </td>
                                    <td className="py-6 border-[#8A8A8A] border-t-2 text-left ">
1000
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

export default TrialBalance;
