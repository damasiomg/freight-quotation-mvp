import { configureStore } from '@reduxjs/toolkit';
import quotationReducer from './quotation-slice';
import hiringReducer from './hiring-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      quotation: quotationReducer,
      hiring: hiringReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
