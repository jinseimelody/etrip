import {createListenerMiddleware, createSlice, isAnyOf} from '@reduxjs/toolkit';
import persistStore from './persistStore';

const reservation = persistStore.get('reservation');

const initialState = {
  step: 1,
  trip: {
    scheduleId: null,
    start: null,
    end: null,
    date: null,
    from: null,
    to: null,
    price: 0
  },
  bus: {
    busId: undefined,
    layoutId: undefined,
    price: 0,
    seats: []
  },
  chosen: {
    seats: [],
    total: 0
  },
  contact: {
    passenger: undefined,
    phoneNumber: undefined,
    email: undefined,
    note: undefined
  }
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: reservation || initialState,
  reducers: {
    reset: () => initialState,
    setTrip: (state, {_, payload}) => {
      state.trip = payload;
    },
    setBus: (state, {_, payload}) => {
      state.bus = payload;
    },
    setChosen: (state, {_, payload}) => {
      state.chosen = payload;
    },
    resetChosen: state => {
      state.chosen = initialState.chosen;
    },
    setContact: (state, {_, payload}) => {
      state.contact = payload;
    },
    setStep: (state, {_, payload}) => {
      state.step = payload;
    }
  }
});

const {setTrip, setBus, setChosen, resetChosen, setContact, setStep, reset} =
  reservationSlice.actions;

const useReservationEffect = createListenerMiddleware();

useReservationEffect.startListening({
  matcher: isAnyOf(
    setTrip,
    setBus,
    setChosen,
    resetChosen,
    setContact,
    setStep,
    reset
  ),
  effect: async (action, listenerApi) => {
    persistStore.set('reservation', listenerApi.getState().reservation);
  }
});

export {
  useReservationEffect,
  setTrip,
  setBus,
  setChosen,
  resetChosen,
  setContact,
  setStep,
  reset
};

export default reservationSlice.reducer;
