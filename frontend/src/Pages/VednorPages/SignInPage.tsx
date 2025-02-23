import { easeIn, motion } from 'motion/react';
import vendor from '../../Images/vendorAunty.png';
import { Inputbox } from '../../Components/Inputbox';
import logo from '../../Images/logo.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginPost } from '../../QueriesAndMutations/AuthQueries';

import { loginType } from '../../Types/types';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SignInPage = () => {
  const navigate = useNavigate();
  const [loginFailed, setLoginFailed] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<loginType>();

  const { mutate: loginMutate } = useMutation({
    mutationFn: loginPost,

    onSuccess: (data) => {
      setLoginFailed(true);
      localStorage.setItem('token', data.token);
      navigate('/vendor/home');
    },
    onError: (Error) => {
      console.log(Error);
      setLoginFailed(true);
    },
  });

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    loginMutate(data);
  };

  return (
    <div className="w-full grid grid-cols-2 h-full overflow-hidden">
      <div className=" hidden md:block col-span-1  relative h-screen w-full ">
        <motion.img
          className="h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.2, borderRadius: 20 }}
          animate={{ opacity: 1, scale: 1, borderRadius: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          src={vendor}
        ></motion.img>

        <motion.div
          className="absolute top-[20%] left-[5%] right-[5%] bg-d4 p-6 min-h-96 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 className="mb-10 font-black text-4xl text-d2"> Street Niti</motion.h1>
          <motion.h3 className="font-semibold text-xl text-d3 mb-3">Empowering Vendors, Transforming Cities</motion.h3>
          <motion.p className="font-light text-d3 mt-10">
            Join the Smart Vendor Management System (SVMS) and say goodbye to uncertainty! Secure your vending spot
            legally, manage your stall with ease, and make hassle-free digital payments—all in one place. Whether you're
            a vendor looking for stability or an authority ensuring urban order, SVMS is your smart solution. Sign in
            now and be part of the change!
          </motion.p>
        </motion.div>
      </div>
      <div className="col-span-2 mt-40 md:mt-0 md:col-span-1 bg-white  flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <motion.div
            className="flex flex-col items-center justify-center border-1 border-d2 rounded-lg p-10 "
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
          >
            <motion.img className=" mb-6 " src={logo} initial={{ height: 60, width: 60, borderRadius: 5 }}></motion.img>
            <motion.div className="font-bold text-2xl text-d2 "> Login </motion.div>
            <motion.div className="rounded-lg ">
              <Inputbox
                label="Email"
                register={register('email', { required: 'Email is required' })}
                type="text"
                placeholder="Email"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              <Inputbox
                type="password"
                label="Password"
                placeholder="Enter your password "
                register={register('password', { required: 'Password is Required', minLength: 6 })}
              />{' '}
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </motion.div>
          </motion.div>
          <motion.button
            onClick={() => {
              setValue('role', 'vendor');
            }}
            className="bg-d3 text-xl font-bold m-10 p-3 rounded-lg text-d2 w-72 h-12 cursor-pointer flex items-center justify-center  hover:bg-d3"
            initial={{ opacity: 0.2, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: easeIn }}
          >
            Login
          </motion.button>
          <p className="text-gray-500 text-center text-sm flex items-center justify-center ">
            Don't have an account ?{' '}
            <div
              className="font-light underline cursor-pointer"
              onClick={() => {
                navigate('/vendor/sign-up');
              }}
            >
              Sign Up
            </div>
          </p>
          {loginFailed && (
            <p className=" text-center text-red-400 rounded-2xl text-md font-semibold">{'Login Failed'}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
