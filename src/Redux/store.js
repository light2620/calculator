import { configureStore } from '@reduxjs/toolkit';
import allDataReducer from "./allDataSlice"

export const store = configureStore({
  reducer: {
   allData: allDataReducer
  },
});