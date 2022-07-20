import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(
  async config => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1ODA0ODA3MiwiZXhwIjoxNjU4MDQ4MDgyLCJhdWQiOiIxIiwiaXNzIjoibS5jb2V0b3Jpc2UuY29tIn0.UU4XppyCcTjc72VC-1Veqjrn7VRBghtQh7hES-o8r4A';
    config.headers = {
      authentication: `Bearer ${token}`
    };
    return config;
  },
  error => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  response => {
    return response && response.data ? response.data : response;
  },
  error => Promise.reject(error)
);
export default axiosClient;
