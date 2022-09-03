import axiosClient from './axios.client';

const endpointApi = {};
endpointApi.search = async params => {
  return axiosClient.get('/endpoints', {params});
};

endpointApi.getOne = async (endpointId, abortController) => {
  return axiosClient.get(`/endpoints/${endpointId}`, {
    signal: abortController && abortController.signal
  });
};

export default endpointApi;
