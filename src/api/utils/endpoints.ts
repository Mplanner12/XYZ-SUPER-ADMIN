export const Endpoints = {
  /** ------------------- Auth ------------------- */
  GOOGLE_LOGIN: "/auth/google",
  GOOGLE_CALLBACK: "/auth/google/callback",

  LOGIN: "/auth/direct/login",
  VERIFY_TOKEN: "/auth/direct/verify-token",
  RESEND_TOKEN: "/auth/direct/resend-token",
  FORGET_PASSWORD: "/auth/direct/forget-password",
  RESET_PASSWORD: "/auth/direct/reset-password",
  REGISTER: "/auth/direct/register",

  VERIFY_ACCESS_TOKEN: "/auth/direct/verify",
  REFRESH_TOKEN: "/auth/direct/refresh",
  // Business
  CREATE_BUSINESS: "admin/business",
  GET_BUSINESS: "admin/business",
  UPDATE_BUSINESS: (id: string | number) => `admin/business/${id}`,
  DELETE_BUSINESS: (id: string | number) => `admin/business/${id}`,

  // Company
  CREATE_COMPANY: "admin/company",
  GET_COMPANIES: "admin/companies",
  GET_COMPANY_DETAILS: (id: string | number) => `admin/company/${id}`,
  UPDATE_COMPANY: (id: string | number) => `admin/update/company/${id}`,
  DELETE_COMPANY: (id: string | number) => `admin/company/${id}`,

  // Modules
  TOGGLE_MODULES: "/purchase/modules",
  GET_COMPANY_MODULES: (companyId: string | number) => `/modules/${companyId}`, // Modules for a specific company (permissions)
  GET_ALL_MODULES: "/get/all-modules", // New endpoint for module selection/payment

  /** ------------------- User & Permissions ------------------- */
  INVITE_USER: "/company/invite-user",
  UPDATE_ROLE_PERMISSIONS: "/company/update-role",

  // Roles
  CREATE_ROLE: "/role",
  GET_ROLES: (companyId: string | number) => `/roles/${companyId}`,
  GET_ROLE_DETAILS: (id: string | number) => `/role/details/${id}`,
  UPDATE_ROLE: (id: string | number) => `/role/${id}`,
  DELETE_ROLE: (id: string | number) => `/role/${id}`,
};
