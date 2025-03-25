import { CreateUserSchema } from "@/lib/pricePaymentSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { z } from 'zod';
import InputElement from '../Input/InputElement';
import SelectElement from '../Input/SelectElement';
import InputFileUpload from '../Input/UploadInputElement';
import NextOfKin from './nextOfKin';
import { useFormContext } from "../../manage-account/_components/formContext";
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { updateFormData, setCurrentStep } from '@/redux/Slices/AuthSlice/formSlice';

type Inputs = z.infer<typeof CreateUserSchema>;

export const department = [
	{ value: '', label: 'Select your Department' },
	{ value: 'management', label: 'Management' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'information', label: 'Information' },
];

export const maritalStatus = [
	{ value: '', label: 'Select your marital Status' },
	{ value: 'single', label: 'Single' },
	{ value: 'married', label: 'Married' },
	{ value: 'divorced', label: 'Divorced' },
	{ value: 'choose not to specify', label: 'choose not to specify' },
];

interface ExtendProfileInfoProps{
  handleTabChange: (tab: string) => void;
}

const ExtendProfileInfo: React.FC<ExtendProfileInfoProps> = ({handleTabChange}) => {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.formData);

  const [selectedTab, setSelectedTab] = useState('profile-information');
	const [files, setFiles] = useState<Record<string, File | null>>({
    profile_photo: null,
  });

  const [nextTab, setNextTab] = useState('more-profile-info');

  const handleTabSwitch = (tab: string) => {
		setNextTab(tab);
	};

  const methods = useForm<Inputs>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: formData,
  });

	const handleFileChange = (fieldName: string) => (file: File | null) => {
    setFiles((prev) => ({
      ...prev,
      [fieldName]: file,
    }));
  };

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	const processForm: SubmitHandler<Inputs> = (data) => {
    dispatch(updateFormData(data));
    dispatch(setCurrentStep('next-of-kin'));
    handleTabSwitch("next-of-kin");
  };

  return (
    <FormProvider {...methods}>
      <>
        {nextTab === "more-profile-info" && (
          <div className="lg:w-[80%] w-full">
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
                  id="department"
                  label="Department"
                  options={department}
                  required
                  registerName="department"
                  error={errors.department?.message}
                />
              </div>

              {/*middle name and mother name */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <div className=" w-full">
                  <label
                    htmlFor="date_of_birth"
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
                      id="date_of_birth"
                      className="block w-full rounded-md border border-solid py-3 px-3 mt-1 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                              focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
                      {...register("date_of_birth")}
                    />
                    {errors.date_of_birth?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.date_of_birth.message}
                      </p>
                    )}
                  </label>
                </div>
                <div className=" w-full">
                  <label
                    htmlFor="date_of_employment"
                    className="w-fit h-fit font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
                  >
                    Date of Employment{" "}
                    <input
                      type="date"
                      id="date_of_employment"
                      className="block w-full rounded-md border border-solid py-3 px-3 mt-1 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600
                              focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
                      {...register("date_of_employment")}
                    />
                    {errors.date_of_employment?.message && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.date_of_employment?.message}
                      </p>
                    )}
                  </label>
                </div>
              </div>

              {/* Staff ID no and role*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <SelectElement
                  id="marital_status"
                  label="Marital Status"
                  options={maritalStatus}
                  required
                  registerName="marital_status"
                  error={errors.marital_status?.message}
                />
                <InputFileUpload
                  id="profile_photo"
                  label="Upload your profile photo"
                  acceptTypes=".pdf,.doc,.docx"
                  onFileChange={handleFileChange("profile_photo")}
                />
              </div>

              {/* Email Adddress and gender*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="permanent_address"
                  label="Permananet Address"
                  required
                  type="text"
                  placeholder="Enter your Permananet Address"
                  registerName="permanent_address"
                  error={errors.permanent_address?.message}
                />
              </div>

              {/* Phone number and emergency number  */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="qualification"
                  label="Qualification"
                  type="text"
                  placeholder="Enter your highest qualification"
                  registerName="qualification"
                  error={errors.qualification?.message}
                />
                <InputElement
                  id="relevant_work_qualification"
                  label="Relevant Work Experience"
                  type="text"
                  placeholder="Enter a relevant work qualification"
                  registerName="relevant_work_qualification"
                  error={errors.relevant_work_qualification?.message}
                />
              </div>

              {/* Current address */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="other_information"
                  label="Other Information"
                  type="text"
                  placeholder="Enter any relevant information for profile."
                  registerName="other_information"
                  error={errors.other_information?.message}
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
                onClick={() => {
                  methods.handleSubmit(processForm)();
                }}
                className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </>
      <div>
        {nextTab === "next-of-kin" && (
          <NextOfKin handleTabSwitch={handleTabSwitch} />
        )}
      </div>
    </FormProvider>
  );
}

export default ExtendProfileInfo