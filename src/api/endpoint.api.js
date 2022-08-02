import axiosClient from './axios.client';

const endpointApi = {};

endpointApi.search = params => {
  const url = '/endpoints';
  // return Promise.resolve(([
  //   {id: 1, name: "Bx. Mien Tay", district: 'Ho Chi Minh'},
  //   {id: 2, name: "Bx. Ha Dong", district: 'Ha Noi'},
  // ]))
  return axiosClient.get(url, {params});
};

export default endpointApi;
