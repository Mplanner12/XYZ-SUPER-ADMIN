import { decodeToken } from "@/api";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { useGeneralInformation } from "@/hooks/mutate";
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
import SelectElement from "../../../_setupComponets/Input/SelectElement";
import { useRouter } from "next/navigation";

interface GeneralInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

const formDataSchema = z.object({
  company_name: z.string().min(1, "Business Name is required").trim(),
  company_description: z.string().optional(),
  website: z.string(),
  address: z.string().min(1, "Address is required"),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  email_address: z
    .string()
    .email({ message: "please enter a valid email" })
    .trim(),
  phone: z.string().min(1, "Phone Number is required"),
  alternate_phone: z.string().min(1, "Enter a valid phone number"),
  reg_number: z.string().optional(),
  language: z.string().min(1, "Language is required"),
});

type GeneralInfoData = z.infer<typeof formDataSchema>;

const GeneralInformation: React.FC<GeneralInfoProps> = ({ onNext, onPrev }) => {
  const [userId, setUserId] = useState<number | null>(null);

  // api call
  const { mutate: generalInfoMutate, isPending } = useGeneralInformation();

  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
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

  useEffect(() => {
    const fetchUserId = async () => {
      const decodedToken = await decodeToken();
      if (decodedToken && typeof decodedToken.user_id === "number") {
        setUserId(decodedToken.user_id);
      } else {
        console.error("Failed to get valid user ID from token");
        toast.error("user Id not found");
        // Handle error (e.g., redirect to login page)
      }
    };

    fetchUserId();
  }, []);

  const router = useRouter();

  const onSubmit: SubmitHandler<GeneralInfoData> = async (data) => {
    if (userId === null) {
      console.error("User ID not available");
      router.push("/login");
      return;
    }

    try {
      await generalInfoMutate(
        {
          ...data,
          user_id: userId,
        },
        {
          onSuccess: (response) => {
            // Extract the access_token from the response
            const business_token = response?.data?.access_token;

            // Store the token in local storage
            if (business_token) {
              localStorage.setItem("business_token", business_token); // Store the token in localStorage
            }
            onNext();
          },
          onError: (response, error) => {
            toast.error(response.data.message);
            router.push("/login");
          },
        }
      );
    } catch (error) {
      console.error("Error submitting general information", error);
    }
  };

  const country = watch("country");
  const state = watch("state");
  const preferredLanguage = watch("language");

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  return (
    <FormProvider {...methods}>
      {isPending && <LoadingOverlay />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0">
            General Information
          </h2>
          <div className="mt-2 flex flex-col gap-y-4">
            {/* Business name and description */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="Company Name"
                label="Comapany Name"
                type="text"
                placeholder="What is your Company name?"
                registerName="company_name"
                error={errors.company_name?.message}
              />

              {/* <div className="w-full">
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
                    {...register("company_description")}
                  />
                  {errors.company_description?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.company_description.message}
                    </p>
                  )}
                </div>
              </div> */}
            </div>

            {/* website and email address */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              {/* <InputElement
                id="website"
                label="Website"
                type="text"
                placeholder="e.g yourcompany.com"
                registerName="website"
                error={errors.website?.message}
              /> */}

              <InputElement
                id="email_address"
                label="Email Address"
                type="email"
                placeholder="company email"
                registerName="email_address"
                error={errors.email_address?.message}
              />
            </div>

            {/* comapny country & county/state */}
            <div className="flex md:flex-row flex-col w-full gap-10">
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
              <div className="w-full">
                <SelectElement
                  id="state"
                  label="State/County"
                  placeholder="state/county"
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

            {/* Address */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="address"
                label="Address"
                type="text"
                placeholder="What is your business address"
                registerName="address"
                error={errors.address?.message}
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
              {/* <InputElement
                id="alternate_phone"
                label="Alternative Phone Number"
                type="number"
                placeholder="Enter your alternative business phone number"
                registerName="alternate_phone"
                error={errors.alternate_phone?.message}
              /> */}
            </div>

            {/* Fax number and language  */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="reg_number"
                label="Registration Number"
                type="number"
                placeholder="Enter your Registration Number"
                registerName="reg_number"
                error={errors.reg_number?.message}
              />
              <SelectElement
                id="language"
                label="Laungage"
                placeholder="Preferred language"
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

export default GeneralInformation;
