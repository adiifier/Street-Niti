import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export const Inputbox = ({
  placeholder,
  label,
  type,
  register,
}: {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
}) => {
  return (
    <div className="flex flex-col space-y-2 mt-4">
      <label className="text-sm font-medium text-d2">{label}</label>
      <input
        type={type}
        {...register}
        placeholder={placeholder}
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-d3 focus:border-d3 transition duration-200 ease-in-out"
      />
    </div>
  );
};
