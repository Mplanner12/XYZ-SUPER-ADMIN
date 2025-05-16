import { X } from 'lucide-react';
import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  return (
    <div className="flex justify-center fixed top-0 left-0 right-0 bottom-0 z-50 w-full h-full bg-[#434343] bg-opacity-50 overflow-y-auto py-2 md:pt-[4rem]">
      <div className="relative ">
        <button onClick={onClose}
          className="absolute bg-white h-10 -top-12 -right-10 text-gray-500 hover:text-gray-700 cursor-pointer w-10 justify-center items-center mx-auto flex rounded-full"
        >
          <X className="text-primary-normal" />
        </button>
        <div className="bg-white rounded-2xl justify-center items-center shadow-md w-[25rem] md:w-[40rem] relative p-6 no-scrollbar">
          <div className="relative w-auto max-w-3xl mx-auto my-6"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onClose();
              }
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};