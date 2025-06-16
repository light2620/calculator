import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {} // initially empty, will be populated by API
};

const allDataSlice = createSlice({
  name: 'allData',
  initialState,
  reducers: {
    setAllData: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const { setAllData } = allDataSlice.actions;
export default allDataSlice.reducer;
