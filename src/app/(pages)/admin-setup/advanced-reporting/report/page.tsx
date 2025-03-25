"use client"

import {
  ArrowUpNarrowWideIcon,
  ChevronDownIcon,
  ListFilterIcon,
  PenIcon,
} from "lucide-react";
import Image from "next/image";
import "react-datepicker/dist/react-datepicker.css";
import SelectDropDown from "@/components/accounting/shared/SelectDropDown/SelectDropDown";
import TreeSelectDropDown from "@/components/accounting/shared/TreeSelectDropDown/TreeSelectDropDown";
import CustomDropDown from "../../_components/CustomSelectDropDown";
import IncomeStatement from "../_component/reports-statements/income-statement";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import dynamic from "next/dynamic";

const ReportPieChart = dynamic(() => import('../_component/reports-statements/Report-piechart'), {
    loading: () => <p>Loading...</p>,
    ssr: false
});

const Reports: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedTab(tab);
    } else {
      setSelectedTab(null);
    }
  }, [searchParams]);

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

  const handleChartSelect = (selectedOption: string) => {
    console.log("Selected Chart:", selectedOption);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleDropDownSelect = (selectedOption: string) => {
    let newTab = "";
    switch (selectedOption) {
      case "Income Statement":
        newTab = "income-statement";
        break;
      case "Pie Chart":
        newTab = "pie-chart";
        break;
      default:
        newTab = "";
    }
    router.push(`/admin-setup/advanced-reporting/report?tab=${newTab}`, {
      scroll: false,
    });
  };

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
      label: "Class",
      value: "class",
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

  const renderSelectedTab = () => {
    switch (selectedTab) {
      case "income-statement":
        return <IncomeStatement />;
      case "pie-chart":
        return <ReportPieChart />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full self-stretch">
      {isLoading && <LoadingOverlay />}
      <div className="w-full flex flex-row items-center gap-3">
        <div className="rounded-full overflow-hidden h-6 w-6">
          <Image
            src="/bigPic.png"
            alt="user-image"
            className="object-contain"
            width={26}
            height={26}
          />
        </div>
        <div className=" relative w-full">
          <input
            type="text"
            name="chatgpt"
            placeholder="Ask me a question"
            size={70}
            className={
              "w-full rounded-[4px] border-2 border-foundation-grey-grey-600 bg-transparent h-auto py-3.5 pr-2 pl-4 text-[16px] text-[#66686B] shadow-sm focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
            }
          />
          <span>
            <PenIcon
              className="text-[20px] absolute text-foundation-purple-purple-400 right-2 top-[.8rem]"
              width={20}
              height={20}
            />
          </span>
        </div>
      </div>

      <div className="flex gap-3 items-start my-4 w-full">
        <div className="rounded-full overflow-hidden h-6 w-6">
          <Image
            src="/bigPic.png"
            alt="user-image"
            className="object-contain"
            width={26}
            height={26}
          />
        </div>
        <main className="border w-full border-foundation-grey-grey-600 px-4 py-4">
          <div className="flex justify-between my-3">
            <div className="mb-3">
              <p className="text-xl font-medium mb-3">Income Statement</p>
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

          <div className="flex justify-between py-2">
            <div className="text-[#8133F1] text-[16px] flex gap-3">
              <button className="flex gap-1">
                Filter <ListFilterIcon size="18px" />
              </button>
              <button className="flex gap-1">
                Sort <ArrowUpNarrowWideIcon size="18px" />
              </button>
            </div>

            <div>
              <CustomDropDown
                textColor="#8133F1"
                textSize={14}
                zIndex={10}
                icons={[
                  "/finance-black.svg",
                  "/finance-black.svg",
                  "/finance-black.svg",
                  "/finance-black.svg",
                ]}
                menuWidth={10}
                label="Filter By Ai Assistant"
                options={["Income Statement", "Pie Chart", " Heat Map"]}
                onSelect={handleDropDownSelect}
                isOpen={openFilter === "chatbot"}
                onToggle={() => handleToggle("chatbot")}
              />
            </div>
          </div>

          {!selectedTab && (
            <div className="mt-3">
              <IncomeStatement />
            </div>
          )}
          <div className="mt-1">{renderSelectedTab()}</div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
