import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { QuotationState, Volume, QuoteService } from '@/lib/types/freight';

const initialState: QuotationState = {
  zipCodeStart: '',
  zipCodeEnd: '',
  volumes: [
    {
      quantity: 1,
      length: 0,
      height: 0,
      weight: 0,
      width: 0,
      price: 0,
    },
  ],
  totalAmount: 0,
  quotationResults: [],
  selectedService: null,
  customerId: '',
  type: '',
  loading: false,
  error: null,
};

const quotationSlice = createSlice({
  name: 'quotation',
  initialState,
  reducers: {
    setZipCodeStart: (state, action: PayloadAction<string>) => {
      state.zipCodeStart = action?.payload ?? '';
    },
    setZipCodeEnd: (state, action: PayloadAction<string>) => {
      state.zipCodeEnd = action?.payload ?? '';
    },
    setVolumes: (state, action: PayloadAction<Volume[]>) => {
      state.volumes = action?.payload ?? [initialState.volumes[0]];
    },
    addVolume: (state) => {
      const firstVolume = state?.volumes?.[0] ?? initialState.volumes[0];
      state.volumes.push({
        quantity: 1,
        length: 0,
        height: 0,
        weight: 0,
        width: 0,
        price: firstVolume?.price ?? 0,
      });
    },
    removeVolume: (state, action: PayloadAction<number>) => {
      if (state?.volumes?.length > 1) {
        state.volumes = state?.volumes?.filter?.((_, index) => index !== action?.payload) ?? [];
      }
    },
    updateVolume: (state, action: PayloadAction<{ index: number; volume: Volume }>) => {
      const { index, volume } = action?.payload ?? {};
      if (state?.volumes?.[index]) {
        state.volumes[index] = volume;
        
        if (index === 0 && volume?.price !== undefined) {
          state.volumes = state?.volumes?.map?.((v, i) => 
            i === 0 ? v : { ...v, price: volume?.price ?? 0 }
          ) ?? [];
        }
      }
    },
    setTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action?.payload ?? 0;
    },
    setQuotationResults: (state, action: PayloadAction<QuoteService[]>) => {
      state.quotationResults = action?.payload ?? [];
    },
    setSelectedService: (state, action: PayloadAction<QuoteService | null>) => {
      state.selectedService = action?.payload ?? null;
    },
    setCustomerId: (state, action: PayloadAction<string>) => {
      state.customerId = action?.payload ?? '';
    },
    setType: (state, action: PayloadAction<string>) => {
      state.type = action?.payload ?? '';
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action?.payload ?? false;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action?.payload ?? null;
    },
    resetQuotation: () => initialState,
  },
});

export const {
  setZipCodeStart,
  setZipCodeEnd,
  setVolumes,
  addVolume,
  removeVolume,
  updateVolume,
  setTotalAmount,
  setQuotationResults,
  setSelectedService,
  setCustomerId,
  setType,
  setLoading,
  setError,
  resetQuotation,
} = quotationSlice?.actions ?? {};

export default quotationSlice?.reducer;
