import {createSlice} from '@reduxjs/toolkit';
import persistStore from './persistStore';

const search = persistStore.get('search');

const initialState = search || {
  current: null,
  recent: []
};

const recentSearchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    push: (state, action) => {
      const {payload} = action;

      const recent = [...state.recent];
      const index = recent.findIndex(
        x => x.departure.id === payload.departure.id && x.arrival.id === payload.arrival.id && x.date === payload.date
      );
      if (index >= 0) recent.splice(index, 1);
      recent.unshift(payload);

      state.current = payload;
      state.recent = recent;

      persistStore.set('search', state);
    },
    clear: state => {
      state.recent = [];
      persistStore.set('search', state);
    }
  }
});

export const {push, clear} = recentSearchSlice.actions;

export default recentSearchSlice.reducer;
