import axios from 'axios';
import queryString from 'query-string';
import localstore from '~/common/localstore';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  withCredentials: true,
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
  async config => {
    const token = localstore.get('token');
    if (!token) return config;

    config.headers = {
      authentication: `Bearer ${token.accessToken}`
    };
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  // escape axios response
  response => {
    return response?.data ? response.data : response;
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
