// store/index.ts or store.ts
import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './slices/languageSlice';
import pumpReducer from './slices/pumpSlice'; // 👈 Add this

export const store = configureStore({
  reducer: {
    language: languageReducer,
    pump: pumpReducer, // 👈 Register the pump reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
