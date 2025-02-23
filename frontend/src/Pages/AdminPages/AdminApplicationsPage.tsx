import React, { useEffect, useState } from 'react';
import Topbar from '../../Components/Topbar';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { GetAllAplications } from '../../QueriesAndMutations/AuthQueries';
import Navbar from '../../Components/Navbar';
import AdminNavbar from '../../Components/AdminNavBar';
import { atom, useRecoilState } from 'recoil';
import { allApplicationsAtom, currentApplicationIdAtom } from '../../Atoms/atoms';
import { useNavigate } from 'react-router-dom';

const AdminApplicationsPage = () => {
  const navigate = useNavigate();
  const [all, setAll] = useState(true);
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false);
  const [rejected, setRejected] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleString();
  };

  const [currentApplicationIdThis, setCurrentApplicationIdThis] = useRecoilState(currentApplicationIdAtom);

  const [currentAllApplications, setCurrentAllApplication] = useRecoilState(allApplicationsAtom);

  const truncateText = (text: string, length: number) => {
    const words: string[] = text.split(' ');
    if (words.length <= length) {
      return words;
    }
    const txt = words.slice(0, length).join(' ') + '...';
    return txt;
  };

  const {
    data: rawInfo,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['adminApplications'], queryFn: GetAllAplications });

  let info;
  const filterApplications = () => {
    if (all) {
      info = rawInfo;
    } else {
      info = rawInfo.filter((post) => {
        if (pending) {
          return post.status === 'pending';
        } else if (approved) {
          return post.status === 'approved';
        } else if (rejected) {
          return post.status === 'rejected';
        }
      });
    }
  };

  filterApplications();

  const ready = (Id) => {
    console.log(info);
    console.log(Id);
    console.log(currentAllApplications);
    console.log(currentApplicationIdThis);
    setCurrentAllApplication(info);
    setCurrentApplicationIdThis(Id);
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-d3 opacity-20 blur-[100px]"></div>
      <Topbar />\
      <AdminNavbar iter={2} />
      <div className=" grid rounded-xl ml-1 mr-1  grid-cols-4 text-white  h-14 md:ml-10 mt-8 w-fit  items-center justify-center bg-d3">
        <div
          onClick={() => {
            setAll(true);
            setPending(false);
            setApproved(false);
            setRejected(false);
          }}
          className={`col-span-1 w-26  flex items-center cursor-pointer justify-center h-10  bg- bg-${
            all ? 'd2' : 'd3'
          }  ml-2  rounded-2xl`}
        >
          All
        </div>
        <div
          onClick={() => {
            setAll(false);
            setPending(true);
            setApproved(false);
            setRejected(false);
          }}
          className={`col-span-1 w-fit cursor-pointer  flex items-center justify-center  h-10  bg-${
            pending ? 'd2' : 'd3'
          } mr-2 rounded-2xl  p-2 px-6`}
        >
          Pending
        </div>
        <div
          onClick={() => {
            setAll(false);
            setPending(false);
            setApproved(true);
            setRejected(false);
          }}
          className={`col-span-1 w-fit   flex items-center justify-center  h-10   bg- bg-${
            approved ? 'd2' : 'd3'
          } cursor-pointer my-2 rounded-2xl p-2 px-6`}
        >
          Approved
        </div>
        <div
          onClick={() => {
            setAll(false);
            setPending(false);
            setApproved(false);
            setRejected(true);
          }}
          className={`col-span-1 w-fit  flex items-center justify-center cursor-pointer  h-10  bg- bg-${
            rejected ? 'd2' : 'd3'
          } my-2 rounded-2xl p-2 px-6 mr-2 ml-2`}
        >
          Rejected
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="  p-4 sm:p-6 lg:p-8 bg-d2 rounded-xl md:min-w-[1450px] mx-4 mt-10"
      >
        <div className="bg-d2 rounded-lg shadow-lg p-6 space-y-6">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-t-4 border-d3rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="text-center text-red-500">
              <p>Oops! Something went wrong, please try again later.</p>
            </div>
          )}

          {/* No Data Available */}
          {Array.isArray(info) && info.length === 0 && (
            <p className="text-center text-gray-500">No applications available.</p>
          )}

          {/* Render Applications */}
          {Array.isArray(info) && info.length > 0 && (
            <div className="space-y-4">
              {info.map((post) => (
                <motion.div
                  onClick={() => {
                    ready(post.applicationId);

                    navigate('/admin/application');
                  }}
                  key={post.applicationId}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-100 my-8 rounded-lg p-4 md:p-8 cursor-pointer "
                >
                  <h3 className="text-xl font-semibold text-d3 mb-4">{post.title}</h3>
                  <p className="text-gray-700 font-medium text-md">{truncateText(post.description, 50)}</p>
                  <div className="text-md font-light py-2 text-d2">Location: {post.location}</div>
                  <div
                    className={`text-sm my-2 mb-3 text-gray-800 rounded-4xl w-40 flex justify-center items-center  h-8  bg-${
                      post.status === 'pending' ? 'yellow-500' : post.status === 'approved' ? 'd3' : 'red-400'
                    }`}
                  >
                    Status: {post.status}
                  </div>
                  <div className="text-xs text-gray-500 mt-4">{formatDate(post.createdAt)}</div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminApplicationsPage;
