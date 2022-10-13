import { createSlice } from '@reduxjs/toolkit';
import localstore from '~/common/localstore';

let device = localstore.get('device');
if (!device) {
  device = { width: window.innerWidth, height: window.innerHeight };
  localstore.set('device', device);
}

const deviceSlice = createSlice({
  name: 'device',
  initialState: device,
  reducers: {}
});

export default deviceSlice.reducer;
