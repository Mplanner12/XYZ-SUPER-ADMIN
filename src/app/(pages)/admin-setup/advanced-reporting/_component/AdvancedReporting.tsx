"use client"

import SelectDropDown from '@/components/accounting/shared/SelectDropDown/SelectDropDown';
import React, { useState } from 'react'
import CustomDropDown from '../../_components/CustomSelectDropDown';
import Image from 'next/image';
import SubmitButton from '@/components/Buttons/SubmitButton';
import Link from 'next/link';
import ReportCards from './ReportCards';
import FullRecentReport from './full-RecentReport';
import QueryCard from './QueryCard';
import FullReportQuery from './full-Queries';
import LoadingOverlay from '@/components/reusable/LoadingOverlay';


const AdvancedReporting = () => {

	const [isLoading, setIsLoading] = useState(false)
	const [openFilter, setOpenFilter] = useState<string | null>(null);

  const [selectedTab, setSelectedTab] = useState("recent-report");

  // const [tabChange, setTabChange] = useState('recent-report');

  const handleTabChange = (tab: string) => {
    setIsLoading(true); // Start loading
    setSelectedTab(tab);
    setTimeout(() => setIsLoading(false), 500); // Simulate loading time
  };

	const handleToggle = (filterName: string) => {
    setOpenFilter(openFilter === filterName ? null : filterName);
  };

	const handleChatbotSelect = (selectedOption: string) => {
    console.log("Selected ChatBot:", selectedOption);
  };

	const handleLocationSelect = (selectedOption: string) => {
    console.log("Selected Location:", selectedOption);
  };

	const items = [
    {
      title: "Total Cash outflows",
      amount: "$ 100,000",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Total Cash Inflows",
      amount: "$ 50,000",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Total Cash Payable",
      amount: "$ 20,000",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Total Cash Receivable",
      amount: "$ 75,000",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
  ];

  const data = [
    {
      title: "Cash Inflows Report",
      date: "2024-10-01",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Income Statement Report",
      date: "2024-10-15",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Financial Position Report",
      date: "2024-10-15",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
    {
      title: "Cash Inflows Report",
      date: "2024-10-01",
      link: "/admin-setup/advanced-reporting/report?tab=income-statement",
    },
  ];

	return (
    <>
      {isLoading && <LoadingOverlay />}
      <div>
        {selectedTab === "recent-report" && (
          <div className="w-full">
            <div className="flex flex-col gap-2 flex-wrap">
              <h2 className="text-base font-normal text-black">
                Chat with AI Assistance
              </h2>
              <CustomDropDown
                textColor="#8133F1"
                textSize={14}
                zIndex={10}
                icons={[
                  "/chatgpt.png",
                  "/claude.png",
                  "/gemini.png",
                  "/napkin.png",
                ]}
                menuWidth={10}
                label="Filter By Ai Assistant"
                options={["ChatGPT", "Claude", " Napkin", "Gemini"]}
                onSelect={handleChatbotSelect}
                isOpen={openFilter === "chatbot"}
                onToggle={() => handleToggle("chatbot")}
              />
              <div className="md:w-[60%] w-fit flex flex-col gap-3">
                <div className=" relative">
                  <input
                    type="text"
                    name="chatgpt"
                    placeholder="Ask me a question"
                    size={70}
                    className={
                      "block w-full rounded-[6px] border-0 h-auto py-3.5 pr-2 pl-4 text-[16px] bg-[#fff] text-[#66686B] shadow-sm ring-1 ring-inset ring-[#E9EAF0] focus:ring-[#8133F1] focus:ring-2 placeholder:text-[#B0B2B6] placeholder:text-[14px] outline-none"
                    }
                  />
                  <span>
                    <Image
                      src="/chatbot-icon.svg"
                      alt="stars icon"
                      className="text-[20px] absolute right-2 top-[.8rem]"
                      width={26}
                      height={26}
                    />
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-2xl w-full hover:bg-foundation-purple-purple-200 px-4 py-3 text-sm font-normal hover:text-white shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? "Submitting..." : "Ask Now"}
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              {/* key metrics */}
              <div className="flex flex-col gap-2 w-full px-2">
                <h2 className="text-xl font-normal text-[#434343]">
                  Key Metrics
                </h2>
                <CustomDropDown
                  textColor="#8133F1"
                  textSize={16}
                  zIndex={10}
                  menuWidth={10}
                  label="Select Location"
                  options={[
                    "location a",
                    "Location b",
                    " location c",
                    "location d",
                  ]}
                  onSelect={handleLocationSelect}
                  isOpen={openFilter === "location"}
                  onToggle={() => handleToggle("location")}
                />
              </div>

              {/* Total cash flow  */}
              <div className="overflow-x-auto no-scrollbar flex-1">
                <div className="flex justify-between md:gap-2 gap-6 mb-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-2xl shadow-custom bg-white w-56 h-auto p-3"
                    >
                      <div className="flex justify-between mb-3 w-full">
                        <Image
                          src="/cash-multiple.svg"
                          width={22}
                          height={22}
                          alt="icons"
                        />
                        <Link href={item.link}>
                          <Image
                            src="/open-in-new.svg"
                            width={22}
                            height={22}
                            alt="icons"
                          />
                        </Link>
                      </div>
                      <p className="text-sm text-foundation-black-black-400 mb-3">
                        {item.title}
                      </p>
                      <p className="text-xl text-foundation-grey-grey-800 font-medium">
                        {item.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent reports */}
              <div>
                <h2 className="text-xl font-normal text-[#434343] flex gap-1 items-center px-2">
                  Recent Reports
                  <Image
                    src="/sort-gray.svg"
                    className="w-4 h-4 object-contain"
                    width={18}
                    height={18}
                    alt="icons"
                  />
                </h2>
                <ReportCards items={data} />
                <p
                  className="text-base font-normal text-foundation-purple-purple-300 flex gap-1 items-center w-full text-center justify-center cursor-pointer hover:text-foundation-purple-purple-400"
                  onClick={() => handleTabChange("full-recent-report")}
                >
                  See All
                </p>
              </div>

              {/* Recent query */}
              <div>
                <h2 className="text-xl font-normal text-[#434343] flex gap-1 items-center px-2">
                  Recent Queries
                  <Image
                    src="/sort-gray.svg"
                    className="w-4 h-4 object-contain"
                    width={18}
                    height={18}
                    alt="icons"
                  />
                </h2>
                <QueryCard items={data} />
                <p
                  className="text-base font-normal text-foundation-purple-purple-300 flex gap-1 items-center w-full text-center justify-center cursor-pointer hover:text-foundation-purple-purple-400"
                  onClick={() => handleTabChange("full-query")}
                >
                  See All
                </p>
              </div>
            </div>
          </div>
        )}
        <div>
          {selectedTab === "full-recent-report" && (
            <FullRecentReport handleTabChange={handleTabChange} />
          )}
        </div>
        <div>
          {selectedTab === "full-query" && (
            <FullReportQuery handleTabChange={handleTabChange} />
          )}
        </div>
      </div>
    </>
  );
}

export default AdvancedReporting