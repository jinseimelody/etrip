import axiosClient from './axios.client';

const tripApi = {};

tripApi.search = (params, abortController) => {
  const url = '/trips';
  return axiosClient.get(url, {
    params: params,
    signal: abortController && abortController.signal
  });
};

tripApi.getOne = (params, abortController) => {
  const url = `/trips/${params.scheduleId}/${params.date}`;
  return axiosClient.get(url, {
    signal: abortController && abortController.signal
  });
};
export default tripApi;
