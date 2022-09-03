import {configureStore} from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import recentSearchSlice from './recentSearchSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    search: recentSearchSlice
  }
});
