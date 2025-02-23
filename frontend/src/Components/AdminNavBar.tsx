import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ iter }: { iter: number }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-16 mx-4 sm:mx-8 md:mx-16 lg:mx-32 xl:mx-64 mt-6 bg-d2 rounded-3xl">
      {/* Home Button */}
      <div
        onClick={() => navigate('/admin/home')}
        className={`text-${
          iter === 1 ? 'd2' : 'd3'
        } cursor-pointer text-sm sm:text-md font-semibold flex items-center justify-center my-2 sm:my-4 px-4 sm:px-8 py-2 ${
          iter === 1 ? 'rounded-xl bg-d3' : ''
        } transition duration-300`}
      >
        Home
      </div>

      {/* Applications Button */}
      <div
        onClick={() => navigate('/admin/applications')}
        className={`text-${
          iter === 2 ? 'd2' : 'd3'
        } cursor-pointer text-sm sm:text-md font-semibold flex items-center justify-center px-4 sm:px-8 my-2 sm:my-4 py-2 ${
          iter === 2 ? 'rounded-xl bg-d3' : ''
        } transition duration-300`}
      >
        Applications
      </div>

      {/* Stalls Button */}
      <div
        onClick={() => navigate('/admin/stalls')}
        className={`text-${
          iter === 3 ? 'd2' : 'd3'
        } cursor-pointer text-sm sm:text-md font-semibold flex items-center justify-center px-4 sm:px-8 my-2 sm:my-4 py-2 ${
          iter === 3 ? 'rounded-xl bg-d3' : ''
        } transition duration-300`}
      >
        Stalls
      </div>

      {/* About Us Button */}
      <div
        onClick={() => navigate('/aboutUs')}
        className={`text-${
          iter === 4 ? 'd2' : 'd3'
        } cursor-pointer text-sm sm:text-md font-semibold flex items-center justify-center px-4 sm:px-8 my-2 sm:my-4 py-2 ${
          iter === 4 ? 'rounded-xl bg-d3' : ''
        } transition duration-300`}
      >
        About Us
      </div>
    </div>
  );
};

export default AdminNavbar;
