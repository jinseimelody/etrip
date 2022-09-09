import {createListenerMiddleware, createSlice, isAnyOf} from '@reduxjs/toolkit';
import persistStore from './persistStore';

const payment = persistStore.get('payment');

const initialState = {
  paymentRequests: []
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState: payment || initialState,
  reducers: {
    reset: () => initialState,
    push: (state, action) => {
      const {ticketId, sessionId} = action.payload;
      const request = [...state.paymentRequests];
      request.unshift({ticketId, sessionId});
      state.paymentRequests = request;
    }
  }
});

const {push} = paymentSlice.actions;

const usePaymentEffect = createListenerMiddleware();

usePaymentEffect.startListening({
  matcher: isAnyOf(push),
  effect: async (action, listenerApi) => {
    persistStore.set('payment', listenerApi.getState().payment);
  }
});

export {usePaymentEffect, push};

export default paymentSlice.reducer;
