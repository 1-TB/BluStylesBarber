import React from 'react';

const HoverButton = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-6 py-3 
        bg-slate-800 
        text-slate-200 
        font-semibold 
        tracking-wider 
        uppercase
        transform 
        transition-all 
        duration-300
        hover:bg-slate-700
        hover:scale-105
        hover:shadow-lg
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default HoverButton;