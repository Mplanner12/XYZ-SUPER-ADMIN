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
  CREATE_BUSINESS: "/business",
  GET_BUSINESS: "/business",
  UPDATE_BUSINESS: (id: string | number) => `/business/${id}`,
  DELETE_BUSINESS: (id: string | number) => `/business/${id}`,

  // Company
  CREATE_COMPANY: "/company",
  GET_COMPANIES: "/companies",
  UPDATE_COMPANY: (id: string | number) => `/company/${id}`,
  DELETE_COMPANY: (id: string | number) => `/company/${id}`,

  // Modules
  TOGGLE_MODULES: "/purchase/modules",
  GET_COMPANY_MODULES: (id: string | number) => `/modules/${id}`,

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
