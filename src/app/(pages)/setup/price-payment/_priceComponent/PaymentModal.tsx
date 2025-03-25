// components/Modal.tsx
import React from 'react';
import { IoClose } from 'react-icons/io5';
import SelectElement from '../../_setupComponets/Input/SelectElement';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

const PaymentModalSchema = z.object({
	payment_method: z.string()
})

type PaymentData = z.infer<typeof PaymentModalSchema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const paymentMethod = [
	{ value: '', label: 'Select a Payment Method' },
	{ value: 'Card', label: 'Card payment' },
	{ value: 'Bank-transfer', label: 'Bank Transfer' },
	{ value: 'online', label: 'Online payment' },
];

const ProceedPaymentModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {

	const methods = useForm<PaymentData>({
    resolver: zodResolver(PaymentModalSchema),
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

	const onSubmit: SubmitHandler<PaymentData> = async (data) => {
		console.log('submitted')
	}
	
  const amount = 20000;
  const receiver = "Sunshine Stores";

	if (!isOpen) return null;

  return (
		<FormProvider {...methods}>
			<form action="" onSubmit={methods.handleSubmit(onSubmit)}>
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
					<div className="relative max-w-3xl w-full flex justify-center px-12 py-6">
						<div className="bg-white sm:px-12 px-6 sm:py-12 py-10 rounded-3xl max-w-2xl w-full">
							<div className="flex flex-col justify-center items-center gap-4">
								<h2 className=" capitalize font-normal text-foundation-black-black-400 text-xl">
									Make a Payment
								</h2>
								<p>
									{`{"You're"} paying "${amount}" to {receiver}`}
								</p>
								<div className="sm:w-[50%] w-full mb-6">
									<SelectElement
										id="paymentMethod"
										label="Payment Method"
										options={paymentMethod}
										registerName="paymentMethod"
										// error={errors.paymentMethod?.message}
									/>
								</div>
								<button
									type='button'
									className="rounded-xl sm:w-[50%] w-full px-4 py-3 text-sm font-semibold shadow-sm border border-solid border-foundation-purple-purple-400 bg-foundation-purple-purple-400 hover:bg-foundation-purple-purple-300 text-white disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
								>
									Proceed to Payment
								</button>
								{children}
							</div>
						</div>
						<button
							onClick={onClose}
							className="absolute right-4 top-0 cursor-pointer"
						>
							<IoClose className="w-[26px] h-[26px] object-contain bg-white rounded-full p-1" color='#8133F1'/>
						</button>
					</div>
				</div>
			</form>
		</FormProvider>
	);
};

export default ProceedPaymentModal;