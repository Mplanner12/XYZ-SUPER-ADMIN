'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import PaymentContent from './paymentContent';

export default function PaymentModal() {
	const router = useRouter();

	const handleDisagree = () => {
		closeModal();
		router.push('/');
	};

	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(true);
	}, []);

	const closeModal = () => {
		setIsOpen(false);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center text-foundation-black-black-500 z-[999]">
			<div className="bg-white relative md:px-12 py-8 px-6 rounded-2xl md:w-[65%] w-[90%] max-h-[80%] overflow-auto overflow-y-scroll scroll scrollbar-none">
				<h2 className="font-normal mb-4 text-[1.5em] leading-7 text-foundation-black-black-400">
					Payment Platform Agreement
				</h2>
				<PaymentContent />

				<div className="my-6 flex-col md:flex-row flex gap-4 justify-between">
					<button
						onClick={handleDisagree}
						className="bg-white hover:bg-foundation-purple-purple-400 hover:text-white font-inter border-2 border-solid border-foundation-grey-grey-700 text-foundation-grey-grey-700 hover:border-none font-normal py-4 px-5 rounded-2xl outline-none cursor-pointer"
					>
						No, I Disagree
					</button>
					<button
						onClick={closeModal}
						className="bg-foundation-purple-purple-400 hover:bg-white hover:border-2 hover:border-solid hover:border-foundation-grey-grey-700 hover:text-foundation-grey-grey-700 font-inter border-none text-white font-normal py-4 px-5 rounded-2xl outline-none cursor-pointer"
					>
						Yes, I Agree
					</button>
				</div>
				<div
					className="absolute right-2 top-2 cursor-pointer"
					onClick={handleDisagree}
				>
					<IoClose className="w-[26px] h-[26px] object-contain bg-white rounded-full p-1" />
				</div>
			</div>
		</div>
	);
}
