import {configureStore} from '@reduxjs/toolkit';
import deviceReducer from './deviceSlice';
import paymentSlice, {usePaymentEffect} from './paymentSlice';
import recentSearchSlice from './recentSearchSlice';
import reservationSlice, {useReservationEffect} from './reservationSlice';

export const store = configureStore({
  reducer: {
    device: deviceReducer,
    search: recentSearchSlice,
    reservation: reservationSlice,
    payment: paymentSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(useReservationEffect.middleware)
      .prepend(usePaymentEffect.middleware)
});
