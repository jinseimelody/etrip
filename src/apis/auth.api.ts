import axiosClient from './axios.client';

const getUrl = (action: string) => '/auth' + action;

type IResponse = {
  status: number,
  data: any,
  error: any
};

const authApi = {
  login: (body: any): Promise<IResponse> => {
    return axiosClient.post(getUrl('/login'), body);
  }
};

export default authApi;
