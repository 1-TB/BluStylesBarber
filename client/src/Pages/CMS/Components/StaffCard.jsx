import React from "react";
import DropdownMenu from "./ui/DropdownMenu";
import { Button } from "./ui/button";

const StaffCard = ({ staffs, handleDeleteStaff, handleEditStaff }) => {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap max-w-7xl gap-4 w-full justify-center items-center">
      {staffs && staffs.map((staff, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow-2xl overflow-visible mb-4 w-full max-w-[300px] h-72 mx-auto sm:mx-0"
        >
          <div className="flex flex-col items-center gap-2 mb-10">
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-36 rounded-t-lg object-cover object-end mb-2"
            />
            <div className="font-bold text-2xl -mb-2 text-center antialiased">
              {staff.name}
            </div>
            <div className="text-gray-500 text-center">{staff.role}</div>
            <DropdownMenu
              items={[
                {
                  label: "Edit",
                  onClick: () => {
                    handleEditStaff(staff)
                  },
                },
                {
                  label: "Delete",
                  onClick: () => handleDeleteStaff(staff),
                  variant: "destructive",
                },
              ]}
              trigger={<Button>Options</Button>}
              className="z-30 overflow-visible"
              align="right"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffCard;