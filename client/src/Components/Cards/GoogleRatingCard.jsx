import React from "react";
import Rating from "@mui/material/Rating";
import GoogleIcon from "../../assets/images/google-logo.png";
import { motion } from "framer-motion";

export default function GoogleRatingCard() {
  return (
    <motion.div 
    className="col-span-1 flex flex-col justify-center items-center"
    initial={{opacity: 0, y: 50}}
    whileInView={{ opacity: 1, y: 0}}
    viewport={{ once: true }}
    transition={{ duration: 2}}
    >
      <div className="w-10 h-10 mb-3">
        <img src={GoogleIcon} alt="Google icon" className="w-full h-full" />
      </div>
      <div className="font-bold uppercase">Google</div>
      <div className="font-bold text-6xl">{4.7}</div>
      <Rating value={4.7} precision={0.5} readOnly />
    </motion.div>
  );
}
