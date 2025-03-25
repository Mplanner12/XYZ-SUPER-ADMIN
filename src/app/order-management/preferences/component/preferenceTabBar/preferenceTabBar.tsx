"use client";
import React from "react";

interface PreferenceTabBarProps {
  activeTab: string;
  onTabChange: (tabName: string) => void;
}

const PreferenceTabBar: React.FC<PreferenceTabBarProps> = ({ activeTab, onTabChange }) => {
  const tabs: string[] = [
    "Notifications",
    "Account",
    "Language & Localization",
    "Report & Charts",
    "Security Settings",
    "Appearance",
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

export default PreferenceTabBar;