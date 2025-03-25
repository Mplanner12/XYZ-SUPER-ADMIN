import { PricePaymentSchema } from "@/lib/pricePaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import SubmitButton from "@/components/Buttons/SubmitButton";
import AdminExtendProfileInfo from "./admin-profileInformation/admin-extend-profileInfo";

interface Props {
  onNext: () => void;
  onPrev: () => void;
}

type Inputs = z.infer<typeof PricePaymentSchema>;

export const gender = [
  { value: "", label: "Select your Gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "choose not to specify", label: "choose not to specify" },
];

const AdminProfileInformation: React.FC<Props> = ({ onPrev, onNext }) => {
  const [selectedTab, setSelectedTab] = useState("profile-information");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const methods = useForm<Inputs>({
    resolver: zodResolver(PricePaymentSchema),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    trigger,
    formState: { errors },
  } = methods;

  const processForm: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form action="" onSubmit={handleSubmit(processForm)}>
        {selectedTab === "profile-information" && (
          <div className="lg:w-[80%] w-full relative">
            <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
              Profile Information
            </h2>
            <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
              Create your work profile as a professional in the company
            </p>
            <div className="mt-5 flex flex-col gap-y-5">
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userFirstName"
                  label="First Name"
                  type="text"
                  required
                  placeholder="What is your First Name?"
                  registerName="userFirstName"
                  // error={errors.taxConsultantName?.message}
                />
                <InputElement
                  id="userLastName"
                  label="LastName"
                  type="text"
                  required
                  placeholder="What is your Last Name?"
                  registerName="userLastName"
                  // error={errors.contactPerson?.message}
                />
              </div>

              {/*middle name and mother name */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userMiddleName"
                  label="Middle Name"
                  type="text"
                  placeholder="What is your middle name?"
                  registerName="userMiddleName"
                  // error={errors.taxConsultantAddress?.message}
                />
                <InputElement
                  id="userMotherName"
                  label="Mother Name"
                  type="text"
                  placeholder="What is your mother's name"
                  registerName="userMotherName"
                  // error={errors.taxConsultantAddress?.message}
                />
              </div>

              {/* Staff ID no and role*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userStaffId"
                  label="Staff I.D No."
                  type="text"
                  placeholder="Enter your Staff ID. No"
                  registerName="userStaffId"
                  // error={errors.auditorName?.message}
                />
                <InputElement
                  id="userRole"
                  label="Role"
                  required
                  type="text"
                  placeholder="What is your role?"
                  registerName="userRole"
                  // error={errors.contactPerson?.message}
                />
              </div>

              {/* Email Adddress and gender*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userEmailAddress"
                  label="Email Address"
                  required
                  type="text"
                  placeholder="Enter Your Email Address"
                  registerName="userEmailAddress"
                  // error={errors.auditorAddress?.message}
                />
                <SelectElement
                  id="userGender"
                  label="Gender"
                  options={gender}
                  required
                  registerName="filingInformation"
                  // error={errors.userGender?.message}
                />
              </div>

              {/* Phone number and emergency number  */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userPhoneNumber"
                  label="Phone Number"
                  type="text"
                  placeholder="Enter your phone number"
                  registerName="legalConsultantName"
                  // error={errors.legalConsultantName?.message}
                />
                <InputElement
                  id="userEmergencyNumber"
                  label="Emergency Contact Number"
                  type="text"
                  placeholder="Enter your emergency contact number"
                  registerName="userEmergencyNumber"
                  // error={errors.contactPerson?.message}
                />
              </div>

              {/* Current address */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="faxNumber"
                  label="Fax Number"
                  type="text"
                  placeholder="Enter your Fax Number"
                  registerName="faxNumber"
                  // error={errors.legalConsultantAddress?.message}
                />
              </div>
            </div>

            <div className="flex justify-between w-full mt-5 items-center ">
              <SubmitButton
                text="Prev"
                onClick={onPrev}
                customPadding="w-20 py-4 mb-3"
                actionType="button"
                // loading={isPending}
              />
              <button
                type="button"
                onClick={() => handleTabChange("more-profile-info")}
                className={`rounded-2xl font-normal px-4 h-fit py-4 text-sm shadow-sm border border-none border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 w-20 text-white cursor-pointer`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        <div>
          {selectedTab === "more-profile-info" && (
            <AdminExtendProfileInfo handleTabChange={handleTabChange} />
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default AdminProfileInformation;
