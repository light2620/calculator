import { configureStore } from '@reduxjs/toolkit';
import allDataReducer from "./allDataSlice"
import userReducer from "./userSlice"
export const store = configureStore({
  reducer: {
   allData: allDataReducer,
   user : userReducer
  },
});