import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import SubmitButton from "@/components/Buttons/SubmitButton";
// import { businessType, filingInformation } from '@/data/setupData';
import {
  useCountriesData,
  useCurrenciesData,
  useLanguageData,
  useRegionData,
  useSegmentData,
  useStateData,
} from "@/hooks/query/utilsApiCallBack";
// import { PricePaymentSchema } from '@/lib/pricePaymentSchema';
// import { formDataSchema } from '@/lib/setupSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import SelectElement from "../../../_setupComponets/Input/SelectElement";
import {
  useCreateBusinessLocation,
  useCreateBusinessLocationItem,
  useCreateLocations,
} from "@/hooks/mutate";
import { toast } from "react-toastify";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { decodeToken } from "@/api";

interface BusinessInputLocationProps {
  onNext: () => void;
  onPrev: () => void;
}

interface Column {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  name: string;
  type: string;
  list_serial: number;
  InsListID: number;
}

interface ListSubCategory {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  Name: string;
  ListCategoryID: number;
}

interface ListCategory {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string;
  Name: string;
  ListSubCategory: ListSubCategory[];
  ListID: number;
}

interface ListResponse {
  data: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: null | string;
    name: string;
    description: string;
    column: Column[];
    list_id: string;
    ListCategory: ListCategory[];
  };
  status: string;
}

const BusinessLocationSchema = z.object({
  location_name: z.string().min(2, "Location name is required"),
  street_address: z.string().min(1, "Street address is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  segment: z.string().min(1, "Address is required"),
  currency: z.string().min(1, "currency is required"),
  region: z.string().min(1, "region is required"),
});

type BusinessLocationData = z.infer<typeof BusinessLocationSchema>;

const BusinessInputLocation: React.FC<BusinessInputLocationProps> = ({
  onNext,
  onPrev,
}) => {
  // api calls
  const { mutate: createList, isPending: isCreatingList } =
    useCreateBusinessLocation();
  const { mutate: addLocationItem, isPending: isAddingItem } =
    useCreateBusinessLocationItem();

  const [businessId, setBusinessId] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearchTerm, setCountrySearchTerm] = useState("");
  const [stateSearchTerm, setStateSearchTerm] = useState("");
  const [segmentSearchTerm, setSegmentSearchTerm] = useState("");
  const [currencySearchTerm, setCurrencySearchterm] = useState("");

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
    data: segmentResponse,
    isLoading: isSegment,
    refetch: refetchSegments,
  } = useSegmentData(segmentSearchTerm);
  const {
    data: currencyResponse,
    isLoading: isCurrency,
    refetch: refetchCurrency,
  } = useCurrenciesData(currencySearchTerm);
  const { data: regionResponse } = useRegionData(selectedCountry);

  const methods = useForm<BusinessLocationData>({
    resolver: zodResolver(BusinessLocationSchema),
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
      setSegmentSearchTerm(searchTerm);
      refetchState();
    }, 300),
    [refetchCountries]
  );

  const handleSegmentSearch = useCallback(
    debounce((searchTerm: string) => {
      setStateSearchTerm(searchTerm);
      refetchState();
    }, 300),
    [refetchCountries]
  );

  const handleCurrencySearch = useCallback(
    debounce((searchTerm: string) => {
      setCurrencySearchterm(searchTerm);
      refetchState();
    }, 300),
    [refetchCurrency]
  );

  const country = watch("country");
  const state = watch("state");
  const segment = watch("segment");
  const preferredCurrency = watch("currency");
  const region = watch("region");

  useEffect(() => {
    setSelectedCountry(country);
  }, [country]);

  useEffect(() => {
    if (regionResponse?.data) {
    }
  });

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

  const onSubmit: SubmitHandler<BusinessLocationData> = async (data) => {
    try {
      // First create the list
      createList(
        {
          name: "Business Locations",
          description: "Store business locations data",
          columns: [
            { name: "location_name", type: "string" },
            { name: "street_address", type: "string" },
            { name: "postal_code", type: "string" },
            { name: "state", type: "string" },
            { name: "country", type: "string" },
            { name: "segment", type: "string" },
            { name: "currency", type: "string" },
            { name: "region", type: "string" },
          ],
          categories: [
            {
              name: "Locations",
              sub_category: [{ name: "Business" }],
            },
          ],
        },
        {
          onSuccess: (listResponse: ListResponse) => {
            localStorage.setItem("listId", listResponse.data.ID.toString());

            // Map the data values to their corresponding column IDs
            const columnMap = listResponse.data.column.reduce<
              Record<string, number>
            >(
              (acc, col) => {
                acc[col.name] = col.ID;
                return acc;
              },
              {} as Record<string, number>
            );

            // After list is created, add the location item

            // Create the entry object using the column IDs as keys
            const entryData = {
              [columnMap.location_name]: data.location_name,
              [columnMap.street_address]: data.street_address,
              [columnMap.postal_code]: data.postal_code,
              [columnMap.state]: data.state,
              [columnMap.country]: data.country,
              [columnMap.segment]: data.segment,
              [columnMap.currency]: data.currency,
              [columnMap.region]: data.region,
            };

            const locationData = {
              list_id: listResponse.data.ID,
              entry: entryData,
            };

            addLocationItem(
              { Id: businessId, ...locationData },
              {
                onSuccess: () => {
                  toast.success("Location added successfully");
                  onNext();
                },
              }
            );
          },
          onError: (error) => {
            toast.error("Failed to create list structure");
          },
        }
      );
    } catch (error) {
      toast.error("Error submitting location information");
      console.error(error);
    }
  };

  return (
    <FormProvider {...methods}>
      {(isCreatingList || isAddingItem) && <LoadingOverlay />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
            Business Location
          </h2>
          <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
            Add a Location
          </p>
          <div className="mt-2 flex flex-col gap-y-4">
            {/* Location and street */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="location_name"
                label="Location Name"
                type="text"
                placeholder="What is the name if the location?"
                registerName="location_name"
                error={errors.location_name?.message}
              />
              <InputElement
                id="street_address"
                label="Street Address"
                type="text"
                placeholder="What is the address?"
                registerName="street_address"
                error={errors.street_address?.message}
              />
            </div>

            {/* postal code and state */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="postal_code"
                label="Address"
                type="text"
                placeholder="What is the postal code?"
                registerName="postal_code"
                error={errors.postal_code?.message}
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

            {/* COuntry and segment */}
            <div className="flex md:flex-row flex-col w-full gap-10">
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

              <SelectElement
                id="segment"
                label="Segment"
                value={segment}
                options={
                  segmentResponse &&
                  segmentResponse.map((segment: { name: string }) => ({
                    value: segment.name,
                    label: segment.name,
                  }))
                }
                registerName="segment"
                error={errors.segment?.message}
              />
            </div>

            {/* Auditor and Contract Document */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <SelectElement
                id="currency"
                label="Preferred Currency"
                value={preferredCurrency}
                options={
                  currencyResponse &&
                  currencyResponse.map(
                    (currency: { name: string; code: string }) => ({
                      value: currency.code,
                      label: currency.code,
                    })
                  )
                }
                registerName="currency"
                error={errors.currency?.message}
              />

              <InputElement
                id="region"
                label="Region"
                type="text"
                placeholder="Region"
                registerName="region"
                readOnly
                error={errors.region?.message}
              />
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
              customPadding="w-20 py-4 mt-5 mb-3"
              actionType="submit"
              // loading={isPending}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default BusinessInputLocation;
