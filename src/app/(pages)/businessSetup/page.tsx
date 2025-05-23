"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import NavButton from "@/components/_landingpgComponents/navButton";
import { useCreateBusiness } from "@/api/admin/business-setup";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const businessSchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  business_description: z.string().optional(),
  website: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val || val.trim() === "") return true;
        const pattern =
          /^(?:(?:https?|ftp):\/\/)?(?:www\.)?([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}(?:\/[^\s]*)?$/;
        return pattern.test(val);
      },
      {
        message:
          "Invalid URL format (e.g., example.com or https://example.com/path)",
      }
    ),
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

type BusinessData = z.infer<typeof businessSchema>;

const formSteps = [
  ["company_name", "business_description", "website"],
  ["email_address", "phone_number", "alternative_phone", "fax_number"],
  ["address", "country"],
  ["language", "facebook_handle", "instagram_handle"],
];

const fieldLabels: Record<keyof BusinessData, string> = {
  company_name: "Company Name",
  business_description: "Business Description",
  website: "Website",
  email_address: "Email Address",
  phone_number: "Phone Number",
  alternative_phone: "Alternative Phone",
  fax_number: "Fax Number",
  address: "Address",
  country: "Country",
  language: "Language",
  facebook_handle: "Facebook Handle",
  instagram_handle: "Instagram Handle",
};

const countriesList = [
  { value: "", label: "Select Country..." },
  { value: "USA", label: "United States" },
  { value: "CAN", label: "Canada" },
  { value: "GBR", label: "United Kingdom" },
  { value: "DEU", label: "Germany" },
  { value: "FRA", label: "France" },
  { value: "NGA", label: "Nigeria" },
];

const languagesList = [
  { value: "", label: "Select Language..." },
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

const BusinessRegistrationForm: React.FC = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateBusiness();
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<BusinessData>({
    resolver: zodResolver(businessSchema),
  });

  const onSubmit: SubmitHandler<BusinessData> = (data) => {
    mutate(
      {
        ...data,
        business_description: data.business_description || "",
        website: data.website || "",
        alternative_phone: data.alternative_phone || "",
        fax_number: data.fax_number || "",
        facebook_handle: data.facebook_handle || "",
        instagram_handle: data.instagram_handle || "",
      },
      {
        onSuccess: async (response) => {
          toast.success(
            response.message || "Business registered successfully!"
          );
          reset();
          setStep(0);

          toast.info("Fetching created business details...");

          try {
            await queryClient.invalidateQueries({ queryKey: ["business"] });

            toast.success(
              "Main business details will refresh on the dashboard."
            );
            router.push("/dashboard");
          } catch (fetchError) {
            console.error(
              "Error invalidating/refetching business details:",
              fetchError
            );
            toast.error("Could not refresh business details automatically.");
          }
        },
        onError: (error) => {
          toast.error(
            error.message || "Failed to register business. Please try again."
          );
        },
      }
    );
  };

  const onFormInvalid: SubmitErrorHandler<BusinessData> = (
    validationErrors
  ) => {
    formSteps.flat().forEach((fieldName) => {
      const field = fieldName as keyof BusinessData;
      const errorMessage = validationErrors[field]?.message;
      if (errorMessage) {
        toast.error(`${fieldLabels[field]}: ${errorMessage}`);
      }
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-10">
        <h2 className="text-white text-3xl font-semibold mb-8 text-center font-sans">
          Business Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit, onFormInvalid)} noValidate>
          {" "}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {formSteps[step].map((fieldKey) => {
                const field = fieldKey as keyof BusinessData;
                return (
                  <label key={field} className="block mb-5">
                    <span className="block text-sm text-white mb-1">
                      {fieldLabels[field]}
                    </span>
                    {field === "country" ? (
                      <select
                        {...register(field)}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                      >
                        {countriesList.map((country) => (
                          <option
                            key={country.value || `select-country-${field}`} // Ensure unique key for empty value
                            value={country.value}
                            className="text-black bg-white" // Style for dropdown options
                          >
                            {country.label}
                          </option>
                        ))}
                      </select>
                    ) : field === "language" ? (
                      <select
                        {...register(field)}
                        className="w-full px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none"
                      >
                        {languagesList.map((language) => (
                          <option
                            key={language.value || `select-language-${field}`} // Ensure unique key
                            value={language.value}
                            className="text-black bg-white" // Style for dropdown options
                          >
                            {language.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          field === "email_address"
                            ? "email"
                            : field === "phone_number" ||
                              field === "alternative_phone" ||
                              field === "fax_number"
                            ? "tel"
                            : field === "website"
                            ? "url"
                            : "text"
                        }
                        {...register(field)}
                        className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    )}
                    {errors[field] && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors[field]?.message}
                      </p>
                    )}
                  </label>
                );
              })}
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-between mt-8">
            {step > 0 && (
              <NavButton
                styles="bg-gray-600 text-white hover:bg-gray-700"
                onClick={() => setStep(step - 1)}
              >
                Back
              </NavButton>
            )}
            <NavButton
              styles={`bg-purple-500 text-white hover:bg-purple-600 ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={async () => {
                if (step < formSteps.length - 1) {
                  const fieldsToValidate = formSteps[step] as Array<
                    keyof BusinessData
                  >;
                  const isValid = await trigger(fieldsToValidate);
                  if (isValid) {
                    setStep(step + 1);
                  }
                } else {
                  handleSubmit(onSubmit, onFormInvalid)();
                }
              }}
              disabled={isPending}
            >
              {isPending
                ? "Submitting..."
                : step < formSteps.length - 1
                ? "Next"
                : "Submit"}
            </NavButton>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BusinessRegistrationForm;
