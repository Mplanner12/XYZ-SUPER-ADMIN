import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PricingFormData {
  currency: string;
  renewal_type: string;
  order_history: string;
  payment_method: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  payment_plan: string;
  no_of_users: string;
  plan: string;
  selected_pricing_type: "Monthly" | "Quartely" | "Annually";
}

const initialState: PricingFormData = {
  currency: "",
  renewal_type: "",
  order_history: "",
  payment_method: "",
  dateFrom: null,
  dateTo: null,
  payment_plan: "",
  no_of_users: "",
  plan: "",
  selected_pricing_type: "Monthly",
};

export const pricingSlice = createSlice({
  name: "pricing",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<PricingFormData>>) => {
      return { ...state, ...action.payload };
    },
    setPricingType: (
      state,
      action: PayloadAction<"Monthly" | "Quartely" | "Annually">
    ) => {
      state.selected_pricing_type = action.payload;
    },
    clearFormData: (state) => {
      return initialState;
    },
  },
});

export const { setFormData, setPricingType, clearFormData } =
  pricingSlice.actions;
export default pricingSlice.reducer;
