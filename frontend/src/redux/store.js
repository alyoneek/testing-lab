import { configureStore } from '@reduxjs/toolkit';
import { regularReducer } from './regularSlice';

export const store = configureStore({
  reducer: {
    regular: regularReducer,
  },
});
