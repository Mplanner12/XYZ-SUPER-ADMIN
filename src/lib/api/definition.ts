import { z } from "zod";
import { emailRegex } from "@/app/(pages)/(auth)/RegexFile";

export const signUpFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"), // Add name field
    email: z // Change from email_address
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address")
      .regex(emailRegex, "Invalid email format"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(8, {
      message: "Please Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// login schema
export const loginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email" })
    .trim(),
  password: z.string().min(8, { message: "Be at least 8 characters long" }),
});

// confirm password schema
export const resetPasswordSchema = z
  .object({
    new_password: z
      .string()
      .min(8, { message: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
      .regex(/[0-9]/, { message: "Contain at least one number." })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Contain at least one special character",
      }),

    confirm_password: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
};
