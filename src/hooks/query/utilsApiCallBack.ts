import { useQuery } from "@tanstack/react-query";
import { FetchBusinessTypesApi, FetchCountriesApi, FetchCurrenciesApi, FetchFilingReportsApi, FetchIndustryApi, FetchLanguageApi, FetchRegionApi, FetchSegmentsApi, FetchStateApi } from "../mutate/utilsApi";


export const useCountriesData = (SearchCountry?:string) => {
  return useQuery({
    queryKey: ["countriesData", SearchCountry],
    queryFn: () =>  FetchCountriesApi(SearchCountry),
    refetchOnWindowFocus: false
  });
};



export const useStateData = (countryName?:string) => {
  return useQuery({
    queryKey: ["StateData", countryName],
    queryFn: () => FetchStateApi(countryName),
    refetchOnWindowFocus: false
  });
};


export const useCurrenciesData = (searchCurrencies?:string) => {
  return useQuery({
    queryKey: ["CurrenciesData", searchCurrencies],
    queryFn:() =>  FetchCurrenciesApi(searchCurrencies),
    refetchOnWindowFocus: false
  });
};

export const useLanguageData = (searchLanguages?:string) => {
  return useQuery({
    queryKey: ["LanguageData", searchLanguages],
    queryFn: () => FetchLanguageApi(searchLanguages),
    refetchOnWindowFocus: false
  });
};



export const useRegionData = (countryName?:string) => {
  return useQuery({
    queryKey: ["regionData", countryName],
    queryFn: () => FetchRegionApi(countryName),
    refetchOnWindowFocus: false
  });
};

export const useSegmentData = (searchSegments?: string) => {
	return useQuery({
		queryKey: ['SegmentData', searchSegments],
		queryFn: () => FetchSegmentsApi(searchSegments),
		refetchOnWindowFocus: false,
	});
};

export const useIndustryData = (searchIndustry?: string) => {
	return useQuery({
		queryKey: ['industryData', searchIndustry],
		queryFn: () => FetchIndustryApi(searchIndustry),
		refetchOnWindowFocus: false,
	});
};

export const useBusinessTypeData = (searchBusinessType?: string) => {
	return useQuery({
		queryKey: ['businessTypeData', searchBusinessType],
		queryFn: () => FetchBusinessTypesApi(searchBusinessType),
		refetchOnWindowFocus: false,
	});
};

export const useFilingReportData = (searchFilingReport?: string) => {
	return useQuery({
		queryKey: ['businessTypeData', searchFilingReport],
		queryFn: () => FetchFilingReportsApi(searchFilingReport),
		refetchOnWindowFocus: false,
	});
};




