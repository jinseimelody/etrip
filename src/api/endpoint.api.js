import axiosClient from './axios.client';

const endpointApi = {};

endpointApi.search = params => {
  const url = '/endpoints';
  return axiosClient.get(url, {params});
};

export default endpointApi;
