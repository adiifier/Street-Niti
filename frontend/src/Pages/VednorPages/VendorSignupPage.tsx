import { easeIn, motion, useScroll } from 'framer-motion';
import { Inputbox } from '../../Components/Inputbox';
import logo from '../../Images/logo.png';
import monkey from '../../Images/monkey.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { vendorSignUpType } from '../../Types/types';
import { useMutation } from '@tanstack/react-query';
import { SignUpPost } from '../../QueriesAndMutations/AuthQueries';
import { data, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const VendorSignupPage = () => {
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<vendorSignUpType>();

  const { mutate: vendorSignUpMutate } = useMutation({
    mutationFn: SignUpPost,
    onSuccess: (data) => {
      setLoginFailed(false);
      localStorage.setItem('token', data.token);
      navigate('/vendor/home');
    },
    onError: () => {
      setLoginFailed(true);
    },
  });

  const onSubmit: SubmitHandler<vendorSignUpType> = (data) => {
    vendorSignUpMutate(data);
    console.log(data);
    console.log(errors);
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 h-screen overflow-hidden">
      <div className="realtive hidden md:block col-span-1 relative h-full w-full bg-gray-100 flex flex-col items-center justify-center">
        <motion.img
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.2, borderRadius: 20 }}
          animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={monkey}
        ></motion.img>

        <motion.div
          className="absolute top-[20%] left-[20%] right-[5%]  p-6 max-w-md text-center bg-white text-d2 "
          initial={{ opacity: 0.2, scale: 0.8, borderRadius: 20 }}
          animate={{ opacity: 0.8, scale: 1, borderRadius: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-black text-gray-800">Join Street Niti</h1>
          <p className="text-lg text-d3 mt-4">
            Empower your business with digital tools to streamline operations, secure your spot, and grow with ease.
          </p>
        </motion.div>
      </div>
      <div className="relative col-span-1 flex flex-col items-center justify-center bg-white p-10 ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="absolute top-6 left-[20%] w-full max-w-md border border-gray-300 rounded-lg p-6 shadow-lg "
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
          >
            <motion.img className="mx-auto mb-6 rounded-lg" src={logo} alt="Logo" width={60} height={60} />
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Vendor Sign Up</h2>
            <div className="space-y-4">
              <Inputbox
                label="FirstName"
                type="text"
                placeholder="First Name"
                register={register('firstName', { required: 'Firstname is required' })}
              />
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName.message}</p>}
              <Inputbox
                label="LastName"
                type="text"
                placeholder="Last Name"
                register={register('lastName', { required: 'Lastname is required' })}
              />
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName.message}</p>}
              <Inputbox
                label="Email"
                type="email"
                placeholder="Email"
                register={register('email', { required: 'Email is required' })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
              <Inputbox
                label="Password"
                type="password"
                placeholder="Password"
                register={register('password', { required: 'Password is Required', minLength: 6 })}
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              <Inputbox
                label="BuisnessName"
                type="text"
                placeholder="Business Name"
                register={register('vendor.buisnessName', { required: 'Business Name is Required' })}
              />
              {errors.vendor?.buisnessName && (
                <p className="text-red-500 text-xs">{errors.vendor?.buisnessName.message}</p>
              )}
              <Inputbox
                label="Address"
                type="text"
                placeholder="Business Address"
                register={register('vendor.address')}
              />
              {errors.vendor?.address && <p className="text-red-500 text-xs">{errors.vendor?.address.message}</p>}
            </div>
            <motion.button
              onClick={() => {
                setValue('role', 'vendor');
              }}
              className="w-full bg-d3 text-white font-bold py-2 rounded-lg mt-6 hover:bg-d4"
              initial={{ opacity: 0.2, scale: 0.8 }}
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
                  navigate('/sign-in');
                }}
              >
                Sign In
              </div>
            </p>
            {loginFailed && (
              <p className=" text-center text-red-400 rounded-2xl text-md font-semibold">{'Sign Up Failed'}</p>
            )}
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default VendorSignupPage;
