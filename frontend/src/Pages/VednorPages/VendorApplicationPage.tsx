import React, { useState } from 'react';
import Topbar from '../../Components/Topbar';
import Navbar from '../../Components/Navbar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { allApplicationsAtom, currentApplicationIdAtom } from '../../Atoms/atoms';
import { createStallType } from '../../Types/types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { createStall } from '../../QueriesAndMutations/AuthQueries';
import { motion } from 'framer-motion';
const VendorApplicationPage = () => {
  const [currentApplications, setCurrentAllApplication] = useRecoilState(allApplicationsAtom);
  const appId = useRecoilValue(currentApplicationIdAtom);
  const [creatingStall, setCreatingStall] = useState(false);
  const [updateSucces, setUpdateSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,

    formState: { errors },
  } = useForm<createStallType>({ defaultValues: undefined });

  const { mutate: createStallMutation } = useMutation({
    mutationKey: ['application' + appId],
    mutationFn: createStall,
    onSuccess: (data) => {
      console.log(data);
      setUpdateSuccess(true);
    },
  });

  const onSubmit: SubmitHandler<createStallType> = (data) => {
    if (!creatingStall) {
    }
    createStallMutation(data);
  };

  if (appId === undefined) {
    return <div>Loading...</div>; // Or handle it with a placeholder
  }

  console.log('app id' + appId);

  const application = currentApplications.find((post) => post.applicationId === appId);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-d3 opacity-20 blur-[100px]"></div>

      <div className="min-h-screen bg-gray-100">
        <Topbar />
        <Navbar iter={2} />

        <div className="container mx-auto p-6 grid-cols-2 ">
          {/* {isPending && (
        <div className="flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-t-4 border-gray-500 rounded-full animate-spin"></div>
        </div>
      )}

      {isError && (
        <p className="text-center text-red-500">Failed to load application. Please try again.</p>
      )} */}

          {application && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-d2 rounded-4xl shadow-lg p-6 min-h-96 "
            >
              <h1 className="text-3xl font-semibold text-d3 mb-8 ">{application.title}</h1>
              <p className="text-gray-400 font-medium  mt-2">{application.description}</p>
              <p className="mt-10 text-sm font-medium text-gray-500 "> Location: {application.location}</p>
              <p className=" text-sm text-gray-500 mt-4">
                📅 Created At: {new Date(application.createdAt).toLocaleString()}
              </p>
              <p
                className={`mt-4 text-sm font-semibold ${
                  application.status === 'pending'
                    ? 'text-yellow-500'
                    : application.status === 'approved'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                ✅ Status: {application.status}
              </p>
              <img src={application.images.imageUrl} alt="img"></img>

              {/* Display Images */}
              {application.images?.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                  <motion.img
                    src={application.images.imageUrl}
                    alt={`Application Image `}
                    className="rounded-lg shadow-md w-full h-32 object-cover"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              )}

              {/* Permission Details (if available) */}
              {application?.permission && (
                <div className="mt-6 bg-gray-50 p-4 rounded-md shadow-sm">
                  <h3 className="text-lg font-bold text-gray-700">📜 Permission Details</h3>
                  <p className="text-gray-600 mt-1">📍 Location: {application.permission.location}</p>
                  <p className="text-gray-600">💰 Fee: ₹{application.permission.fee}</p>
                  <p className="text-gray-600">
                    📅 Valid Until: {new Date(application.permission.validUntil).toLocaleDateString()}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {application.status === 'approved' ? (
            <div className="flex mt-10 ">
              <button
                onClick={() => {
                  setCreatingStall(true);
                }}
                className={`w-fit h-12 bg-d3 text-white  m-2 flex items-center justify-center rounded-2xl p-4 cursor-pointer ${
                  creatingStall ? 'border-1 border-d2' : ' '
                } `}
              >
                Create Your Stall
              </button>
              <button
                onClick={() => {
                  setCreatingStall(false);

                  const finalData = getValues(); // ✅ Retrieve updated form data
                  console.log('Final Data to Submit:', finalData); // 🔍 Debugging
                }}
                className="cursor-pointer w-24 h-12 bg-red-400 text-white  m-2 flex items-center justify-center rounded-2xl p-4"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {creatingStall && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <>
                <div className=" mt-8 border-1 border-d3 rounded-4xl w-fit p-10">
                  <div className="text-lg font-medium text-d2 mb-5 ">Stall Details :</div>
                  <div className="grid grid-cols-2 ">
                    <div className="col-span-1 flex flex-col items-end ">
                      <div className="px-4 py-2 mt-4 text-gray-400 font-medium text-md">Name</div>
                      <div className="px-4 py-2 mt-4  text-gray-400 font-medium text-md">Location</div>
                      <div className="px-4 py-2 mt-4  text-gray-400 font-medium text-md">Size</div>
                    </div>
                    <div className="flex flex-col col-span-1 items-start">
                      <input
                        className="w-36 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out mt-4"
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        placeholder="Name"
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                      <input
                        className="w-36 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out mt-4"
                        placeholder="Locatiion"
                        {...register('location', { required: 'Location is Required' })}
                      />
                      {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                      <input
                        className="w-36 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out mt-4"
                        placeholder="Size"
                        {...register('size', {
                          required: 'Size is required',
                        })}
                        type="text"
                      />
                      {errors.size && <p className="text-red-500 text-sm">{errors.size.message}</p>}
                    </div>
                  </div>
                </div>
                <button className="cursor-pointer w-24 h-12 bg-d3 text-white  m-2 flex items-center justify-center rounded-2xl p-4">
                  {updateSucces ? 'Success' : 'Submit '}
                </button>
              </>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorApplicationPage;
