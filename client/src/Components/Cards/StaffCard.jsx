import React from "react";

const StaffCard = ({ staff }) => {
  return (
    <div className="flex flex-col items-center group relative transform transition-transform duration-300 hover:scale-105">
      {/* Image container with hover effect */}
      <div className="overflow-hidden rounded-lg mb-4 w-full relative">
        <img
          src={staff.image}
          alt={`${staff.name}`}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Hover effect */}
        <div className="absolute inset-0 bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <h3 className="text-xl font-semibold text-slate-300 mb-1 transition-colors duration-300 group-hover:text-blue-400">
        {staff.name}
      </h3>
      <p className="text-blue-400 text-sm transition-colors duration-300 group-hover:text-slate-300">
        {staff.role}
      </p>
      <div className="h-0.5 w-0 bg-blue-400 transition-all duration-300 group-hover:w-1/2 mt-2" />
    </div>
  );
};

export default StaffCard;
