import { decodeToken } from "@/api";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import { useGeneralInformationUpdate, useOtherInformation } from "@/hooks/mutate";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";
import { PencilIcon, XIcon } from "lucide-react";
import { useGetBusinessById } from "@/hooks/query";

const formDataSchema = z.object({
  tax_consultant_name: z
    .string()
    .min(1, "Tax consultant name is required")
    .trim(),
  tax_consultant_contact_person: z
    .string()
    .min(1, "Contact person name is required"),
  tax_consultant_address: z
    .string()
    .min(1, "Tax consultant address is required"),
  auditor_name: z.string().min(1, "Auditor name is required"),
  auditor_contact_person: z.string().min(1, "Auditor contact name is required"),
  auditor_address: z.string().min(1, "Auditor address is required"),
  legal_consultant_name: z.string().min(1, "Legal Consultant name is required"),
  legal_consultant_contact_person: z
    .string()
    .min(1, "Legal consultant person is required"),
  legal_consultant_address: z
    .string()
    .min(1, "legal consultant address name is required")
    .optional(),
  // tax_consultant_contract_document: z.string().optional(),
  // auditor_contract_document: z.string().optional(),
  // legal_consultant_contract_document: z.string().optional(),
});

type OtherFormData = z.infer<typeof formDataSchema>;

interface OtherInformationProps {
  onNext: () => void;
  onPrev: () => void;
}

interface ViewModeProps {
  data: OtherFormData;
  onEdit: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

// View mode for input
const ViewMode: React.FC<ViewModeProps> = ({ data, onEdit, onNext, onPrev }) => {
  return (
    <div className="lg:w-[80%] w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Other Information</h2>
        <button
          onClick={onEdit}
          // variant="outline"
          className="flex items-center gap-2 hover:text-foundation-purple-purple-300"
        >
          <PencilIcon size={16} /> Edit
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-6">
        <div className="space-y-2 ">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Tax Consultant Name
          </h3>
          <p className="font-medium">{data.tax_consultant_name}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Contact Person
          </h3>
          <p className="font-medium">
            {data.tax_consultant_contact_person || "N/A"}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Address</h3>
          <p className="font-medium">{data.tax_consultant_address || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Upload Contract Document
          </h3>
          <p className="font-medium">{"N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Auditor Name
          </h3>
          <p className="font-medium">{data.auditor_name}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Contact Person
          </h3>
          <p className="font-medium">{data.auditor_contact_person}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Address</h3>
          <p className="font-medium">{data.auditor_address}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Upload Contract Document
          </h3>
          <p className="font-medium"> {"N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Legal Consultant Name</h3>
          <p className="font-medium">{data.legal_consultant_name || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">Contact Person</h3>
          <p className="font-medium">{data.legal_consultant_contact_person}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Address
          </h3>
          <p className="font-medium">{data.legal_consultant_address || "N/A"}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm text-foundation-grey-grey-900">
            Upload Contract Document
          </h3>
          <p className="font-medium">{"N/A"}</p>
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
          // onClick={handleSubmit}
          onClick={onNext}
          customPadding="w-20 py-4 mt-5 mb-3"
          actionType="submit"
        />
      </div>
    </div>
  );
};

const AdminOtherInformation: React.FC<OtherInformationProps> = ({
  onNext,
  onPrev,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [businessData, setBusinessData] = useState<OtherFormData | null>(null);

  const [businessId, setBusinessId] = useState<number | null>(null);
  const [files, setFiles] = useState<Record<string, File | null>>({
    tax_consultant_contract_document: null,
    auditor_contract_document: null,
    legal_consultant_contract_document: null,
  });

  // api calls
  const { mutate: otherInfoMutate, isPending } = useOtherInformation();
  const { data: fetchedData, isPending: isFetching } = useGetBusinessById({
    business_id: businessId,
  });
  const { mutate: updateGeneralInfo, isPending: isUpdating } =
    useGeneralInformationUpdate();

  const methods = useForm<OtherFormData>({
    resolver: zodResolver(formDataSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // fetch business id
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

  // FETCHING USERDATA FUNCTION
  useEffect(() => {
    if (fetchedData && !isFetching) {
      try {
        const businessInfo = fetchedData.data;
        setBusinessData(businessInfo);
        methods.reset(businessInfo);
        setIsLoading(false);
      } catch (error) {
        console.error("Error processing business data:", error);
        toast.error("Failed to process business information");
      }
    }
  }, [fetchedData, isFetching, methods]);

  const handleFileChange = (fieldName: string) => (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

  const onSubmit: SubmitHandler<OtherFormData> = async (data) => {
    // try {
    //   if (!businessId) {
    //     toast.error("Business ID is required");
    //     return;
    //   }

    //   const formData = new FormData();

    //   // business_id
    //   formData.append("business_id", businessId.toString());

    //   // text fields
    //   Object.entries(data).forEach(([key, value]) => {
    //     formData.append(key, value);
    //   });

    //   // files if they exist
    //   Object.entries(files).forEach(([key, file]) => {
    //     if (file) {
    //       formData.append(key, file);
    //     }
    //   });

    //   // Append file fields
    //   // const fileFields = [
    //   //   'tax_consultant_contract_document',
    //   //   'auditor_contract_document',
    //   //   'legal_consultant_contract_document',
    //   // ] as const;

    //   // Send the FormData to your API
    //   await updateGeneralInfo(
    //     {
    //       formData,
    //     },
    //     {
    //       onSuccess: (data, variables, context) => {
    //         toast.success(data.message);
    //          setIsEditMode(false);
    //          if (typeof fetchedData?.refetch === "function") {
    //            fetchedData.refetch();
    //          }
    //         onNext();
    //       },
    //       onError(error) {
    //         toast.error(error.message);
    //       },
    //     }
    //   );

    //   onNext();
    // } catch (error) {
    //   console.error("Error submitting Other Information", error);
    // }
  };

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (!isEditMode && businessData) {
    return (
      <ViewMode
        data={businessData}
        onNext={onNext}
        onPrev={onPrev}
        onEdit={() => setIsEditMode(true)}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      {isPending && <LoadingOverlay />}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
            Other Information
          </h2>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit General Information</h2>
            <button
              onClick={() => setIsEditMode(false)}
              // variant="outline"
              className="flex items-center gap-2"
            >
              <XIcon size={16} /> Cancel
            </button>
          </div>
          
          <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
            Tax Consultation Information
          </p>
          <div className="mt-2 flex flex-col gap-y-4">
            {/* Tax consultant Name and Contact person */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="tax_consultant_name"
                label="Tax Consultant Name"
                type="text"
                placeholder="Enter your Tax Consultant Name"
                registerName="tax_consultant_name"
                error={errors.tax_consultant_name?.message}
              />
              <InputElement
                id="tax_consultant_contact_person"
                label="Contact Pearson"
                type="text"
                placeholder="Enter Contact Person Name"
                registerName="tax_consultant_contact_person"
                error={errors.tax_consultant_contact_person?.message}
              />
            </div>

            {/* Consultant Address and document */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="tax_consultant_address"
                label="Address"
                type="text"
                placeholder="Enter Your Tax Consultant Address Name"
                registerName="tax_consultant_address"
                error={errors.tax_consultant_address?.message}
              />
              <InputFileUpload
                id="tax_consultant_contract_document"
                label="Upload Contract Document"
                acceptTypes=".pdf,.doc,.docx"
                onFileChange={handleFileChange(
                  "tax_consultant_contract_document"
                )}
              />
            </div>

            <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-1">
              Auditor Information
            </p>

            {/* Auditor Name and Contact Person */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="auditor_name"
                label="Auditor Name"
                type="text"
                placeholder="Enter your Auditor Name"
                registerName="auditor_name"
                error={errors.auditor_name?.message}
              />
              <InputElement
                id="auditor_contact_person"
                label="Contact Pearson"
                type="text"
                placeholder="Enter Contact Person Name"
                registerName="auditor_contact_person"
                error={errors.auditor_contact_person?.message}
              />
            </div>

            {/* Auditor and Contract Document */}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="auditor_address"
                label="Address"
                type="text"
                placeholder="Enter Your Auditor Address"
                registerName="auditor_address"
                error={errors.auditor_address?.message}
              />
              <InputFileUpload
                id="auditor_contract_document"
                label="Upload Contract Document"
                acceptTypes=".pdf,.doc,.docx"
                onFileChange={handleFileChange("auditor_contract_document")}
              />
            </div>

            <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-1">
              Legal Consultant Information
            </p>

            {/* Fax number and language  */}

            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="legal_consultant_name"
                label="Auditor Name"
                type="text"
                placeholder="Enter your Auditor Name"
                registerName="legal_consultant_name"
                error={errors.legal_consultant_name?.message}
              />
              <InputElement
                id="legal_consultant_contact_person"
                label="Contact Pearson"
                type="text"
                placeholder="Enter Contact Person Name"
                registerName="legal_consultant_contact_person"
                error={errors.legal_consultant_contact_person?.message}
              />
            </div>

            {/* Consultant Address and file upload */}

            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="legal_consultant_address"
                label="Address"
                type="text"
                placeholder="Enter Your Legal Consultant Address"
                registerName="legal_consultant_address"
                error={errors.legal_consultant_address?.message}
              />
              <InputFileUpload
                id="legal_consultant_contract_document"
                label="Upload Contract Document"
                acceptTypes=".pdf,.doc,.docx"
                onFileChange={handleFileChange(
                  "legal_consultant_contract_document"
                )}
              />
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

export default AdminOtherInformation;
