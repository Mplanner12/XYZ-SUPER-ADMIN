// components/Modal.tsx
import React, { useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  styles? : string;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, children, title, styles }) => {

  const modalRef = useRef<HTMLDivElement>(null);
  // Handle focus management
  // useEffect(() => {
  //   if (isOpen) {
  //     const focusableElements = modalRef.current?.querySelectorAll(
  //       'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  //     );
  //     if (focusableElements?.length) {
  //       (focusableElements[0] as HTMLElement).focus();
  //     }
  //   }
  // }, [isOpen]);

  // Handle ESC key
  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("keydown", handleEscape);
  //   }

  //   return () => {
  //     document.removeEventListener("keydown", handleEscape);
  //   };
  // }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="relative max-w-3xl w-full flex justify-center px-12 py-4">
        <div
          className={`bg-white sm:px-12 px-6 sm:py-12 py-10 rounded-3xl ${styles} max-w-2xl w-full flex flex-col justify-center items-center`}
        >
          {title && (
            <h2 className="capitalize text-foundation-black-black-400 text-xl font-semibold text-center mb-4">
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

export default ModalComponent;