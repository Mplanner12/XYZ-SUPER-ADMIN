"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextProps {
  openModal: (modalComponent: ReactNode) => void;
  closeModal: () => void;
  currentModals: ReactNode[];
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modals, setModals] = useState<ReactNode[]>([]);

  const openModal = (modalComponent: ReactNode) => {
    document.body.style.overflow = "hidden";
    setModals((prevModals) => [...prevModals, modalComponent]);
  };

  const closeModal = () => {
    setModals([]);
    document.body.style.overflow = "";
  };

  const currentModals = modals;

  const value: ModalContextProps = { openModal, closeModal, currentModals };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.length > 0 && (
        <div className="modal-container">
          {modals.map((modal, index) => (
            <div key={index} className="modal-wrapper">
              {modal}
            </div>
          ))}
        </div>
      )}
    </ModalContext.Provider>
  );
};
