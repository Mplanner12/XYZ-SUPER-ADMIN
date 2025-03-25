"use client";
import React from "react";

interface ManagementTabBarProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const ManagementTabBar: React.FC<ManagementTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: string[] = [
    "Order Creation",
    "Order Approval",
    "Order Confirmation",
    "Invoice Generation",
    "Order Fulfillment",
    "Payments",
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

export default ManagementTabBar;