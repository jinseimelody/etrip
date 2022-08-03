import axiosClient from './axios.client';

const bookingApi = {};

bookingApi.create = async body => {
  const url = `/bookings`;
  return axiosClient.post(url, body);
};
export default bookingApi;
