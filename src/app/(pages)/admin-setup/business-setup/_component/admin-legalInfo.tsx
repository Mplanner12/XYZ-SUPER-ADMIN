import { decodeToken } from "@/api";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { businessType } from "@/data/setupData";
import { useLegalInformation } from "@/hooks/mutate";
import {
  useCountriesData,
  useIndustryData,
  useLanguageData,
  useStateData,
} from "@/hooks/query/utilsApiCallBack";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import { PencilIcon, XIcon } from "lucide-react";
import { useGetBusinessById } from "@/hooks/query";

interface LegalInformationProps {
  onNext: () => void;
  onPrev: () => void;
}

const legalFormSchema = z.object({
  legal_business_name: z.string().min(2, "Legal Business Name is required"),
  business_description: z.string().min(1, "Business Description is required"),
  rc_number: z.string().min(1, "Rc number is required"),
  tin_no: z.string().min(1, "Tin no is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  legal_address: z.string().min(1, "Address is required"),
  ein_for_payroll: z.string().optional(),
  ssn: z.string().optional(),
  industry: z.string().min(1, "Industry is required").optional(),
  number_of_employees: z
    .string()
    .min(1, "number of employee is required")
    .optional(),
});

type legalInfoData = z.infer<typeof legalFormSchema>;

interface ViewModeProps {
  data: legalInfoData;
  onEdit: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

// view mode
const ViewMode: React.FC<ViewModeProps> = ({
  data,
  onEdit,
  onNext,
  onPrev,
}) => {
  return (
    <div className="lg:w-[80%] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Legal Information</h2>
        <button
          onClick={onEdit}
          // variant="outline"
          className="flex items-center gap-2 hover:text-foundation-purple-purple-300"
        >
          <PencilIcon size={16} /> Edit
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2 ">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Legal Business Name
          </h3>
          <p className="font-medium">{data.legal_business_name}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Business Description
          </h3>
          <p className="font-medium">{data.business_description || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Industry</h3>
          <p className="font-medium">{data.industry || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Number of Employee
          </h3>
          <p className="font-medium">{data.number_of_employees}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Rc Number</h3>
          <p className="font-medium">{data.rc_number}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">TIN No</h3>
          <p className="font-medium">{data.tin_no}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Address
          </h3>
          <p className="font-medium">{data.legal_address}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Country
          </h3>
          <p className="font-medium">{data.country}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">State</h3>
          <p className="font-medium">{data.state}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">EIN Payroll</h3>
          <p className="font-medium">{data.ein_for_payroll}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            SSN
          </h3>
          <p className="font-medium">{data.ssn || "N/A"}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <SubmitButton
          text="Prev"
          onClick={onPrev}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="button"
          // loading={isPending}
        />
        <SubmitButton
          text="Next"
          // onClick={handleSubmit}
          onClick={onNext}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="submit"
        />
      </div>
    </div>
  );
};


const AdminLegalInformation: React.FC<LegalInformationProps> = ({
  onNext,
  onPrev,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [businessId, setBusinessId] = useState<number | null>(null);
  const [businessData, setBusinessData] = useState<legalInfoData | null>(null);

  // api calls
  const { mutate: legalInfoMutate, isPending } = useLegalInformation();
  const { data: fetchedData, isPending: isFetching } = useGetBusinessById({
    business_id: businessId,
  });
  // const { mutate: updateGeneralInfo, isPending: isUpdating } = useGeneralInformationUpdate();

  // utility api
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [industrySearchTerm, setIndustrySearchTerm] = useState("");

  const {
    data: countriesResponse,
    isLoading: isLoadingCountries,
    refetch: refetchCountries,
  } = useCountriesData(countrySearchTerm);
  const {
    data: stateResponse,
    isLoading: isState,
    refetch: refetchState,
  } = useStateData(selectedCountry);
  const {
    data: industryResponse,
    isLoading: isLoadingIndustry,
    refetch: refetchIndustry,
  } = useIndustryData(industrySearchTerm);

  const methods = useForm<legalInfoData>({
    resolver: zodResolver(legalFormSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const handleCountrySearch = useCallback(
    debounce((searchTerm: string) => {
      setCountrySearchTerm(searchTerm);
      refetchCountries();
    }, 300),
    [refetchCountries]
  );

  const handleStateSearch = useCallback(
    debounce((searchTerm: string) => {
      setStateSearchTerm(searchTerm);
      refetchState();
    }, 300),
    [refetchCountries]
  );

  const handleIndustrySearch = useCallback(
    debounce((searchTerm: string) => {
      setIndustrySearchTerm(searchTerm);
      refetchIndustry();
    }, 300),
    [refetchIndustry]
  );

  const country = watch("country");
  const state = watch("state");
  const preferredIndustry = watch("industry");

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("user Id not found");
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchBusinessId();
  }, []);

  // FETCHING USERDATA FUNCTION
  useEffect(() => {
    if (fetchedData && !isFetching) {
      try {
        const businessInfo = fetchedData.data;
        setBusinessData(businessInfo);
        methods.reset(businessInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error processing business data:", error);
        toast.error("Failed to process business information");
      }
    }
  }, [fetchedData, isFetching, methods]);

  const onSubmit: SubmitHandler<legalInfoData> = async (data) => {
    // try {
    //   await updateGeneralInfo(
    //     {
    //       ...data,
    //       business_id: businessId,
    //     },
    //     {
    //       onSuccess: () => {
    //         toast.success("Business Information updated Successfully");
    //         onNext();
    //       },
    //       onError(error: any) {
    //         toast.error(error.message);
    //         reset();
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.error("Error submitting Legal information", error);
    // }
  };

   if (isLoading) {
     return <LoadingOverlay />;
   }

  if (!isEditMode && businessData) {
    return (
      <ViewMode
        data={businessData}
        onNext={onNext}
        onPrev={onPrev}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      {isPending && <LoadingOverlay />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0">
            Legal Information
          </h2>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit General Information</h2>
            <button
              onClick={() => setIsEditMode(false)}
              // variant="outline"
              className="flex items-center gap-2"
            >
              <XIcon size={16} /> Cancel
            </button>
          </div>
          <div className="mt-2 flex flex-col gap-y-4">
            {/* legal Business name and description */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="legal_business_name"
                label="Legal Business Name"
                type="text"
                placeholder="Enter your business name on Govt document"
                registerName="legal_business_name"
                error={errors.legal_business_name?.message}
              />
              <div className="w-full">
                <label
                  htmlFor="business_description"
                  className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                >
                  Business Description{" "}
                  <span className="font-inter text-foundation-grey-grey-300">
                    (Optional)
                  </span>
                </label>
                <div className="mt-[2px]">
                  <textarea
                    id="business_description"
                    placeholder="Write a brief description of your business"
                    autoComplete="off"
                    className=" block w-full rounded-md border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                                                  focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 h-[100px]"
                    {...register("business_description")}
                  />
                  {errors.business_description?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.business_description.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* business address and country */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <SelectElement
                id="industry"
                label="Industry"
                value={preferredIndustry}
                options={
                  industryResponse &&
                  industryResponse.map((industry: { name: string }) => ({
                    value: industry.name,
                    label: industry.name,
                  }))
                }
                required
                registerName="industry"
                error={errors.industry?.message}
              />

              <InputElement
                id="number_of_employees"
                label="Number of Employee"
                type="text"
                placeholder="Enter number of employee"
                registerName="number_of_employees"
                error={errors.number_of_employees?.message}
              />
            </div>

            {/* Rc Number and Tax ID Number */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="rc_number"
                label="RC Number"
                type="text"
                placeholder="Enter your Registered Company Number"
                registerName="rc_number"
                error={errors.rc_number?.message}
              />
              <InputElement
                id="tin_no"
                label="TIN No"
                type="text"
                placeholder="Enter your Tax identification No"
                registerName="tin_no"
                error={errors.tin_no?.message}
              />
            </div>

            {/* business address and country */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="legal_address"
                label="Address"
                type="text"
                placeholder="What is your business address"
                registerName="legal_address"
                error={errors.legal_address?.message}
              />
              <SelectElement
                id="country"
                label="Country"
                placeholder="Select the country"
                isLoading={isLoadingCountries}
                value={country}
                options={
                  countriesResponse &&
                  countriesResponse.map(
                    (country: { code: string; name: string }) => ({
                      value: country.name,
                      label: country.name,
                    })
                  )
                }
                required
                registerName="country"
                error={errors.country?.message}
              />
            </div>

            {/* Legal State */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <div className=" md:w-[48%] w-full">
                <SelectElement
                  id="state"
                  label="State"
                  placeholder="Select the state"
                  value={state}
                  isLoading={isState}
                  options={
                    Array.isArray(stateResponse)
                      ? stateResponse.map((state: { name: string }) => ({
                          value: state.name,
                          label: state.name,
                        }))
                      : []
                  }
                  required
                  registerName="state"
                  error={errors.state?.message}
                />
              </div>
            </div>

            {/* EIN for payroll and SSN */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="ein_for_payroll"
                label="EIN for Payroll"
                type="number"
                placeholder="Enter Employee Identification Number"
                registerName="ein_for_payroll"
                error={errors.ein_for_payroll?.message}
              />
              <InputElement
                id="ssn"
                label="SSN"
                type="number"
                placeholder="What is your SSN"
                registerName="ssn"
                error={errors.ssn?.message}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <SubmitButton
              text="Prev"
              onClick={onPrev}
              customPadding="w-20 py-4 mt-5 mb-3"
              actionType="button"
              loading={isPending}
            />
            <SubmitButton
              text="Next"
              customPadding="w-20 py-4 mt-5 mb-3"
              actionType="submit"
              loading={isPending}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminLegalInformation;
