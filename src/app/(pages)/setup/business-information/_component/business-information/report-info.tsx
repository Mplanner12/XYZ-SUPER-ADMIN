import { decodeToken } from "@/api";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { businessType, filingInformation } from "@/data/setupData";
import { useReportInformation } from "@/hooks/mutate";
import {
  useCountriesData,
  useFilingReportData,
  useIndustryData,
  useLanguageData,
  useStateData,
} from "@/hooks/query/utilsApiCallBack";
import { PricePaymentSchema } from "@/lib/pricePaymentSchema";
import { formDataSchema } from "@/lib/setupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { toast } from "react-toastify";
import { z } from "zod";
import SelectElement from "../../../_setupComponets/Input/SelectElement";

const reportInfoSchema = z.object({
  fiscal_year_end: z.string().min(1, "fiscal end of year is required"),
  tax_year_end: z.string().min(1, "yax year end  is required"),
  business_type: z.string().min(1, "business type is required"),
  filing_information: z.string().min(1, "Filing information is required"),
});

type reportInfoData = z.infer<typeof reportInfoSchema>;

interface reportInfoProps {
  onNext: () => void;
  onPrev: () => void;
}

const ReportInformation: React.FC<reportInfoProps> = ({ onNext, onPrev }) => {
  const { mutate: reportInfoMutate, isPending } = useReportInformation();

  const [businessId, setBusinessId] = useState<number | null>(null);

  // useState for utility endpoint
  const [selectedCountry, setSelectedCountry] = useState("");
  const [businessTypeSearchTerm, setBusinessTypeSearchTerm] = useState("");
  const [filingInfoSearchTerm, setfilinginfoSearchterm] = useState("");

  const {
    data: businessTypeResponse,
    isLoading: isBusinessType,
    refetch: refetchBusinessType,
  } = useIndustryData(businessTypeSearchTerm);
  const {
    data: filingInfoResponse,
    isLoading: isFilingInformation,
    refetch: refetchFilingInfo,
  } = useFilingReportData(filingInfoSearchTerm);

  const methods = useForm<reportInfoData>({
    resolver: zodResolver(reportInfoSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const handleBusinessTypeSearch = useCallback(
    debounce((searchTerm: string) => {
      setBusinessTypeSearchTerm(searchTerm);
      refetchBusinessType();
    }, 300),
    [refetchBusinessType]
  );

  const handleFilingInfoSearch = useCallback(
    debounce((searchTerm: string) => {
      setfilinginfoSearchterm(searchTerm);
      refetchFilingInfo();
    }, 300),
    [refetchFilingInfo]
  );

  const businessType = watch("business_type");
  const filingInfo = watch("filing_information");

  useEffect(() => {
    decodeToken()
      .then((businessToken) => {
        if (businessToken?.business_id) {
          setBusinessId(Number(businessToken.business_id));
        } else {
          // Handle case when the business ID is not found
          toast.error(
            "Unable to retrieve business information. Please try again."
          );
          // Optionally, redirect user to a login or error page
        }
      })
      .catch(() => {
        toast.error("An error occurred while fetching business information.");
        // Optionally, handle the error (e.g., redirect or log to monitoring service)
      });
  }, []);

  const onSubmit: SubmitHandler<reportInfoData> = async (data) => {
    try {
      await reportInfoMutate(
        {
          ...data,
          business_id: businessId,
        },
        {
          onSuccess(data, variables, context) {
            toast.success("Report information updated successfully.");
            onNext();
          },
          onError(error, variables, context) {
            toast.error("Error updating report information.");
            reset();
          },
        }
      );
    } catch (error) {
      toast.error("Error submitting report Information");
    }
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0">
            Report Information
          </h2>

          <div className="mt-2 flex flex-col gap-y-4">
            {/* Fiscal year Tax year */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <div className=" w-full">
                <label
                  htmlFor="fiscal_year_end"
                  className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                >
                  Accounting Year End{" "}
                  <span>
                    <FaAsterisk
                      size={6}
                      color="red"
                      opacity={0.7}
                      className="mb-1"
                    />
                  </span>
                </label>
                <div className="mt-[2px]">
                  <input
                    type="date"
                    id="fiscal_year_end"
                    autoComplete="organization-title"
                    placeholder="Enter your business name on Govt document"
                    className="block w-full rounded-md border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                    focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
                    {...register("fiscal_year_end")}
                  />
                  {errors.fiscal_year_end?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.fiscal_year_end.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full">
                <label
                  htmlFor="tax_year_end"
                  className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                >
                  Tax Year End{" "}
                  <span>
                    <FaAsterisk
                      size={6}
                      color="red"
                      opacity={0.7}
                      className="mb-1"
                    />
                  </span>
                </label>
                <div className="mt-[2px]">
                  <input
                    type="date"
                    id="tax_year_end"
                    placeholder="Write a brief description of your business"
                    autoComplete="off"
                    className=" block w-full rounded-md border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                    focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6 placeholder:uppercase"
                    {...register("tax_year_end")}
                  />
                  {errors.tax_year_end?.message && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.tax_year_end.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Business Type and filling information */}
            <div className="flex flex-col w-full gap-10">
              {/* <div className="w-full md:w-[48%]">
								<SelectElement
									id="business_type"
									label="Business Type"
									isLoading={isBusinessType}
									value={businessType}
									options={
										businessTypeResponse &&
										businessTypeResponse.map((businessType: {name: string}) => ({
											value: businessType.name,
											label: businessType.name,
										}))
									}
									required
									registerName="business_type"
									error={errors.business_type?.message}
								/>
							</div> */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                {/* <InputElement
									id="filing_information"
									label="Filing Information"
									type="text"
									placeholder="Filing Information"
									registerName="filing_information"
									error={errors.filing_information?.message}
								/> */}
                <SelectElement
                  id="filing_information"
                  label="Filing Information"
                  isLoading={isFilingInformation}
                  value={filingInfo}
                  options={
                    filingInfoResponse &&
                    filingInfoResponse.map((filingInfo: { name: string }) => ({
                      value: filingInfo.name,
                      label: filingInfo.name,
                    }))
                  }
                  required
                  registerName="filing_information"
                  error={errors.filing_information?.message}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <SubmitButton
              text="Prev"
              onClick={onPrev}
              customPadding="w-20 py-4 mt-5 mb-3"
              actionType="button"
              loading={isPending}
            />
            <SubmitButton
              text="Next"
              customPadding="w-20 py-4 mt-5 mb-3"
              actionType="submit"
              loading={isPending}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ReportInformation;
