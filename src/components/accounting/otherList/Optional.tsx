"use client"
import { Plus } from 'lucide-react';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import { MdDragHandle } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import CustomSelect from '@/components/reusable/CustomSelect';
import { dataType } from '@/data/dropDownOption';


const Optional: React.FC = () => {
    const [isHidden, setIsHidden] = useState(true);

    const toggleVisibility = () => {
        setIsHidden(!isHidden);
    };


    return (
        <>
            <main className=''>
                <p className='text-xl mt-4 font-medium'>
                    <span>Account Mapping</span>
                </p>

                <div className='my-3'>
                    <div className=''>
                        <table className=" text-[14px]">
                            <thead className="w-full">
                                <tr className="text-[#374B58] text-[15px] font-[700]">
                                    <td className="py-5 pl-5 gap-2 w-[37%] items-center">
                                        Mapping
                                    </td>
                                    <td className="py-5 gap-2 w-[33%]  items-center">
                                        Chart Of Accounts
                                    </td>
                                    <td className="py-5 gap-2 w-[12%] items-center">
                                        Visibility
                                    </td>
                                </tr>
                            </thead>

                            <tbody className="w-full">
                                <tr className="text-[14px] py-5 text-[#545A5D]">
                                    <td className="pl-5 flex gap-2 pr-2 items-center">
                                        <MdDragHandle color='#66686B' size={"28px"} />
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Primary"
                                                size={70}
                                                className={
                                                    "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="text-left px-2">
                                        <CustomSelect
                                            options={dataType}
                                            name="taxType"
                                            placeholder="COA"
                                            className="review-filter"
                                        />
                                    </td>
                                    <td className="px-2 text-left ">
                                        <div className="flex gap-2 pr-2 items-center">
                                            {isHidden ? (
                                                <IoEyeOffOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            ) : (
                                                <IoEyeOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            )}
                                            <MdDeleteOutline color='#374B58' cursor={"pointer"} size={"24px"} />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-[14px] py-5 text-[#545A5D]">
                                    <td className="pl-5 flex gap-2 py-3 pr-2 items-center">
                                        <MdDragHandle color='#66686B' size={"28px"} />
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Increase"
                                                size={70}
                                                className={
                                                    "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="text-left px-2">
                                        <CustomSelect
                                            options={dataType}
                                            name="taxType"
                                            placeholder="COA"
                                            className="review-filter"
                                        />
                                    </td>
                                    <td className="px-2 text-left ">
                                        <div className="flex gap-2 pr-2 items-center">
                                            {isHidden ? (
                                                <IoEyeOffOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            ) : (
                                                <IoEyeOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            )}
                                            <MdDeleteOutline color='#374B58' cursor={"pointer"} size={"24px"} />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-[14px] py-5 text-[#545A5D]">
                                    <td className="pl-5 flex gap-2 py-3 pr-2 items-center">
                                        <MdDragHandle color='#66686B' size={"28px"} />
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Increase"
                                                size={70}
                                                className={
                                                    "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="text-left px-2">
                                        <CustomSelect
                                            options={dataType}
                                            name="taxType"
                                            placeholder="COA"
                                            className="review-filter"
                                        />
                                    </td>
                                    <td className="px-2 text-left ">
                                        <div className="flex gap-2 pr-2 items-center">
                                            {isHidden ? (
                                                <IoEyeOffOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            ) : (
                                                <IoEyeOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            )}
                                            <MdDeleteOutline color='#374B58' cursor={"pointer"} size={"24px"} />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-[14px] py-5 text-[#545A5D]">
                                    <td className="pl-5 flex gap-2 py-3 pr-2 items-center">
                                        <MdDragHandle color='#66686B' size={"28px"} />
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Decrease"
                                                size={70}
                                                className={
                                                    "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="text-left px-2">
                                        <CustomSelect
                                            options={dataType}
                                            name="taxType"
                                            placeholder="COA"
                                            className="review-filter"
                                        />
                                    </td>
                                    <td className="px-2 text-left ">
                                        <div className="flex gap-2 pr-2 items-center">
                                            {isHidden ? (
                                                <IoEyeOffOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            ) : (
                                                <IoEyeOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            )}
                                            <MdDeleteOutline color='#374B58' cursor={"pointer"} size={"24px"} />
                                        </div>
                                    </td>
                                </tr>
                                <tr className="text-[14px] py-5 text-[#545A5D]">
                                    <td className="pl-5 flex gap-2 py-3 pr-2 items-center">
                                        <MdDragHandle color='#66686B' size={"28px"} />
                                        <div className="w-full">
                                            <input
                                                type="text"
                                                name="search"
                                                placeholder="Decrease"
                                                size={70}
                                                className={
                                                    "block w-full rounded-[6px] border-0 h-[3.2rem] py-1.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#CFCECE] focus:ring-2 focus:ring-[#8133F1] placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className="text-left px-2">
                                        <CustomSelect
                                            options={dataType}
                                            name="taxType"
                                            placeholder="COA"
                                            className="review-filter"
                                        />
                                    </td>
                                    <td className="px-2 text-left ">
                                        <div className="flex gap-2 pr-2 items-center">
                                            {isHidden ? (
                                                <IoEyeOffOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            ) : (
                                                <IoEyeOutline onClick={toggleVisibility} color='#374B58' cursor={"pointer"} size={"24px"} />
                                            )}
                                            <MdDeleteOutline color='#374B58' cursor={"pointer"} size={"24px"} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex text-[#8133F1] items-center gap-1 mb-5">
                        <Plus />  Add Mapping
                    </div>
                    <div className='flex gap-5'>
                        <button className={`bg-foundation-purple-purple-400 border-none hover:bg-foundation-purple-purple-100 w-[32%] py-4 cursor-pointer text-foundation-white-white-400 rounded-[16px]`}>
                            Save List
                        </button>
                        <button className={`text-foundation-purple-purple-400 hover:bg-foundation-purple-purple-100 hover:text-white w-[32%] py-4 cursor-pointer border boorder-foundation-purple-purple-400 rounded-[16px]`}>
                            Cancel
                        </button>
                    </div>
                </div>
            </main>
        </>

    );
};

export default Optional;
