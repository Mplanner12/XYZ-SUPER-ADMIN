export interface UserFormData {
  // Required fields
  // business_id: any;
  first_name: string;
  last_name: string;
  role_id: number;
  email_address: string;

  // Optional fields
  middle_name?: string;
  mother_name?: string;
  staff_id?: string;
  gender?: string;
  phone_number?: string;
  emergency_contact_number?: string;
  current_address?: string;
  fax_number?: string;
  business_description?: string;
  department?: string;
  designation?: string;
  date_of_birth?: string;
  date_of_employment?: string;
  marital_status?: string;
  permanent_address?: string;
  qualification?: string;
  relevant_work_qualification?: string;
  other_information?: string;
  name_of_next_of_kin?: string;
  relationship?: string;
  next_of_kin_address?: string;
  next_of_kin_email?: string;
  next_of_kin_phone_number?: string;
  profile_photo?: string | File | null;
}
