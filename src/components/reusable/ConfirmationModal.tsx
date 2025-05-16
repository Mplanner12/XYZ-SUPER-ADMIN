import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirmation-dialog">
      <DialogTitle id="confirmation-dialog" className="text-lg font-semibold">
        Are you sure you want to delete this business?
      </DialogTitle>
      <DialogContent className="flex flex-col items-center">
        <div className="mt-4 flex justify-between w-full">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg border border-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
