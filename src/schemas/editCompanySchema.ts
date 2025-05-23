import { z } from "zod";

// Schema for the EditCompanyModal, based on UpdateCompanyPayload
export const editCompanySchema = z.object({
  company_name: z.string().min(1, "Company name is required"),
  business_description: z.string().optional(),
  website: z
    .string()
    .url("Invalid URL format (e.g., example.com)")
    .optional()
    .or(z.literal("")), // Allow empty string for optional URL
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
