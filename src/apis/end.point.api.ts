import { IEndPoint, IResponse } from '~/interfaces';
import axiosClient from './axios.client';

const url = '/rest/endpoints';
const endPointApi = {
    getAll: (query: any, controller: AbortController): Promise<IResponse> => {
        return axiosClient.get(url, { params: query, signal: controller.signal });
    },
    getOne: (id: any, controller?: AbortController): Promise<IResponse> => {
        return axiosClient.get(url + '/' + id, { signal: controller?.signal })
    },
    create: (data: IEndPoint): Promise<IResponse> => {
        return axiosClient.post(url, { ...data });
    },
    update: (id: number, data: IEndPoint): Promise<IResponse> => {
        return axiosClient.put(url + '/' + id, { ...data });
    },
    delete: (ids: number[]): Promise<IResponse> => {
        return axiosClient.patch(url, { ids: ids });
    },
};

export default endPointApi;
