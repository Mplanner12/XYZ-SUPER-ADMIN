import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
// import useStore from "@/store";
import {
  addBusinessAccountRow,
  addCreateModules,
  addCreateOtherPayment,
  addCreateUser,
  addFetchPaymentList,
  addGeneralInformation,
  addInvite,
  addLegalInformation,
  addLocation,
  addOtherInformation,
  addOwnershipInformation,
  addReportInformation,
  addRoles,
  addSetupBusinessLocation,
  addSetupBusinessLocationItem,
  addSubmodules,
  addSubscription,
  addSubscriptionList,
  addUpdateGeneralInformation,
  addUpdateUser,
  addverifyInvite,
  addWebhookPaystack,
  decodeToken,
  deleteBusinessAccountRowById,
  deleteDepartment,
  deleteLocation,
  deleteModule,
  deleteOwnershipInformation,
  deleteRole,
  deleteSetupBusinesslocation,
  editBusinessAccountRowById,
  emailVerification,
  login,
  resendOtp,
  resetPassword,
  sendOtpPasswordReset,
  signUp,
  updateBusinessAccountRowById,
  updateDepartment,
  updateInternalAdminById,
  updateLocation,
  updateModule,
  updateOwnershipInformation,
  updatePermissionsById,
  updateRole,
  updateSetupBusinessLocation,
  updateSubmodules,
} from "@/api";
import { setUser } from "@/redux/Slices/AuthSlice/authSlice";
import { useAppDispatch } from "@/redux/Store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { privateApi } from "@/api/axios";

// AUTHENTICATION & ACCOUNT SETUP API CALL - Mutate Function
// Authentication *******************************************************************************************
// export const useLogin = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   return useMutation({
//     mutationFn: login,
//     onSuccess: (data) => {
// 			// check if response status is 200
// 			if (data?.status === 200) {
// 				const token = data?.data?.access_token;

// 				// store token and update redux state
// 				localStorage.setItem("token", token);
// 				dispatch(
// 					setUser({
// 						userToken: token,
// 					})
// 				);

// 				// get stores token data
// 				const storedData = localStorage.getItem("token");
// 				const userData = storedData ? JSON.parse(storedData) : null;
// 				const businessId = userData?.business_id;

// 				// Route based on business id presence
// 				if (businessId) {
// 					router.push('/admin-setup/business-setup');
// 				} else {
// 					router.push('/setup/business-information')
// 				}

// 				toast.success(data?.message);
// 			} else {
// 				// handle non 200 error
// 				toast.error( 'An error occured during login', data?.message);
// 			}
//       // localStorage.setItem("token", data?.data?.access_token);
//       // dispatch(
//       //   setUser({
//       //     userToken: data?.data?.access_token,
//       //   })
//       // );
//       // toast.success(data?.message);
//       // router.push('/setup/business-information')
//     },
//     onError: (error: any) => {
//       let resMessage;
//       // Handle validation errors
//       if (error.response?.data?.message === "Validation error") {
//         resMessage =
//           error.response.data.errors?.email[0] ||
//           error.response.data.errors?.password[0];
//       } else {
//         resMessage =
//           error.response?.data?.message ||
//           "An error occurred. Please try again.";
//       }

//       toast.error(resMessage);
//     },
//   });
// };
export const useLogin = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response) => {
      if (response?.data?.access_token) {
        const token = response.data.access_token;

        // Store token and update redux state
        localStorage.setItem("token", token);
        privateApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(
          setUser({
            userToken: token,
          })
        );

        // Show success message from the response
        if (response.message) {
          toast.success(response.message);
        }

        try {
          // Decode token and handle routing
          const decodedData = await decodeToken();

          if (decodedData) {
            // If we have business_id, route to business setup
            if (decodedData.business_id) {
              router.push("/admin-setup/business-setup");
            } else {
              // No business_id, route to information page
              router.push("/setup/business-information");
            }
          } else {
            // Token decoding failed
            toast.error(
              "Failed to verify user information. Please try logging in again."
            );
            // Optionally clear token and redirect to login
            localStorage.removeItem("token");
            router.push("/login");
          }
        } catch (error) {
          console.error("Token decode error:", error);
          toast.error("Error verifying user information. Please try again.");
        }
      } else {
        toast.error(response?.message || "Login failed. Please try again.");
      }
    },
    onError: (error: any) => {
      let resMessage;

      if (error.response?.data?.message === "Validation error") {
        resMessage =
          error.response.data.errors?.email[0] ||
          error.response.data.errors?.password[0];
      } else {
        resMessage =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
      }

      toast.error(resMessage);
    },
  });
};

export const useSignup = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/email-verification");
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.message == "Validation error"
        ? (resMessage =
            error.response.data.errors?.email[0] ||
            error.response.data.errors?.password[0])
        : (resMessage = error.response.data.message);
      toast.error(resMessage);
    },
  });
};

// Email verification
export const useEmailverification = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: emailVerification,
    onSuccess: (data) => {
      localStorage.setItem("token", data?.data?.access_token);
      dispatch(
        setUser({
          userToken: data?.data?.access_token,
        })
      );
      toast.success(data?.message);
      router.push("/login");
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.message == "Validation error"
        ? (resMessage =
            error.response.data.errors?.email[0] ||
            error.response.data.errors?.password[0])
        : (resMessage = error.response.data.message);
      toast.error(resMessage);
    },
  });
};

// resend otp to user email
export const useResendOtp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('/email-verification');
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.message == "Validation error"
        ? (resMessage =
            error.response.data.errors?.email[0] ||
            error.response.data.errors?.password[0])
        : (resMessage = error.response.data.message);
      toast.error(resMessage);
    },
  });
};

// create new password or reset password
export const useResetPassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/login");
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.message == "Validation error"
        ? (resMessage =
            error.response.data.errors?.email[0] ||
            error.response.data.errors?.password[0])
        : (resMessage = error.response.data.message);
      toast.error(resMessage);
    },
  });
};

// call for user to send otp to reset password
export const useSendOtp = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: sendOtpPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/email-verification");
    },
    onError: (error: any) => {
      let resMessage;
      error.response.data.message == "Validation error"
        ? (resMessage =
            error.response.data.errors?.email[0] ||
            error.response.data.errors?.password[0])
        : (resMessage = error.response.data.message);
      toast.error(resMessage);
    },
  });
};

// Account Setup *******************************************************************************************

// general Information
export const useGeneralInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addGeneralInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// account Module
export const useAccountModule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateModules, // Using the existing module creation function
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push(''); // Uncomment and add path if navigation is needed
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// legal Information
export const useLegalInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addLegalInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// report information
export const useReportInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addReportInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// ownershipinfo
export const useOwnershipInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addOwnershipInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateOwnershipInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateOwnershipInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteOwnershipInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteOwnershipInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// other information
export const useOtherInformation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addOtherInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// general information
export const useGeneralInformationUpdate = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addUpdateGeneralInformation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// modules and submodules *****************

export const useCreateModule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateModules,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateModule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateModule,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteModule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteModule,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// Submodule
export const useCreateSubmodule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addSubmodules,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateSubmodule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateSubmodules,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteSubmodule = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateModules,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// locations
export const useCreateLocations = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addLocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateLocation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateLocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteLocation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteLocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// department

export const useCreateDepartment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateModules,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateDepartment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteDepartment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// mutate function for PAYMENT ENDPOINT
export const useCreateOtherPayment = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateOtherPayment,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useCreateSubscription = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addSubscription,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useWebhookPaystack = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addWebhookPaystack,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useSubscriptionList = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addSubscriptionList,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useFetchPaymentDetails = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addFetchPaymentList,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// MUTATE FUCNTION FOR ROLES
export const useAddRoles = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addRoles,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateRoleById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateRole,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteRoleById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// PERMISSIONS
export const useUpdatePermissionById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updatePermissionsById,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// USERS
export const useAddCreateUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addCreateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useAddUpdateUser = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addUpdateUser,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useAddInvite = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addInvite,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useAddVerifyInvite = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addverifyInvite,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// BUSINESS ACCOUNT ROW
export const useAddBusinessRow = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addBusinessAccountRow,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateBusinessRowById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateBusinessAccountRowById,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteBusinessAccountRowById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteBusinessAccountRowById,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useEditBusinessAccountById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: editBusinessAccountRowById,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// GFAMS ADMIN
export const useUpdateInternalAdminById = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateInternalAdminById,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

// external end point for business location using list endpoint
export const useCreateBusinessLocation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addSetupBusinessLocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useCreateBusinessLocationItem = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: addSetupBusinessLocationItem,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useUpdateBusinessLocation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateSetupBusinessLocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};

export const useDeleteBusinessLocation = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: deleteSetupBusinesslocation,
    onSuccess: (data) => {
      toast.success(data.message);
      // router.push('');
    },
    onError: (error: any) => {
      let resMessage;
      resMessage = error.response.data.message;
      toast.error(resMessage);
    },
  });
};
