import axiosClient from './axios.client';

const endpointApi = {};

endpointApi.search = params => {
  return axiosClient.get('/endpoints', {params});
};

export default endpointApi;
