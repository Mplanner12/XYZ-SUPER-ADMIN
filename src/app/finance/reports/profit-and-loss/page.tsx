'use client'
import {
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  ListFilterIcon,
} from "lucide-react";
import Image from "next/image";
import { reportOptions } from '../page';
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "@/components/accounting/shared/SelectDropDown/SelectDropDown";
import TreeSelectDropDown from "@/components/accounting/shared/TreeSelectDropDown/TreeSelectDropDown";
import HeaderLayout from "@/components/MainLayouts/HeaderLayout";
import Dropdown from "@/components/reusable/DropDown";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/reusable/TextField";
import { useForm } from "react-hook-form";
import { dateFilterOptions } from "@/data/dropDownOption";

const ProfitAndLoss: React.FC = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState('');
  const [dateFilter, setDateFilter] = useState('')
  const router = useRouter()
  const {control} = useForm()

  const handleToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

  const handleLocationSelect = (selectedOption: string) => {
    console.log("Selected Location:", selectedOption);
  };
  const handleSegmentSelect = (selectedOption: string) => {
    console.log("Selected Segment:", selectedOption);
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
      ],
    },
    {
      label: "Location",
      value: "location",
      children: [
        { label: "NYC", value: "NYC" },
        { label: "HQ", value: "HQ" },
        { label: "Baltimore", value: "Baltimore" },
        { label: "Cleveland", value: "Cleveland" },
      ],
    },
    {
      label: "List",
      value: "List",
      children: [
        { label: "Product Lines", value: "Product Lines" },
        { label: "Modelling", value: "Modelling" },
        { label: "Fabrication", value: "Fabrication" },
        { label: "Ordering", value: "Ordering" },
      ],
    },
    {
      label: "Segment",
      value: "segment",
      children: [
        { label: "Georgraphic", value: "Georgraphic" },
        { label: "Product", value: "Product" },
        { label: "Services", value: "Services" },
      ],
    },
    {
      label: "Job",
      value: "Job",
      children: [
        { label: "Rebranding", value: "Rebranding" },
        { label: "Web Design", value: "Web Design" },
        { label: "SEO Optimization", value: "SEO Optimization" },
      ],
    },
  ];

  const handleSelect = (selectedOption: string) => {
    console.log("Selected:", selectedOption);
  };

  const breadcrumbs = ['Admin Dashboard', 'Finance Module'];
  return (
    <main className='h-[100vh] overflow-scroll'>
      <HeaderLayout
        moduleName="Finance Module"
        moduleLink='/finance/overview'
        page="Report & Analytics"
        pageLink="/finance/reports"
        breadcrumbs={breadcrumbs}
      />
      <div className='px-6 pt-6 mb-4'>
        <div className='bg-secondary rounded-[16px] py-6 px-4 mt-4'>
          <Dropdown
            placeholder='Select a Report Type'
            options={reportOptions}
            value={selectedValue}
            onChange={(value) => {
              router.push(`/finance/reports/${value}`)
              setSelectedValue(value)
            }}
            className="w-[250px] text-base"
            buttonClassName='border-none text-[24px] text-primary-normal !px-0'
          />
          <div className="flex justify-between my-3">
            <div className="mb-3">
              <p className="text-xl font-medium mb-3">Profit & Loss Prev. Year Comparison</p>
              <p className="text-[14px] mb-3">As of May 31, 2024</p>
              <p className="text-[17px] font-medium mb-2">XYZ Corporation</p>
              <div className="flex gap-2 mb-2">
                <p className="text-[14px]">
                  Location: <span className="font-medium">HQ</span>
                </p>
                <p className="text-[14px]">
                  Currency: <span className="font-medium">USD</span>{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="flex mb-5 gap-4">
            <SelectDropDown
              textSize={16}
              menuWidth={10}
              zIndex={10}
              label="Select Department"
              options={["Sales", "Marketing", "Admin", "Ware House"]}
              onSelect={handleLocationSelect}
              isOpen={openFilter === "department"}
              onToggle={() => handleToggle("department")}
            />

            <SelectDropDown
              label="Select Segment"
              textSize={16}
              menuWidth={10}
              zIndex={10}
              options={["Geographic", "Product", "Service"]}
              onSelect={handleSegmentSelect}
              isOpen={openFilter === "segment"}
              onToggle={() => handleToggle("segment")}
            />

            <SelectDropDown
              textSize={16}
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
              menuWidth={10}
              zIndex={10}
              label="Select Report Type"
              options={["Standard", "Comparison"]}
              onSelect={handleReportSelect}
              isOpen={openFilter === "report"}
              onToggle={() => handleToggle("report")}
            />
          </div>

          <div className="text-[#8133F1] text-[16px] flex gap-4 mb-5">
            <button className="flex gap-1">
              Download Report{" "}
              <Image
                className="ml-2"
                src="/download.png"
                width={20}
                height={20}
                alt="icon"
              />
            </button>
            <button className="flex gap-1">
              Print Report{" "}
              <Image
                className="ml-2"
                src="/print.png"
                width={18}
                height={18}
                alt="icon"
              />
            </button>
            <button className="flex gap-1">
              Share Report{" "}
              <Image
                className="ml-2"
                src="/share.png"
                width={18}
                height={18}
                alt="icon"
              />
            </button>
            <button className="flex gap-1">
              Customize Report{" "}
              <Image
                className="ml-2"
                src="/customize.png"
                width={18}
                height={18}
                alt="icon"
              />
            </button>
          </div>

          <div className="flex flex-col md:flex-row md: justify-between md:items-center gap-4">
            <div className="flex flex-col md:flex-row md: justify-between md:items-center gap-4">
              <div className="text-[#8133F1] text-[16px] flex gap-3">
                <button className="flex gap-1">
                  Filter <ListFilterIcon size="18px" />
                </button>
                <button className="flex gap-1">
                  Sort <ArrowUpNarrowWideIcon size="18px" />
                </button>
              </div>
              <div className='flex flex-wrap gap-2 mb-4'>
                <div className='flex items-center gap-2'>
                  <p className='font-bold'>Date</p>
                  <Dropdown 
                    placeholder='Select Location'
                    options={dateFilterOptions}
                    value={dateFilter}
                    onChange={(value) => setDateFilter(value)}
                    className="w-[140px] text-base"
                    buttonClassName='bg-white'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <p className='font-bold'>From</p>
                  <TextField
                    name='dateFrom'
                    type='date'
                    variant='short'
                    control={control}
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <p className='font-bold'>To</p>
                  <TextField
                    name='dateTo'
                    type='date'
                    variant='short'
                    control={control}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-wrap gap-2 mb-4'>
              <div className='flex items-center gap-2'>
                <p className='font-bold'>Date</p>
                <Dropdown 
                  placeholder='Select Location'
                  options={dateFilterOptions}
                  value={dateFilter}
                  onChange={(value) => setDateFilter(value)}
                  className="w-[140px] text-base"
                  buttonClassName='bg-white'
                />
              </div>
              <div className='flex items-center gap-2'>
                <p className='font-bold'>From</p>
                <TextField
                  name='dateFrom'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
              <div className='flex items-center gap-2'>
                <p className='font-bold'>To</p>
                <TextField
                  name='dateTo'
                  type='date'
                  variant='short'
                  control={control}
                />
              </div>
            </div>
          </div>

          {/* filter by date */}
          <div className="flex gap-4">
            <div className="flex items-center gap-x-3">
              <p>Dates</p>
              <TextField
                name='date'
                type='date'
                variant="short"
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <p>Date Range</p>
              <TextField
                name='date'
                type='date'
                variant="short"
                control={control}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <p>To</p>
              <TextField
                name='date'
                type='date'
                variant="short"
                control={control}
              />
            </div>
          </div>

          <div className="my-5">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="min-w-[280%] md:min-w-[128%] lg:min-w-full text-[14px]">
                <thead className="w-full">
                  <tr className="text-[#374B58] text-[12px] border-[#eaecf0]  border-b  font-[500] bg-[#F5F5F5]">
                    <td className="py-5 pl-5 gap-2 items-center"></td>
                    <td className="py-5 gap-2 items-center">Jan-Dec 24</td>
                    <td className="py-5 gap-2 items-center">Jan-Dec 23</td>
                    <td className="py-5 gap-2 items-center">$ Change</td>
                    <td className="py-5 gap-2 items-center">% Change</td>
                  </tr>
                </thead>

                <tbody className="w-full bg-white">
                  {/* Income */}
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left ">
                      <div className="flex items-center gap-1">
                        <ChevronDownIcon size="17px" /> Ordinary Income/Expenses
                      </div>
                    </td>
                    <td className="py-6  text-left "></td><td className="py-6  text-left "></td>
                    <td className="py-6  text-left "></td><td className="py-6  text-left "></td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left ">
                      <div className="flex items-center gap-1">
                        <ChevronDownIcon size="17px" /> Income
                      </div>
                    </td>
                    <td className="py-6 text-left"></td><td className="py-6 text-left"></td>
                    <td className="py-6 text-left"></td><td className="py-6 text-left"></td>
                  </tr>
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left">
                      <div className="flex items-center gap-1">
                        <ChevronDownIcon size="17px" /> 40100 Construction Income
                      </div>
                    </td>
                    <td className="py-6 text-left"></td><td className="py-6 text-left"></td>
                    <td className="py-6 text-left"></td><td className="py-6 text-lef"></td>
                  </tr>
                  {constructions.map((item, index)=>(
                    <tr key={index} className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#939292]">
                      <td className="py-6 pl-5 text-left">{item?.name}</td>
                      <td className="py-6 text-left">{item?.year1}</td>
                      <td className="py-6 text-left">{item?.year2}</td>
                      <td className="py-6 text-left">{item?.amount}</td>
                      <td className="py-6 text-left">{item?.percentage}</td>
                    </tr>
                  ))}
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]">
                    <td className="py-6 pl-5 text-left">Total - 40100 Construction Income </td>
                    <td className="py-6 text-left border-t border-[#434343]">453,687.34</td>
                    <td className="py-6 border-t border-[#434343] text-left font-medium">
                      168,425.27
                    </td>
                    <td className="py-6 pl-5 text-left border-t border-[#434343] ">285,262.07</td>
                    <td className="py-6 pl-5 text-left border-t border-[#434343] ">169.4%</td>
                  </tr>
                  {/* Reimbursement  */}
                  <tr className=" border-[#eaecf0] bg-[#F0F0F0] curor-pointer text-[14px] border-b text-[#545A5D]">
                    <td className="py-6 pl-5 text-left">
                      <div className="flex items-center gap-1">
                        <ChevronDownIcon size="17px" /> 40500 Reimbursement Income 
                      </div>
                    </td>
                    <td className="py-6 text-left "></td><td className="py-6 text-left "></td>
                    <td className="py-6 text-left "></td><td className="py-6 text-left "></td>
                  </tr>
                  {reimbursements?.map((item, index)=> (
                    <tr key={index} className=" border-[#eaecf0] hover:bg-[#F2F8FF] text-[14px] border-b text-[#939292]">
                      <td className="py-6 pl-5 text-left ">{item?.name}</td>
                      <td className="py-6 text-left ">{item?.year1}</td>
                      <td className="py-6 text-left ">{item?.year2}</td>
                      <td className="py-6 text-left ">{item?.amount}</td>
                      <td className="py-6 text-left ">{item?.percentage}</td>
                    </tr>
                  ))}
                  <tr className=" border-[#eaecf0] border-b hover:bg-[#F2F8FF] text-[14px]">
                    <td className="py-6 pl-5 text-left">Total Income </td>
                    <td className="py-6 text-left border-t border-[#434343]">455,807.14</td>
                    <td className="py-6 border-t border-[#434343] text-left ">169,260.27</td>
                    <td className="py-6 text-left border-t border-[#434343]">455,807.14</td>
                    <td className="py-6 border-t border-[#434343] text-left ">169,260.27</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

const constructions = [
  {
    name: '40110 Design Income',
    year1: '41,999.25',
    year2: '3,400.00',
    amount: '37,829.25',
    percentage: '1,112.6%',
  },
  {
    name: '40130 Labour Income',
    year1: '209,875.42',
    year2: '16,355.00',
    amount: '193,540.42',
    percentage: '1,184.8%',
  },
]

const reimbursements  = [
  {
    name: '40520 Permit Reimbursement Income',
    year1: '1,223.75',
    year2: '3,400.00',
    amount: '37,829.25',
    percentage: '1,112.6%',
  },
  {
    name: '40530 Reimbursed Freight & Delivery',
    year1: '209,875.42',
    year2: '16,355.00',
    amount: '193,540.42',
    percentage: '1,184.8%',
  },
]

export default ProfitAndLoss;
