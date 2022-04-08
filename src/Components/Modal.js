import React from "react";
import { motion } from 'framer-motion';

export default function Modal({ selectedImg, setSelectedImg }) {
  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  }
  return (
    <motion.div className="backdrop fixed top-0 left-0 w-screen h-screen bg-black/60 backdrop-blur-sm" onClick={handleClick} initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}>
      <motion.img className="max-w-[60%] max-h-[90%] min-h-[80%] my-6 mx-auto border-4 border-white shadow-lg" src={selectedImg} alt="Enlarged Pic"  initial={{ y: "-100vh" }}
      animate={{ y: 0 }}/>
    </motion.div>
  );
}
