import React from "react";
import { ZapIcon } from "lucide-react";
import StaffCard from "../Cards/StaffCard";
import staffOneImage from "../../assets/images/blustyles_cut_01.jpg";
import staffTwoImage from "../../assets/images/blustyles_cut_02.jpg";
import staffThreeImage from "../../assets/images/blustyles_cuttype_02.jpg";
import { useStaff } from "../../Pages/CMS/StaffProvider";

const OurStaff = () => {
  const [staffs] = useStaff();
  return (
    <div className="min-h-screen bg-[#001528] py-16 content-center">
      <div className="container mx-auto px-4">
        {/* Header section */}
        <div className="text-center mb-12">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl text-white uppercase"
            style={{ 
              fontFamily: "Teko",
              textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
            }}
          >
            Our Staff
          </h2>
          <ZapIcon className="w-8 h-8 text-blue-400 mx-auto" />
        </div>
        
      </div>

      {/* Staff members grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {staffs && staffs.map((staff, index) => (
          <StaffCard key={index} staff={staff} />
        ))}
      </div>
    </div>
  );
};

export default OurStaff;
