"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
  website: z.string().url("Invalid URL").optional(),
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

const BusinessRegistrationForm: React.FC = () => {
  const router = useRouter();
  const { mutate, isPending } = useCreateBusiness();
  const [step, setStep] = useState(0);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Get reset function from useForm
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
          // Make onSuccess async
          toast.success(
            response.message || "Business registered successfully!"
          );
          reset(); // Reset form fields
          setStep(0); // Go back to the first step

          toast.info("Fetching created business details...");
          // After creating a new main Business, invalidate the query that fetches it.
          try {
            await queryClient.invalidateQueries({ queryKey: ["business"] });
            // Optionally, refetch immediately if you want to ensure data is fresh for next navigation
            // await queryClient.refetchQueries({ queryKey: ["business"] });
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

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 to-purple-700 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-3xl bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-2xl p-10">
        <h2 className="text-white text-3xl font-semibold mb-8 text-center font-sans">
          Business Registration
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {formSteps[step].map((field) => (
                <label key={field} className="block mb-5">
                  <span className="block text-sm text-white mb-1">
                    {fieldLabels[field as keyof BusinessData]}
                  </span>
                  <input
                    type={field.includes("email") ? "email" : "text"}
                    {...register(field as keyof BusinessData)}
                    className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                  {errors[field as keyof BusinessData] && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors[field as keyof BusinessData]?.message}
                    </p>
                  )}
                </label>
              ))}
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
              styles="bg-purple-500 text-white hover:bg-purple-600"
              onClick={() => {
                if (step < formSteps.length - 1) {
                  setStep(step + 1);
                } else {
                  handleSubmit(onSubmit)(); // Trigger form submission on the last step
                }
              }}
              disabled={isPending} // Disable button during submission
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
