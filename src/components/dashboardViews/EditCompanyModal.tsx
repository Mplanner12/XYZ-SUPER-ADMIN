import { CompanyDetails } from "@/api/admin/getCompanies";
import { z } from "zod";
import { editCompanySchema } from "@/schemas/editCompanySchema";
import { useQueryClient } from "@tanstack/react-query";
import {
  UpdateCompanyPayload,
  useUpdateCompany,
} from "@/api/admin/updateCompany";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type EditCompanyFormData = z.infer<typeof editCompanySchema>;

interface EditCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyData: CompanyDetails | null;
  businessId: string | null;
}

// Re-define or import these lists. Ideally, they are shared constants.
const countriesList = [
  { value: "", label: "Select Country..." },
  { value: "USA", label: "United States" },
  { value: "CAN", label: "Canada" },
  { value: "GBR", label: "United Kingdom" },
  { value: "DEU", label: "Germany" },
  { value: "FRA", label: "France" },
  { value: "NGA", label: "Nigeria" },
  { value: "BGD", label: "Bangladesh" },
];

const languagesList = [
  { value: "", label: "Select Language..." },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  isOpen,
  onClose,
  companyData,
  businessId,
}) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateCompanyMutate,
    isPending: isUpdating,
  } = useUpdateCompany(); // Changed isLoading to isPending

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCompanyFormData>({
    resolver: zodResolver(editCompanySchema),
  });

  useEffect(() => {
    if (companyData) {
      reset({
        company_name: companyData.name || "",
        business_description: companyData.description || "",
        address: companyData.address || "",

        website: (companyData as any).website || "",
        email_address: (companyData as any).email_address || "",
        phone_number: (companyData as any).phone_number || "",
        alternative_phone: (companyData as any).alternative_phone || "",
        fax_number: (companyData as any).fax_number || "",
        country: (companyData as any).country || "",
        language: (companyData as any).language || "",
        facebook_handle: (companyData as any).facebook_handle || "",
        instagram_handle: (companyData as any).instagram_handle || "",
      });
    }
  }, [companyData, reset]);

  const onSubmit: SubmitHandler<EditCompanyFormData> = (data) => {
    if (!companyData) return;

    const payload: UpdateCompanyPayload = {
      ...data,

      business_description: data.business_description || undefined,
      website: data.website || undefined,
      alternative_phone: data.alternative_phone || undefined,
      fax_number: data.fax_number || undefined,
      facebook_handle: data.facebook_handle || undefined,
      instagram_handle: data.instagram_handle || undefined,
    };

    updateCompanyMutate(
      { companyId: companyData.id, payload, businessId },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  if (!isOpen || !companyData) return null;

  const formFields: Array<keyof EditCompanyFormData> = [
    "company_name",
    "email_address",
    "phone_number",
    "address",
    "country",
    "language",
    "business_description",
    "website",
    "alternative_phone",
    "fax_number",
    "facebook_handle",
    "instagram_handle",
  ];

  const fieldLabels: Record<keyof EditCompanyFormData, string> = {
    company_name: "Company Name",
    email_address: "Email Address",
    phone_number: "Phone Number",
    address: "Address",
    country: "Country",
    language: "Language",
    business_description: "Business Description",
    website: "Website",
    alternative_phone: "Alternative Phone",
    fax_number: "Fax Number",
    facebook_handle: "Facebook Handle",
    instagram_handle: "Instagram Handle",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-7 text-center text-white">
          Edit Company: {companyData.name}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          {/* Example for one field - you would map all fields */}
          {formFields.map((field) => (
            <div key={field}>
              <label className="block text-sm text-white mb-1">
                {fieldLabels[field]}
              </label>
              {field === "country" ? (
                <select
                  {...register(field)}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  {countriesList.map((c) => (
                    <option
                      key={c.value}
                      value={c.value}
                      className="text-black bg-white"
                    >
                      {c.label}
                    </option>
                  ))}
                </select>
              ) : field === "language" ? (
                <select
                  {...register(field)}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                >
                  {languagesList.map((l) => (
                    <option
                      key={l.value}
                      value={l.value}
                      className="text-black bg-white"
                    >
                      {l.label}
                    </option>
                  ))}
                </select>
              ) : field === "business_description" ? (
                <textarea
                  {...register(field)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              ) : (
                <input
                  type={
                    field === "email_address"
                      ? "email"
                      : field === "website"
                      ? "url"
                      : field.includes("phone") || field.includes("fax")
                      ? "tel"
                      : "text"
                  }
                  {...register(field)}
                  className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              )}
              {errors[field] && (
                <p className="text-red-400 text-xs mt-1.5">
                  {errors[field]?.message}
                </p>
              )}
            </div>
          ))}

          <div className="flex justify-end mt-8 pt-5 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="mr-3 px-5 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="px-5 py-2.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-60"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyModal;
