"use client";
import React from "react";
import { BusinessDetails } from "@/api/admin/getBusiness";
import SkeletonCard from "../reusable/SkeletonCard";
import { LuBuilding, LuInfo, LuMail, LuPhone, LuGlobe } from "react-icons/lu";

interface CompaniesViewProps {
  activeCompanyDetails: BusinessDetails | null | undefined;
  isLoading: boolean;
  error: any; // Consider using a more specific error type if available
}

const CompaniesView: React.FC<CompaniesViewProps> = ({
  activeCompanyDetails,
  isLoading,
  error,
}) => {
  if (isLoading) {
    return <SkeletonCard />;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-400">
        Error loading company details: {error.message || "Unknown error"}
      </div>
    );
  }

  if (!activeCompanyDetails) {
    return (
      <div className="p-6 text-center text-foundation-grey-grey-400">
        No company details available to display.
      </div>
    );
  }

  const {
    company_name,
    email_address,
    phone_number,
    address,
    website,
    business_description,
  } = activeCompanyDetails;

  const DetailItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    value?: string | null;
  }> = ({ icon, label, value }) =>
    value ? (
      <div className="flex items-start mb-3">
        <span className="text-foundation-purple-purple-400 mr-3 mt-1">
          {icon}
        </span>
        <div>
          <p className="text-sm text-foundation-grey-grey-300">{label}</p>
          <p className="text-foundation-white-white-200">{value}</p>
        </div>
      </div>
    ) : null;

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-foundation-black-black-500/30 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-foundation-purple-purple-400 mb-8 border-b border-foundation-grey-grey-700 pb-4 flex items-center">
        <LuBuilding className="mr-3" />
        Business Details
      </h2>

      <section className="space-y-4">
        <h3 className="text-2xl font-semibold text-foundation-white-white-300 mb-1">
          {company_name}
        </h3>
        {business_description && (
          <p className="text-foundation-grey-grey-200 mb-6">
            {business_description}
          </p>
        )}

        <DetailItem
          icon={<LuMail size={20} />}
          label="Email Address"
          value={email_address}
        />
        <DetailItem
          icon={<LuPhone size={20} />}
          label="Phone Number"
          value={phone_number}
        />
        <DetailItem
          icon={<LuInfo size={20} />}
          label="Address"
          value={address}
        />
        {website && (
          <DetailItem
            icon={<LuGlobe size={20} />}
            label="Website"
            value={website}
          />
        )}
        {/* Add more details as needed */}
      </section>
      {/* Future: If this view is for managing multiple companies, a list/table would go here */}
    </div>
  );
};

export default CompaniesView;
