import { atom } from 'recoil';

export const currentApplicationIdAtom = atom<string>({
  key: 'currentApplicationId',
  default: null,
});

export const allApplicationsAtom = atom({
  key: 'allApplications',
  default: [],
});

export const vendorIdAtom = atom({
  key: 'vendorid',
  default: null,
});
