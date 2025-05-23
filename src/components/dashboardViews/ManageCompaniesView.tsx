"use client";
import React, { useState } from "react";
import {
  LuBriefcase,
  LuBuilding2,
  LuMapPin,
  LuMail,
  LuPhone,
  LuInfo,
} from "react-icons/lu";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import AddCompanyModal from "./AddCompanyModal";
import { useGetCompanies, CompanyDetails } from "@/api/admin/getCompanies";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/api/utils/http";
import { Endpoints } from "@/api/utils/endpoints";
import { z } from "zod";
import { useDeleteCompany } from "@/api/admin/deleteCompany";
import EditCompanyModal from "./EditCompanyModal";
import DeleteConfirmationModal from "../reusable/DeleteConfirmationModal";
import EmptyState from "../reusable/EmptyState";

interface MainBusinessDetails {
  id: string;
  company_name: string;
}

const editCompanySchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  business_description: z.string().optional(),
  website: z
    .string()
    .url("Invalid URL format (e.g., example.com)")
    .optional()
    .or(z.literal("")),
  email_address: z.string().email("Invalid email address"),
  phone_number: z.string().min(1, "Phone number is required"),
  alternative_phone: z.string().optional(),
  fax_number: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  language: z.string().min(1, "Language is required"),
  facebook_handle: z.string().optional(),
  instagram_handle: z.string().optional(),
});

const ManageCompaniesView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const {
    data: mainBusiness,
    isLoading: isLoadingMainBusiness,
    error: mainBusinessError,
  } = useQuery<MainBusinessDetails, Error>({
    queryKey: ["business"],
    queryFn: async () => {
      const response = await axiosInstance.get(Endpoints.GET_BUSINESS);

      const businessData = response.data?.data || response.data;
      if (Array.isArray(businessData) && businessData.length > 0) {
        return businessData[0];
      } else if (
        businessData &&
        typeof businessData === "object" &&
        !Array.isArray(businessData)
      ) {
        return businessData;
      }
      throw new Error(
        "Main business not found or API response format is unexpected."
      );
    },
    staleTime: 5 * 60 * 1000,
  });

  const currentBusinessId = mainBusiness?.id || null;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<CompanyDetails | null>(
    null
  );

  if (isLoadingMainBusiness) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-foundation-black-black-500/40 to-foundation-black-black-400/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-foundation-grey-grey-700/30 p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-foundation-grey-grey-700/50">
            <div className="flex items-center mb-6 sm:mb-0">
              <div className="w-8 h-8 bg-foundation-grey-grey-700/50 rounded-lg animate-pulse mr-4"></div>
              <div className="w-48 h-8 bg-foundation-grey-grey-700/50 rounded-lg animate-pulse"></div>
            </div>
            <div className="w-40 h-12 bg-foundation-grey-grey-700/50 rounded-xl animate-pulse"></div>
          </div>
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-foundation-grey-grey-700/50 rounded-full animate-pulse mx-auto mb-4"></div>
            <div className="w-48 h-6 bg-foundation-grey-grey-700/50 rounded-lg animate-pulse mx-auto mb-2"></div>
            <div className="w-32 h-4 bg-foundation-grey-grey-700/50 rounded-lg animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (mainBusinessError) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-foundation-black-black-500/40 to-foundation-black-black-400/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-red-500/20 p-8">
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HiOutlineOfficeBuilding className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-3">
              Business Setup Required
            </h3>
            <p className="text-foundation-grey-grey-300 max-w-md mx-auto leading-relaxed">
              {mainBusinessError.message}. Please ensure a business is set up
              before managing companies.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!mainBusiness && !isLoadingMainBusiness) {
    return (
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-foundation-black-black-500/40 to-foundation-black-black-400/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-foundation-grey-grey-700/30 p-8">
          <EmptyState
            img={
              <HiOutlineOfficeBuilding className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
            }
            title="No Business Found"
            text="Please set up your main business first before you can manage companies."
          />
        </div>
      </div>
    );
  }

  const handleOpenEditModal = (company: CompanyDetails) => {
    setCompanyToEdit(company);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setCompanyToEdit(null);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-foundation-black-black-500/40 to-foundation-black-black-400/20 backdrop-blur-sm rounded-2xl shadow-2xl border border-foundation-grey-grey-700/30 p-8 md:p-10">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-foundation-grey-grey-700/50">
            <div className="flex items-center mb-6 sm:mb-0">
              <div className="w-12 h-12 bg-gradient-to-br from-foundation-purple-purple-400 to-foundation-purple-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                <LuBriefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foundation-white-white-400 mb-1">
                  Manage Companies
                </h1>
                <p className="text-foundation-grey-grey-400 text-sm">
                  Organize and manage your business companies
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="group px-6 py-3 bg-gradient-to-r from-foundation-purple-purple-400 to-foundation-purple-purple-500 text-white font-semibold rounded-xl hover:from-foundation-purple-purple-300 hover:to-foundation-purple-purple-400 transition-all duration-300 flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <CiCirclePlus className="mr-2 w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              Add New Company
            </button>
          </div>

          {/* Companies List */}
          <CompanyList
            businessId={currentBusinessId}
            onEditCompany={handleOpenEditModal}
          />
        </div>
      </div>

      {/* Modals */}
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        businessId={currentBusinessId}
      />
      {companyToEdit && (
        <EditCompanyModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          companyData={companyToEdit}
          businessId={currentBusinessId}
        />
      )}
      {/* The DeleteConfirmationModal will now be instantiated within each CompanyCard */}
      {/* This simplifies state management for which company is being targeted for deletion. */}
    </>
  );
};

interface CompanyListProps {
  businessId: string | null;
  onEditCompany: (company: CompanyDetails) => void;
}

const CompanyList: React.FC<CompanyListProps> = ({
  businessId,
  onEditCompany,
}) => {
  const { data: companies, isLoading, error } = useGetCompanies(businessId);

  if (!businessId) {
    return (
      <EmptyState
        img={
          <HiOutlineOfficeBuilding className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
        }
        title="Business Setup Required"
        text="Please set up or select a main business to view and manage its associated companies."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-foundation-black-black-400/30 backdrop-blur-sm rounded-xl p-6 border border-foundation-grey-grey-700/30"
            >
              <div className="animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-foundation-grey-grey-700/50 rounded-lg mr-3"></div>
                  <div className="flex-1">
                    <div className="w-3/4 h-5 bg-foundation-grey-grey-700/50 rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-foundation-grey-grey-700/50 rounded"></div>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="w-full h-3 bg-foundation-grey-grey-700/50 rounded"></div>
                  <div className="w-2/3 h-3 bg-foundation-grey-grey-700/50 rounded"></div>
                </div>
                <div className="flex justify-end space-x-2">
                  <div className="w-8 h-8 bg-foundation-grey-grey-700/50 rounded-lg"></div>
                  <div className="w-8 h-8 bg-foundation-grey-grey-700/50 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiOutlineOfficeBuilding className="w-8 h-8 text-red-400" />
        </div>
        <h3 className="text-xl font-semibold text-red-400 mb-3">
          Failed to Load Companies
        </h3>
        <p className="text-foundation-grey-grey-400 max-w-md mx-auto">
          request failed or no companies found
        </p>
      </div>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <EmptyState
        img={
          <LuBuilding2 className="w-16 h-16 text-foundation-grey-grey-600 mx-auto" />
        }
        title="No Companies Yet"
        text="Start by adding your first company to organize your business operations effectively."
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-foundation-grey-grey-400 text-sm">
          {companies.length} {companies.length === 1 ? "company" : "companies"}{" "}
          found
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            onEdit={onEditCompany}
            businessId={businessId}
          />
        ))}
      </div>
    </div>
  );
};

interface CompanyCardProps {
  company: CompanyDetails;
  onEdit: (company: CompanyDetails) => void;
  businessId: string | null;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  company,
  onEdit,
  businessId,
}) => {
  const { mutate: deleteCompanyMutate, isPending: isDeleting } =
    useDeleteCompany();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleConfirmDelete = () => {
    if (businessId) {
      deleteCompanyMutate({ companyId: company.id, businessId });
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="group bg-foundation-black-black-400/30 backdrop-blur-sm rounded-xl p-6 border border-foundation-grey-grey-700/30 hover:border-foundation-purple-purple-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-foundation-purple-purple-400/10 transform hover:-translate-y-1">
      {/* Company Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center flex-1 min-w-0">
          <div className="w-10 h-10 bg-gradient-to-br from-foundation-purple-purple-400/20 to-foundation-purple-purple-500/20 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
            <LuBuilding2 className="w-5 h-5 text-foundation-purple-purple-400" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-foundation-white-white-400 truncate group-hover:text-foundation-purple-purple-300 transition-colors">
              {company.name}
            </h3>
            <p className="text-xs text-foundation-grey-grey-500 uppercase tracking-wide">
              Company
            </p>
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="space-y-3 mb-6">
        {company.description && (
          <div className="flex items-start">
            <div className="text-foundation-grey-grey-500 mr-2 mt-0.5 flex-shrink-0">
              <LuInfo className="w-4 h-4" />
            </div>
            <p className="text-sm text-foundation-grey-grey-300 line-clamp-2 leading-relaxed">
              {company.description}
            </p>
          </div>
        )}

        {company.address && (
          <div className="flex items-start">
            <div className="text-foundation-grey-grey-500 mr-2 mt-0.5 flex-shrink-0">
              <LuMapPin className="w-4 h-4" />
            </div>
            <p className="text-sm text-foundation-grey-grey-400 line-clamp-1">
              {company.address}
            </p>
          </div>
        )}

        {company.email && (
          <div className="flex items-center">
            <div className="text-foundation-grey-grey-500 mr-2 flex-shrink-0">
              <LuMail className="w-4 h-4" />
            </div>
            <p className="text-sm text-foundation-grey-grey-400 truncate">
              {company.email}
            </p>
          </div>
        )}

        {company.phone && (
          <div className="flex items-center">
            <div className="text-foundation-grey-grey-500 mr-2 flex-shrink-0">
              <LuPhone className="w-4 h-4" />
            </div>
            <p className="text-sm text-foundation-grey-grey-400">
              {company.phone}
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end space-x-2 pt-4 border-t border-foundation-grey-grey-700/30">
        <button
          onClick={() => onEdit(company)}
          className="group/btn p-2.5 text-foundation-purple-purple-400 hover:text-foundation-purple-purple-300 hover:bg-foundation-purple-purple-400/10 rounded-lg transition-all duration-200 transform hover:scale-105"
          aria-label={`Edit ${company.name}`}
        >
          <FiEdit className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
        </button>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          disabled={isDeleting}
          className="group/btn p-2.5 text-foundation-grey-grey-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          aria-label={`Delete ${company.name}`}
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-foundation-grey-grey-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <FiTrash2 className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-200" />
          )}
        </button>
      </div>

      {/* Delete Confirmation Modal specific to this card */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={company.name}
      />
    </div>
  );
};

export default ManageCompaniesView;
