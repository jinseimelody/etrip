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
    const token = storage.get('token');
    if (!token) return config;

    config.headers = {
      authentication: `Bearer ${token.accessToken}`
    };
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => {
    // console.log(`response`, response);
    return response && response.data ? response.data : response;
  },
  error => {
    // handle canceled request
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
      return;
    }

    // handle error
    return Promise.reject(error);
  }
);
export default axiosClient;
