import {createListenerMiddleware, createSlice, isAnyOf} from '@reduxjs/toolkit';
import persistStore from './persistStore';

const reservation = persistStore.get('reservation');

const initialState = {
  step: 1,
  bus: {
    busId: undefined,
    layoutId: undefined,
    price: 0,
    seats: []
  },
  chosen: {
    seats: [],
    total: 0
  }
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: reservation || initialState,
  reducers: {
    reset: () => initialState,
    setBus: (state, {_, payload}) => {
      state.bus = payload;
    },
    setChosen: (state, {_, payload}) => {
      state.chosen = payload;
    },
    resetChosen: (state, {_, payload}) => {
      state.chosen = initialState.chosen;
    },
    setStep: (state, {_, payload}) => {
      state.step = payload;
    }
  }
});

const {setBus, setChosen, resetChosen, setStep, reset} =
  reservationSlice.actions;

const useReservationEffect = createListenerMiddleware();

useReservationEffect.startListening({
  matcher: isAnyOf(setChosen, setBus, reset),
  effect: async (action, listenerApi) => {
    persistStore.set('reservation', listenerApi.getState().reservation);
  }
});

export {useReservationEffect, setBus, setChosen, resetChosen, setStep, reset};
export default reservationSlice.reducer;
