import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import applyLogo from '../../Images/apply.png';
import Carousel from '../../Components/Carousel';
import img2 from '../../Images/c2.jpg';
import img3 from '../../Images/c3.jpg';
import img1 from '../../Images/c1.jpg';
import img4 from '../../Images/c4.jpg';
import img5 from '../../Images/c5.jpg';
import Topbar from '../../Components/Topbar';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { vendorIdAtom } from '../../Atoms/atoms';
import { useQuery } from '@tanstack/react-query';
import { getVendorId } from '../../QueriesAndMutations/AuthQueries';

const VendorHomePage = () => {
  const vId = useRecoilValue(vendorIdAtom);
  console.log(vId);
  const location = useLocation();
  const navigate = useNavigate();

  const { data, isSuccess } = useQuery({ queryKey: ['vendorIdey'], queryFn: getVendorId });
  const [vendorId, setVendorId] = useRecoilState(vendorIdAtom);

  useEffect(() => {
    if (isSuccess && data?.vendorId) {
      setVendorId(data.vendorId);
    }
  }, [isSuccess, data, setVendorId]);
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Topbar />
      <Navbar iter={1} />
      <section className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col  ">
          <div className="text-2xl font-medium text-d3  px-10 mt-40">
            Your business deserves stability and growth! With Smart Vendor Management System (SVMS), you can secure your
            vending spot legally, manage your stall efficiently, and accept digital payments with ease. Apply now and
            take control of your vending business!
          </div>
          <motion.button
            onClick={() => {
              navigate('/vendor/apply');
            }}
            className="flex items-center justify-center rounded-lg bg-d2 mt-7 ml-10 h-12 w-56 cursor-pointer"
          >
            <div className="mx-1 text-d3 font-bold">Apply Now</div>
            <img className="h-6 w-6" src={applyLogo}></img>
          </motion.button>
        </div>
        <div className="col-span-1">
          <Carousel img1={img1} img2={img2} img3={img3} img4={img4} img5={img5}></Carousel>
        </div>
      </section>
    </div>
  );
};

export default VendorHomePage;
