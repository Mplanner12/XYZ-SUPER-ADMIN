'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import InputElement from '@/app/(pages)/setup/_setupComponets/Input/InputElement';
import SelectElement from '@/app/(pages)/setup/_setupComponets/Input/SelectElement';
import ProceedPaymentModal from '@/app/(pages)/setup/price-payment/_priceComponent/PaymentModal';
import Pricing from '@/app/(pages)/setup/price-payment/_priceComponent/pricing';
import OverViewFilter from '@/components/finance/OverviewFilter';
import ModalComponent from '@/components/inventory/ModalComponent';
import * as data from '@/data/setupData';
import { PricePaymentSchema } from '@/lib/pricePaymentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FaCheckCircle } from 'react-icons/fa';
import { z } from 'zod';
import '../AddProduct/product.css';
import ProductFileUpload from './ProductFileUpload';
import PromotionalProductTable from './PromotionalProductTable';

type Inputs = z.infer<typeof PricePaymentSchema>;

const steps = [
	{
		id: 'Step 1',
		name: 'General Information',
		fields: [''],
	},
	{
		id: 'Step 2',
		name: 'Product Attributes',
		fields: [''],
	},
	{
		id: 'Step 3',
		name: 'Promotional Products',
		fields: [''],
	},
	{
		id: 'Step 3',
		name: 'Accounts',
		fields: [''],
	},
];

export default function AddProductComponent() {
	const [previousStep, setPreviousStep] = useState(0);
	const [currentStep, setCurrentStep] = useState(0);

	// useState for modal component
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const [completedSteps, setCompletedSteps] = useState<boolean[]>(
		Array(steps.length).fill(false)
	);

    // use state for filter
    const [openFilter, setOpenFilter] = useState<string | null>(null);

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

    const handleProceedPayment = () => {
        // handle payment logic
        console.log('proceeding with payment')
    };

    // handle filter
    const handleToggle = (filterName: string) => {
        setOpenFilter(openFilter === filterName ? null : filterName);
    };

    const handleStoreSelect = (selectedOption: string) => {
        console.log('Selected Store:', selectedOption);
    };

	return (
		<section className=" w-full flex flex-col justify-between mt-8">
			<div className="text-foundation-black-black-400 text-2xl">
				<OverViewFilter
					label="Filter By Store"
					options={['Mushin', 'Lekki', 'Tar']}
					onSelect={handleStoreSelect}
					isOpen={openFilter === 'location'}
					onToggle={() => handleToggle('location')}
				/>
			</div>
			<div>
				<h2 className="text-xl font-normal leading-4 text-foundation-black-black-400 my-0 py-2">
					Add a Product
				</h2>
			</div>

			{/* Form */}

			<FormProvider {...methods}>
				<form className=" py-6" onSubmit={handleSubmit(processForm)}>
					{/* add a product and upload product image */}
					<div className="flex flex-wrap sm:justify-between justify-start items-center py-1 gap-6 mb-3">
						<div className="sm:w-[40%]">
							<InputElement
								id="productName"
								label="Product Name"
								type="text"
								placeholder="What is the product called?"
								registerName="productName"
								// error={errors.legalConsultantAddress?.message}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<div className="flex gap-3">
								<ProductFileUpload id="productImage" register={register} />
								<ProductFileUpload id="productImage" register={register} />
								<ProductFileUpload id="productImage" register={register} />
								<ProductFileUpload id="productImage" register={register} />
							</div>
							<div>
								<h3 className="text-sm">Upload product Image</h3>
								<p className="text-sm text-foundation-grey-grey-700">
									You can upload up to four images, file formats <br /> include
									Jpeg, Jpg, SVG & PNG
								</p>
							</div>
						</div>
					</div>

					{/* stepper and form elements */}
					<div className="stepper-container w-full sm:w-fit flex-row flex gap-8 bg-foundation-purple-purple-400 rounded-2xl py-4 px-6 overflow-x-auto no-scrollbar">
						{steps.map((step, index) => (
							<div
								key={index}
								className={`step-product ${
									index === currentStep ? 'active' : ''
								} ${
									completedSteps[index] ? '' : ''
								} bg-foundation-purple-purple-100`}
							>
								{step.name}
							</div>
						))}
					</div>

					{currentStep === 0 && (
						<motion.div
							initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							<div className="mt-2 flex flex-col gap-y-4 md:w-[80%] w-full ">
								{/* Customer Plan and Number of users */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="productName"
											label="Product Name"
											type="text"
											placeholder="What is the product called?"
											registerName="productName"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="productCategory"
											label="Product Category"
											options={data.productCategory}
											registerName="productCategory"
											// error={errors.numberOfUsers?.message}
										/>
									</div>
								</div>

								{/* Payment plan and Payment method */}
								<div className="flex w-full">
									<InputElement
										id="productDescription"
										label="Description"
										type="text"
										placeholder="Write a short description for the product"
										registerName="productDescription"
										// error={errors.productDescription?.message}
									/>
								</div>

								{/* Product variant and color */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<SelectElement
											id="productVariant"
											label="Variant"
											options={data.productVariant}
											registerName="productVariant"
											// error={errors.productVariant?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="productColor"
											label="Color"
											options={data.productColor}
											registerName="productColor"
											// error={errors.productColor?.message}
										/>
									</div>
								</div>

								<p className="m-0 my-3">
									<a
										href="#"
										className=" font-inter text-sm font-[500] text-foundation-purple-purple-300"
									>
										+ Add another variant
									</a>
								</p>

								{/* Product variant and color */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="productPrice"
											label="Price(USD)"
											type="number"
											placeholder="How much is the product?"
											registerName="productPrice"
											// error={errors.productBatchNo?.message}
										/>
									</div>
									<div className="w-full">
										<InputElement
											id="productDiscount"
											label="Discount(%)"
											type="text"
											placeholder="Add product discount(%)"
											registerName="productBatchNo"
											// error={errors.productBatchNo?.message}
										/>
									</div>
								</div>

								{/* Product price and discount */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="productExpiringDate"
											label="Expiring Date"
											type="date"
											placeholder="Enter Batch Number"
											registerName="productBatchNo"
											// error={errors.productBatchNo?.message}
										/>
									</div>
									<div className="w-full">
										<InputElement
											id="productBatchNo"
											label="Batch No"
											type="text"
											placeholder="Enter Batch Number"
											registerName="productBatchNo"
											// error={errors.productBatchNo?.message}
										/>
									</div>
								</div>
							</div>
						</motion.div>
					)}
					{currentStep === 1 && (
						<motion.div
							initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							<div className="mt-2 flex flex-col gap-y-4 md:w-[80%] w-full">
								{/* product dimension and product weight */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="productDimension"
											label="Product Dimension"
											type="text"
											placeholder="Enter product dimension (L X W X H)"
											registerName="productDimension"
											// error={errors.productDimension?.message}
										/>
									</div>
									<div className="w-full">
										<InputElement
											id="productWeight"
											label="Product Weight"
											type="text"
											placeholder="Enter product weight in grams"
											registerName="productDimension"
											// error={errors.productDimension?.message}
										/>
									</div>
								</div>

								{/* Payment plan and Payment method */}
								<div className="flex flex-col sm:w-[48%] w-full">
									<label
										htmlFor="barcodeGenerated"
										className="w-fit h-fit flex font-inter text-sm font-medium leading-6 text-foundation-grey-grey-800 gap-[1px]"
									>
										Barcode (Auto-generated)
									</label>
									<div className="mt-[2px]">
										<input
											type="text"
											id="barcodeGenerated"
											placeholder="Code123"
											disabled
											className="block w-full rounded-md border border-solid py-3 px-3 text-foundation-grey-grey-900 shadow-sm outline-none border-foundation-grey-grey-600 placeholder:text-foundation-grey-grey-600 focus:border-2 focus:border-solid focus:border-foundation-purple-purple-100 focus:bg-foundation-grey-grey-50 sm:text-sm sm:leading-6"
											// {...register(barcodeGenerated)}
										/>
										{/* {error && (
											<p className="mt-2 text-sm text-red-400">{error}</p>
										)} */}
									</div>
								</div>

								<p className="m-0 my-3">
									<a
										href="#"
										className=" font-inter text-sm font-[500] text-foundation-purple-purple-300"
									>
										View Barcode
									</a>
								</p>

								{/* Product variant and color */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="productManufacturer"
											label="Manufacturer Name"
											type="text"
											placeholder="What company manufactured the product?"
											registerName="productManufacturer"
											// error={errors.productDimension?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="productCountry"
											label="Country"
											options={data.businessCountry}
											registerName="productCountry"
											// error={errors.productColor?.message}
										/>
									</div>
								</div>
								{/* <Pricing />

                                <ProceedPaymentModal isOpen={isModalOpen} onClose={closeModal} /> */}
							</div>
						</motion.div>
					)}
					{currentStep === 2 && (
						<motion.div
							initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							<div className=" flex flex-col gap-y-2">
								<h3 className="text-base font-normal">
									Add promotional product that can be sold along with the
									products you uploaded
								</h3>
								<PromotionalProductTable />

								{/* <Pricing />

                                <ProceedPaymentModal isOpen={isModalOpen} onClose={closeModal} /> */}
							</div>
						</motion.div>
					)}
					{currentStep === 3 && (
						<motion.div
							initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							transition={{ duration: 0.2, ease: 'easeInOut' }}
						>
							<div className="mt-2 flex flex-col gap-y-4 md:w-[80%] w-full">
								<h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
									Purchase Information
								</h2>
								{/* Customer Plan and Number of users */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="transactionPurchaseDescription"
											label="Transactions Description on Purchase"
											type="text"
											placeholder="Enter product name or description"
											registerName="transactionPurchaseDescription"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
									<div className="w-full">
										<InputElement
											id="costPerUnit"
											label="Cost (USD)"
											type="text"
											placeholder="Enter cost per unit"
											registerName="transactionInformation"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
								</div>

								{/* Product variant and color */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<SelectElement
											id="purchaseAccount"
											label="Chart of Account"
											options={data.orderHitory}
											registerName="purchaseAccount"
											// error={errors.productVariant?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="preferredVendor"
											label="Preferred Vendor"
											options={data.renewalType}
											registerName="preferredVendor"
											// error={errors.productColor?.message}
										/>
									</div>
								</div>

								<h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
									Sales Information
								</h2>

								{/* Product variant and color */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="transactionSalesDescription"
											label="Transactions Description on Sales"
											type="text"
											placeholder="Enter product name or description"
											registerName="transactionSalesDescription"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
									<div className="w-full">
										<InputElement
											id="costPerUnitSales"
											label="Cost (USD)"
											type="text"
											placeholder="Enter cost per unit"
											registerName="costPerUnitSales"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
								</div>

								{/* sales account and taxtype */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<SelectElement
											id="salesAccount"
											label="Chart of Account"
											options={data.orderHitory}
											registerName="salesAccount"
											// error={errors.productVariant?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="taxTypeSales"
											label="Tax Type"
											options={data.salesTaxType}
											registerName="taxTypeSales"
											// error={errors.productVariant?.message}
										/>
									</div>
								</div>

								<h2 className="text-base font-semibold leading-7 text-foundation-black-black-400 my-0 mt-1">
									Inventory Information
								</h2>

								{/* transaction sales description and min and max range */}
								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<InputElement
											id="transactionSalesDescription"
											label="Transactions Description on Sales"
											type="text"
											placeholder="Enter product name or description"
											registerName="transactionSalesDescription"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
									<div className="w-full flex flex-row gap-2">
										<InputElement
											id="reorderPointMin"
											label="Reorder Point"
											type="text"
											placeholder="Enter Min. Value"
											registerName="reorderPointMin"
											// error={errors.legalConsultantAddress?.message}
										/>
										<InputElement
											id="reorderPointMax"
											label="Reorder Point"
											type="text"
											placeholder="Enter Max. Value"
											registerName="reorderPointMax"
											// error={errors.legalConsultantAddress?.message}
										/>
									</div>
								</div>

								<div className="flex md:flex-row flex-col w-full gap-10">
									<div className="w-full">
										<SelectElement
											id="salesAccount"
											label="Chart of Account"
											options={data.orderHitory}
											registerName="salesAccount"
											// error={errors.productVariant?.message}
										/>
									</div>
									<div className="w-full">
										<SelectElement
											id="taxTypeSales"
											label="Tax Type"
											options={data.salesTaxType}
											registerName="taxTypeSales"
											// error={errors.productVariant?.message}
										/>
									</div>
								</div>

								<ModalComponent isOpen={isModalOpen} onClose={closeModal}>
									<div className="flex flex-col justify-center items-center gap-y-6 py-10">
										<FaCheckCircle color="#00A814" size={60} />
										<p className="text-base text-center">
											New Product has been added <br /> successfully
										</p>
										<button
											type="button"
											className="rounded-xl sm:w-[50%] w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
											onClick={handleProceedPayment}
										>
											Proceed to Payment
										</button>
									</div>
								</ModalComponent>
							</div>
						</motion.div>
					)}
				</form>
			</FormProvider>

			{/* Navigation */}
			<div className="py-5 md:w-[80%] w-full">
				<div className="w-full flex justify-end relative">
					<button
						onClick={currentStep <= 2 ? next : openModal}
						className={` ${
							currentStep < 2 ? 'hidden' : ''
						} rounded-xl px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer sm:w-[48%] w-full`}
					>
						Submit
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
							currentStep > 1 ? 'hidden' : ''
						} rounded-xl px-4 py-3 text-sm sm:w-[48%] w-full font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer`}
					>
						Proceed
					</button>
				</div>
			</div>
		</section>
	);
}
