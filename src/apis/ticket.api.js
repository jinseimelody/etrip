import axiosClient from './axios.client';

const ticketApi = {};

ticketApi.search = abortController => {
  return axiosClient.get(`/tickets`, {
    signal: abortController && abortController.signal
  });
};

ticketApi.getOne = (ticketId, abortController) => {
  return axiosClient.get(`/tickets/${ticketId}`, {
    signal: abortController && abortController.signal
  });
};

export default ticketApi;
