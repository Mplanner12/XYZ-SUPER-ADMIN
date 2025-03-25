import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import { CreateUserSchema } from "@/lib/pricePaymentSchema";

type FormData = z.infer<typeof CreateUserSchema>;

interface FormState {
  formData: Partial<FormData>;
  currentStep: "profile-information" | "more-profile-info" | "next-of-kin";
}

const initialState: FormState = {
  formData: {},
  currentStep: "profile-information",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setCurrentStep: (
      state,
      action: PayloadAction<FormState["currentStep"]>
    ) => {
      state.currentStep = action.payload;
    },
    resetForm: (state) => { 
      state.formData = {};
      state.currentStep = "profile-information";
    },
  },
});

export const { updateFormData, setCurrentStep, resetForm } = formSlice.actions;
export default formSlice.reducer;