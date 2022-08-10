import axiosClient from './axios.client';

const userApi = {};

userApi.login = body => {
  return axiosClient.post('/user/login', body);
};

userApi.register = body => {
  return axiosClient.post('/user/register', body);
};

export default userApi;
