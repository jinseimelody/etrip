import axiosClient from './axios.client';

const bookingApi = {};

bookingApi.search = params => {
  const url = '/booking/search';
  return axiosClient.get(url, {params});
};

bookingApi.placement = params => {
  const url = '/booking/placement';
  return axiosClient.get(url, {params});
};
export default bookingApi;
