import Topbar from '../../Components/Topbar';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { createApplicationType } from '../../Types/types';
import { useMutation } from '@tanstack/react-query';
import { CreateApplicationPost } from '../../QueriesAndMutations/AuthQueries';
import { useState } from 'react';

const VendorApplicationsFormPage = () => {
  const [applicationSuccess, setApplicationSuccess] = useState(false);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<createApplicationType>();

  const { mutate: createApplicationMutation } = useMutation({
    mutationFn: CreateApplicationPost,
    onSuccess: (data) => {
      setApplicationSuccess(true);
    },
    onError: (error) => {},
  });

  const onSubmit: SubmitHandler<createApplicationType> = (data) => {
    if (data.image && data.image[0]) {
      const file: File = data.image[0];
      console.log(file);
    }
    createApplicationMutation(data);
  };

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <Topbar />
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-2xl font-semibold text-d3  ml-12 mb-8 mt-5">Vendor Application Form</h1>
          <div className="flex  gap-3 w-full">
            <div className="w-full flex flex-col items-start ml-8 ">
              <label className="text-sm font-medium text-d3 ml-5 ">Title</label>
              <input
                className="w-1/2 px-4 p-3 py-2 border mx-4 mb-5 mt-1  text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out"
                type="text"
                {...register('title')}
                placeholder="Enter the title"
              />
              {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
            </div>
            <div className="w-full flex flex-col items-start ml-8">
              <label className="text-sm font-medium text-d3 ml-5">Location</label>
              <input
                className="w-1/2 px-4  p-3 py-2 mx-4 mb-5 mt-1 border border-gray-300  text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out"
                type="text"
                {...register('location')}
                placeholder="Location"
              />
              {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
            </div>
          </div>
          <input
            className="  w-56 px-4 py-2 border-1 border-d3 mx-12  text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out"
            id="file"
            placeholder="Choose picture"
            type="file"
            accept=" image/jpg image/jpeg image/png"
            {...register('image')}
          />
          {errors.image && <p className="text-red-500 text-xs">{String(errors.image.message)}</p>}

          <div className="flex flex-col items-start justify-center mx-9">
            <textarea
              className="w-1/2 px-4 py-2 border h-96 border-gray-300 m-4 text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out"
              {...register('description')}
              placeholder="Description"
            />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>
          {!applicationSuccess && (
            <button
              className="h-10 w-28 text-white bg-d3 rounded-xl text-md flex items-center justify-center border-[0.5px] border-white cursor-pointer font-semibold ml-13 p-2"
              type="submit"
            >
              Submit
            </button>
          )}
          {applicationSuccess && (
            <div className="h-10 w-64 text-white bg-d3 rounded-xl text-md flex items-center justify-center border-[0.5px] border-white cursor-pointer font-semibold ml-13 p-2">
              Successfully Applied !
            </div>
          )}
        </form>
      </section>
    </div>
  );
};

export default VendorApplicationsFormPage;
