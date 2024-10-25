import React from 'react';
import { ZapIcon } from 'lucide-react';
import StaffCard from '../Components/StaffCard';
import staffOneImage from '../assets/images/blustyles_cut_01.jpg';
import staffTwoImage from '../assets/images/blustyles_cut_02.jpg';
import staffThreeImage from '../assets/images/blustyles_cuttype_02.jpg';

  {/* Staff data array - note: future config through json? */}
  const staffMembers = [
    {
      id: 1,
      name: "Cool Person #1",
      role: "Senior Barber",
      image: staffOneImage
    },
    {
      id: 2,
      name: "Cool Person #2",
      role: "Barber",
      image: staffTwoImage
    },
    {
      id: 3,
      name: "Cool Person #3",
      role: "Barber",
      image: staffThreeImage
    }
  ];

  const OurStaff = () => {
    return (
      <div className="min-h-screen bg-slate-800 py-16">
        <div className="container mx-auto px-4">
          {/* Header section with title and icon */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-300 mb-4">OUR STAFF</h2>
            <ZapIcon className="w-8 h-8 text-blue-400 mx-auto animate-pulse" />
          </div>
          
          {/* Staff members grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {staffMembers.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    );
  };

export default OurStaff;
