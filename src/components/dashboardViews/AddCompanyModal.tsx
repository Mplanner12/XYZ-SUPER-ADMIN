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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg transition-transform transform-gpu scale-100 hover:scale-105">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary-normal">
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
              <div key={name}>
                <label className="block text-gray-700 text-sm font-medium">
                  {label}
                </label>
                <input
                  type={type}
                  {...register(name)}
                  className="mt-1 block w-full h-12 rounded-md border border-gray-300 shadow-sm focus:border-primary-normal focus:ring focus:ring-primary-normal focus:ring-opacity-50"
                />
                {errors[name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[name].message}
                  </p>
                )}
              </div>
            ))}

            <div>
              <label className="block text-gray-700 text-sm font-medium">
                Address
              </label>
              <textarea
                {...register("address")}
                className="mt-1 block w-full h-24 rounded-md border border-gray-300 shadow-sm focus:border-primary-normal focus:ring focus:ring-primary-normal focus:ring-opacity-50"
              />
              {errors.address && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary-normal text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
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
