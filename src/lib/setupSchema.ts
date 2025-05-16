import { z } from 'zod';

// schema for select element
const optionSchema = z.union([
    z.string(),
    z.object({
        value: z.string(),
        label: z.string()
    })
]);


export const formDataSchema = z.object({
	firstName: z.string().min(1, 'First name is required'),
	lastName: z.string().min(1, 'Last name is required'),
	email: z.string().min(1, 'Email is required').email('Invalid email address'),
	country: z.string().min(1, 'Country is required'),
	street: z.string().min(1, 'Street is required'),
	city: z.string().min(1, 'City is required'),
	state: z.string().min(1, 'State is required'),
	zip: z.string().min(1, 'Zip is required').optional(),

	businessName: z.string().min(1, 'Business Name is required').trim(),
	businessDescription: z.string().optional(),
	businessWebsite: z.string().optional(),
	businessAddress: z.string().min(1, 'Address is required'),
	businessCountry: z.string().min(1, 'Country is required'),

	businessEmail: z
		.string()
		.email({ message: 'please enter a valid email' })
		.trim()
		.optional(),
	businessPhoneNumber: z.string().min(1, 'Phone Number is required'),
	alternateNumber: z.string().min(1, 'Enter a valid phone number').optional(),
	alternativeNumber: z.string().min(1, 'Enter a valid phone number').optional(),
	faxNumber: z.string().min(1, 'Enter a valid fax number').optional(),
	language: z.string().min(1, 'Language is required'),
	businessFacebook: z.string().optional(),
	businessInstagram: z.string().optional(),
	industry: z.string().min(1, 'Industry is required').optional(),
	numberOfEmployee: z.coerce.number().min(1).optional(),
	legalBusinessName: z.string().min(2, 'Legal Business Name is required'),
	rcNumber: z.coerce.number().min(1),
	tinNumber: z.coerce.number().min(1),
	businessState: z.string().min(1, 'State is required'),
	snNumber: z.string().min(1, 'State is required'),
	eiNumber: z.coerce.number().min(1),
	ssn: z.coerce
		.number()
		.min(1, 'Enter a valid Social security Number')
		.optional(),

	fiscalYear: z.coerce.date({
		required_error: 'Please select a date and time',
		invalid_type_error: "That's not a date!",
	}),
	taxYear: z.coerce.date({
		required_error: 'Please select a date and time',
		invalid_type_error: "That's not a date!",
	}),
	businessType: optionSchema,
	filingInformation: optionSchema,

	taxConsultantName: z
		.string()
		.min(1, { message: 'Tax Consultant Name is required' })
		.trim()
		.optional(),
	contactPerson: z
		.string()
		.min(1, { message: 'Contact person Name is required' })
		.trim()
		.optional(),
	taxConsultantAddress: z.string().min(1, 'Tax Consultant Address is required'),
	auditorName: z
		.string()
		.min(1, { message: 'Auditor Name is required' })
		.trim()
		.optional(),
	auditorAddress: z.string().min(1, 'Auditor Address Address is required'),
	legalConsultantAddress: z
		.string()
		.min(1, 'Legal Consultant Address is required'),
	legalConsultantName: z
		.string()
		.min(1, { message: 'Tax Consultant Name is required' })
		.trim()
		.optional(),

	businessLocation: z
		.string()
		.min(1, { message: 'Enter a valid location' })
		.trim()
		.optional(),
	businessStreet: z
		.string()
		.min(1, { message: 'Enter street address' })
		.trim()
		.optional(),
	postalCode: z.coerce.number().min(1).optional(),
	businessSegment: optionSchema,
	preferredCurrency: optionSchema.optional(),
	mapLocation: z
		.string()
		.min(1, { message: 'Enter a valid location' })
		.trim()
		.optional(),
});
