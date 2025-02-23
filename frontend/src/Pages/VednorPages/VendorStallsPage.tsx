import { useRecoilState, useRecoilValue } from 'recoil';
import Navbar from '../../Components/Navbar';
import Topbar from '../../Components/Topbar';
import { motion } from 'framer-motion';
import { vendorIdAtom } from '../../Atoms/atoms';
import { useMutation } from '@tanstack/react-query';
import { getVendorStalls } from '../../QueriesAndMutations/AuthQueries';
import { data } from 'react-router-dom';
import { useEffect } from 'react';

const VendorStalls = () => {
  const vId = useRecoilValue(vendorIdAtom);
  console.log(vId);
  const {
    mutate: stallsMutation,
    data: stalls,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ['stalls'],
    mutationFn: getVendorStalls,
    onSuccess: () => {},
  });

  useEffect(() => {
    stallsMutation(vId);
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-d3 opacity-20 blur-[100px]"></div>
      <Topbar />
      <Navbar iter={3} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-d2">Registered Stalls</h1>
        {isError ? <h1 className="text-3xl font-bold text-center mb-6 text-red-400">Some error occured</h1> : <></>}
        {isPending ? (
          <motion.div
            className="flex justify-center items-center h-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <p className="text-lg text-gray-600">Loading stalls...</p>
          </motion.div>
        ) : (
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {stalls?.map((stall, index) => (
              <motion.div
                key={stall.stallId}
                className="bg-d2 shadow-lg rounded-xl overflow-hidden "
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-d3">{stall.name}</h2>
                  <p className="text-gray-400">📍 {stall.location}</p>
                  <p className="text-gray-400">📏 Size: {stall.size}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default VendorStalls;
