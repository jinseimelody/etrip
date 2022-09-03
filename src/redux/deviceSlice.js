import {createSlice} from '@reduxjs/toolkit';
import {storage} from '~/apis';

let device = storage.get('device');

if (!device) {
  device = {with: window.innerWidth, height: window.innerHeight};
  storage.set('device', device);
}

const initialState = device;

const deviceSlice = createSlice({
  name: 'device',
  initialState
});

export default deviceSlice.reducer;
