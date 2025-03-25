import { CreateUserSchema } from "@/lib/pricePaymentSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FaAsterisk } from 'react-icons/fa';
import { z } from 'zod';
import InputElement from '../Input/InputElement';
import { useFormContext } from "../../manage-account/_components/formContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from '@/redux/Store';
import { updateFormData, setCurrentStep } from '@/redux/Slices/AuthSlice/formSlice';
import { useAddCreateUser } from "@/hooks/mutate";
import LoadingOverlay from "@/components/reusable/LoadingOverlay";

type Inputs = z.infer<typeof CreateUserSchema>;

interface NextOfKinProps {
	handleTabSwitch: (tab: string) => void;
}

const NextOfKin: React.FC<NextOfKinProps> = ({ handleTabSwitch }) => {

  const {mutate: createUsers, isPending} = useAddCreateUser();

	const dispatch = useAppDispatch();
  const formDataFromStore = useAppSelector((state) => state.form.formData);
  const router = useRouter();

	const [nextTab, setNextTab] = useState('more-profile-info');

	// const methods = useForm<Inputs>();

	const methods = useForm<Inputs>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: formDataFromStore,
  });

	const {
		reset,
		formState: { errors },
	} = methods;

	const onSubmit = async (data: Inputs) => {

		
		try {
      dispatch(updateFormData(data));

      // Get complete form data from Redux store
      const  completeFormData = {
        data: {
          ...formDataFromStore,
          ...data,
        }
      }

      await createUsers({...completeFormData},
        {
          onSuccess: () => {
            toast.success("Profile Information Submitted Successfully");
            router.push("/setup/business-account");
            reset()
          }, onError(error) {
            toast.error(error.message)
          }
        }
      );
      
      // router.push("/setup/business-account");
    } catch (error) {
      // Handle error
      console.error("Submission error:", error);
			toast.error('Error submitting Profile Information')
    }
  };

  if (isPending) {
    return <div><LoadingOverlay/></div>;
  }


	return (
    <FormProvider {...methods}>
      <>
        <div className="lg:w-[80%] w-full">
          <h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
            Next of Kin Details
          </h2>
          <p className="text-sm font-normal text-foundation-black-black-400 my-0 mt-2">
            Enter the necessary details for your Next of Kin
          </p>
          <div className="mt-5 flex flex-col gap-y-4">
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="name_of_next_of_kin"
                label="Name of Next of Kin"
                type="text"
                required
                placeholder="What is the name of your Next of Kin?"
                registerName="name_of_next_of_kin"
                error={errors.name_of_next_of_kin?.message}
              />
              <InputElement
                id="relationship"
                label="Relationship"
                type="text"
                placeholder="What is your relationship with this person"
                registerName="relationship"
                error={errors.relationship?.message}
              />
            </div>
            {/* Email Adddress and gender*/}
            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="next_of_kin_address"
                label="Address of Next of Kin"
                required
                type="text"
                placeholder="Enter your Permananet Address"
                registerName="next_of_kin_address"
                error={errors.next_of_kin_address?.message}
              />
            </div>

            {/* Phone number and emergency number  */}

            <div className="flex md:flex-row flex-col w-full gap-10">
              <InputElement
                id="next_of_kin_email"
                label="Email Address"
                type="text"
                placeholder="What is your Next of Kin email address"
                registerName="next_of_kin_email"
                error={errors.next_of_kin_email?.message}
              />
              <InputElement
                id="next_of_kin_phone_number"
                label="Phone Number"
                type="text"
                required
                placeholder="Enter Your Next of Kin phone number"
                registerName="next_of_kin_phone_number"
                error={errors.next_of_kin_phone_number?.message}
              />
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <button
              type="button"
              onClick={() => handleTabSwitch("more-profile-info")}
              className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foundation-purple-purple-500 shadow-sm border-solid border-foundation-purple-purple-500 border-2 hover:bg-foundation-purple-purple-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              Prev
            </button>
            <button
              type="submit"
              onClick={() => {
                methods.handleSubmit(onSubmit)();
              }}
              className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
            >
              Save & Proceed
            </button>
          </div>
        </div>
      </>
    </FormProvider>
  );
};          

export default NextOfKin;