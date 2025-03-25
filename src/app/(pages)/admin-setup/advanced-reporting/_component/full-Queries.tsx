import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import Image from "next/image";
import ReportCards from "./ReportCards";
import { FiSearch } from "react-icons/fi";
import { FaChevronLeft } from "react-icons/fa6";
import QueryCard from "./QueryCard";

interface FullReportQueryProps {
  handleTabChange: (tab: string) => void;
}

const data = [
  { title: "Cash Inflows Report", date: "2024-10-01", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Income Statement Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Financial Position Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Cash Inflows Report", date: "2024-10-01", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Income Statement Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Financial Position Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Cash Inflows Report", date: "2024-10-01", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Income Statement Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Financial Position Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Financial Position Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Cash Inflows Report", date: "2024-10-01", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Income Statement Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
  { title: "Financial Position Report", date: "2024-10-15", link: "/admin-setup/advanced-reporting/report?tab=income-statement" },
];

const FullReportQuery: React.FC<FullReportQueryProps> = ({
  handleTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState("recent-report");

  return (
    <div>
      <div className="flex gap-2 item-center align-middle cursor-pointer hover:text-foundation-purple-purple-400">
        <FaChevronLeft size={18} color="" className="mt-1.5 text-foundation-purple-purple-400" />
        <h2
          className="text-xl font-normal text-[] flex gap-1 items-center"
          onClick={() => handleTabChange("recent-report")}
        >
          Recent Reports
          <Image
            src="/sort-gray.svg"
            className="w-4 h-4 object-contain"
            width={18}
            height={18}
            alt="icons"
          />
        </h2>
      </div>
      <div className="flex md:w-[40%] w-full py-2">
        <div className="w-fit relative ">
          <input
            type="text"
            name="search"
            placeholder="Search for a user"
            size={70}
            className={
              "block w-full rounded-[4px] border-0 h-auto py-3 pr-2 pl-9 text-[16px] bg-[] text-[] shadow-sm ring-1 ring-inset ring-[] focus:ring-[] focus:ring-2 placeholder:text-[] placeholder:text-[14px] outline-none"
            }
          />
          <span>
            <FiSearch className="text-[22px] absolute left-2 top-[.7rem] text-foundation-purple-purple-400" />
          </span>
        </div>
      </div>
      <QueryCard items={data} />
    </div>
  );
};

export default FullReportQuery;
