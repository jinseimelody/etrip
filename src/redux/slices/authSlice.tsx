import { createListenerMiddleware, createSlice, isAnyOf } from '@reduxjs/toolkit';
import localstore from '~/common/localstore';

const authSlice = createSlice({
  name: 'auth',
  initialState: localstore.get('auth'),
  reducers: {
    save: (_, action) => action.payload
  }
});

const authListener = createListenerMiddleware();
const { save } = authSlice.actions;
authListener.startListening({
  matcher: isAnyOf(save),
  effect: async (action, listenerApi: any) => {
    const auth = listenerApi.getState().auth
    localstore.set('auth', auth);
  }
});

export { authListener };

export const authActions = authSlice.actions;

export default authSlice.reducer;
