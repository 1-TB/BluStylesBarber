import React, { useState, useEffect, useCallback } from "react";
import { UserPlus } from "lucide-react";
import StaffCard from "./Components/StaffCard";
import AddStaffModal from "./Modals/AddStaffModal";
import { useAuth } from "./AuthContext";
import { useStaff } from "./StaffProvider";
import ErrorModal from "./Modals/ErrorModal"

const StaffManagement = () => {
   const [openStaffModal, setOpenStaffModal] = useState(false);
   const [openErrorModal, setOpenErrorModal] = useState(false);
   const [editStaffData, setEditStaffData] = useState(null);
   const [error,setError] = useState('')
   const [staffs,setStaff,fetchStaffData] = useStaff();
   const { user } = useAuth();

   // Fetch current Staff from database;
   useEffect(() => {
     fetchStaffData();
   }, [fetchStaffData]);

   // Edit Staff function
   const handleEditStaff = (staff) => {
     setEditStaffData(staff);
     setOpenStaffModal(true);
   };

   const handleAddStaff = () => {
    setEditStaffData(null)
    setOpenStaffModal(true)
   }

   // Delete Staff Function
   const handleDeleteStaff = async (staff) => {
     try {
       const response = await fetch(`/api/staff/${staff._id}`, {
         method: "DELETE",
         headers: {
           "Content-Type": "application/json",
           Authorization: `Bearer ${user.token}`,
         },
       });
        
       const data = await response.json();

       if (!response.ok) {
        setError(data.message)
        setOpenErrorModal(true);
         throw new Error(`HTTP error! Status: ${response.status}`);
       }

       // Optionally, refresh the staff list after deletion
       fetchStaffData();
     } catch (error) {
       console.error("Unable to delete Staff,", error);
     }
   };
    
   return (
     <>
       <div className="min-h-screen bg-gray-50">
         <main className="max-w-7xl mx-auto px-4 md:px-6 pt-28  pb-6">
           <div className="flex flex-col sm:flex-row justify-between items-center bg-white shadow-xl rounded-lg p-4 md:p-6 mb-10">
             <div className="flex flex-col justify-center items-center sm:items-start gap-2 mb-4 sm:mb-0 w-full sm:w-auto">
               <h1 className="text-3xl -mb-2 font-bold text-gray-900 text-center sm:text-left">
                 Staff Overview
               </h1>
               <div className="text-sm text-gray-500 text-center sm:text-left">
                 Add, edit, or remove staff members.
               </div>
             </div>
             
             <div className="flex flex-row items-center gap-2 w-full justify-center  sm:w-auto">
               <button
                 className="bg-indigo-900 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-center max-w-36 transition-opacity hover:opacity-80"
                 onClick={() => handleAddStaff()}
               >
                 <UserPlus /> Add Staff
               </button>
             </div>
           </div>
            
           <StaffCard 
             staffs={staffs}
             handleDeleteStaff={handleDeleteStaff}
             handleEditStaff={handleEditStaff}
           />

           <AddStaffModal
             isOpen={openStaffModal}
             onClose={() => setOpenStaffModal(false)}
             initialData={editStaffData}
             onSuccessfulSubmit={fetchStaffData}
           />

           {error && 
           <ErrorModal 
           isOpen={openErrorModal}
           onClose={() => setOpenErrorModal}
           errorMessage={error}
           setErrorMessage={setError}
           />
           }
         </main>
       </div>
     </>
   );
};

export default StaffManagement;