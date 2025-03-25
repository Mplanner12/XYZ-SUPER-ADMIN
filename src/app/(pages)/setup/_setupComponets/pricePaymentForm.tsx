'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import ModulePricing from '@/components/pricing-page/ModulePricing';
import * as data from '@/data/setupData';
import { PricePaymentSchema } from '@/lib/pricePaymentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import ProceedPaymentModal from '../price-payment/_priceComponent/PaymentModal';
import InputElement from './Input/InputElement';
import SelectElement from './Input/SelectElement';
import InputFileUpload from './Input/UploadInputElement';

type Inputs = z.infer<typeof PricePaymentSchema>;

const steps = [
	{
		id: 'Step 1',
		name: 'Product Information',
		fields: [
			'customerPlan',
			'numberOfUsers',
			'paymentPlan',
			'paymentMethod',
			'orderHistory',
			'renewalType',
			'currencyType',
		],
	},
	{
		id: 'Step 2',
		name: 'Pricing',
		fields: [''],
	},
];

export default function PricePaymentForm() {
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);

    // useState for modal component
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [completedSteps, setCompletedSteps] = useState<boolean[]>(
		Array(steps.length).fill(false)
	);
	const delta = currentStep - previousStep;

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

	type FieldName = keyof Inputs;

	const next = async () => {
		const fields = steps[currentStep].fields;
		const output = await trigger(fields as FieldName[], { shouldFocus: true });

		if (!output) return;

		if (currentStep < steps.length - 1) {
			if (currentStep === steps.length - 2) {
				await handleSubmit(processForm)();
			}
			setPreviousStep(currentStep);
			setCurrentStep((step) => step + 1);
			setCompletedSteps((prev) => {
				const newCompletedSteps = [...prev];
				newCompletedSteps[currentStep] = true;
				return newCompletedSteps;
			});
		}
	};

	const prev = () => {
		if (currentStep > 0) {
			setPreviousStep(currentStep);
			setCurrentStep((step) => step - 1);
		}
	};

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

	return (
		<section className=" w-full flex flex-col 2md:flex-col justify-between">
			<div className="stepper-container w-full flex-row flex gap-3">
				{steps.map((step, index) => (
					<div
						key={index}
						className={`step ${index === currentStep ? 'active' : ''} ${
							completedSteps[index] ? 'completed' : ''
						} bg-foundation-purple-purple-100`}
					></div>
				))}
			</div>

			{/* Form */}

			<FormProvider {...methods}>
				<form className=" py-2" onSubmit={handleSubmit(processForm)}>
					{currentStep === 0 && (
						<motion.div
							initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							<div className="lg:w-[80%] w-full">
								<h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0">
									Product Information
								</h2>

								<div className="max-w-[450px] flex flex-wrap gap-6 justify-between mt-2 mb-7">
									<div className="flex flex-col justify-center items-start text-start gap-2">
										<h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
											Product Name
										</h4>
										<p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
											XYZ
										</p>
									</div>
									<div className="flex flex-col 2md:flex-rowcol justify-center items-start text-start gap-2">
										<h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
											Product Number
										</h4>
										<p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
											DES-125-1220
										</p>
									</div>
									<div className="flex flex-col 2md:flex-rowcol justify-center items-start text-start gap-2">
										<h4 className="m-0 text-sm font-normal leading-5 text-foundation-black-black-400 my-0">
											Customer ID
										</h4>
										<p className="m-0 ml-2 text-foundation-grey-grey-700 text-xs">
											CIDA10000
										</p>
									</div>
								</div>

								<div className="mt-2 flex flex-col gap-y-4">
									{/* Customer Plan and Number of users */}
									<div className="flex md:flex-row flex-col w-full gap-10">
										<div className="w-full">
											<SelectElement
												id="customerPlan"
												label="Customer Plan"
												options={data.customerPlan}
												registerName="customerPlan"
												error={errors.customerPlan?.message}
											/>
										</div>
										<div className="w-full">
											<SelectElement
												id="numberOfUsers"
												label="Number of Users"
												options={data.numberOfUsers}
												registerName="numberOfUsers"
												error={errors.numberOfUsers?.message}
											/>
										</div>
									</div>

									{/* Payment plan and Payment method */}
									<div className="flex md:flex-row flex-col w-full gap-10">
										<div className="w-full">
											<SelectElement
												id="paymentPlan"
												label="Payment Plan"
												options={data.paymentPlan}
												registerName="paymentPlan"
												error={errors.paymentPlan?.message}
											/>
										</div>
										<div className="w-full">
											<SelectElement
												id="paymentMethod"
												label="Payment Method"
												options={data.paymentMethod}
												registerName="paymentMethod"
												error={errors.paymentMethod?.message}
											/>
										</div>
									</div>

									{/* Order History and Renewal Type */}
									<div className="flex md:flex-row flex-col w-full gap-10">
										<div className="w-full">
											<SelectElement
												id="orderHistory"
												label="Order History Period"
												options={data.orderHitory}
												registerName="orderHistory"
												error={errors.orderHistory?.message}
											/>
										</div>
										<div className="w-full">
											<SelectElement
												id="renewalType"
												label="Renewal Type"
												options={data.renewalType}
												registerName="renewalType"
												error={errors.renewalType?.message}
											/>
										</div>
									</div>

									{/* Business Type and filling information */}
									<div className="flex flex-col w-full gap-10">
										<div className="w-full md:w-[46%]">
											<SelectElement
												id="currencyType"
												label="Currency Type"
												options={data.currencyType}
												registerName="currencyType"
												error={errors.currencyType?.message}
											/>
										</div>
									</div>
								</div>
								<p className="m-0 my-3">
									<a
										href="#"
										className=" font-inter text-sm text-foundation-purple-purple-300"
									>
										Try our free plan Valid for 30 days with Limited Features
									</a>
								</p>
							</div>
						</motion.div>
					)}
					{currentStep === 1 && (
						<div>
              <ModulePricing />
							<ProceedPaymentModal isOpen={isModalOpen} onClose={closeModal} />
						</div>
					)}
				</form>
			</FormProvider>

			{/* Navigation */}
			<div className="py-5">
				<div className="w-full flex justify-end relative">
					<button
						onClick={openModal}
						className={` ${
							currentStep === 0 ? 'hidden' : 'buttom-10 absolute'
						} rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
					>
						Proceed to Payment
					</button>
				</div>
				<div className="flex justify-between">
					<button
						type="button"
						onClick={prev}
						disabled={currentStep === 0}
						className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-foundation-purple-purple-500 shadow-sm border-solid border-foundation-purple-purple-500 border-2 hover:bg-foundation-purple-purple-400 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
					>
						Prev
					</button>
					<button
						type="button"
						onClick={next}
						disabled={currentStep === steps.length - 1}
						className={` ${
							currentStep === 1 ? 'hidden' : ''
						} rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
					>
						Next
					</button>
				</div>
			</div>
		</section>
	);
}
