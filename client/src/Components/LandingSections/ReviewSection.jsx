import React, { useEffect, useState } from 'react'
import { ShieldCheck, ZapIcon } from 'lucide-react';
import GoogleRatingCard from '../Cards/GoogleRatingCard';
import ReviewCarousel from '../Cards/ReviewCarousel';
import  {motion}  from "framer-motion";
import FacebookRatingCard from '../Cards/FacebookRatingCard';
import QualityFeatures from '../Cards/QualityFeatures';




export default function ReviewSection() {

  return (
    <div className="min-h-[50vh] w-full p-6 bg-[#9DAED0] flex flex-col gap-4 justify-center items-center ">
      <h2 
              className="pt-6 text-5xl md:text-6xl lg:text-7xl text-[#001528] uppercase"
              style={{ 
                fontFamily: "Teko",
                textShadow: '0 5px 2px rgba(63, 105, 183, 0.2)'
              }}
            >
              Why Choose Us
            </h2>
      <ZapIcon className="w-8 h-8 mb-3 text-white mx-auto" />

     <QualityFeatures />

      <div className="max-w-2xl xl:max-w-[1500px] p-4">
        <div 
        className="w-full grid grid-cols-2 xl:grid-cols-3 "
        
        >

          {/* Google Rating */}
          <GoogleRatingCard />

          {/* Facebook Rating */}
          <FacebookRatingCard />

          {/* Center Review Card */}
          <ReviewCarousel />
        </div>
      </div>

    </div>
  );
}
