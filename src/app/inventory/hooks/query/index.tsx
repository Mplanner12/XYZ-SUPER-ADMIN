import { useQuery } from "@tanstack/react-query";
import { getAdjustments, getInventories } from "../../api";



// INVENTORY  Management Query Function ***********************************************************************************
export const useAdjustments = () => {
  return useQuery({
    queryKey: ["adjustment"],
    queryFn: getAdjustments,
  });
};


export const useGetInventories = () => {
  return useQuery({
    queryKey: ["InventorieData"],
    queryFn: getInventories,
  });
};

