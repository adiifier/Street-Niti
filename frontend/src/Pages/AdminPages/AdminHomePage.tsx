import React from 'react';
import Topbar from '../../Components/Topbar';
import AdminNavbar from '../../Components/AdminNavBar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminHomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] -z-10"></div>

      {/* Topbar & Navbar */}
      <Topbar />
      <AdminNavbar iter={1} />

      {/* Main Admin Dashboard Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <h1 className="text-3xl font-semibold text-gray-800">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, manage vendors and permissions efficiently.</p>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-blue-600">120</h2>
            <p className="text-gray-500">Total Vendors</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-green-600">85</h2>
            <p className="text-gray-500">Approved Vendors</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-red-600">15</h2>
            <p className="text-gray-500">Pending Applications</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-blue-500 text-white rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Manage Vendors</h3>
          </motion.div>

          <motion.div
            onClick={() => {
              navigate('/admin/applications');
            }}
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-green-500 text-white rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Review Applications</h3>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-yellow-500 text-white rounded-lg shadow-md text-center cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Compliance Reports</h3>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHomePage;
