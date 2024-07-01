import { configureStore } from '@reduxjs/toolkit';
import segmentReducer from '../Slices/segmentSlice';

export const store = configureStore({
  reducer: {
    segment: segmentReducer,
  },
});
