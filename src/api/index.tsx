import axios from "axios";
import { toast } from "react-toastify";
import localStorage from "redux-persist/es/storage";
import { privateApi, publicApi } from "./axios";
import { RoleResponse } from "@/app/(pages)/setup/_setupComponets/user-role-table";
import { UsersResponse } from "@/app/(pages)/setup/_setupComponets/InviteUsersTable";

interface DecodedTokenData {
  user_id: number;
  business_id: string;
  user_role_name: string;
  role_id: number | null;
  permissions: string[];
  exp: number;
}

interface DecodedTokenResponse {
  message: string;
  status: string;
  code: number;
  data: DecodedTokenData;
}

interface BusinessIdTokenData {
	user_id: number;
	business_id: string;
	user_role_name: string;
	role_id: number | null;
	permissions: string[];
	exp: number;
}


interface BusinessIdTokenResponse {
	message: string;
	status: string;
	code: number;
	data: DecodedTokenData;
}


// Authentication & ACCOUNT SETUP API CALL - Mutate Function
// Authentication - publicApi  ****************************************************
export const login = async (data: any) => {
  const res = await publicApi.post(`account_setup/login`, data);
  return res.data;
};
export const signUp = async (data:any) => {
  const res = await publicApi.post(`account_setup/signup`, data);
  return res.data;
};
export const emailVerification = async (data: any) => {
	const res = await publicApi.post(`account_setup/verify-otp`, data);
	return res.data;
};

export const resendOtp = async (data: any) => {
	const res = await publicApi.post(`account_setup/send-otp`, data);
	return res.data;
};

export const resetPassword = async (data: any) => {
	const res = await publicApi.post(`account_setup/reset-password`, data);
	return res.data;
};

// call for user send Otp to reset password
export const sendOtpPasswordReset = async (data: any) => {
	const res = await publicApi.post(`account_setup/send-otp`, data);
	return res.data;
};

// decode token
export async function decodeToken(): Promise<DecodedTokenData | null> {
  try {
    const token = await localStorage.getItem('token');
    if (!token) {
      console.error('No token found in local storage');
      return null;
    }

    const res = await publicApi.post<DecodedTokenResponse>(`account_setup/decode-token`, { token });

    if (res.data && res.data.status === "success" && res.data.data) {
      const tokenData = res.data.data;
      await localStorage.setItem('user_id', tokenData.user_id.toString());
      await localStorage.setItem('business_id', tokenData.business_id.toString());
      return tokenData;
    } else {
      console.error('Decoded token does not contain valid data');
      return null;
    }
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

// business id update token
// export async function businessIdToken(): Promise<BusinessIdTokenData | null> {
// 	try {
// 		const businessToken = await localStorage.getItem('business_token');
// 		if (!businessToken) {
// 			console.error('No update token found in local storage');
// 			return null;
// 		}

// 		const res = await publicApi.post<BusinessIdTokenResponse>(
// 			`account_setup/decode-token`,
// 			{ business_token: businessToken }
// 		);

// 		if (res.data && res.data.status === 'success' && res.data.data) {
// 			const businessData = res.data.data;
      
//       if (businessData?.business_id) {
//         await localStorage.setItem('business_id', businessData.business_id.toString());
//       }
// 			return businessData;
// 		} else {
// 			console.error('Decoded token does not contain valid data');
// 			return null;
// 		}
// 	} catch (error) {
// 		console.error('Failed to decode token:', error);
// 		return null;
// 	}
// }


// ACCOUNT SETUP - PRIVATEAPI  ****************************************************

export const addGeneralInformation = async (data: any): Promise<any | null> => {
  try {
    const user_id = await localStorage.getItem('user_id');
    
    if (!user_id) {
      console.error('No user_id found in local storage');
      return null;
    }
  
    const res = await privateApi.post(`/account_setup/business/${user_id}/general-information`, data);
    return res.data;
  } catch (error) {
    console.error(error)
  }
};

export const addLegalInformation = async (data: any): Promise <any | null> => {
  try{
    const business_id = await localStorage.getItem('business_id');

    if(!business_id){
      console.error('No business_id found in local storage')
      return null;
    }
    const res = await privateApi.post(`/account_setup/business/${business_id}/legal-information`, data);
    return res.data;
  } catch (error) {
    console.error(error)
  }
  
};

export const addReportInformation = async (data: any): Promise <any | null> => {
  try {
    const business_id = await localStorage.getItem('business_id');

    if(!business_id){
      toast.error(data.message)
      return null;
    }
    const res = await privateApi.post(`/account_setup/business/${business_id}/report-information`, data);
    return res.data;
  } catch (error) {
    toast.error(data.message)
  }
};

// ownership information
export const addOwnershipInformation = async (data: any) => {
  const businessId = await localStorage.getItem('business_id');
  const res = await privateApi.post(`/account_setup/ownership-information?business_id=${businessId}`, data);
  return res.data;
};

export const updateOwnershipInformation = async ({ownership_id, data}:{ownership_id:string, data: any}) => {
  const res = await privateApi.patch(`/account_setup/ownership-information/${ownership_id}`, data);
  return res.data;
};

export const deleteOwnershipInformation = async ({ownership_id, data}:{ownership_id:string, data: any}) => {
  const res = await privateApi.delete(`/account_setup/ownership-information/${ownership_id}`, data);
  return res.data;
};

// other information

export const addOtherInformation = async (data: any): Promise<any | null> => {
	try {
		const business_id = await localStorage.getItem('business_id');

		if (!business_id) {
			toast.error("Business Id not found");
			return null;
		}
		const res = await privateApi.post(
			`/account_setup/business/${business_id}/other-information`,
			data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'business_id': business_id ,
        },
      }
		);
		return res.data;
	} catch (error: any) {
		toast.error(error.response?.data?.message || 'An error occured');
	}
};

// update business information by id
export const addUpdateGeneralInformation = async (data: any): Promise<any | null> => {
  try {
    const business_id = await localStorage.getItem("business_id");

    if (!business_id) {
      console.error("No business_id found in local storage");
      return null;
    }
    const res = await privateApi.post(
      `/account_setup/business/${business_id}/update-general-information`,
      data
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

// MODULES AND SUBMODULES - PRIVATEAPI  ****************************************************

export const addCreateModules = async ({data}: {data: any}) => {
  const res = await privateApi.post(`/account_setup/modules/create`, data);
  return res.data;
};

export const updateModule = async ({module_id, data}:{module_id:string, data: any}) => {
  const res = await privateApi.patch(`/account_setup/modules/${module_id}`, data);
  return res.data;
};

export const deleteModule = async ({module_id, data}:{module_id:string, data: any}) => {
  const res = await privateApi.delete(`/account_setup/modules/${module_id}`, data);
  return res.data;
};

export const addSubmodules = async ({module_id, data}:{module_id:string, data: any}) => {
  const res = await privateApi.post(`/account_setup/modules/${module_id}/submodules`, data);
  return res.data;
};

export const updateSubmodules = async ({submodule_id, data}:{submodule_id:string, data: any}) => {
  const res = await privateApi.patch(`/account_setup/submodules/${submodule_id}`, data);
  return res.data;
};

export const deleteSubmodules = async ({submodule_id, data}:{submodule_id:string, data: any}) => {
  const res = await privateApi.delete(`/account_setup/submodules/${submodule_id}`, data);
  return res.data;
};


// LOCATION - PRIVATEAPI  ****************************************************

// get location 
export const addLocation = async ({data}:{ data: any}) => {
  const businessId = await localStorage.getItem('business_id');
  const res = await privateApi.post(`/account_setup/locations?business_id=${businessId}`, data);
  return res.data;
};

export const deleteLocation = async ({location_id, data}:{location_id:string, data: any}) => {
  const res = await privateApi.delete(`/account_setup/locations/${location_id}`, data);
  return res.data;
};

export const updateLocation = async ({location_id, data}:{location_id:string, data: any}) => {
  const res = await privateApi.patch(`/account_setup/locations/${location_id}`, data);
  return res.data;
};

// DEPARTMENT API
export const addDepartments = async ({ data }: { data: any }) => {
	const res = await privateApi.post(`/account_setup/departments`, data);
	return res.data;
};

export const deleteDepartment = async ({department_id, data}:{department_id:string, data: any}) => {
  const res = await privateApi.delete(`/account_setup/locations/${department_id}`, data);
  return res.data;
};

export const updateDepartment = async ({department_id, data}:{department_id:string, data: any}) => {
  const res = await privateApi.patch(`/account_setup/locations/${department_id}`, data);
  return res.data;
};

// PAYMENT APIS mutate functions

export const addCreateOtherPayment = async ({data}:{ data: any}) => {
  const res = await privateApi.post(
    `/account_setup/other_payment/`,
    data
  );
  return res.data;
};

export const addSubscription = async ({ data }: { data: any }) => {
  const businessId = await localStorage.getItem("business_id");
  const res = await privateApi.post(`/account_setup/subscriptions/?business_id=${businessId}`, data);
  return res.data;
};

export const addWebhookPaystack = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/webhook/paystack`, data);
  return res.data;
};

export const addSubscriptionList = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/subscription/list`, data);
  return res.data;
};

export const addFetchPaymentList = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/other_payment/list`, data);
  return res.data;
};

// Roles API mutate functions

export const addRoles = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/roles/`, data);
  return res.data;
};

export const updateRole = async ({ data, role_id }: { data: any, role_id: any }) => {
  const res = await privateApi.patch(`/account_setup/roles/${role_id}/`, data);
  return res.data;
};

export const deleteRole = async ({ data, role_id }: { data: any, role_id: any }) => {
  const res = await privateApi.delete(`/account_setup/roles/${role_id}/`, data);
  return res.data;
};


// PERMISSIONS APIS MUTATE

export const updatePermissionsById = async ({ data, permission_id }: { data: any, permission_id: any }) => {
  const res = await privateApi.patch(`/account_setup/edit-permission/${permission_id}`, data);
  return res.data;
};

// USER ROLES MUTATE FUNCTION ENDPOINT
export const addCreateUser = async ({ data }: { data: any }) => {
  const businessId = await localStorage.getItem("business_id");
  const res = await privateApi.post(
    `/account_setup/create_user?business_id=${businessId}`,
    data
  );
  return res.data;
};

export const addUpdateUser = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/update-user`, data);
  return res.data;
};

export const addInvite = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/invite`, data);
  return res.data;
};

export const addverifyInvite = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/invite`, data);
  return res.data;
};

// BUSINESS ROWS ENDPOINT

export const addBusinessAccountRow = async ({ data }: { data: any }) => {
  const res = await privateApi.post(`/account_setup/business-account-row/`, data);
  return res.data;
};

export const updateBusinessAccountRowById = async ({ row_id, data }: { row_id: any, data: any}) => {
  const res = await privateApi.patch(`/account_setup/business-account-row/${row_id}
`, data);
  return res.data;
};

export const deleteBusinessAccountRowById = async ({ row_id }: { row_id: any, }) => {
  const res = await privateApi.delete(`/account_setup/business-account-row/${row_id}
`);
  return res.data;
};

export const editBusinessAccountRowById = async ({ data }: { data: any }) => {
  const res = await privateApi.patch(`/account_setup/business-account-row/{row_id}
`, data);
  return res.data;
};

// GFAMS ADMIN MUTATE ENDPOINT

export const updateInternalAdminById = async ({ data }: { data: any }) => {
  const res = await privateApi.patch(`/account_setup/internal_admin/{admin_id}
`, data);
  return res.data;
};





// Queries business infomation*********************************************************************************************************
// ownership information
export const getOwnershipInformation = async ({business_id}:{business_id:string}) => {
  const res = await privateApi.get(`account_setup/ownership-information/${business_id}`);
  return res.data;
};

// business data
export const getBusinessDataById = async ({business_id}:{business_id:any}) => {
  const res = await privateApi.get(`account_setup/business/${business_id}`);
  return res.data;
};

// list all user business
export const getAllBusinessUser = async ({ data }: { data: any }) => {
	const res = await privateApi.get(`account_setup/list-all-user-business`, data)
	return res.data;
};

// MODULES AND SUBMODULES - PRIVATEAPI queries  ****************************************************

// get all modules
export const getListModules = async ({ data }: { data: any }) => {
	const res = await privateApi.get(`account_setup/modules`, data);
	return res.data;
};

// get all submodules
export const getListSubModules = async ({ module_id }: { module_id: number }) => {
	const res = await privateApi.get(`account_setup/modules/${module_id}/submodules`);
	return res.data;
};

export const getModulesWithSubmodules = async ({ data }: { data: any }) => {
	const res = await privateApi.get(`account_setup/modules_with_submodules`, data );
	return res.data;
};


// LOCATION - PRIVATEAPI queries  ****************************************************
// GET LOCATION
export const getLocations = async ({ data }: { data: any }) => {
	const res = await privateApi.get(`account_setup/locations`, data );
	return res.data;
};

export const getBusinessLocations = async ({ business_id }: { business_id: number }) => {
	const res = await privateApi.get(`account_setup/business/${business_id}/locations`);
	return res.data;
};

// department
export const getDepartments = async ({ data }: { data: any }) => {
	const res = await privateApi.get(`account_setup/departments`, data);
	return res.data;
};

// ROLES APIS FOR QUERY FUCNTION

export const getRoles = async (params?: RoleResponse) => {
  const res = await privateApi.get(`/account_setup/roles/`, {params});
  return res.data;
};

// PERMISSIONS API FOR QUERY FUNCTION

export const getPermissions = async ({ data }: { data: any }) => {
  const res = await privateApi.get(`/account_setup/fetch-permissions/`, data);
  return res.data;
};

// USERS ROLES QUERY ENDPOINT
export const getListUsers = async (): Promise<UsersResponse> => {
  const businessId = await localStorage.getItem("business_id");
  const res = await privateApi.get<UsersResponse>(
    `/account_setup/list-users/?business_id=${businessId}`
  );
  return res.data;
};

export const getUsersById = async ({ user_id }: { user_id: any }) => {
  const res = await privateApi.get(`/account_setup/get-user/${user_id}`);
  return res.data;
};

// Business Account row query endpoint

export const getBusinessAccountRows = async ({ business_id }: { business_id: any }) => {
  const res = await privateApi.get(`/account_setup/business-account-rows/${business_id}`);
  return res.data;
};


// GFAMS ADMIN QUERY ENDPOINT

export const getAllInternalAdmin = async ({ data }: { data: any }) => {
  const res = await privateApi.get(`/account_setup/internal_admin`, data);
  return res.data;
};

export const getAllAdminDetails = async ({ data }: { data: any }) => {
  const res = await privateApi.get(`/account_setup/internal_admin/details`, data);
  return res.data;
};




// Queries *********************************************************************************************************

// test
export const getUser = async ({userId}:{userId:string}) => {
  const res = await privateApi.get(`account_setup/console/users`, {
    params: {
      userId,
    }
  });
  return res.data;
};


// External end point for business location
// mutate
export const addSetupBusinessLocation = async ( data: any ) => {
	const res = await privateApi.post(`/accounting/lists`, data);
	return res.data;
};

export const addSetupBusinessLocationItem = async ( data: any ) => {
  const res = await privateApi.post(`/accounting/lists/add-item`, data);
  return res.data;
};

export const deleteSetupBusinesslocation = async ({id, data}:{id:any, data: any}) => {
  const res = await privateApi.delete(`/accounting/lists/${id}`, data);
  return res.data;
};

export const updateSetupBusinessLocation = async ({id, data}:{id:any, data: any}) => {
  const res = await privateApi.patch(`/accounting/lists/${id}`, data);
  return res.data;
};

// queries

export const getSetupBusinessLocation = async ({id}:{id:any}) => {
  const res = await privateApi.get(`/accounting/lists/${id}`);
  return res.data;
};

export const getBusinessLocationItemById = async ({id}:{id:any}) => {
  const res = await privateApi.get(`accounting/lists/get-items/${id}`);
  return res.data;
};