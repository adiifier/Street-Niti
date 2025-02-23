import { motion } from 'framer-motion';

import heroBg from '../Images/streetLanding.png';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="relative text-white z-10 max-w-3xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl text-d3 font-extrabold">Smart Vendor Management System</h1>
          <p className="text-lg text-amber-50 mt-4">
            Transforming urban vending through transparency, efficiency, and digital payments.
          </p>
          <motion.button
            onClick={() => {
              navigate('/vendor/sign-up');
            }}
            className="mt-6 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition"
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.button>
          <motion.button
            onClick={() => {
              navigate('/sign-in');
            }}
            className="mt-6 ml-3 px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition"
            whileHover={{ scale: 1.1 }}
          >
            Login
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
