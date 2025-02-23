import { easeIn, motion } from 'framer-motion';
import { Inputbox } from '../../Components/Inputbox';
import logo from '../../Images/logo.png';
import adminImg from '../../Images/street.png';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { adminSignUpType } from '../../Types/types';
import { useMutation } from '@tanstack/react-query';
import { SignUpPost } from '../../QueriesAndMutations/AuthQueries';
import { data, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminSignupPage = () => {
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<adminSignUpType>();

  const { mutate: adminSignUpMutate } = useMutation({
    mutationFn: SignUpPost,
    onSuccess: (data) => {
      setLoginFailed(true);
      localStorage.setItem('token', data.token);
      navigate('/vendor/home');
    },
    onError: () => {
      setLoginFailed(true);
    },
  });
  const onSubmit: SubmitHandler<adminSignUpType> = (data) => {
    console.log(data);
    adminSignUpMutate(data);
  };

  return (
    <div className="w-full grid grid-cols-2 h-screen overflow-hidden">
      {/* Left Section - Illustration & Info */}

      {/* Right Section - Form */}
      <div className="col-span-2 md:col-span-1 bg-white flex flex-col items-center justify-center p-8 max-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="flex flex-col items-center justify-center border border-gray-300 rounded-lg p-8 w-full max-w-md"
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
          >
            <motion.img className="mb-4 w-16 h-16" src={logo} alt="Logo" />
            <h2 className="font-bold text-2xl text-d2 mb-4">Admin Sign Up</h2>

            <div
              className="w-full"
              onClick={() => {
                setValue('role', 'admin');
              }}
            >
              <Inputbox
                label="FirstName"
                type="text"
                placeholder="First Name"
                register={register('firstName', { required: 'Firstname is required' })}
              />{' '}
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
              <Inputbox
                label="LastName"
                type="text"
                placeholder="Last Name"
                register={register('lastName', { required: 'Lastname is required' })}
              />{' '}
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
              <Inputbox
                label="Email"
                type="email"
                placeholder="Email Address"
                register={register('email', { required: 'Email is required' })}
              />{' '}
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              <Inputbox
                label="Password"
                type="password"
                placeholder="Password"
                register={register('password', { required: 'Password is required', minLength: 6 })}
              />{' '}
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              <Inputbox
                label="AdminKey"
                type="text"
                placeholder="Admin Key"
                register={register('AdminKey', { required: 'Admin Key is required' })}
              />{' '}
              {errors.AdminKey && <p className="text-red-500 text-xs">{errors.AdminKey.message}</p>}
              <Inputbox
                label="Designation"
                type="text"
                placeholder="Your Designation"
                register={register('admin.designation', { required: 'Designation is required' })}
              />{' '}
              {errors.admin?.designation && <p className="text-red-500 text-xs">{errors.admin?.designation.message}</p>}
            </div>
          </motion.div>

          <motion.button
            className="bg-d3 text-xl font-bold mt-6 p-3 rounded-lg text-white w-72 h-12 cursor-pointer flex items-center justify-center hover:bg-d4"
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
          >
            Sign Up
          </motion.button>
          <p className="text-gray-500 text-center text-sm flex items-center justify-center ">
            Already have an account ?{' '}
            <div
              className="font-light underline cursor-pointer"
              onClick={() => {
                navigate('/sign-in/admin');
              }}
            >
              Sign In
            </div>
          </p>
          {loginFailed && (
            <p className=" text-center text-red-400 rounded-2xl text-md font-semibold">{'Sign Up Failed'}</p>
          )}
        </form>
      </div>
      <div className="hidden md:block col-span-1 relative h-screen w-full bg-gray-100">
        <motion.img
          className="h-full w-full object-cover "
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={adminImg}
          alt="Admin Illustration"
        />
        <motion.div
          className="absolute top-[25%] left-[10%] right-[10%] bg-white p-6 min-h-96 rounded-lg shadow-lg text-center flex flex-col justify-center items-center"
          initial={{ opacity: 0.2, scale: 0.9 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-d2 mb-10">Welcome Admin</h1>
          <p className="text-gray-600 mt-4">Join the Street Niti admin team and manage vendors seamlessly!</p>
          <p className="text-gray-600 mt-4">
            {' '}
            Play a crucial role in creating a fair, transparent, and organized vending system. With Smart Vendor
            Management System (SVMS), you can streamline vendor approvals, manage vending zones efficiently, and ensure
            compliance—all from a single platform. Sign up today and take a step towards a smarter, corruption-free
            urban future!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminSignupPage;
