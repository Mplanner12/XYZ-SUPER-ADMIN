import { CreateUserSchema } from '@/lib/pricePaymentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import InputElement from './Input/InputElement';
import SelectElement from './Input/SelectElement';
import InputFileUpload from './Input/UploadInputElement';
import ExtendProfileInfo from './profileInformation/extendProfileInfo';
import SubmitButton from '@/components/Buttons/SubmitButton';
import { UserFormData } from '../manage-account/_components/types';
import { useFormContext } from '../manage-account/_components/formContext';
import { decodeToken } from '@/api';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { updateFormData, setCurrentStep } from '@/redux/Slices/AuthSlice/formSlice';

interface Props {
	onNext: () => void;
	onPrev: () => void;
}


type Inputs = z.infer<typeof CreateUserSchema>;

export const gender = [
	{ value: '', label: 'Select your Gender' },
	{ value: 'male', label: 'Male' },
	{ value: 'female', label: 'Female' },
	{ value: 'choose not to specify', label: 'choose not to specify' },
];


const ProfileInformation: React.FC<Props> = ({onPrev, onNext}) => {

  const dispatch = useAppDispatch();
  const formData = useAppSelector((state) => state.form.formData)

  const [selectedTab, setSelectedTab] = useState('profile-information')

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  const methods = useForm<Inputs>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: formData,
  });

  const processForm: SubmitHandler<Inputs> = (data) => {
    dispatch(updateFormData({...data}));
    dispatch(setCurrentStep('more-profile-info'))
    handleTabChange("more-profile-info");
  }

	const {
		handleSubmit,
		formState: { errors },
	} = methods;

  return (
    <FormProvider {...methods}>
      <>
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
                  id="first_name"
                  label="First Name"
                  type="text"
                  required
                  placeholder="What is your First Name?"
                  registerName="first_name"
                  error={errors.first_name?.message}
                />
                <InputElement
                  id="last_name"
                  label="Last Name"
                  type="text"
                  required
                  placeholder="What is your Last Name?"
                  registerName="last_name"
                  error={errors.last_name?.message}
                />
              </div>

              {/*middle name and mother name */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="middle_name"
                  label="Middle Name"
                  type="text"
                  placeholder="What is your middle name?"
                  registerName="middle_name"
                  error={errors.middle_name?.message}
                />
                <InputElement
                  id="mother_name"
                  label="Mother Name"
                  type="text"
                  placeholder="What is your mother's name"
                  registerName="mother_name"
                  error={errors.mother_name?.message}
                />
              </div>

              {/* Staff ID no and role*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="staff_id"
                  label="Staff I.D No."
                  type="text"
                  placeholder="Enter your Staff ID. No"
                  registerName="staff_id"
                  error={errors.staff_id?.message}
                />
                <InputElement
                  id="role_id"
                  label="Role"
                  required
                  type="number"
                  placeholder="What is your role?"
                  registerName="role_id"
                  error={errors.role_id?.message}
                />
              </div>

              {/* Email Adddress and gender*/}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="email_address"
                  label="Email Address"
                  required
                  type="text"
                  placeholder="Enter Your Email Address"
                  registerName="email_address"
                  error={errors.email_address?.message}
                />
                <SelectElement
                  id="gender"
                  label="Gender"
                  options={gender}
                  required
                  registerName="gender"
                  error={errors.gender?.message}
                />
              </div>

              {/* Phone number and emergency number  */}

              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="phone_number"
                  label="Phone Number"
                  type="text"
                  placeholder="Enter your phone number"
                  registerName="phone_number"
                  error={errors.phone_number?.message}
                />
                <InputElement
                  id="emergency_contact_number"
                  label="Emergency Contact Number"
                  type="text"
                  placeholder="Enter your emergency contact number"
                  registerName="emergency_contact_number"
                  error={errors.emergency_contact_number?.message}
                />
              </div>

              {/* Current address */}
              <div className="flex md:flex-row flex-col w-full gap-10">
                <InputElement
                  id="fax_number"
                  label="Fax Number"
                  type="text"
                  placeholder="Enter your Fax Number"
                  registerName="fax_number"
                  error={errors.fax_number?.message}
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
                onClick={handleSubmit(processForm)}
                className={`rounded-2xl font-normal px-4 h-fit py-4 text-sm shadow-sm border border-none border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 w-20 text-white cursor-pointer`}
              >
                Next
              </button>
            </div>
          </div>
        )}
        <div>
          {selectedTab === "more-profile-info" && (
            <ExtendProfileInfo handleTabChange={handleTabChange} />
          )}
        </div>
      </>
    </FormProvider>
  );
}

export default ProfileInformation