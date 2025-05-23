
import { getAllBusinessUser, getBusinessAccountRows, getBusinessDataById, getBusinessLocationItemById, getBusinessLocations, getListModules, getListSubModules, getListUsers, getLocations, getModulesWithSubmodules, getOwnershipInformation, getPermissions, getRoles, getSetupBusinessLocation, getUser, getUsersById } from "@/api";
import { UsersResponse } from "@/app/(pages)/setup/_setupComponets/InviteUsersTable";
import { RoleResponse } from "@/app/(pages)/setup/_setupComponets/user-role-table";
import { useQuery } from "@tanstack/react-query";

// AUTHENTICATION & ACCOUNT SETUP QUERIES

// ownership information
export const useGetOwnershipInformation = ({business_id}:{business_id:string}) => {
  return useQuery({
    queryKey: ["ownershipInformation", business_id],
    queryFn: () => getOwnershipInformation({business_id}),
  });
};
// fetch business data
export const useGetBusinessById = ({business_id}: {business_id:any}) => {
  return useQuery({
    queryKey: ['business', business_id],
    queryFn: () => getBusinessDataById({business_id}),
  })
}

// fetch list all user business
export const useGetListAllBusiness = () => {
	return useQuery({
		queryKey: ['allBusiness'],
		queryFn: () => getAllBusinessUser,
	});
};

// modules and submodules

export const useGetModuleList = () => {
	return useQuery({
		queryKey: ['module'],
		queryFn: () => getListModules,
	});
};

export const useGetSubmoduleList = ({ module_id }: { module_id: number }) => {
	return useQuery({
		queryKey: ['module', module_id],
		queryFn: () => getListSubModules({ module_id }),
	});
};

export const useGetModulesWithSubmodules = () => {
	return useQuery({
		queryKey: ['module-submodules'],
		queryFn: () => getModulesWithSubmodules,
	});
};

// location apis

export const useGetLocations = () => {
	return useQuery({
		queryKey: ['module'],
		queryFn: () => getLocations,
	});
};

export const useGetBusinessLocations = () => {
	return useQuery({
		queryKey: ['module'],
		queryFn: () => getBusinessLocations,
	});
};

// USER ROLE
export const useGetRoleById = (params?: RoleResponse) => {
  return useQuery({
    queryKey: ["role", params],
    queryFn: () => getRoles(params),
    enabled: !!params?.business_id,
  });
};

// PERMISSIONS GET QUERY FUNCTION
export const useGetPermissions = () => {
  return useQuery({
    queryKey: ["permission"],
    queryFn: () => getPermissions,
  });
};

// USERS GET QUERY FUNCTION
export const useGetListUsers = () => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["listUsers"],
    queryFn: getListUsers,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};

export const useGetUsersById = ({ user_id }: { user_id: string | null }) => {
	return useQuery({
		queryKey: ['users', user_id],
		queryFn: () => getUsersById({user_id: user_id}),
		enabled: !!user_id
	});
};

// USERS GET QUERY FUNCTION

// BUSINESS ROW BY ID
export const useGetBusinessRowById = ({ business_id }: { business_id: any }) => {
  return useQuery({
    queryKey: ["module", business_id],
    queryFn: () => getBusinessAccountRows({ business_id }),
  });
};


// external api for business location setup

export const useGetSetupBusinessLocationList = ({ id }: { id: string | null }) => {
	return useQuery({
		queryKey: ['locationList', id],
		queryFn: () => getSetupBusinessLocation({id: id}),
		enabled: !!id
	});
};


export const useGetBusinessListItemById = ({ id }: { id: any }) => {
  return useQuery({
    queryKey: ["listItems", id],
    queryFn: () => getBusinessLocationItemById({ id: id }),
    enabled: !!id, 
  });
};

