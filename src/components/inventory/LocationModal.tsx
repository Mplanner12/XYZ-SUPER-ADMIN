// components/Modal.tsx
import React from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const LocationModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999] no-scrollbar">
			<div className="relative max-w-2xl w-full flex justify-center px-6 py-6 h-[90%]">
				<div className="bg-white sm:px-4 px-4 sm:py-6 py-4 rounded-3xl max-w-xl w-full overflow-y-auto no-scrollbar">
					{title && (
						<h2 className="capitalize font-normal text-foundation-black-black-400 text-xl text-center mb-4">
							{title}
						</h2>
					)}
					{children}
				</div>
				<button
					onClick={onClose}
					className="absolute right-4 top-0 cursor-pointer"
				>
					<IoClose
						className="w-[26px] h-[26px] object-contain bg-white rounded-full p-1"
						color="#8133F1"
					/>
				</button>
			</div>
		</div>
	);
};

export default LocationModal;