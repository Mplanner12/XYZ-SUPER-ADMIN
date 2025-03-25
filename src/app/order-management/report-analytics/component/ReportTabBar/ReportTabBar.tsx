"use client";
import React from "react";

interface ReportTabBarProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const ReportTabBar: React.FC<ReportTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: string[] = [
    "Sales Summary",
    "Inventory Turnover",
    "Customer Trends Report",
    "Sales Rep Performance",
    "Sales Performance by Locations"
  ];

  return (
    <div className="bg-[#8133F1]  p-2 w-full h-auto gap-2 flex-wrap text-nowrap flex justify-around items-center rounded-xl ">
      {tabs.map((tabName) => (
        <button
          key={tabName}
          onClick={() => onTabChange(tabName)}
          className={`px-4 py-3 rounded-lg text-xs md:text-sm text-left font-medium transition-colors ${
            activeTab === tabName
              ? "bg-white text-purple-600"
              : "text-white hover:bg-purple-500"
          }`}
        >
          {tabName}
        </button>
      ))}
    </div>
  );
};

export default ReportTabBar;