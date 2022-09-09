import axiosClient from './axios.client';

const paymentApi = {};

paymentApi.pay = body => {
  return axiosClient.post('/payments', body);
};

export default paymentApi;
