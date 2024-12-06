// ErrorModal.jsx
import React, { useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../Components/ui/dialog";
import { Button } from "../Components/ui/button";


export default function ErrorModal({ isOpen, onClose, errorMessage, setErrorMessage}) {
  const handleClose = () => {
    setErrorMessage('')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader className="text-center">
          <h3 className="text-2xl font-bold ">
            Error
          </h3>
        </DialogHeader>
        <div className="text-center">
          {errorMessage}
        </div>
        <Button 
        className="w-full mt-3"
        onClick={() => handleClose()}
        >
          Dismiss
        </Button>
      </DialogContent>
    </Dialog>
  );
}