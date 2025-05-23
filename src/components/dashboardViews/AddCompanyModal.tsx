"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import {
  useCreateCompany,
  CreateCompanyPayload,
} from "@/api/admin/createCompany";

// Define the schema for company data
const companySchema = z.object({
  name: z.string().min(1, "Company name is required"),
  email: z.string().email("Invalid email address"),
  tax_number: z.string().min(1, "Tax number is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  base_currency: z.string().min(1, "Base currency is required"),
  address: z.string().min(1, "Address is required"),
});

// Type CompanyData is essentially the same as CreateCompanyPayload
type CompanyFormData = z.infer<typeof companySchema>;

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessId: string | null; // For query invalidation
}

const AddCompanyModal: React.FC<AddCompanyModalProps> = ({
  isOpen,
  onClose,
  businessId,
}) => {
  const queryClient = useQueryClient();

  const { mutate: createCompanyMutate, isPending: isLoading } =
    useCreateCompany({
      onSuccess: (response) => {
        toast.success(response.message || "Company created successfully!");
        reset();
        onClose();
        // Invalidate and refetch companies list, using businessId if available
        if (businessId) {
          queryClient.invalidateQueries({
            queryKey: ["companies", businessId],
          });
        } else {
          queryClient.invalidateQueries({ queryKey: ["companies"] });
        }
      },
      onError: (error) => {
        toast.error(
          error.message || "Failed to create company. Please try again."
        );
      },
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
  });

  const onSubmit: SubmitHandler<CompanyFormData> = (data) => {
    createCompanyMutate(data as CreateCompanyPayload);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-7 text-center text-white">
          Add New Company
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-5">
            {[
              { label: "Company Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Tax Number", name: "tax_number", type: "text" },
              {
                label: "Registration Number",
                name: "registration_number",
                type: "text",
              },
              { label: "Base Currency", name: "base_currency", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name} className="mb-5">
                <label className="block text-sm text-white mb-1">{label}</label>
                <input
                  type={type}
                  {...register(name as keyof CompanyFormData)}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400" // Matched businessSetup input style
                />
                {errors[name as keyof CompanyFormData] && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors[name as keyof CompanyFormData]?.message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm text-white mb-1">
                {" "}
                {/* Matched label style */}
                Address
              </label>
              <textarea
                {...register("address")}
                className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400 h-24" // Matched businessSetup textarea style
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1.5">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-3 px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-60"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-60" // Matched businessSetup primary button
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
