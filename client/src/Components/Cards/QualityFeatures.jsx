import React from 'react'
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const iconsData = [
  {
    id: 1,
    title: "Licensed",
    description: "Our licensed and insured barbers ensure a safe and professional environment for all clients.",
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


const QualityFeatures = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 max-w-7xl gap-4 mb-11 '>
    {iconsData.map((icon, index) => (
      <motion.div 
      key={icon.id} 
      className='flex flex-col items-center max-w-72 bg-[#001528] p-4 rounded-lg'
      initial={{ opacity: 0, y:20 }}
      whileInView={{ opacity: 1, y:0}}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2}}
      >
        <div className="">
          <icon.image size={32} className='text-blue-500'/>
        </div>
        <h6 className='font-bold text-lg uppercase text-white'>{icon.title}</h6>
        <div className="w-16 border-b-4 border-blue-500 mb-4"></div>
        <div className='max-w-96 text-[#001528]'>
          <p className='text-center font-abel text-lg text-gray-400 font-semibold'>
            {icon.description}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
  )
}

export default QualityFeatures