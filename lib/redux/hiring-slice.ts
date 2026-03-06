import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HiringState } from '@/lib/types/freight';

const initialState: HiringState = {
  sender: {
    document: '',
    documentType: 'CPF',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
  destiny: {
    document: '',
    documentType: 'CPF',
    name: '',
    email: '',
    phone: '',
    zipcode: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  },
  observation: '',
};

const hiringSlice = createSlice({
  name: 'hiring',
  initialState,
  reducers: {
    setSenderData: (state, action: PayloadAction<Partial<HiringState['sender']>>) => {
      state.sender = { ...state.sender, ...(action?.payload ?? {}) };
    },
    setDestinyData: (state, action: PayloadAction<Partial<HiringState['destiny']>>) => {
      state.destiny = { ...state.destiny, ...(action?.payload ?? {}) };
    },
    setObservation: (state, action: PayloadAction<string>) => {
      state.observation = action?.payload ?? '';
    },
    resetHiring: () => initialState,
  },
});

export const {
  setSenderData,
  setDestinyData,
  setObservation,
  resetHiring,
} = hiringSlice?.actions ?? {};

export default hiringSlice?.reducer;
