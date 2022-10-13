import { configureStore } from '@reduxjs/toolkit';
import { deviceReducer, authReducer, authListener } from './slices';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    auth: authReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(authListener.middleware)
});
