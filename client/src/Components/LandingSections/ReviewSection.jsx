import React, { useEffect, useState } from 'react'
import { ShieldCheck, ZapIcon } from 'lucide-react';
import Rating from '@mui/material/Rating';
import FacebookIcon from '../../assets/images/Facebook_Logo_Primary.png'
import GoogleRatingCard from '../Cards/GoogleRatingCard';
import ReviewCarousel from '../Cards/ReviewCarousel';
import  motion  from "framer-motion";

const iconsData = [
  {
    id: 1,
    title: "Licensed",
    description: "Our licensed and insured barbers adhere to rigorous cleanliness and sanitation standards, ensuring a safe, professional environment for all clients.",
    image: ShieldCheck
  },
  {
    id: 2,
    title: "Masters",
    description: "Our skilled barbers are dedicated to their craft, delivering high-quality haircuts with precision and care for every client’s style.",
    image: ShieldCheck
  },
  {
    id: 3,
    title: "Trusted",
    description: "With a 4.7 star rating on Google with 100+ reviews, we are a trusted choice for excellence in barbering.",
    image: ShieldCheck
  }
  // Move to backend?
];



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

      <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl gap-4 mb-11 '>
        {iconsData.map((icon) => (
          <div key={icon.id} className='flex flex-col items-center max-w-72'>
            <div className="">
              <icon.image size={32} className='text-blue-500'/>
            </div>
            <h6 className='font-bold text-lg uppercase text-[#001528]'>{icon.title}</h6>
            <div className="w-16 border-b-4 border-gray-800 mb-4"></div>
            <div className='max-w-96 text-[#001528]'>
              <p className='text-center font-abel text-lg'>
                {icon.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl xl:max-w-[1500px] p-4">
        <div className="w-full grid grid-cols-2 xl:grid-cols-3 ">

          {/* Google Rating */}
          <GoogleRatingCard />

          {/* Facebook Rating */}
          {/* Still need to figure out how to use Facebook API also make a Card component for it*/}
          <div className="col-span-1 xl:col-start-3 flex flex-col items-center justify-center">
            <div className="w-10 h-10 mb-3">
              <img
                src={FacebookIcon}
                alt="Google icon"
                className="w-full h-full"
              />
            </div>
            <div className="font-bold uppercase">Facebook</div>
            <div className="font-bold text-6xl">{4.4}</div>
            <Rating value={4.4} precision={0.5} readOnly />
            <div>{88} reviews</div>
          </div>

          {/* Center Review Card */}
          <ReviewCarousel />
        </div>
      </div>

    </div>
  );
}
