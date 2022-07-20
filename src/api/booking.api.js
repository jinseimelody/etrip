import axiosClient from './axios.client';

const bookingApi = {};

bookingApi.search = params => {
  const url = '/booking/search';
  return axiosClient.get(url, {params});
};
export default bookingApi;
