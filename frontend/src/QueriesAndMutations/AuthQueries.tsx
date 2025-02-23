import axios from 'axios';
import {
  adminSignUpType,
  createApplicationType,
  createStallType,
  loginType,
  updateApplicationStatusType,
} from '../Types/types';
import { useRecoilValue } from 'recoil';
import { vendorIdAtom } from '../Atoms/atoms';

//Login
export const loginPost = async (Credentials: loginType) => {
  const response = await axios.post('http://localhost:3000/api/v1/auth/sign-in', Credentials, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

//Admmin sign up
export const SignUpPost = async (Credentials: adminSignUpType) => {
  const response = await axios.post('http://localhost:3000/api/v1/auth/sign-up', Credentials, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

//Create Application Vendor
export const CreateApplicationPost = async (Contents: createApplicationType) => {
  const formData = new FormData();

  formData.append('description', Contents.description);
  formData.append('title', Contents.title);
  formData.append('location', Contents.location);
  if (Contents.image || Contents.image[0]) {
    formData.append('image', Contents.image[0]);
  }

  const response = await axios.post('http://localhost:3000/api/v1/application', formData, {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

//Get all vendor Applications
export const GetVendorApplications = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/application/vendor', {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

//Get All Applications Admin

export const GetAllAplications = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/application/admin', {
    headers: { 'Content-Type': 'applications/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

//Get Single Application Vendor
export const getSingleApplication = async (appId) => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/application/vendor',
    { id: appId },
    { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );
  return response.data;
};

// Update Application Status Admin

export const updateApplicationsStatus = async (Contents: updateApplicationStatusType) => {
  const response = await axios.post('http://localhost:3000/api/v1/application/admin/status', Contents, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

//Get all stalls Admin

export const getAllStalls = async () => {
  const response = await axios.get('http://localhost:3000/api/v1/stalls', {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

//Get Vendor Stalls

export const getVendorStalls = async (vid: string) => {
  const response = await axios.post(
    'http://localhost:3000/api/v1/stalls/vendor',
    { vendorId: vid },
    { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
  );
  return response.data;
};

export const createStall = async (Contents: createStallType) => {
  const response = await axios.post('http://localhost:3000/api/v1/stalls', Contents, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};
