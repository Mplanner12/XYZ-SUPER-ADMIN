import { businessType } from '@/data/setupData';
import { formDataSchema } from '@/lib/setupSchema';
import React, { useCallback, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import InputElement from './Input/InputElement';
import SelectElement from './Input/SelectElement';
import { z } from 'zod';
import { useCountriesData, useCurrenciesData, useRegionData, useSegmentData, useStateData } from '@/hooks/query/utilsApiCallBack';
import { zodResolver } from '@hookform/resolvers/zod';
import { debounce } from 'lodash';
import { useCreateLocations } from '@/hooks/mutate';
import { toast } from 'react-toastify';

const LocationModalSchema = z.object({
	location_name: z.string().min(2, 'Location name is required'),
	street_address: z.string().min(1, 'Street address is required'),
	postal_code: z.string().min(1, 'Postal code is required'),
	state: z.string().min(1, 'State is required'),
	country: z.string().min(1, 'Country is required'),
	segment: z.string().min(1, 'Address is required'),
	currency: z.string().min(1, 'currency is required'),
	region: z.string().min(1, 'region is required'),
});

type LocationModalData = z.infer<typeof LocationModalSchema>;

const BusinessLocationModal = () => {

  const {mutate: locationMutate, isPending} = useCreateLocations();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm ] = useState('');
  const [segmentSearchTerm, setSegmentSearchTerm] = useState('');
  const [currencySearchTerm, setCurrencySearchterm] = useState('');

	const { data: countriesResponse, isLoading: isLoadingCountries, refetch: refetchCountries } = useCountriesData(countrySearchTerm);
	const { data: stateResponse, isLoading: isState, refetch: refetchState } = useStateData(selectedCountry);
  const {data: segmentResponse, isLoading: isSegment, refetch: refetchSegments } = useSegmentData(segmentSearchTerm);
  const {data: currencyResponse, isLoading: isCurrency, refetch: refetchCurrency } = useCurrenciesData(currencySearchTerm);
  const {data: regionResponse } = useRegionData(selectedCountry);

  const methods = useForm<LocationModalData>({
    resolver: zodResolver(LocationModalSchema),
  });

  const {
		handleSubmit,
		watch,
		reset,
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

  const country = watch('country');
	const state = watch('state');
	const segment = watch('segment');
  const preferredCurrency = watch('currency');
  const region = watch('region');

  useEffect(() => {
		setSelectedCountry(country);
	}, [country]);

  useEffect(() => {
    if (regionResponse?.data) {
      
    }
  })
  
  const onSubmit: SubmitHandler<LocationModalData> = async (data) => {
    try {
      await locationMutate(
        {
          data
        },
        {
          onSuccess() {
            toast.success("Location Information Sent successfuly")
            // adds the location to the existing data on the table
          }, onError(error) {
            toast.error(error.message);
          }
        }
      )
    } catch (error) {
      toast.error("Error Adding a new location. Try again!")
    }
	};
    
  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={methods.handleSubmit(onSubmit)}>
        <div className='flex flex-col px-2 py-3 gap-2'>
          <InputElement
            id="locationName"
            label="Location Name"
            type="text"
            placeholder="What is the name if the location?"
            registerName="businessLocation"
            // error={errors.businessLocation?.message}
          />
          <InputElement
            id="businessStreet"
            label="Street Address"
            type="text"
            placeholder="What is the address?"
            registerName="businessStreet"
            // error={errors.businessStreet?.message}
          />
          <InputElement
            id="postalCode"
            label="Address"
            type="text"
            placeholder="What is the postal code?"
            registerName="postalCode"
            // error={errors.postalCode?.message}
          />
          <SelectElement
            id="businessState"
            label="State"
            options={businessType}
            registerName="businessState"
            // error={errors.businessState?.message}
          />
          <SelectElement
            id="businessCountry"
            label="Country"
            options={businessType}
            registerName="businessCountry"
            // error={errors.businessCountry?.message}
          />

          <SelectElement
            id="businessSegment"
            label="Segment"
            options={businessType}
            registerName="businessSegment"
            // error={errors.businessSegment?.message}
          />
          <SelectElement
            id="preferredCurrency"
            label="Preferred Currency"
            options={businessType}
            registerName="preferredCurrency"
            // error={errors.preferredCurrency?.message}
          />
          <InputElement
            id="mapLocation"
            label="Location on map"
            type="text"
            placeholder="Select location on map"
            registerName="mapLocation"
            // error={errors.mapLocation?.message}
          />
        </div>
      </form>
    </FormProvider>
	);
}

export default BusinessLocationModal