import axiosClient from './axios.client';

const tripApi = {};

tripApi.search = params => {
  const url = '/trips';
  return axiosClient.get(url, {params});
};

tripApi.getOne = params => {
  const url = `/trips/${params.scheduleId}/${params.date}`;
  return axiosClient.get(url);
};
export default tripApi;
