"use client";
import React from "react";
import { BusinessDetails } from "@/api/admin/getBusiness"; // Assuming this type is available
import SkeletonCard from "../reusable/SkeletonCard";
import { LuLayoutDashboard, LuActivity } from "react-icons/lu";
import { IoBarChartSharp } from "react-icons/io5";

interface OverviewViewProps {
  activeCompany: BusinessDetails | null | undefined;
  isLoadingCompany: boolean;
  mainBusinessName?: string | null;
}

const OverviewView: React.FC<OverviewViewProps> = ({
  activeCompany,
  isLoadingCompany,
  mainBusinessName,
}) => {
  if (isLoadingCompany) {
    return <SkeletonCard />;
  }

  const welcomeMessage = mainBusinessName
    ? `Welcome to ${mainBusinessName}'s Dashboard`
    : "Welcome to Your Dashboard";

  return (
    <div className="p-4 md:p-8 max-w-full mx-auto bg-foundation-black-black-500/30 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-foundation-purple-purple-400 mb-8 border-b border-foundation-grey-grey-700 pb-4 flex items-center">
        <LuLayoutDashboard className="mr-3" />
        Dashboard Overview
      </h2>

      <div className="mb-8 p-6 bg-foundation-black-black-400/50 rounded-lg">
        <h3 className="text-2xl font-semibold text-foundation-white-white-300">
          {welcomeMessage}
        </h3>
        {activeCompany && (
          <p className="text-foundation-grey-grey-300 mt-2">
            Here&apos;s a quick look at your business activity.
          </p>
        )}
      </div>

      {activeCompany ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Stat Card 1 */}
          <div className="p-6 bg-foundation-black-black-400/70 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-foundation-purple-purple-300 mb-2 flex items-center">
              <IoBarChartSharp className="mr-2" />
              Key Metric 1
            </h4>
            <p className="text-3xl font-bold text-foundation-white-white-200">
              1,234
            </p>
            <p className="text-sm text-foundation-grey-grey-400">
              Description of metric
            </p>
          </div>
          {/* Example Stat Card 2 */}
          <div className="p-6 bg-foundation-black-black-400/70 rounded-lg shadow">
            <h4 className="text-lg font-semibold text-foundation-purple-purple-300 mb-2 flex items-center">
              <LuActivity className="mr-2" />
              Recent Activity
            </h4>
            <p className="text-3xl font-bold text-foundation-white-white-200">
              78
            </p>
            <p className="text-sm text-foundation-grey-grey-400">
              New updates this week
            </p>
          </div>
          {/* Add more stat cards or content sections as needed */}
        </div>
      ) : (
        <p className="text-center text-foundation-grey-grey-400 py-10">
          No company data available to display overview.
        </p>
      )}
    </div>
  );
};

export default OverviewView;
