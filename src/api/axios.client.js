import axios from 'axios';
import queryString from 'query-string';
import storage from './storage';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
  async config => {
    const {accessToken} = storage.get('token');
    if (!accessToken) return config;

    config.headers = {
      authentication: `Bearer ${accessToken}`
    };
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => {
    return response && response.data ? response.data : response;
  },
  error => error.response.data || Promise.reject(error)
);
export default axiosClient;
