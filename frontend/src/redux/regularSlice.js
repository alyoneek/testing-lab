import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: ['aa'],
};

export const regularSlice = createSlice({
  name: 'regular',
  initialState,
  reducers: {
    addTest: (state, { payload }) => {
      state.results.unshift(payload);
    },
    addTests: (state, { payload }) => {
      state.results = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: regularActions, reducer: regularReducer } = regularSlice;
