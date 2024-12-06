import React, { useState, useEffect } from "react";
import { ZapIcon, Loader2 } from "lucide-react";
import StaffCard from "../Cards/StaffCard";
import { useStaff } from "../../Pages/CMS/StaffProvider";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const OurStaff = () => {
  const [staffs, setStaffs, fetchStaffData] = useStaff();
  const [isLoading, setIsLoading] = useState(true);
  let retires = 0;
  const MAX_RETRIES = 5; // Maximum number of retries

  useEffect(() => {
    const checkForStaff = async () => {
      if (staffs && staffs.length > 0) {
        setIsLoading(false);
      } else if (retires < MAX_RETRIES) {
        await fetchStaffData();
        retires++;
        setTimeout(checkForStaff, 4000); // Retry every 2 seconds
      } else {
        setIsLoading(false);
      }
    };

    checkForStaff();

    return () => {
      retires = 0;
    };
  }, []);
  return (
    <div className="min-h-screen bg-[#001528] py-16 content-center">
      {/* Header Section */}
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl text-white uppercase"
            style={{
              fontFamily: "Teko",
              textShadow: "0 5px 2px rgba(63, 105, 183, 0.2)",
            }}
          >
            Our Staff
          </h2>
          <ZapIcon className="w-8 h-8 text-blue-400 mx-auto" />
        </div>
      </div>

      {/* Staff Section || Error Message saying unable to load */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
      ) : staffs && staffs.length > 0 ? (
        <motion.div
          className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {staffs.map((staff, index) => (
            <motion.div
              key={index}
              variants={item}
              className="md:w-[calc(33.333%-2rem)]"
            >
              <StaffCard staff={staff} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="mx-auto text-white w-full max-w-xl flex justify-center items-center flex-col"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p className="text-center w-full max-w-lg" variants={item}>
            Staff information is currently unavailable. Please refresh the page
            or come back later as we work to resolve this.
          </motion.p>
          <motion.button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 w-36 bg-blue-500 rounded-lg hover:bg-blue-600"
            variants={item}
          >
            Refresh Page
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default OurStaff;
