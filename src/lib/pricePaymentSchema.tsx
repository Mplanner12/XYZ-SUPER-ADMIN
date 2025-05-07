import { z } from 'zod';

const optionSchema = z.union([
    z.string(),
    z.object({
        value: z.string(),
        label: z.string()
    })
]);

export const PricePaymentSchema = z.object({
	customerPlan: optionSchema,
	numberOfUsers: optionSchema,
	paymentPlan: optionSchema,
	paymentMethod: optionSchema,
	orderHistory: optionSchema,
	renewalType: optionSchema,
	currencyType: optionSchema,

	preferred_currency: z.string().min(1, 'Preferred Currency is required'),
	renewal_type: z.string().min(1, 'renewal type is required'),
	order_history: z.string().min(1, 'order history is required'),
	payment_method: z.string().min(1, 'payment method is required'),
	payment_plan: z.string().min(1, 'payment plan is required'),
	number_users: z.string().min(1, 'number of users is required'),
	customer_plan: z.string().min(1, 'number of users is required'),

});

export const CreateUserSchema = z.object({
  // business_id: z.union([
  //   z.string().transform((val) => Number(val)),
  //   z.number(),
  // ]),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string().optional(),
  mother_name: z.string().optional(),
  staff_id: z.string().optional(),
  role_id: z.union([z.string().transform((val) => Number(val)), z.number()]), // Ensure it's an integer
  email_address: z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required"),
  gender: z.string().optional(),
  phone_number: z.string().optional(),
  emergency_contact_number: z.string().optional(),
  current_address: z.string().optional(),
  fax_number: z.string().optional(),
  business_description: z.string().optional(),
  department: z.string().optional(),
  designation: z.string().optional(),
  date_of_birth: z.string().optional(),
  date_of_employment: z.string().optional(),
  marital_status: z.string().optional(),
  permanent_address: z.string().optional(),
  qualification: z.string().optional(),
  relevant_work_qualification: z.string().optional(),
  other_information: z.string().optional(),
  name_of_next_of_kin: z.string().optional(),
  relationship: z.string().optional(),
  next_of_kin_address: z.string().optional(),
  next_of_kin_email: z.string().email("Invalid email address").optional(),
  next_of_kin_phone_number: z.string().optional(),
  profile_photo: z.string().optional(), // Binary as a string
});
