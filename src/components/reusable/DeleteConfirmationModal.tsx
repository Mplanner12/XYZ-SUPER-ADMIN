import React from "react";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
  message?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName = "item",
  message,
}) => {
  if (!isOpen) return null;

  const defaultMessage = `Are you sure you want to delete this ${itemName}? This action cannot be undone.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
      <div className="bg-foundation-black-black-400/80 backdrop-blur-md rounded-xl p-6 w-full max-w-sm shadow-2xl border border-foundation-grey-grey-700/50">
        <h3 className="text-xl font-semibold text-red-400 mb-4">
          Confirm Deletion
        </h3>
        <p className="text-foundation-grey-grey-300 mb-6 text-sm">
          {message || defaultMessage}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-foundation-grey-grey-600 text-white rounded-lg hover:bg-foundation-grey-grey-700 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
