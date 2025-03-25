import { PricePaymentSchema } from "@/lib/pricePaymentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaAsterisk } from "react-icons/fa";
import { z } from "zod";
import SelectElement from "@/app/(pages)/setup/_setupComponets/Input/SelectElement";
import InputElement from "@/app/(pages)/setup/_setupComponets/Input/InputElement";
import InputFileUpload from "@/app/(pages)/setup/_setupComponets/Input/UploadInputElement";
import AdminNextOfKin from "./admin-next-of-kin";

type Inputs = z.infer<typeof PricePaymentSchema>;

export const department = [
  { value: "", label: "Select your Department" },
  { value: "management", label: "Management" },
  { value: "sales", label: "Sales" },
  { value: "information", label: "Information" },
];

export const maritalStatus = [
  { value: "", label: "Select your marital Status" },
  { value: "single", label: "Single" },
  { value: "married", label: "Married" },
  { value: "divorced", label: "Divorced" },
  { value: "choose not to specify", label: "choose not to specify" },
];

interface ExtendProfileInfoProps {
  handleTabChange: (tab: string) => void;
}

const AdminExtendProfileInfo: React.FC<ExtendProfileInfoProps> = ({
  handleTabChange,
}) => {
  const [selectedTab, setSelectedTab] = useState("profile-information");

  const [nextTab, setNextTab] = useState("more-profile-info");

  const handleTabSwitch = (tab: string) => {
    setNextTab(tab);
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
    <>
      <form action="" onSubmit={handleSubmit(processForm)}>
        {nextTab === "more-profile-info" && (
          <div className="md:w-[80%] w-full">
            <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
              Profile Information
            </h2>
            <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
              Create your work profile as a professional in the company
            </p>
            <div className="mt-5 flex flex-col gap-y-5">
              {/* Tax consultant Name and Contact person */}
              <div className="flex md:flex-row flex-col md:w-[45%] w-full gap-10">
                <SelectElement
                  id="userDepartment"
                  label="Department"
                  options={department}
                  required
                  registerName="userDepartment"
                  // error={errors.userGender?.message}
                />
              </div>

              {/*middle name and mother name */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <div className=" w-full">
                  <label
                    htmlFor="DateOfBirth"
                    className="w-fit h-fit font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                  >
                    <span className="flex">
                      Date of Birth{" "}
                      <FaAsterisk
                        size={6}
                        color="red"
                        opacity={0.7}
                        className="mb-1"
                      />
                    </span>
                    <input
                      type="date"
                      id="DateOfBirth"
                      className="block w-full rounded-md border border-solid py-3 px-3 mt-1 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                              focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
                      // {...register('fiscalYear')}
                    />
                    {/* {errors.fiscalYear?.message && (
                          <p className="mt-2 text-sm text-red-400">
                            {errors.fiscalYear.message}
                          </p>
                        )} */}
                  </label>
                </div>
                <div className=" w-full">
                  <label
                    htmlFor="DateOfEmployment"
                    className="w-fit h-fit font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                  >
                    Date of Employment{" "}
                    <input
                      type="date"
                      id="DateOfEmployment"
                      className="block w-full rounded-md border border-solid py-3 px-3 mt-1 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                              focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
                      // {...register('fiscalYear')}
                    />
                    {/* {errors.fiscalYear?.message && (
                              <p className="mt-2 text-sm text-red-400">
                                {errors.fiscalYear.message}
                              </p>
                            )} */}
                  </label>
                </div>
              </div>

              {/* Staff ID no and role*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <SelectElement
                  id="maritalStatus"
                  label="Marital Status"
                  options={maritalStatus}
                  required
                  registerName="maritalStatus"
                  // error={errors.userGender?.message}
                />
                <InputFileUpload
                  id="Profile-picture"
                  label="Upload Your Profile Picture"
                  register={register}
                />
              </div>

              {/* Email Adddress and gender*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userPermanentAddress"
                  label="Permananet Address"
                  required
                  type="text"
                  placeholder="Enter your Permananet Address"
                  registerName="userPermanentAddress"
                  // error={errors.auditorAddress?.message}
                />
              </div>

              {/* Phone number and emergency number  */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="userQualification"
                  label="Qualification"
                  type="text"
                  placeholder="Enter your highest qualification"
                  registerName="userQualification"
                  // error={errors.legalConsultantName?.message}
                />
                <InputElement
                  id="relavantExperience"
                  label="Relevant Work Experience"
                  type="text"
                  placeholder="Enter a relevant work qualification"
                  registerName="relavantExperience"
                  // error={errors.contactPerson?.message}
                />
              </div>

              {/* Current address */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="otherInformation"
                  label="Other Information"
                  type="text"
                  placeholder="Enter any relevant information for profile."
                  registerName="otherInformation"
                  // error={errors.legalConsultantAddress?.message}
                />
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button
                type="button"
                onClick={() => handleTabChange("profile-information")}
                className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foundation-purple-purple-500 shadow-sm border-solid border-foundation-purple-purple-500 border-2 hover:bg-foundation-purple-purple-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch("next-of-kin")}
                className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </form>
      <div>
        {nextTab === "next-of-kin" && (
          <AdminNextOfKin handleTabSwitch={handleTabSwitch} />
        )}
      </div>
    </>
  );
};

export default AdminExtendProfileInfo;
