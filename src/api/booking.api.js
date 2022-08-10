import axiosClient from './axios.client';

const bookingApi = {};

bookingApi.create = body => {
  return axiosClient.post('/bookings', body);
};
export default bookingApi;
