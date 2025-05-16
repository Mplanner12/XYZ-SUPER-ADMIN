"use client";
import React from "react";
import { LuBriefcase } from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import AddCompanyModal from "./AddCompanyModal";

const ManageCompaniesView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      <div className="p-4 md:p-8 max-w-full mx-auto bg-foundation-black-black-500/30 rounded-xl shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-4 border-b border-foundation-grey-grey-700">
          <h2 className="text-3xl font-bold text-foundation-purple-purple-400 flex items-center mb-4 sm:mb-0">
            <LuBriefcase className="mr-3" />
            Manage Companies
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-foundation-green-green-500 text-white font-semibold rounded-lg hover:bg-foundation-green-green-600 transition-colors flex items-center"
          >
            <CiCirclePlus className="mr-2" /> Add New Company
          </button>
        </div>
        <p className="text-foundation-grey-grey-300">
          A list of companies will be displayed here. You can add new companies
          using the button above.
        </p>
        {/* Placeholder for where you might list companies */}
      </div>
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ManageCompaniesView;
