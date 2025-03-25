import { useQuery } from "@tanstack/react-query";
import { fetchAuditLogs, fetchCustomCharges, fetchCustomerName, fetchCustomTax, fetchProductDiscount, fetchSalesOutlet } from "./FetchApi";

export const useFetchSalesOutlet = () => {
  return useQuery({
    queryKey: ["SalesOutletData"],
    queryFn: fetchSalesOutlet,
    refetchOnWindowFocus: false
  });
};


export const useFetchCustomerName = () => {
  return useQuery({
    queryKey: ["customerNameData"],
    queryFn: fetchCustomerName,
    refetchOnWindowFocus: false
  });
};

export const useFetchAuditLogs = (
  from_Date?: string | null, 
  from_time?: string | null, 
  to_date?: string | null, 
  to_time?: string | null, 
  pageNumber?: number, 
  pageSize?: number
) => {
  return useQuery({
    queryKey: ["auditLogsData", from_Date, from_time, to_date, to_time, pageNumber, pageSize],
    queryFn: () => fetchAuditLogs(from_Date, from_time, to_date, to_time, pageNumber, pageSize),
    refetchOnWindowFocus: false
  });
};

export const useFetchCustomCharges = (pageNumber?:number, pageSize?:number) => {
  return useQuery({
    queryKey: ["useFetchCustomChargesData"],
    queryFn:() => fetchCustomCharges(pageNumber, pageSize),
    refetchOnWindowFocus: false
  });
};

export const useProductDiscountApi = (pageNumber?:number, pageSize?:number) => {
  return useQuery({
    queryKey: ["useProductDiscountApiData"],
    queryFn:() => fetchProductDiscount(pageNumber, pageSize),
    refetchOnWindowFocus: false
  });
};

export const useFetchCustomTaxApi = (pageNumber?:number, pageSize?:number) => {
  return useQuery({
    queryKey: ["useFetchCustomTaxApiData"],
    queryFn:() => fetchCustomTax(pageNumber, pageSize),
    refetchOnWindowFocus: false
  });
};

