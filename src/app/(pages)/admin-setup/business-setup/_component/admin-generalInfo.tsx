import { decodeToken } from "@/api";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useGeneralInformation, useGeneralInformationUpdate } from "@/hooks/mutate";
import {
  useCountriesData,
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
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import { useRouter } from "next/navigation";
import { useGetBusinessById } from "@/hooks/query";
import { PencilIcon, XIcon } from "lucide-react";
import SubmitButton from "@/components/Buttons/SubmitButton";

interface GeneralInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

const formDataSchema = z.object({
  business_name: z.string().min(1, "Business Name is required").trim(),
  business_description: z.string().optional(),
  website: z.string(),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),

  email_address: z
    .string()
    .email({ message: "please enter a valid email" })
    .trim(),
  phone: z.string().min(1, "Phone Number is required"),
  alternate_phone: z.string().min(1, "Enter a valid phone number"),
  fax_number: z.string().optional(),
  language: z.string().min(1, "Language is required"),
  facebook_handle: z.string(),
  instagram_handle: z.string(),
});

type GeneralInfoData = z.infer<typeof formDataSchema>;

interface ViewModeProps {
  data: GeneralInfoData;
  onEdit: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}


// View mode for input
const ViewMode: React.FC<ViewModeProps> = ({ data, onEdit, onNext, onPrev }) => {
  return (
    <div className="lg:w-[80%] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">General Information</h2>
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
            Business Name
          </h3>
          <p className="font-medium">{data.business_name}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Business Description
          </h3>
          <p className="font-medium">{data.business_description || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Website</h3>
          <p className="font-medium">{data.website || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Email Address
          </h3>
          <p className="font-medium">{data.email_address}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Address</h3>
          <p className="font-medium">{data.address}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Country</h3>
          <p className="font-medium">{data.country}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Phone Number
          </h3>
          <p className="font-medium">{data.phone}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Alternative Phone
          </h3>
          <p className="font-medium">{data.alternate_phone}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Fax Number</h3>
          <p className="font-medium">{data.fax_number || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Language</h3>
          <p className="font-medium">{data.language}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Facebook Handle
          </h3>
          <p className="font-medium">{data.facebook_handle || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Instagram Handle
          </h3>
          <p className="font-medium">{data.instagram_handle || "N/A"}</p>
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

const AdminGeneralInformation: React.FC<GeneralInfoProps> = ({ onNext, onPrev }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [businessData, setBusinessData] = useState<GeneralInfoData | null>(
    null
  );
  const [businessId, setBusinessId] = useState<number | null>(null);

  // api call
  const { mutate: generalInfoMutate, isPending } = useGeneralInformation();
  const { data: fetchedData, isPending: isFetching } = useGetBusinessById({
    business_id: businessId,
  });
  const { mutate: updateGeneralInfo, isPending: isUpdating } =
    useGeneralInformationUpdate();

  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const {
    data: countriesResponse,
    isLoading: isLoadingCountries,
    refetch: refetchCountries,
  } = useCountriesData(countrySearchTerm);
  const { data: stateResponse, isLoading: isState } =
    useStateData(selectedCountry);
  const {
    data: languageResponse,
    isLoading: isLanguage,
    refetch: refetchLanguages,
  } = useLanguageData("");

  const methods = useForm<GeneralInfoData>({
    resolver: zodResolver(formDataSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const fetchBusinessId = async () => {
      const businessToken = await decodeToken();
      if (businessToken && typeof businessToken.business_id === "number") {
        setBusinessId(businessToken.business_id);
      } else {
        toast.error("Business Id not found");
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

  const onSubmit: SubmitHandler<GeneralInfoData> = async (data) => {
    if (!businessId) {
     toast.error("Business ID not found");
     return;
    }

    try {
      await updateGeneralInfo(
        {
          ...data,
          business_id: businessId,
        },
        {
          onSuccess: (response) => {
            toast.success("Business Information updated Successfully");
            setIsEditMode(false);
            if (typeof fetchedData?.refetch === "function") {
              fetchedData.refetch();
            }
          },
          onError: (error: any) => {
            toast.error(error?.data?.message || "Failed to update information");
            if (error?.response?.status === 401) {
              return;
            }
          },
        }
      );
    } catch (error) {
      console.error("Error submitting general information", error);
    }
  };

  const handleCountrySearch = useCallback(
    debounce((searchTerm: string) => {
      setCountrySearchTerm(searchTerm);
      refetchCountries();
    }, 300),
    [refetchCountries]
  );

  const handleLanguageSearch = useCallback(
    debounce((searchTerm: string) => {
      setLanguageSearchTerm(searchTerm);
      refetchLanguages();
    }, 300),
    [refetchCountries]
  );

  // watch form field
  const country = watch("country");
  const preferredLanguage = watch("language");

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  if (isFetching) {
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
            General Information
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
            {/* Business name and description */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="business_name"
                label="Business Name"
                type="text"
                placeholder="What is your business name?"
                registerName="business_name"
                error={errors.business_name?.message}
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
                    className=" block w-full rounded-md border border-solid py-2 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 placeholder:font-inter
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

            {/* website and email address */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="website"
                label="Website"
                type="text"
                placeholder="e.g yourcompany.com"
                registerName="website"
                error={errors.website?.message}
              />

              <InputElement
                id="email_address"
                label="Email Address"
                type="email"
                placeholder="company email"
                registerName="email_address"
                error={errors.email_address?.message}
              />
            </div>

            {/* business address and country */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="address"
                label="Address"
                type="text"
                placeholder="What is your business address"
                registerName="address"
                error={errors.address?.message}
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

            {/* Phone number and alternative phone number */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="phone"
                label="Phone Number"
                type="number"
                placeholder="Enter your business Phone number"
                registerName="phone"
                error={errors.phone?.message}
              />
              <InputElement
                id="alternate_phone"
                label="Alternative Phone Number"
                type="number"
                placeholder="Enter your alternative business phone number"
                registerName="alternate_phone"
                error={errors.alternate_phone?.message}
              />
            </div>

            {/* Fax number and language  */}

            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="fax_number"
                label="Fax Number"
                type="number"
                placeholder="Enter your Fax Number"
                registerName="fax_number"
                error={errors.fax_number?.message}
              />
              <SelectElement
                id="language"
                label="Laungage"
                placeholder="Select the language"
                options={
                  languageResponse &&
                  languageResponse.map((language: string) => ({
                    value: language,
                    label: language,
                  }))
                }
                value={preferredLanguage}
                required
                registerName="language"
                error={errors.language?.message}
                isLoading={isLanguage}
              />
            </div>

            {/* Facebook and Instagram handle */}

            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="facebook_handle"
                label="Facebook Handle"
                type="text"
                placeholder="What is your business facebook username"
                registerName="facebook_handle"
                error={errors.facebook_handle?.message}
              />
              <InputElement
                id="instagram_handle"
                label="Instagram Handle"
                type="text"
                placeholder="What is your business instagram username"
                registerName="instagram_handle"
                error={errors.instagram_handle?.message}
              />
            </div>
          </div>
          <div className="mt-5 flex justify-end gap-8 py-4">
            <button
              type="button"
              // variant="outline"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
            <button type="submit">Save Changes</button>
          </div>
          <div className="mt-5 flex w-full justify-between">
            <button
              type="button"
              disabled
              onClick={onPrev}
              className="rounded-xl hover:bg-white px-4 py-3 text-sm font-normal hover:text-foundation-grey-grey-900 shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "" : "Prev"}
            </button>
            <button
              type="submit"
              disabled={isPending}
              onClick={onNext}
              className="rounded-xl hover:bg-white px-4 py-3 text-sm font-normal hover:text-foundation-grey-grey-900 shadow-sm border border-solid hover:border-foundation-grey-grey-600 bg-foundation-purple-purple-400 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Submitting..." : "Next"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminGeneralInformation;
