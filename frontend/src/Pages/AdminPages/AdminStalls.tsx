import React from 'react';
import Topbar from '../../Components/Topbar';
import AdminNavbar from '../../Components/AdminNavBar';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { getAllStalls } from '../../QueriesAndMutations/AuthQueries';
const AdminStalls = () => {
  const { data: stalls, isError, isLoading } = useQuery({ queryKey: ['adminStalls'], queryFn: getAllStalls });

  return (
    <>
      <Topbar />
      <AdminNavbar iter={3} />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center mb-6 text-d2">Registered Stalls</h1>
        {isError ? <h1 className="text-3xl font-bold text-center mb-6 text-d3">Registered Stalls</h1> : <></>}
        {isLoading ? (
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
            {stalls.map((stall, index) => (
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
    </>
  );
};

export default AdminStalls;
