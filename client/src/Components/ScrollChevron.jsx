import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const ScrollChevron = ({ direction, onClick }) => {
  const baseClasses = `absolute top-1/2 -translate-y-1/2 z-10 
    bg-slate-800 p-2 rounded-full text-slate-200 
    hover:bg-slate-600 transition-all duration-300
    shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.7)]`;

  const directionClasses = {
    left: '-translate-x-4 left-0',
    right: 'translate-x-4 right-0'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${directionClasses[direction]}`}
    >
      {direction === 'left' ? (
        <ChevronLeftIcon className="w-6 h-6" />
      ) : (
        <ChevronRightIcon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ScrollChevron;