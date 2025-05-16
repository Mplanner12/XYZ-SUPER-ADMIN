"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { BusinessDetails } from "@/api/admin/getBusiness";
import {
  useUpdateBusiness,
  UpdateBusinessPayload,
} from "@/api/admin/updateBusiness";
import SkeletonCard from "../reusable/SkeletonCard";
import {
  LuSave,
  LuInfo,
  LuGlobe,
  LuPhone,
  LuFacebook,
  LuInstagram,
  LuTrash2,
} from "react-icons/lu";
import { useDeleteBusiness } from "@/api/admin/deleteBusiness";
import ConfirmationModal from "../reusable/ConfirmationModal";

// Schema for validating settings form data
const settingsSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  business_description: z.string().optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
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

type SettingsFormData = z.infer<typeof settingsSchema>;

interface SettingsViewProps {
  activeCompanyId?: string | null;
  mainBusiness: BusinessDetails | null | undefined;
  isLoadingMainBusiness: boolean;
}

const SettingsView: React.FC<SettingsViewProps> = ({
  mainBusiness,
  isLoadingMainBusiness,
}) => {
  const { mutate: updateBusiness, isPending: isUpdating } = useUpdateBusiness(
    mainBusiness?.id || ""
  );

  const { mutate: deleteBusiness, isPending: isDeleting } = useDeleteBusiness(
    mainBusiness?.id || ""
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (mainBusiness) {
      reset({
        company_name: mainBusiness.company_name || "",
        business_description: mainBusiness.business_description || "",
        website: mainBusiness.website || "",
        email_address: mainBusiness.email_address || "",
        phone_number: mainBusiness.phone_number || "",
        alternative_phone: mainBusiness.alternative_phone || "",
        fax_number: mainBusiness.fax_number || "",
        address: mainBusiness.address || "",
        country: mainBusiness.country || "",
        language: mainBusiness.language || "",
        facebook_handle: mainBusiness.facebook_handle || "",
        instagram_handle: mainBusiness.instagram_handle || "",
      });
    }
  }, [mainBusiness, reset]);

  const onSubmit: SubmitHandler<SettingsFormData> = (data) => {
    if (!mainBusiness) {
      toast.error("No business selected to update.");
      return;
    }
    const payload: UpdateBusinessPayload = {
      ...data,
      // Ensure optional fields that are empty strings are handled if backend expects null/undefined
      website: data.website || undefined,
      business_description: data.business_description || undefined,
      alternative_phone: data.alternative_phone || undefined,
      fax_number: data.fax_number || undefined,
      facebook_handle: data.facebook_handle || undefined,
      instagram_handle: data.instagram_handle || undefined,
    };
    updateBusiness(payload, {
      onSuccess: (response) => {
        toast.success(
          response.message || "Business details updated successfully!"
        );
        reset(response.data);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update business details.");
      },
    });
  };

  const handleDelete = () => {
    if (!mainBusiness) {
      toast.error("No business selected to delete.");
      return;
    }
    setModalOpen(true);
  };

  const confirmDelete = () => {
    deleteBusiness(undefined, {
      onSuccess: (response) => {
        toast.success(response.message || "Business deleted successfully!");
        setModalOpen(false);
        setTimeout(() => {
          window.location.href = "/businessSetup";
        }, 1200);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete business.");
      },
    });
  };

  if (isLoadingMainBusiness) {
    return <SkeletonCard />;
  }

  if (!mainBusiness) {
    return (
      <div className="p-6 text-center text-foundation-grey-grey-400">
        No business information available to configure. Please register a
        business first.
      </div>
    );
  }

  const renderField = (
    name: keyof SettingsFormData,
    label: string,
    type: string = "text",
    icon?: React.ReactNode
  ) => (
    <div className="mb-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-foundation-grey-grey-300 mb-1 flex items-center"
      >
        {icon && <span className="mr-2 opacity-70">{icon}</span>}
        {label}
      </label>
      <input
        id={name}
        type={type}
        {...register(name)}
        className="w-full px-4 py-2.5 rounded-lg border border-foundation-grey-grey-700 bg-foundation-black-black-400 text-foundation-white-white-200 placeholder-foundation-grey-grey-500 focus:outline-none focus:ring-2 focus:ring-foundation-purple-purple-500 focus:border-foundation-purple-purple-500 transition-colors"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      {errors[name] && (
        <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>
      )}
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-foundation-black-black-500/30 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold text-foundation-purple-purple-400 mb-8 border-b border-foundation-grey-grey-700 pb-4">
        Business Settings
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section>
          <h3 className="text-xl font-semibold text-foundation-white-white-300 mb-4 flex items-center">
            <LuInfo className="mr-2" />
            Basic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("company_name", "Company Name")}
            {renderField("email_address", "Email Address", "email")}
          </div>
          {renderField(
            "business_description",
            "Business Description (Optional)"
          )}
          {renderField("address", "Full Address")}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("country", "Country")}
            {renderField("language", "Primary Language")}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-foundation-white-white-300 mb-4 flex items-center">
            <LuPhone className="mr-2" />
            Contact Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("phone_number", "Main Phone Number")}
            {renderField("alternative_phone", "Alternative Phone (Optional)")}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField(
              "website",
              "Website URL (Optional)",
              "url",
              <LuGlobe />
            )}
            {renderField("fax_number", "Fax Number (Optional)")}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-foundation-white-white-300 mb-4 flex items-center">
            <LuFacebook className="mr-2" />
            Social Media (Optional)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField(
              "facebook_handle",
              "Facebook Handle",
              "text",
              <LuFacebook />
            )}
            {renderField(
              "instagram_handle",
              "Instagram Handle",
              "text",
              <LuInstagram />
            )}
          </div>
        </section>

        <div className="pt-6 border-t border-foundation-grey-grey-700 flex justify-between">
          <button
            className="px-8 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
            type="button"
            onClick={handleDelete}
          >
            <LuTrash2 className="mr-2" />
            Delete Business
          </button>

          <button
            type="submit"
            disabled={isUpdating || !isDirty}
            className="px-8 py-3 bg-foundation-purple-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-foundation-purple-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center"
          >
            <LuSave className="mr-2" />
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
};
export default SettingsView;
