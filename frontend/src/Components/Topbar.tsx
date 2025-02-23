import React from 'react';
import { motion } from 'framer-motion';
import logo from '../Images/logo.png';

const Topbar = () => {
  return (
    <div className="flex border-b-[0.5px] border-d2 mx-3 p-3">
      <motion.img className="h-13 w-13 ml-5 rounded-xl mt-2 " src={logo}></motion.img>
      <div>
        <motion.div className="text-3xl font-bold text-d3  ml-3 pt-1  ">Street Niti</motion.div>

        <motion.div className="text-sm font-light text-d3 ml-3">Empowering Vendors, Transforming Cities</motion.div>
      </div>
    </div>
  );
};

export default Topbar;
