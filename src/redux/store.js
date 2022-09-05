import {configureStore} from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import recentSearchSlice from './recentSearchSlice';
import reservationSlice, {useReservationEffect} from './reservationSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    search: recentSearchSlice,
    reservation: reservationSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(useReservationEffect.middleware)
});
