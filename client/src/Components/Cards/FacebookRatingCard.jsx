import React from 'react'
import Rating from '@mui/material/Rating';
import FacebookIcon from '../../assets/images/Facebook_Logo_Primary.png'
import { motion } from 'framer-motion';
const FacebookRatingCard = () => {
  return (
    <motion.div 
    className="col-span-1 xl:col-start-3 flex flex-col items-center justify-center"
    initial={{opacity: 0, y: 50}}
    whileInView={{ opacity: 1, y: 0}}
    viewport={{ once: true }}
    transition={{ duration: 2}}
    >
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
  </motion.div>
  )
}

export default FacebookRatingCard