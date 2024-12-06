import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';
import { Phone } from 'lucide-react';

const BookingDialog = () => {
  const navigate = useNavigate();

  const handleCallShop = () => {
    window.location.href = 'tel:417-227-0001';
  };

  const handleGetCall = () => {
    navigate('/booking');
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button 
          className="bg-transparent text-white border border-white/40 px-8 sm:px-12 md:px-16 py-3 md:py-4 uppercase text-base sm:text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          style={{ fontFamily: "Teko", letterSpacing: "0.1em" }}
        >
          REQUEST A BOOKING TODAY
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#001528] border border-blue-400/30">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white text-xl">Choose Booking Method</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            How would you like to proceed with your booking?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel 
            className="bg-transparent border-white/40 text-white hover:bg-white/10"
            onClick={handleCallShop}
          >
            <Phone className="mr-2 h-4 w-4" />
            Call Us
          </AlertDialogCancel>
          <AlertDialogAction 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleGetCall}
          >
            Have Us Call You
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default BookingDialog;