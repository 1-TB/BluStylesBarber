import React, { createContext, useContext, useState, useEffect } from 'react'


const StaffContext = createContext(null);

export const useStaff = () => useContext(StaffContext);

export const StaffProvider = ({ children }) => {
  const [staffs, setStaffs] = useState([]);
  
  const fetchStaffData = async () => {
    try {
      const response = await fetch("/api/staff/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const request = await response.json();
      setStaffs(request);
    } catch (error) {
      console.log("Error fetching staff", error);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  return (
    <StaffContext.Provider value={[staffs,setStaffs,fetchStaffData]}>
      {children}
    </StaffContext.Provider>
  )
}
