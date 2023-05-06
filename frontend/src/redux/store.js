import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { regularReducer } from './regularSlice';

const rootReducer = combineReducers({
  regular: regularReducer,
});

export const createReduxStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });
};
