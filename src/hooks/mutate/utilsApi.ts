import { publicApi } from "@/api/axios";

export const FetchCountriesApi = async (SearchCountry?:string) => {
  const response = await publicApi.get(`/account_setup/countries?search=${SearchCountry}`);
  return response.data.data || [];
};

export const FetchStateApi = async (countryName?:string) => {
  const response = await publicApi.get(`/account_setup/states?country=${countryName}`);
  return response.data?.data?.states || [];
};

export const FetchCurrenciesApi = async (searchCurrencies?:string) => {
  const response = await publicApi.get(`/account_setup/currencies?currency=${searchCurrencies}`);
  return response.data.data || [];
};

export const FetchLanguageApi = async (searchLanguages?:string) => {
  const response = await publicApi.get(`/account_setup/languages?search=${searchLanguages}`);
  return response.data.data || [];
};

export const FetchRegionApi = async (countryName?:string) => {
  const response = await publicApi.get(`/account_setup/country-region/${countryName}`);
  return response.data || [];
};

export const FetchSegmentsApi = async (searchSegments?:string) => {
  const response = await publicApi.get(`/account_setup/industries?search=${searchSegments}}`);
  return response.data.data || [];
};

export const FetchIndustryApi = async (searchIndustry?:string) => {
  const response = await publicApi.get(`/account_setup/industries?search=${searchIndustry}}`);
  return response.data.data || [];
};

export const FetchBusinessTypesApi = async (searchBusinessType?:string) => {
  const response = await publicApi.get(`/account_setup/industries?search=${searchBusinessType}}`);
  return response.data.data || [];
};

export const FetchFilingReportsApi = async (searchFilingReport?:string) => {
  const response = await publicApi.get(`/account_setup/industries?search=${searchFilingReport}}`);
  return response.data.data || [];
};
